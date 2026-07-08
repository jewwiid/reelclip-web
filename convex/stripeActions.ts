// Node-runtime internal actions for Stripe operations (Checkout sessions,
// webhook verification, billing portal). Wraps the Stripe SDK so http.ts
// (pure Convex) can call them via runAction.

"use node";

import { v } from "convex/values";
import { internalAction } from "./_generated/server";
import { internal } from "./_generated/api";
import {
  createCheckoutSession,
  getStripe,
  verifyWebhook,
} from "./stripe";

export const createStripeCheckout = internalAction({
  args: {
    tier: v.union(v.literal("creator"), v.literal("studio")),
    interval: v.union(v.literal("month"), v.literal("year")),
    customerEmail: v.optional(v.string()),
    appAccountToken: v.optional(v.string()),
    successUrl: v.string(),
    cancelUrl: v.string(),
  },
  handler: async (_ctx, args) => {
    const session = await createCheckoutSession({
      tier: args.tier,
      interval: args.interval,
      customerEmail: args.customerEmail,
      appAccountToken: args.appAccountToken,
      successUrl: args.successUrl,
      cancelUrl: args.cancelUrl,
    });
    return { url: session.url, sessionId: session.sessionId };
  },
});

export const verifyAndDispatchStripeWebhook = internalAction({
  args: {
    rawBody: v.string(),
    signature: v.string(),
  },
  handler: async (ctx, args) => {
    let event;
    try {
      event = await verifyWebhook(args.rawBody, args.signature);
    } catch (err: any) {
      return { ok: false as const, error: `Webhook verify failed: ${err.message ?? err}` };
    }
    await ctx.runMutation(internal.stripeMutations.handleStripeEvent, { event });
    return { ok: true as const, received: event.id };
  },
});

export const createStripePortal = internalAction({
  args: {
    stripeCustomerId: v.string(),
    returnUrl: v.string(),
  },
  handler: async (_ctx, args) => {
    const portal = await getStripe().billingPortal.sessions.create({
      customer: args.stripeCustomerId,
      return_url: args.returnUrl,
    });
    return { url: portal.url };
  },
});