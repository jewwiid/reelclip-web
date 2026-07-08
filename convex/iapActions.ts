// Node-runtime internal actions for IAP verification. Wraps the App Store
// Server API + Convex DB writes so http.ts (pure Convex) can call them via
// runAction.

"use node";

import { v } from "convex/values";
import { internalAction, internalMutation } from "./_generated/server";
import { internal } from "./_generated/api";
import {
  decodeJWSForHints,
  getTransactionInfo,
  tierForProduct,
} from "./appleServerApi";
import { upsertUser } from "./entitlements";

/// Verify a StoreKit 2 transaction JWS against Apple's getTransactionInfo
/// endpoint, upsert the user + entitlement + receipt row. Called by the
/// `/iap/verify` HTTP action via runAction.
export const verifyTransaction = internalAction({
  args: {
    signedTransactionJWS: v.string(),
    appAccountToken: v.string(),
    customerEmail: v.optional(v.string()),
  },
  handler: async (ctx, args): Promise<
    | { ok: true; status: number; userId: string; tier: "creator" | "studio" }
    | { ok: false; status: number; error: string }
  > => {
    try {
      let hints;
      try {
        hints = await decodeJWSForHints(args.signedTransactionJWS);
      } catch (err: any) {
        return { ok: false, status: 400, error: `Couldn't decode JWS: ${err.message ?? err}` };
      }

      let txn;
      try {
        txn = await getTransactionInfo(hints.transactionId, hints.environment);
      } catch (err: any) {
        return { ok: false, status: 502, error: `Apple verification failed: ${err.message ?? err}` };
      }

      const tier = tierForProduct(txn.productId);
      if (!tier) {
        return { ok: false, status: 400, error: `Unknown productId: ${txn.productId}` };
      }

      // Anti-fraud: iOS-supplied appAccountToken MUST match what Apple stored
      // on the receipt. Otherwise the iOS app is faking someone else's
      // transaction.
      const appleToken = (txn.raw as any)?.appAccountToken;
      if (appleToken && appleToken !== args.appAccountToken) {
        return { ok: false, status: 403, error: "appAccountToken mismatch with Apple record" };
      }

      const result: { userId: string; tier: "creator" | "studio" } = await ctx.runMutation(
        internal.iapMutations.applyVerifiedTransaction,
        {
          appAccountToken: args.appAccountToken,
          customerEmail: args.customerEmail,
          transaction: txn,
          signedTransactionJWS: args.signedTransactionJWS,
          tier,
        },
      );
      return { ok: true, status: 200, ...result };
    } catch (err: any) {
      // Catch-all so any unhandled error in the verification chain returns
      // a structured failure instead of bubbling up as a 502 from Convex.
      console.error("[verifyTransaction] unexpected error:", err);
      return {
        ok: false,
        status: 500,
        error: `Unexpected: ${err?.message ?? String(err)}`,
      };
    }
  },
});