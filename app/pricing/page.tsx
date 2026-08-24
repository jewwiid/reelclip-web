import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PricingPlans } from "@/components/pricing-client";

export const metadata: Metadata = {
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
  alternates: { canonical: "https://reelclips.app/pricing" },
  openGraph: {
    title: "Pricing · ReelClip — Create free, export with Creator",
    description:
      "ReelClip is free to create and preview clips. Choose a Creator plan to save, share, and export. On-device, no watermarks.",
    url: "https://reelclips.app/pricing",
    type: "website",
  },
};

export default function PricingPage() {
  return (
    <>
      <Nav />
      <main className="px-6 sm:px-10 py-12 sm:py-16 max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs uppercase tracking-wider text-accent font-bold mb-3">
            Pricing
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Create your clips free. Pay only when you&apos;re ready to export.
          </h1>
          <p className="text-base text-text-muted mt-4 leading-relaxed">
            Import your footage, let ReelClip find the strongest moments, and
            preview every result for free. Choose Creator when you&apos;re ready to
            save, share, or export your clips.
          </p>
          <div className="mt-6 rounded-2xl border border-accent/25 bg-accent/8 px-5 py-4 text-left">
            <p className="text-sm font-bold text-text">Try ReelClip free</p>
            <p className="mt-1 text-sm leading-relaxed text-text-muted">
              Import a video, generate clips, and preview the results. A Creator
              plan is required to export or save.
            </p>
          </div>
        </div>

        <PricingPlans />
      </main>
      <Footer />
    </>
  );
}
