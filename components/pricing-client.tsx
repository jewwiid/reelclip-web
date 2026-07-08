"use client";

import { useState } from "react";

const SITE_URL =
  typeof window !== "undefined" ? window.location.origin : "";

const tiers = [
  {
    id: "creator-weekly" as const,
    name: "Creator · Weekly",
    tier: "creator" as const,
    interval: "week" as const,
    price: "$2.99 / wk",
    blurb: "Try the full Creator toolkit with no commitment.",
    perks: [
      "AI Assist cuts powered by Apple Intelligence (on-device)",
      "720p exports, no watermark",
      "15-minute source videos",
    ],
  },
  {
    id: "creator-monthly" as const,
    name: "Creator · Monthly",
    tier: "creator" as const,
    interval: "month" as const,
    price: "$9.99 / mo",
    blurb: "For solo creators shipping a few cuts a week.",
    perks: [
      "AI Assist cuts powered by Apple Intelligence (on-device)",
      "Native-resolution exports, no watermark",
      "15-minute source videos",
      "Multi-scene projects — add scenes, switch between them, batch-export",
    ],
  },
  {
    id: "creator-yearly" as const,
    name: "Creator · Annual",
    tier: "creator" as const,
    interval: "year" as const,
    price: "$59.99 / yr",
    blurb: "Best Creator value — save 50% vs paying monthly.",
    perks: [
      "Everything in Creator monthly",
      "Save 50% vs paying monthly",
    ],
  },
  {
    id: "creator-lifetime" as const,
    name: "Creator · Lifetime",
    tier: "creator" as const,
    interval: "lifetime" as const,
    price: "$149.99 one-time",
    blurb: "Pay once. Own Creator forever.",
    perks: [
      "Everything in Creator, no renewals",
      "One-time payment, lifetime access",
    ],
  },
  {
    id: "studio-weekly" as const,
    name: "Studio · Weekly",
    tier: "studio" as const,
    interval: "week" as const,
    price: "$4.99 / wk",
    blurb: "Studio features with a low-commitment trial.",
    perks: [
      "Everything in Creator, plus:",
      "Up to 30-minute source videos",
      "Priority renders (background queue)",
      "SRT/VTT subtitle export",
    ],
  },
  {
    id: "studio-monthly" as const,
    name: "Studio · Monthly",
    tier: "studio" as const,
    interval: "month" as const,
    price: "$19.99 / mo",
    blurb: "For agencies shipping many cuts a day.",
    perks: [
      "Everything in Creator, plus:",
      "Up to 30-minute source videos",
      "Priority renders (background queue)",
      "SRT/VTT subtitle export",
    ],
  },
  {
    id: "studio-yearly" as const,
    name: "Studio · Annual",
    tier: "studio" as const,
    interval: "year" as const,
    price: "$119.99 / yr",
    blurb: "Best Studio value — save 50% vs paying monthly.",
    perks: [
      "Everything in Studio monthly",
      "Save 50% vs paying monthly",
    ],
  },
  {
    id: "studio-lifetime" as const,
    name: "Studio · Lifetime",
    tier: "studio" as const,
    interval: "lifetime" as const,
    price: "$249.99 one-time",
    blurb: "Pay once. Own Studio forever.",
    perks: [
      "Everything in Studio, no renewals",
      "One-time payment, lifetime access",
    ],
  },
];

const cadenceLabel: Record<(typeof tiers)[number]["interval"], string> = {
  week: "Weekly",
  month: "Monthly",
  year: "Annual",
  lifetime: "Lifetime",
};

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

  // Group tiers by tier (creator / studio) for the visual layout.
  const creatorTiers = tiers.filter((t) => t.tier === "creator");
  const studioTiers = tiers.filter((t) => t.tier === "studio");

  return (
    <div className="space-y-12">
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

      {[
        { label: "Creator", items: creatorTiers, isStudio: false },
        { label: "Studio", items: studioTiers, isStudio: true },
      ].map((group) => (
        <section key={group.label} className="space-y-4">
          <div className="flex items-baseline justify-between">
            <h2 className="text-2xl font-black tracking-tight">
              {group.label} plans
            </h2>
            {group.isStudio ? (
              <span className="text-[10px] uppercase tracking-wider font-bold bg-accent text-bg px-2 py-0.5 rounded-full">
                Best for pros
              </span>
            ) : null}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {group.items.map((t) => {
              const isBestValue =
                t.interval === "year" || t.interval === "lifetime";
              return (
                <div
                  key={t.id}
                  className={
                    "rounded-2xl border bg-control-surface p-5 sm:p-6 flex flex-col " +
                    (isBestValue && group.isStudio
                      ? "border-accent/40 shadow-[0_0_0_1px_rgba(196,255,53,0.15)]"
                      : "border-hairline")
                  }
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-text-muted">
                      {cadenceLabel[t.interval]}
                    </span>
                    {t.interval === "year" ? (
                      <span className="text-[10px] uppercase tracking-wider font-bold bg-accent/20 text-accent px-1.5 py-0.5 rounded-full">
                        Save 50%
                      </span>
                    ) : t.interval === "lifetime" ? (
                      <span className="text-[10px] uppercase tracking-wider font-bold bg-accent/20 text-accent px-1.5 py-0.5 rounded-full">
                        Pay once
                      </span>
                    ) : null}
                  </div>
                  <p className="text-sm text-text-muted leading-snug min-h-[2.5em]">
                    {t.blurb}
                  </p>
                  <div className="mt-4 flex items-baseline gap-1.5">
                    <span className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                      {t.price}
                    </span>
                  </div>
                  <ul className="mt-4 space-y-1.5 text-xs text-text-muted flex-1">
                    {t.perks.map((p) => (
                      <li key={p} className="flex gap-1.5">
                        <span className="text-accent mt-0.5">•</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={() => startCheckout(t)}
                    disabled={!email || busyId !== null}
                    className="mt-5 w-full px-3 py-2.5 rounded-xl bg-accent text-bg text-sm font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-accent-deep transition"
                  >
                    {busyId === t.id
                      ? "Opening Stripe…"
                      : t.interval === "lifetime"
                        ? `Buy ${group.label} lifetime`
                        : `Subscribe`}
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      ))}

      {error ? (
        <div className="rounded-xl border border-danger/40 bg-danger/10 p-4 text-sm text-danger">
          {error}
        </div>
      ) : null}

      <p className="text-xs text-text-muted text-center max-w-md mx-auto">
        Payments are processed by Stripe. You can cancel or change plans anytime from your{" "}
        <a href="/account" className="underline hover:text-text">account page</a>. Recurring
        subscriptions renew automatically until cancelled; lifetime plans are a one-time charge.
      </p>
    </div>
  );
}