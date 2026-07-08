/// Internal mutations exposed only to other Convex functions (HTTP actions
/// in this case). Keeps the verification + entitlement-update logic out of
/// the public mutation surface so untrusted clients can't trigger it
/// directly.

import { v } from "convex/values";
import { internalMutation, internalQuery } from "./_generated/server";
import { upsertUser } from "./entitlements";

interface NormalizedTransaction {
  transactionId: string;
  originalTransactionId: string;
  productId: string;
  expiresDate?: number;
  status: "active" | "expired" | "revoked" | "billing_retry";
  environment: "sandbox" | "production";
  raw: unknown;
}

export const applyVerifiedTransaction = internalMutation({
  args: {
    appAccountToken: v.string(),
    customerEmail: v.optional(v.string()),
    signedTransactionJWS: v.string(),
    transaction: v.object({
      transactionId: v.string(),
      originalTransactionId: v.string(),
      productId: v.string(),
      expiresDate: v.optional(v.number()),
      status: v.union(
        v.literal("active"),
        v.literal("expired"),
        v.literal("revoked"),
        v.literal("billing_retry"),
      ),
      environment: v.union(v.literal("sandbox"), v.literal("production")),
      raw: v.any(),
    }),
    tier: v.union(v.literal("creator"), v.literal("studio")),
  },
  handler: async (ctx, args) => {
    const user = await upsertUser(ctx, {
      appAccountToken: args.appAccountToken,
      email: args.customerEmail,
    });

    // Insert receipt audit row (idempotent on transactionId).
    const existingReceipt = await ctx.db
      .query("iap_receipts")
      .withIndex("by_transaction", (q) => q.eq("transactionId", args.transaction.transactionId))
      .first();
    const receiptDoc = {
      userId: user._id,
      appAccountToken: args.appAccountToken,
      productId: args.transaction.productId,
      transactionId: args.transaction.transactionId,
      originalTransactionId: args.transaction.originalTransactionId,
      signedTransactionJWS: args.signedTransactionJWS,
      environment: args.transaction.environment,
      status: args.transaction.status,
      expiresAt: args.transaction.expiresDate,
      verifiedAt: Date.now(),
      rawVerification: args.transaction.raw,
    };
    if (existingReceipt) {
      await ctx.db.patch(existingReceipt._id, receiptDoc);
    } else {
      await ctx.db.insert("iap_receipts", receiptDoc);
    }

    // Update the resolved entitlement for this originalTransactionId.
    const existingEnt = await ctx.db
      .query("entitlements")
      .withIndex("by_external_ref", (q) =>
        q.eq("source", "app_store").eq("externalRef", args.transaction.originalTransactionId),
      )
      .first();
    // Non-renewing (lifetime) products have no expiresDate. Use
    // year 9999 as the perpetual-end sentinel so the
    // `currentPeriodEnd > now` filter in
    // `resolveEntitlementsForLookup` keeps the entitlement active
    // forever. Mirrors the Stripe lifetime-sentinel used in
    /// `stripeMutations#onLifetimePaymentSucceeded`.
    const isLifetime = args.transaction.productId.endsWith(".lifetime");
    const perpetualEnd = 253402214399000;
    const entDoc = {
      userId: user._id,
      tier: args.tier,
      source: "app_store" as const,
      externalRef: args.transaction.originalTransactionId,
      productId: args.transaction.productId,
      status: args.transaction.status === "active" ? ("active" as const) :
              args.transaction.status === "billing_retry" ? ("billing_retry" as const) :
              args.transaction.status === "revoked" ? ("cancelled" as const) :
              ("expired" as const),
      currentPeriodEnd: isLifetime ? perpetualEnd : (args.transaction.expiresDate ?? Date.now()),
      cancelAtPeriodEnd: false,
      updatedAt: Date.now(),
    };
    if (existingEnt) {
      await ctx.db.patch(existingEnt._id, entDoc);
    } else {
      await ctx.db.insert("entitlements", entDoc);
    }

    return { userId: user._id, tier: args.tier, lifetime: isLifetime };
  },
});

export const resolveEntitlementsForLookup = internalQuery({
  args: {
    appAccountToken: v.optional(v.string()),
    email: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Locate the user via either key, mirroring upsertUser lookup order.
    let user = null;
    if (args.appAccountToken) {
      user = await ctx.db
        .query("users")
        .withIndex("by_app_account_token", (q) => q.eq("appAccountToken", args.appAccountToken!))
        .first();
    }
    if (!user && args.email) {
      user = await ctx.db
        .query("users")
        .withIndex("by_email", (q) => q.eq("email", args.email!.toLowerCase()))
        .first();
    }
    if (!user) {
      return { tier: "free", entitlements: [], userId: null };
    }

    const ents = await ctx.db
      .query("entitlements")
      .withIndex("by_user", (q) => q.eq("userId", user!._id))
      .collect();

    const now = Date.now();
    const active = ents.filter(
      (e) =>
        (e.status === "active" || e.status === "billing_retry") &&
        e.currentPeriodEnd > now,
    );
    const tier = ((): "free" | "creator" | "studio" => {
      if (active.some((e) => e.tier === "studio")) return "studio";
      if (active.some((e) => e.tier === "creator")) return "creator";
      return "free";
    })();

    return {
      tier,
      userId: user._id,
      stripeCustomerId: user.stripeCustomerId ?? null,
      entitlements: active.map((e) => ({
        source: e.source,
        productId: e.productId,
        status: e.status,
        currentPeriodEnd: e.currentPeriodEnd,
        cancelAtPeriodEnd: e.cancelAtPeriodEnd,
      })),
    };
  },
});