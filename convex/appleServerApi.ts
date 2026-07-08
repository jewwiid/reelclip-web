// Helpers for talking to Apple's App Store Server API. Requires Node runtime.
"use node";

import * as jose from "jose";
import { createPrivateKey } from "node:crypto";

const ISSUER_ID = process.env.APP_STORE_ISSUER_ID ?? "";
const KEY_ID = process.env.APP_STORE_KEY_ID ?? "";
const KEY_PEM = process.env.APP_STORE_SERVER_API_KEY_PEM ?? "";

const PROD_BASE = "https://api.storekit.apple.com/inApps/v1";
const SANDBOX_BASE = "https://api.storekit-sandbox.apple.com/inApps/v1";

let cachedKey: jose.CryptoKey | null = null;
async function getSigningKey(): Promise<jose.CryptoKey> {
  if (cachedKey) return cachedKey;
  if (!KEY_PEM) {
    throw new Error(
      "APP_STORE_SERVER_API_KEY_PEM is not set. Run `npx convex env set APP_STORE_SERVER_API_KEY_PEM \"$(cat ~/.appstoreconnect/private_keys/SubscriptionKey_64Z9467A84.p8)\"`.",
    );
  }
  const nodeKey = createPrivateKey(KEY_PEM);
  const pem = nodeKey.export({ format: "pem", type: "pkcs8" });
  cachedKey = await jose.importPKCS8(pem as string, "ES256");
  return cachedKey;
}

async function makeToken(): Promise<string> {
  if (!ISSUER_ID || !KEY_ID) {
    throw new Error(
      "APP_STORE_ISSUER_ID or APP_STORE_KEY_ID is not set. Run `npx convex env set` for both.",
    );
  }
  const key = await getSigningKey();
  return await new jose.SignJWT({})
    .setProtectedHeader({ alg: "ES256", kid: KEY_ID, typ: "JWT" })
    .setIssuer(ISSUER_ID)
    .setAudience("appstoreconnect-v1")
    .setIssuedAt()
    .setExpirationTime("5m")
    .sign(key);
}

export interface AppleTransaction {
  transactionId: string;
  originalTransactionId: string;
  productId: string;
  expiresDate?: number; // ms epoch
  status: "active" | "expired" | "revoked" | "billing_retry";
  environment: "sandbox" | "production";
  raw: unknown;
}

/// Call Apple's getTransactionInfo endpoint for a transaction id.
/// Returns normalized AppleTransaction on success.
export async function getTransactionInfo(
  transactionId: string,
  environment: "sandbox" | "production",
): Promise<AppleTransaction> {
  const base = environment === "sandbox" ? SANDBOX_BASE : PROD_BASE;
  const token = await makeToken();
  const resp = await fetch(`${base}/transactions/${transactionId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!resp.ok) {
    const body = await resp.text();
    throw new Error(
      `Apple getTransactionInfo ${resp.status}: ${body.slice(0, 256)}`,
    );
  }
  const data = await resp.json();
  return normalizeTransaction(data);
}

/// Decode the JWS the iOS app posts (signedTransactionJWS) and extract the
/// transaction id + environment hint. We don't trust the decoded payload —
/// the canonical truth is what Apple's getTransactionInfo endpoint returns.
export async function decodeJWSForHints(
  signedTransactionJWS: string,
): Promise<{ transactionId: string; environment: "sandbox" | "production" }> {
  const decoded = jose.decodeJwt(signedTransactionJWS) as Record<string, any>;
  const transactionId = String(decoded.transactionId ?? "");
  const environment = decoded.environment === "Production" ? "production" : "sandbox";
  if (!transactionId) {
    throw new Error("JWS payload missing transactionId");
  }
  return { transactionId, environment };
}

function normalizeTransaction(data: any): AppleTransaction {
  const expiresDate = data.expiresDate ? Number(data.expiresDate) : undefined;
  const isRevoked = !!data.revocationDate;
  const status: AppleTransaction["status"] = isRevoked
    ? "revoked"
    : expiresDate && expiresDate < Date.now()
      ? "expired"
      : data.inAppOwnershipType === "PURCHASED"
        ? "active"
        : "billing_retry";

  return {
    transactionId: String(data.transactionId),
    originalTransactionId: String(data.originalTransactionId),
    productId: String(data.productId),
    expiresDate,
    status,
    environment: data.environment === "Production" ? "production" : "sandbox",
    raw: data,
  };
}

/// Map a product id to a ReelClip tier. Mirrors the iOS SubscriptionStore.
export function tierForProduct(productId: string): "creator" | "studio" | null {
  if (productId.startsWith("rc.creator.")) return "creator";
  if (productId.startsWith("rc.studio.")) return "studio";
  return null;
}