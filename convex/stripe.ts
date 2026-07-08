// Stripe client + Checkout-session + webhook helpers. Requires Node runtime.
"use node";

import Stripe from "stripe";

const PROD_BASE = "https://api.storekit.apple.com/inApps/v1";
const SANDBOX_BASE = "https://api.storekit-sandbox.apple.com/inApps/v1";

let cached: Stripe | null = null;
export function getStripe(): Stripe {
  if (cached) return cached;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not set.");
  }
  cached = new Stripe(key, {
    // Pin a stable API version so behavior is deterministic across Stripe
    // dashboard changes. Bump intentionally when ready to migrate.
    apiVersion: "2024-09-30.acacia" as any,
    typescript: true,
  });
  return cached;
}

export interface PriceIds {
  creatorMonthly: string;
  creatorYearly: string;
  studioMonthly: string;
  studioYearly: string;
}

export function getPriceIds(): PriceIds {
  return {
    creatorMonthly: required("STRIPE_PRICE_CREATOR_MONTHLY"),
    creatorYearly: required("STRIPE_PRICE_CREATOR_YEARLY"),
    studioMonthly: required("STRIPE_PRICE_STUDIO_MONTHLY"),
    studioYearly: required("STRIPE_PRICE_STUDIO_YEARLY"),
  };
}

function required(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`${name} is not set.`);
  return v;
}

export type Tier = "creator" | "studio";

/// Map a Stripe price id to a ReelClip tier.
export function tierForPriceId(priceId: string): Tier | null {
  const ids = getPriceIds();
  if (priceId === ids.creatorMonthly || priceId === ids.creatorYearly) return "creator";
  if (priceId === ids.studioMonthly || priceId === ids.studioYearly) return "studio";
  return null;
}

/// Map a Stripe subscription status to our internal vocabulary.
export function normalizeStripeStatus(
  status: Stripe.Subscription.Status,
): "active" | "past_due" | "cancelled" | "expired" | "billing_retry" {
  switch (status) {
    case "active":
    case "trialing":
      return "active";
    case "past_due":
    case "unpaid":
      return "billing_retry";
    case "canceled":
    case "incomplete_expired":
      return "cancelled";
    case "incomplete":
      return "billing_retry";
    case "paused":
      return "past_due";
    default:
      return "expired";
  }
}

export interface CheckoutInput {
  tier: Tier;
  interval: "month" | "year";
  customerEmail?: string;
  appAccountToken?: string;
  successUrl: string;
  cancelUrl: string;
}

export interface CheckoutResult {
  url: string;
  sessionId: string;
}

/// Create a Stripe Checkout session for the given tier + interval.
export async function createCheckoutSession(
  input: CheckoutInput,
): Promise<CheckoutResult> {
  const stripe = getStripe();
  const ids = getPriceIds();
  const priceId =
    input.interval === "year"
      ? input.tier === "creator" ? ids.creatorYearly : ids.studioYearly
      : input.tier === "creator" ? ids.creatorMonthly : ids.studioMonthly;

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    customer_email: input.customerEmail,
    success_url: input.successUrl,
    cancel_url: input.cancelUrl,
    metadata: {
      tier: input.tier,
      appAccountToken: input.appAccountToken ?? "",
    },
    subscription_data: {
      metadata: {
        tier: input.tier,
        appAccountToken: input.appAccountToken ?? "",
      },
    },
    allow_promotion_codes: true,
  });

  if (!session.url) {
    throw new Error("Stripe Checkout session has no URL");
  }
  return { url: session.url, sessionId: session.id };
}

/// Verify a Stripe webhook payload against the configured webhook secret.
export async function verifyWebhook(
  rawBody: string,
  signatureHeader: string,
): Promise<Stripe.Event> {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) throw new Error("STRIPE_WEBHOOK_SECRET is not set.");
  const stripe = getStripe();
  return stripe.webhooks.constructEvent(rawBody, signatureHeader, secret);
}