// Internal mutations backing the iOS ReelClip in-app feedback flow.
//
// The iOS client POSTs JSON to /feedback/submit (defined in http.ts).
// That route validates the body and calls `recordFeedback` here to
// insert a row. We deliberately do not run an extra Convex-level
// per-IP rate limiter inside this mutation because the doc
// (docs/feedback-delivery.md) calls for an edge rate limiter
// (Cloudflare) in front of the public endpoint; the Convex function
// is intentionally minimal so the edge can drop abuse before it
// reaches us.
//
// No admin keys, deployment keys, or user identifiers are read here
// on purpose — the feedback table is opt-in and anonymous.

import { internalMutation } from "./_generated/server";
import { v } from "convex/values";

export const recordFeedback = internalMutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("feedback", {
      category: args.category,
      message: args.message,
      replyEmail: args.replyEmail,
      diagnostics: args.diagnostics,
      createdAt: Date.now(),
    });
    return { id };
  },
});
