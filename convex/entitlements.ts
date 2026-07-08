import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc } from "./_generated/dataModel";

/// Tier resolution rules — Studio always beats Creator, both beat Free.
/// Exposed as a helper so /get-entitlements and the iOS verify handler use
/// the same logic.
export function resolveTier(
  candidates: Array<Pick<Doc<"entitlements">, "tier" | "status" | "currentPeriodEnd">>,
  now: number,
): "free" | "creator" | "studio" {
  const active = candidates.filter(
    (e) =>
      (e.status === "active" || e.status === "billing_retry") &&
      e.currentPeriodEnd > now,
  );
  if (active.some((e) => e.tier === "studio")) return "studio";
  if (active.some((e) => e.tier === "creator")) return "creator";
  return "free";
}

/// Upsert a user by `appAccountToken` (iOS path) or `email` (web path).
/// Returns the user doc. If neither key resolves, creates a new user.
export async function upsertUser(
  ctx: any,
  fields: {
    appAccountToken?: string;
    email?: string;
    stripeCustomerId?: string;
    name?: string;
  },
): Promise<Doc<"users">> {
  const now = Date.now();

  // 1) try appAccountToken
  if (fields.appAccountToken) {
    const hit = await ctx.db
      .query("users")
      .withIndex("by_app_account_token", (q: any) =>
        q.eq("appAccountToken", fields.appAccountToken),
      )
      .first();
    if (hit) {
      const patch: Record<string, unknown> = { updatedAt: now };
      if (fields.email && !hit.email) patch.email = fields.email;
      if (fields.stripeCustomerId && !hit.stripeCustomerId) {
        patch.stripeCustomerId = fields.stripeCustomerId;
      }
      if (fields.name && !hit.name) patch.name = fields.name;
      if (Object.keys(patch).length > 1) {
        await ctx.db.patch(hit._id, patch);
        return { ...hit, ...patch } as Doc<"users">;
      }
      return hit;
    }
  }

  // 2) try email
  if (fields.email) {
    const normalized = fields.email.trim().toLowerCase();
    const hit = await ctx.db
      .query("users")
      .withIndex("by_email", (q: any) => q.eq("email", normalized))
      .first();
    if (hit) {
      const patch: Record<string, unknown> = { updatedAt: now };
      if (fields.appAccountToken && !hit.appAccountToken) {
        patch.appAccountToken = fields.appAccountToken;
      }
      if (fields.stripeCustomerId && !hit.stripeCustomerId) {
        patch.stripeCustomerId = fields.stripeCustomerId;
      }
      if (Object.keys(patch).length > 1) {
        await ctx.db.patch(hit._id, patch);
        return { ...hit, ...patch } as Doc<"users">;
      }
      return hit;
    }
  }

  // 3) try stripeCustomerId
  if (fields.stripeCustomerId) {
    const hit = await ctx.db
      .query("users")
      .withIndex("by_stripe_customer", (q: any) =>
        q.eq("stripeCustomerId", fields.stripeCustomerId),
      )
      .first();
    if (hit) return hit;
  }

  // 4) create new
  const id = await ctx.db.insert("users", {
    email: fields.email?.trim().toLowerCase(),
    name: fields.name,
    appAccountToken: fields.appAccountToken,
    stripeCustomerId: fields.stripeCustomerId,
    createdAt: now,
    updatedAt: now,
  });
  return (await ctx.db.get(id))!;
}

export const setEntitlement = mutation({
  args: {
    userId: v.id("users"),
    tier: v.union(v.literal("free"), v.literal("creator"), v.literal("studio")),
    source: v.union(
      v.literal("stripe"),
      v.literal("app_store"),
      v.literal("promo"),
    ),
    externalRef: v.string(),
    productId: v.string(),
    status: v.union(
      v.literal("active"),
      v.literal("past_due"),
      v.literal("cancelled"),
      v.literal("expired"),
      v.literal("billing_retry"),
    ),
    currentPeriodEnd: v.number(),
    cancelAtPeriodEnd: v.boolean(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    // Find existing entitlement row for this source+ref pair (single row per
    // active subscription). If found, patch; else insert.
    const existing = await ctx.db
      .query("entitlements")
      .withIndex("by_external_ref", (q) =>
        q.eq("source", args.source).eq("externalRef", args.externalRef),
      )
      .first();

    const doc = {
      userId: args.userId,
      tier: args.tier,
      source: args.source,
      externalRef: args.externalRef,
      productId: args.productId,
      status: args.status,
      currentPeriodEnd: args.currentPeriodEnd,
      cancelAtPeriodEnd: args.cancelAtPeriodEnd,
      updatedAt: now,
    };

    if (existing) {
      await ctx.db.patch(existing._id, doc);
      return existing._id;
    }
    return await ctx.db.insert("entitlements", doc);
  },
});

/// Internal query — used by /get-entitlements HTTP action and the iOS verify
/// path to compute a user's effective tier.
export const getTierForUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    const ents = await ctx.db
      .query("entitlements")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();
    const tier = resolveTier(ents, Date.now());
    const now = Date.now();
    const activeEntitlements = ents.filter(
      (e) =>
        (e.status === "active" || e.status === "billing_retry") &&
        e.currentPeriodEnd > now,
    );
    return {
      tier,
      entitlements: activeEntitlements.map((e) => ({
        source: e.source,
        productId: e.productId,
        status: e.status,
        currentPeriodEnd: e.currentPeriodEnd,
        cancelAtPeriodEnd: e.cancelAtPeriodEnd,
      })),
    };
  },
});