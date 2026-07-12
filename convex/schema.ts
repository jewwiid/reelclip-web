import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Existing — landing-page waitlist capture.
  waitlist: defineTable({
    email: v.string(),
    role: v.optional(v.string()),
    source: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_email", ["email"])
    .index("by_createdAt", ["createdAt"]),

  // -- Payment / entitlement layer (added for v0 web-payments push) --

  /// One row per human. iOS users are keyed by Apple's `appAccountToken`
  /// (stable per app-account); web users are keyed by their Stripe customer
  /// email. Both paths land in the same row so a customer can buy on either
  /// surface and Convex merges them.
  users: defineTable({
    email: v.optional(v.string()),
    name: v.optional(v.string()),
    // Apple-provided stable per-account token (UUID-ish). Used for IAP
    // receipts that don't include a Convex user yet.
    appAccountToken: v.optional(v.string()),
    // Stripe customer id once they've paid via web.
    stripeCustomerId: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_email", ["email"])
    .index("by_app_account_token", ["appAccountToken"])
    .index("by_stripe_customer", ["stripeCustomerId"]),

  /// Resolved current entitlement for a user. One row per user (the highest
  /// active entitlement wins; iOS verified transactions can extend Stripe-
  /// granted entitlements). Updated by Stripe webhooks and iOS /iap/verify.
  entitlements: defineTable({
    userId: v.id("users"),
    tier: v.union(v.literal("free"), v.literal("creator"), v.literal("studio")),
    source: v.union(
      v.literal("stripe"),
      v.literal("app_store"),
      v.literal("promo"),
    ),
    // Source-specific identifier: Stripe subscription id, App Store
    // originalTransactionId, or promo code.
    externalRef: v.string(),
    // Stripe price id, App Store product id, or promo code.
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
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_external_ref", ["source", "externalRef"]),

  /// Audit log of every App Store transaction Convex has verified against
  /// Apple's getTransactionInfo endpoint. Multiple rows per user over time
  /// (renewals, plan changes), but `entitlements.externalRef` always points
  /// to the latest `originalTransactionId` for the active entitlement.
  iap_receipts: defineTable({
    userId: v.optional(v.id("users")),
    appAccountToken: v.string(),
    productId: v.string(),
    transactionId: v.string(),
    originalTransactionId: v.string(),
    signedTransactionJWS: v.string(),
    environment: v.union(v.literal("sandbox"), v.literal("production")),
    status: v.union(
      v.literal("active"),
      v.literal("expired"),
      v.literal("revoked"),
      v.literal("billing_retry"),
    ),
    expiresAt: v.optional(v.number()),
    verifiedAt: v.number(),
    // Full Apple getTransactionInfo response, for support / debugging.
    rawVerification: v.any(),
  })
    .index("by_transaction", ["transactionId"])
    .index("by_original_transaction", ["originalTransactionId"])
    .index("by_app_account_token", ["appAccountToken"]),

  /// Stripe customer mirror — kept separate from `users` so we can update
  /// Stripe-side fields without rewriting the user row.
  stripe_customers: defineTable({
    userId: v.id("users"),
    stripeCustomerId: v.string(),
    email: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_stripe_customer_id", ["stripeCustomerId"]),

  /// Stripe subscription mirror. Updated by the Stripe webhook. The
  /// `stripe_subscriptions` row + the `entitlements` row together describe
  /// the customer's web-paid state.
  stripe_subscriptions: defineTable({
    userId: v.id("users"),
    stripeSubscriptionId: v.string(),
    stripeCustomerId: v.string(),
    stripePriceId: v.string(),
    status: v.string(), // Stripe's own status vocabulary
    currentPeriodStart: v.number(),
    currentPeriodEnd: v.number(),
    cancelAtPeriodEnd: v.boolean(),
    cancelAt: v.optional(v.number()),
    rawSubscription: v.any(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_stripe_subscription", ["stripeSubscriptionId"])
    .index("by_stripe_customer", ["stripeCustomerId"]),

  /// In-app feedback from the iOS ReelClip Settings sheet. No media, no
  /// project, no transcript, no analytics, no persistent user identifier —
  /// see docs/feedback-delivery.md. category is a triage tag, message is
  /// 4-4000 chars, replyEmail is optional and self-supplied, diagnostics
  /// (when included) is limited to app version + iOS version + device
  /// model.
  feedback: defineTable({
    category: v.union(
      v.literal("bug"),
      v.literal("featureRequest"),
      v.literal("general"),
    ),
    message: v.string(),
    replyEmail: v.optional(v.string()),
    diagnostics: v.optional(
      v.object({
        appVersion: v.string(),
        build: v.string(),
        systemVersion: v.string(),
        deviceModel: v.string(),
      }),
    ),
    createdAt: v.number(),
  })
    .index("by_category", ["category"])
    .index("by_createdAt", ["createdAt"]),
});