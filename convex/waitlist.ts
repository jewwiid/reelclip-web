import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const join = mutation({
  args: {
    email: v.string(),
    role: v.optional(v.string()),
    source: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const email = args.email.trim().toLowerCase();

    if (!email || !email.includes("@") || email.length > 254) {
      throw new Error("Please enter a valid email address.");
    }

    const existing = await ctx.db
      .query("waitlist")
      .withIndex("by_email", (q) => q.eq("email", email))
      .first();

    if (existing) {
      return { alreadyOnList: true };
    }

    await ctx.db.insert("waitlist", {
      email,
      role: args.role?.trim() || undefined,
      source: args.source,
      createdAt: Date.now(),
    });

    return { alreadyOnList: false };
  },
});

export const count = query({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db.query("waitlist").collect();
    return all.length;
  },
});