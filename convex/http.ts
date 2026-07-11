// HTTP routes for the v0 web-payments + iOS-verification flow.
//
// Routes registered:
//   POST /iap/verify          iOS app posts signed transaction JWS
//   POST /stripe/checkout     web frontend requests a Checkout session URL
//   POST /stripe/webhook      Stripe → Convex entitlement updates
//   GET  /get-entitlements    resolve current tier for an iOS appAccountToken
//                             or a web email
//   POST /stripe/portal       create a Stripe Billing Portal session
//
// Pure-Convex HTTP routes delegate to internal actions (iapActions /
// stripeActions) for the Node-runtime heavy lifting (JWT signing, Stripe
// SDK, webhook signature verification).

import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";

const http = httpRouter();

// ─────────────────────────────────────────────────────────────────────────
// /iap/verify
// ─────────────────────────────────────────────────────────────────────────

const iapVerify = httpAction(async (ctx, request) => {
  if (request.method !== "POST") return methodNotAllowed();
  let body: any;
  try {
    body = await request.json();
  } catch {
    return badRequest("Body must be JSON");
  }
  const signedTransactionJWS = String(body.signedTransactionJWS ?? "");
  const appAccountToken = String(body.appAccountToken ?? "");
  if (!signedTransactionJWS || !appAccountToken) {
    return badRequest("signedTransactionJWS and appAccountToken are required");
  }
  const customerEmail: string | undefined =
    typeof body.customerEmail === "string" ? body.customerEmail : undefined;

  let result;
  try {
    result = await ctx.runAction(internal.iapActions.verifyTransaction, {
      signedTransactionJWS,
      appAccountToken,
      customerEmail,
    });
  } catch (err: any) {
    // runAction itself threw (rare) — surface as a 500 with the message so
    // the iOS app can debug rather than seeing a Cloudflare "error code: 502".
    return jsonResponse(
      { ok: false, error: `action threw: ${err?.message ?? String(err)}` },
      500,
    );
  }
  if (!result.ok) {
    // Always return 400 for caller-fixable errors; the message itself tells
    // the caller what went wrong. The action's `status` field was unused
    // and was being collapsed by Cloudflare into a generic 502.
    return jsonResponse({ ok: false, error: result.error }, 400);
  }
  const success = result as { ok: true; userId: string; tier: "creator" | "studio" };
  return jsonResponse({ ok: true, userId: success.userId, tier: success.tier }, 200);
});
http.route({ path: "/iap/verify", method: "POST", handler: iapVerify });

// ─────────────────────────────────────────────────────────────────────────
// /stripe/checkout
// ─────────────────────────────────────────────────────────────────────────

const stripeCheckout = httpAction(async (ctx, request) => {
  if (request.method !== "POST") return methodNotAllowed();
  let body: any;
  try {
    body = await request.json();
  } catch {
    return badRequest("Body must be JSON");
  }
  const tier = body.tier;
  const interval = body.interval;
  if (tier !== "creator" && tier !== "studio") return badRequest("tier must be creator");
  // "studio" is still accepted (and coerced to "creator") for back-compat
  // with any pre-v2.0 cached callers; the new tier model is Creator-only.
  const normalizedTier = tier === "studio" ? "creator" : "creator";
  if (interval !== "week" && interval !== "month" && interval !== "year" && interval !== "lifetime") return badRequest("interval must be week|month|year|lifetime");

  const baseUrl = process.env.PUBLIC_BASE_URL ?? new URL(request.url).origin;

  try {
    const result = await ctx.runAction(internal.stripeActions.createStripeCheckout, {
      tier: normalizedTier,
      interval,
      customerEmail: typeof body.customerEmail === "string" ? body.customerEmail : undefined,
      appAccountToken: typeof body.appAccountToken === "string" ? body.appAccountToken : undefined,
      successUrl: `${baseUrl}/account?checkout=success`,
      cancelUrl: `${baseUrl}/pricing?checkout=cancelled`,
    });
    return jsonResponse({ ok: true, url: result.url, sessionId: result.sessionId }, 200);
  } catch (err: any) {
    return jsonResponse(
      { ok: false, error: `Stripe Checkout failed: ${err.message ?? err}` },
      502,
    );
  }
});
http.route({ path: "/stripe/checkout", method: "POST", handler: stripeCheckout });

// ─────────────────────────────────────────────────────────────────────────
// /stripe/webhook
// ─────────────────────────────────────────────────────────────────────────

const stripeWebhook = httpAction(async (ctx, request) => {
  if (request.method !== "POST") return methodNotAllowed();
  const signature = request.headers.get("stripe-signature");
  if (!signature) return badRequest("missing stripe-signature header");
  const rawBody = await request.text();
  const result = await ctx.runAction(
    internal.stripeActions.verifyAndDispatchStripeWebhook,
    { rawBody, signature },
  );
  if (!result.ok) {
    return jsonResponse({ ok: false, error: (result as any).error }, 400);
  }
  return jsonResponse({ ok: true, received: (result as any).received }, 200);
});
http.route({ path: "/stripe/webhook", method: "POST", handler: stripeWebhook });

// ─────────────────────────────────────────────────────────────────────────
// /get-entitlements
// ─────────────────────────────────────────────────────────────────────────

const getEntitlements = httpAction(async (ctx, request) => {
  if (request.method !== "GET") return methodNotAllowed();
  const url = new URL(request.url);
  const appAccountToken = url.searchParams.get("appAccountToken") ?? undefined;
  const email = url.searchParams.get("email") ?? undefined;
  if (!appAccountToken && !email) return badRequest("provide appAccountToken or email");
  const result = await ctx.runQuery(internal.iapMutations.resolveEntitlementsForLookup, {
    appAccountToken,
    email,
  });
  return jsonResponse(result, 200);
});
http.route({ path: "/get-entitlements", method: "GET", handler: getEntitlements });

// ─────────────────────────────────────────────────────────────────────────
// /stripe/portal
// ─────────────────────────────────────────────────────────────────────────

const stripePortal = httpAction(async (ctx, request) => {
  if (request.method !== "POST") return methodNotAllowed();
  let body: any;
  try {
    body = await request.json();
  } catch {
    return badRequest("Body must be JSON");
  }
  const stripeCustomerId = String(body.stripeCustomerId ?? "");
  if (!stripeCustomerId) return badRequest("stripeCustomerId required");
  const baseUrl = process.env.PUBLIC_BASE_URL ?? new URL(request.url).origin;
  try {
    const result = await ctx.runAction(internal.stripeActions.createStripePortal, {
      stripeCustomerId,
      returnUrl: `${baseUrl}/account`,
    });
    return jsonResponse({ ok: true, url: result.url }, 200);
  } catch (err: any) {
    return jsonResponse(
      { ok: false, error: `Stripe portal failed: ${err.message ?? err}` },
      502,
    );
  }
});
http.route({ path: "/stripe/portal", method: "POST", handler: stripePortal });

// ─────────────────────────────────────────────────────────────────────────
// helpers
// ─────────────────────────────────────────────────────────────────────────

function jsonResponse(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
function badRequest(message: string) {
  return jsonResponse({ ok: false, error: message }, 400);
}
function methodNotAllowed() {
  return jsonResponse({ ok: false, error: "method not allowed" }, 405);
}

export default http;