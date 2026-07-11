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
  creatorWeekly: string;
  creatorMonthly: string;
  creatorYearly: string;
  creatorLifetime: string;
}

export function getPriceIds(): PriceIds {
  return {
    creatorWeekly: required("STRIPE_PRICE_CREATOR_WEEKLY"),
    creatorMonthly: required("STRIPE_PRICE_CREATOR_MONTHLY"),
    creatorYearly: required("STRIPE_PRICE_CREATOR_YEARLY"),
    creatorLifetime: required("STRIPE_PRICE_CREATOR_LIFETIME"),
  };
}

function required(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`${name} is not set.`);
  return v;
}

export type Tier = "creator";

/// Map a Stripe price id to a ReelClip tier. Returns `null` for
/// unknown price ids (e.g. legacy Studio Stripe price ids from
/// before the v2.0 tier consolidation — those should be ignored at
/// checkout time but existing rows in the DB still resolve to
/// "creator" via the `studio` → `creator` migration in
/// `iapMutations.applyVerifiedTransaction`).
export function tierForPriceId(priceId: string): Tier | null {
  const ids = getPriceIds();
  if (
    priceId === ids.creatorWeekly ||
    priceId === ids.creatorMonthly ||
    priceId === ids.creatorYearly ||
    priceId === ids.creatorLifetime
  ) {
    return "creator";
  }
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

export type BillingInterval = "week" | "month" | "year" | "lifetime";

export interface CheckoutInput {
  tier: Tier;
  interval: BillingInterval;
  customerEmail?: string;
  appAccountToken?: string;
  successUrl: string;
  cancelUrl: string;
}

export interface CheckoutResult {
  url: string;
  sessionId: string;
}

/// Map a (tier, interval) pair to the Stripe price id. Lifetime
/// uses `mode: 'payment'` so the session charges once and never
/// auto-renews — surfaced as a single line item in the checkout
/// instead of a subscription. The other three are recurring
/// subscriptions. Only Creator prices exist post v2.0.
function priceIdFor(_tier: Tier, interval: BillingInterval): string {
  const ids = getPriceIds();
  switch (interval) {
    case "week":     return ids.creatorWeekly;
    case "month":    return ids.creatorMonthly;
    case "year":     return ids.creatorYearly;
    case "lifetime": return ids.creatorLifetime;
  }
}

/// Create a Stripe Checkout session for the given tier + interval.
export async function createCheckoutSession(
  input: CheckoutInput,
): Promise<CheckoutResult> {
  const stripe = getStripe();
  const priceId = priceIdFor(input.tier, input.interval);
  const isLifetime = input.interval === "lifetime";

  // Lifetime is a one-time payment — we set mode: 'payment' instead
  // of 'subscription'. The webhook handler distinguishes by
  // `mode === 'payment'` and writes a `lifetime_holder` row so the
  // iOS app's `SubscriptionStore.tier` reflects the unlocked tier
  // without a recurring subscription.
  const session = await stripe.checkout.sessions.create({
    mode: isLifetime ? "payment" : "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    customer_email: input.customerEmail,
    success_url: input.successUrl,
    cancel_url: input.cancelUrl,
    payment_intent_data: isLifetime
      ? {
          metadata: {
            tier: input.tier,
            interval: "lifetime",
            appAccountToken: input.appAccountToken ?? "",
          },
        }
      : undefined,
    metadata: {
      tier: input.tier,
      interval: input.interval,
      appAccountToken: input.appAccountToken ?? "",
    },
    subscription_data: isLifetime
      ? undefined
      : {
          metadata: {
            tier: input.tier,
            interval: input.interval,
            appAccountToken: input.appAccountToken ?? "",
          },
        },
    allow_promotion_codes: !isLifetime,
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