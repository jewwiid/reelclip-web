// HTTP routes for the v0 web-payments + iOS-verification flow.
//
// Routes registered:
//   POST /iap/verify          iOS app posts signed transaction JWS
//   POST /stripe/checkout     web frontend requests a Checkout session URL
//   POST /stripe/webhook      Stripe → Convex entitlement updates
//   GET  /get-entitlements    resolve current tier for an iOS appAccountToken
//                             or a web email
//   POST /stripe/portal       create a Stripe Billing Portal session
//   POST /feedback/submit     iOS Settings → in-app feedback (anonymous)
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
// /feedback/submit
//
// iOS ReelClip Settings → Send feedback → Convex route. See
// docs/feedback-delivery.md for the contract and the threat model.
// Validation here is intentionally tight: only the three app categories
// are accepted, message is 4-4000 chars, optional replyEmail is checked
// against a simple RFC-flavoured regex, and diagnostics is shaped so we
// cannot accidentally accept wider fields the client may start sending.
// Edge rate limiting (e.g. Cloudflare) sits in front of this route
// before the production public endpoint is exposed.
// ─────────────────────────────────────────────────────────────────────────

const feedbackSubmit = httpAction(async (ctx, request) => {
  if (request.method !== "POST") return methodNotAllowed();
  let body: any;
  try {
    body = await request.json();
  } catch {
    return badRequest("Body must be JSON");
  }

  // category
  const category = String(body.category ?? "");
  if (category !== "bug" && category !== "featureRequest" && category !== "general") {
    return badRequest("category must be bug|featureRequest|general");
  }

  // message
  const message = String(body.message ?? "").trim();
  if (message.length < 4 || message.length > 4000) {
    return badRequest("message must be 4-4000 characters");
  }

  // replyEmail (optional, only set if non-empty and shaped like an email)
  let replyEmail: string | undefined;
  if (typeof body.replyEmail === "string" && body.replyEmail.trim() !== "") {
    const candidate = body.replyEmail.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(candidate)) {
      return badRequest("replyEmail must be a valid email address");
    }
    replyEmail = candidate;
  }

  // diagnostics (optional, only the four whitelisted fields are accepted)
  let diagnostics:
    | { appVersion: string; build: string; systemVersion: string; deviceModel: string }
    | undefined;
  if (body.diagnostics && typeof body.diagnostics === "object") {
    const d = body.diagnostics;
    const isString = (v: unknown) => typeof v === "string";
    if (isString(d.appVersion) && isString(d.build) && isString(d.systemVersion) && isString(d.deviceModel)) {
      diagnostics = {
        appVersion: d.appVersion as string,
        build: d.build as string,
        systemVersion: d.systemVersion as string,
        deviceModel: d.deviceModel as string,
      };
    }
  }

  const result = await ctx.runMutation(internal.feedback.recordFeedback, {
    category: category as "bug" | "featureRequest" | "general",
    message,
    replyEmail,
    diagnostics,
  });

  return jsonResponse({ ok: true, id: result.id }, 200);
});
http.route({ path: "/feedback/submit", method: "POST", handler: feedbackSubmit });

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