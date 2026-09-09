"use client";

import { useI18n } from "@/i18n/client";

const APP_STORE_URL = "https://apps.apple.com/app/reelclip/id6787742864";
const MONTHLY_PRICE = 9.99;
const ANNUAL_PRICE = 39.99;
const LIFETIME_PRICE = 79.99;
const ANNUAL_MONTHLY_EQUIVALENT = ANNUAL_PRICE / 12;
const ANNUAL_SAVINGS_PERCENT = Math.round(
  (1 - ANNUAL_PRICE / (MONTHLY_PRICE * 12)) * 100,
);

function interpolate(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? `{${key}}`));
}

export function PricingPlans() {
  const { dictionary } = useI18n();
  const copy = dictionary.pricing;
  const tiers = [
    { name: copy.monthly, price: `$${MONTHLY_PRICE.toFixed(2)}`, priceSuffix: copy.monthlySuffix, blurb: copy.monthlyDescription, badge: null, recommended: false },
    { name: copy.annual, price: `$${ANNUAL_PRICE.toFixed(2)}`, priceSuffix: copy.annualSuffix, blurb: interpolate(copy.annualDescription, { price: `$${ANNUAL_MONTHLY_EQUIVALENT.toFixed(2)}`, savings: ANNUAL_SAVINGS_PERCENT }), badge: copy.recommended, recommended: true },
    { name: copy.lifetime, price: `$${LIFETIME_PRICE.toFixed(2)}`, priceSuffix: copy.lifetimeSuffix, blurb: copy.lifetimeDescription, badge: copy.launchPrice, recommended: false },
  ];

  return (
    <div className="space-y-6">
      <section aria-labelledby="creator-plans" className="space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="creator-plans" className="text-2xl font-black tracking-tight">{copy.creatorPlans}</h2>
            <p className="mt-1 text-sm text-text-muted">{copy.purchaseInApp}</p>
          </div>
          <span className="w-fit rounded-md bg-accent px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-bg">{copy.usPrices}</span>
        </div>
        <div className="grid items-stretch gap-4 md:grid-cols-3">
          {tiers.map((tier) => (
            <article key={tier.name} className={`relative flex flex-col rounded-2xl border bg-control-surface p-5 sm:p-6 ${tier.recommended ? "border-accent shadow-[0_0_0_1px_rgba(196,239,51,0.2),0_18px_50px_rgba(0,0,0,0.24)]" : "border-hairline"}`}>
              <div className="mb-2 flex items-center justify-between"><span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">{tier.name}</span>{tier.badge ? <span className="rounded-md bg-accent/20 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-accent">{tier.badge}</span> : null}</div>
              <p className="min-h-[3.5em] text-pretty text-sm leading-snug text-text-muted">{tier.blurb}</p>
              <div className="mt-6 flex items-baseline gap-1.5 [font-variant-numeric:tabular-nums]"><span className="text-3xl font-extrabold tracking-tight">{tier.price}</span><span className="text-xs font-semibold text-text-muted">{tier.priceSuffix}</span></div>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 rounded-2xl bg-control-surface p-6 sm:p-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-center">
        <div><h3 className="text-lg font-black tracking-tight">{copy.allPlans}</h3><ul className="mt-4 grid gap-x-6 gap-y-2 text-sm text-text-muted sm:grid-cols-2">{copy.perks.map((perk) => <li key={perk} className="flex gap-2"><span aria-hidden="true" className="text-accent">✓</span><span>{perk}</span></li>)}</ul></div>
        <div className="rounded-xl bg-bg p-5 ring-1 ring-hairline"><p className="text-sm font-bold">{copy.chooseInApp}</p><p className="mt-1 text-xs leading-relaxed text-text-muted">{copy.chooseInAppDescription}</p><a href={APP_STORE_URL} target="_blank" rel="noreferrer" className="mt-4 flex min-h-11 items-center justify-center rounded-xl bg-accent px-4 py-2.5 text-sm font-black text-bg transition-[background-color,transform] duration-200 hover:bg-accent-deep active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ease-out">{copy.openAppStore} <span aria-hidden="true" className="ml-1">↗</span></a></div>
      </section>
      <p className="mx-auto max-w-md text-center text-xs text-text-muted">{copy.priceDisclosure}</p>
    </div>
  );
}
