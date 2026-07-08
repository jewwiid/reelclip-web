"use client";

import { useState } from "react";

const SITE_URL =
  typeof window !== "undefined" ? window.location.origin : "";

const tiers = [
  {
    id: "creator-monthly" as const,
    name: "Creator",
    tier: "creator" as const,
    interval: "month" as const,
    price: "$9.99 / mo",
    blurb: "For solo creators shipping a few cuts a week.",
    perks: [
      "AI Assist cuts powered by Apple Intelligence (on-device)",
      "720p capped exports (no watermark)",
      "Unlimited projects on-device",
    ],
  },
  {
    id: "creator-yearly" as const,
    name: "Creator · Annual",
    tier: "creator" as const,
    interval: "year" as const,
    price: "$59.99 / yr",
    blurb: "Same as monthly, two months free.",
    perks: [
      "Everything in Creator monthly",
      "Save 50% vs paying monthly",
    ],
  },
  {
    id: "studio-monthly" as const,
    name: "Studio",
    tier: "studio" as const,
    interval: "month" as const,
    price: "$19.99 / mo",
    blurb: "For agencies shipping many cuts a day.",
    perks: [
      "Everything in Creator",
      "Up to 30-minute source videos",
      "Native-resolution exports (no watermark)",
      "Priority support",
    ],
  },
  {
    id: "studio-yearly" as const,
    name: "Studio · Annual",
    tier: "studio" as const,
    interval: "year" as const,
    price: "$119.99 / yr",
    blurb: "Same as monthly, two months free.",
    perks: [
      "Everything in Studio monthly",
      "Save 50% vs paying monthly",
    ],
  },
];

export function PricingClient() {
  const [email, setEmail] = useState("");
  const [appAccountToken, setAppAccountToken] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function startCheckout(tier: (typeof tiers)[number]) {
    setBusyId(tier.id);
    setError(null);
    try {
      // Persist email in localStorage so /account can read it after the
      // Stripe redirect lands.
      if (email) localStorage.setItem("reelclip.email", email);
      if (appAccountToken) localStorage.setItem("reelclip.appAccountToken", appAccountToken);

      const res = await fetch(`${process.env.NEXT_PUBLIC_CONVEX_SITE_URL}/stripe/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tier: tier.tier,
          interval: tier.interval,
          customerEmail: email || undefined,
          appAccountToken: appAccountToken || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? `Checkout failed (HTTP ${res.status})`);
      }
      window.location.href = data.url;
    } catch (err: any) {
      setError(err.message ?? String(err));
      setBusyId(null);
    }
  }

  return (
    <div className="space-y-10">
      <div className="rounded-2xl border border-hairline bg-control-surface p-6 sm:p-8">
        <h2 className="text-lg font-bold tracking-tight">Your details</h2>
        <p className="text-sm text-text-muted mt-1">
          We send your receipt here and use this email to identify your account on the web side.
          If you've already bought a ReelClip sub on iOS, paste your app account token so we can
          link both subscriptions to one account.
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
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setAppAccountToken(e.target.value)}
              placeholder="00000000-0000-0000-0000-000000000000"
              className="w-full px-3.5 py-2.5 rounded-lg bg-bg border border-hairline text-text placeholder:text-text-muted focus:outline-none focus:border-accent transition font-mono text-xs"
            />
          </label>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {tiers.map((t) => {
          const isStudio = t.tier === "studio";
          return (
            <div
              key={t.id}
              className={
                "rounded-2xl border bg-control-surface p-6 sm:p-7 flex flex-col " +
                (isStudio
                  ? "border-accent/40 shadow-[0_0_0_1px_rgba(196,255,53,0.15)]"
                  : "border-hairline")
              }
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold tracking-tight">{t.name}</h3>
                {isStudio ? (
                  <span className="text-[10px] uppercase tracking-wider font-bold bg-accent text-bg px-2 py-0.5 rounded-full">
                    Best for pros
                  </span>
                ) : null}
              </div>
              <p className="text-sm text-text-muted mt-1.5">{t.blurb}</p>
              <div className="mt-5 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold tracking-tight">{t.price}</span>
              </div>
              <ul className="mt-5 space-y-2 text-sm text-text-muted flex-1">
                {t.perks.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => startCheckout(t)}
                disabled={!email || busyId !== null}
                className="mt-6 w-full px-4 py-3 rounded-xl bg-accent text-bg font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-accent-deep transition"
              >
                {busyId === t.id ? "Opening Stripe…" : `Subscribe to ${t.name}`}
              </button>
            </div>
          );
        })}
      </div>

      {error ? (
        <div className="rounded-xl border border-danger/40 bg-danger/10 p-4 text-sm text-danger">
          {error}
        </div>
      ) : null}

      <p className="text-xs text-text-muted text-center max-w-md mx-auto">
        Payments are processed by Stripe. You can cancel or change plans anytime from your{" "}
        <a href="/account" className="underline hover:text-text">account page</a>. Subscriptions
        renew automatically until cancelled.
      </p>
    </div>
  );
}