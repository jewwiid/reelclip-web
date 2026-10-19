import { localizedMetadata } from "@/i18n/seo";
import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PricingPlans } from "@/components/pricing-client";
import { getDictionary, getRequestLocale } from "@/i18n/server";

const pageMetadata: Metadata = {
  title: "Pricing · ReelClip — Create free, export with Creator",
  description:
    "ReelClip is free to create and preview clips. Choose a Creator plan ($9.99/month, $39.99/year, or $79.99 lifetime) to save, share, and export. On-device, no watermarks.",
  keywords: [
    "reelclip pricing",
    "video clip app pricing",
    "creator subscription",
    "video editor subscription",
    "reelclip creator",
  ],
  alternates: { canonical: "https://www.reelclips.app/pricing" },
  openGraph: {
    title: "Pricing · ReelClip — Create free, export with Creator",
    description:
      "ReelClip is free to create and preview clips. Choose a Creator plan to save, share, and export. On-device, no watermarks.",
    url: "https://www.reelclips.app/pricing",
    type: "website",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return localizedMetadata(await getRequestLocale(), "/pricing", pageMetadata);
}

export default async function PricingPage() {
  const { pricing } = await getDictionary();
  return (
    <>
      <Nav />
      <main className="px-6 sm:px-10 py-12 sm:py-16 max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs uppercase tracking-wider text-accent font-bold mb-3">
            {pricing.eyebrow}
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            {pricing.heading}
          </h1>
          <p className="text-base text-text-muted mt-4 leading-relaxed">
            {pricing.intro}
          </p>
          <div className="mt-6 rounded-2xl border border-accent/25 bg-accent/8 px-5 py-4 text-left">
            <p className="text-sm font-bold text-text">{pricing.tryFree}</p>
            <p className="mt-1 text-sm leading-relaxed text-text-muted">
              {pricing.tryFreeDescription}
            </p>
          </div>
        </div>

        <PricingPlans />
      </main>
      <Footer />
    </>
  );
}
