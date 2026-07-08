"use client";

import { useEffect, useState } from "react";

interface EntitlementSummary {
  source: "stripe" | "app_store" | "promo";
  productId: string;
  status: string;
  currentPeriodEnd: number;
  cancelAtPeriodEnd: boolean;
}

interface LookupResult {
  tier: "free" | "creator" | "studio";
  userId: string | null;
  stripeCustomerId: string | null;
  entitlements: EntitlementSummary[];
}

export function AccountClient() {
  const [email, setEmail] = useState<string>("");
  const [appAccountToken, setAppAccountToken] = useState<string>("");
  const [result, setResult] = useState<LookupResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [portalBusy, setPortalBusy] = useState(false);

  // Restore saved email + token from localStorage on mount.
  useEffect(() => {
    const savedEmail = localStorage.getItem("reelclip.email");
    const savedToken = localStorage.getItem("reelclip.appAccountToken");
    if (savedEmail) setEmail(savedEmail);
    if (savedToken) setAppAccountToken(savedToken);
  }, []);

  async function lookup() {
    if (!email && !appAccountToken) {
      setError("Provide an email or app account token.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (email) params.set("email", email);
      if (appAccountToken) params.set("appAccountToken", appAccountToken);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_CONVEX_SITE_URL}/get-entitlements?${params.toString()}`,
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? `Lookup failed (HTTP ${res.status})`);
      setResult(data as LookupResult);
    } catch (err: any) {
      setError(err.message ?? String(err));
      setResult(null);
    } finally {
      setLoading(false);
    }
  }

  async function openPortal() {
    if (!result?.stripeCustomerId) {
      setError("No Stripe customer linked. Subscribe first to manage via Stripe.");
      return;
    }
    setPortalBusy(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_CONVEX_SITE_URL}/stripe/portal`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stripeCustomerId: result.stripeCustomerId }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? `Portal failed (HTTP ${res.status})`);
      }
      window.location.href = data.url;
    } catch (err: any) {
      setError(err.message ?? String(err));
      setPortalBusy(false);
    }
  }

  const tierLabel = (t: string) =>
    t === "studio" ? "Studio" : t === "creator" ? "Creator" : "Free";

  const tierColor = (t: string) =>
    t === "studio"
      ? "bg-accent text-bg"
      : t === "creator"
        ? "bg-accent/20 text-accent"
        : "bg-hairline text-text-muted";

  const formatDate = (ms: number) => {
    if (!ms || !Number.isFinite(ms)) return "—";
    try {
      return new Date(ms).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "—";
    }
  };

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-hairline bg-control-surface p-6 sm:p-8">
        <h2 className="text-lg font-bold tracking-tight">Look up your account</h2>
        <p className="text-sm text-text-muted mt-1">
          Same email or app account token you used when subscribing.
        </p>
        <div className="mt-5 grid sm:grid-cols-2 gap-4">
          <label className="block">
            <span className="block text-xs uppercase tracking-wide text-text-muted mb-1.5">
              Email
            </span>
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                localStorage.setItem("reelclip.email", e.target.value);
              }}
              placeholder="you@example.com"
              className="w-full px-3.5 py-2.5 rounded-lg bg-bg border border-hairline text-text placeholder:text-text-muted focus:outline-none focus:border-accent transition"
            />
          </label>
          <label className="block">
            <span className="block text-xs uppercase tracking-wide text-text-muted mb-1.5">
              iOS app account token <span className="text-text-muted/60">(optional)</span>
            </span>
            <input
              type="text"
              value={appAccountToken}
              onChange={(e) => {
                setAppAccountToken(e.target.value);
                localStorage.setItem("reelclip.appAccountToken", e.target.value);
              }}
              placeholder="00000000-0000-0000-0000-000000000000"
              className="w-full px-3.5 py-2.5 rounded-lg bg-bg border border-hairline text-text placeholder:text-text-muted focus:outline-none focus:border-accent transition font-mono text-xs"
            />
          </label>
        </div>
        <div className="mt-5 flex gap-3">
          <button
            type="button"
            onClick={lookup}
            disabled={loading}
            className="px-4 py-2.5 rounded-lg bg-accent text-bg font-bold disabled:opacity-40 hover:bg-accent-deep transition"
          >
            {loading ? "Looking up…" : "Look up"}
          </button>
          <a
            href="/pricing"
            className="px-4 py-2.5 rounded-lg border border-hairline text-text font-semibold hover:border-accent transition"
          >
            View pricing
          </a>
        </div>
      </div>

      {error ? (
        <div className="rounded-xl border border-danger/40 bg-danger/10 p-4 text-sm text-danger">
          {error}
        </div>
      ) : null}

      {result ? (
        <div className="rounded-2xl border border-hairline bg-control-surface p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="text-xs uppercase tracking-wider text-text-muted font-bold mb-2">
                Current tier
              </p>
              <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full ${tierColor(result.tier)}`}>
                {tierLabel(result.tier)}
              </span>
              {result.userId ? (
                <p className="text-xs text-text-muted mt-2 font-mono break-all">
                  id: {result.userId}
                </p>
              ) : null}
            </div>
            {result.stripeCustomerId ? (
              <button
                type="button"
                onClick={openPortal}
                disabled={portalBusy}
                className="px-4 py-2.5 rounded-lg border border-hairline text-text font-semibold hover:border-accent transition disabled:opacity-40"
              >
                {portalBusy ? "Opening Stripe…" : "Manage subscription"}
              </button>
            ) : null}
          </div>

          <div className="mt-6">
            <p className="text-xs uppercase tracking-wider text-text-muted font-bold mb-3">
              Active entitlements ({result.entitlements.length})
            </p>
            {result.entitlements.length === 0 ? (
              <p className="text-sm text-text-muted">
                No active entitlements. <a href="/pricing" className="underline hover:text-text">View pricing</a> to upgrade.
              </p>
            ) : (
              <ul className="space-y-3">
                {result.entitlements.map((e, i) => (
                  <li
                    key={`${e.source}-${e.productId}-${i}`}
                    className="flex items-start justify-between gap-3 text-sm border-t border-hairline pt-3"
                  >
                    <div>
                      <p className="font-semibold text-text">
                        {e.source === "stripe" ? "Stripe" : e.source === "app_store" ? "App Store" : "Promo"} ·{" "}
                        {e.productId}
                      </p>
                      <p className="text-xs text-text-muted mt-0.5">
                        Status: {e.status}
                        {e.cancelAtPeriodEnd ? " · cancels at period end" : ""}
                      </p>
                    </div>
                    <p className="text-xs text-text-muted whitespace-nowrap">
                      Renews {formatDate(e.currentPeriodEnd)}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}