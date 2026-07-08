/// Stripe webhook handler — internal mutation dispatched by
/// http.ts#stripeWebhook.

import { v } from "convex/values";
import { internalMutation } from "./_generated/server";
import { upsertUser } from "./entitlements";
import { tierForPriceId, normalizeStripeStatus } from "./stripe";

export const handleStripeEvent = internalMutation({
  args: {
    event: v.any(),
  },
  handler: async (ctx, { event }) => {
    switch (event.type) {
      case "checkout.session.completed": {
        return await onCheckoutCompleted(ctx, event.data.object);
      }
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        return await onSubscriptionChanged(ctx, event.data.object);
      }
      case "customer.created":
      case "customer.updated": {
        return await onCustomerChanged(ctx, event.data.object);
      }
      default:
        // Silently ignore unhandled event types.
        return { ignored: event.type };
    }
  },
});

async function onCheckoutCompleted(ctx: any, session: any) {
  const customerId: string | undefined = session.customer;
  const customerEmail: string | undefined =
    session.customer_details?.email ?? session.customer_email;
  const appAccountToken: string | undefined =
    session.metadata?.appAccountToken || undefined;

  if (!customerId) return { ignored: "no customer id" };

  const user = await upsertUser(ctx, {
    stripeCustomerId: customerId,
    email: customerEmail,
    appAccountToken,
  });

  // Mirror the customer row.
  const existingMirror = await ctx.db
    .query("stripe_customers")
    .withIndex("by_stripe_customer_id", (q: any) => q.eq("stripeCustomerId", customerId))
    .first();
  if (existingMirror) {
    await ctx.db.patch(existingMirror._id, {
      email: customerEmail ?? existingMirror.email,
    });
  } else {
    await ctx.db.insert("stripe_customers", {
      userId: user._id,
      stripeCustomerId: customerId,
      email: customerEmail,
      createdAt: Date.now(),
    });
  }

  return { linked: true, userId: user._id };
}

async function onCustomerChanged(ctx: any, customer: any) {
  const customerId: string = customer.id;
  const email: string | undefined = customer.email;
  if (!email) return { ignored: "no email" };

  const user = await upsertUser(ctx, {
    stripeCustomerId: customerId,
    email,
  });
  // Patch the mirror row's email if it changed.
  const mirror = await ctx.db
    .query("stripe_customers")
    .withIndex("by_stripe_customer_id", (q: any) => q.eq("stripeCustomerId", customerId))
    .first();
  if (mirror) {
    await ctx.db.patch(mirror._id, { email });
  }
  return { updated: user._id };
}

async function onSubscriptionChanged(ctx: any, subscription: any) {
  const subscriptionId: string = subscription.id;
  const customerId: string = subscription.customer;
  const status: string = subscription.status;
  const priceId: string | undefined = subscription.items?.data?.[0]?.price?.id;
  const currentPeriodStart: number = subscription.current_period_start * 1000;
  const currentPeriodEnd: number = subscription.current_period_end * 1000;
  const cancelAtPeriodEnd: boolean = !!subscription.cancel_at_period_end;
  const cancelAt: number | undefined = subscription.cancel_at
    ? subscription.cancel_at * 1000
    : undefined;

  // Look up the user via stripeCustomerId.
  const user = await ctx.db
    .query("users")
    .withIndex("by_stripe_customer", (q: any) => q.eq("stripeCustomerId", customerId))
    .first();
  if (!user) {
    // Customer not yet linked — likely the customer.created event arrived
    // out of order or this subscription predates our user linking. Skip.
    return { ignored: "no user for customer" };
  }

  // Find or create the stripe_subscriptions mirror.
  const existingSub = await ctx.db
    .query("stripe_subscriptions")
    .withIndex("by_stripe_subscription", (q: any) => q.eq("stripeSubscriptionId", subscriptionId))
    .first();
  const subDoc = {
    userId: user._id,
    stripeSubscriptionId: subscriptionId,
    stripeCustomerId: customerId,
    stripePriceId: priceId ?? "",
    status,
    currentPeriodStart,
    currentPeriodEnd,
    cancelAtPeriodEnd,
    cancelAt,
    rawSubscription: subscription,
    updatedAt: Date.now(),
  };
  if (existingSub) {
    await ctx.db.patch(existingSub._id, subDoc);
  } else {
    await ctx.db.insert("stripe_subscriptions", subDoc);
  }

  // Now (re)write the entitlement for this Stripe subscription.
  if (!priceId) return { mirrored: true };
  const tier = tierForPriceId(priceId);
  if (!tier) return { mirrored: true, ignored: "unknown price id" };

  const internalStatus = normalizeStripeStatus(status as any);
  const existingEnt = await ctx.db
    .query("entitlements")
    .withIndex("by_external_ref", (q: any) =>
      q.eq("source", "stripe").eq("externalRef", subscriptionId),
    )
    .first();
  const entDoc = {
    userId: user._id,
    tier,
    source: "stripe" as const,
    externalRef: subscriptionId,
    productId: priceId,
    status: internalStatus,
    currentPeriodEnd,
    cancelAtPeriodEnd,
    updatedAt: Date.now(),
  };
  if (existingEnt) {
    await ctx.db.patch(existingEnt._id, entDoc);
  } else {
    await ctx.db.insert("entitlements", entDoc);
  }

  return { updated: true, tier, status: internalStatus };
}