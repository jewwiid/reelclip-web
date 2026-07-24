import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PricingClient } from "@/components/pricing-client";

export const metadata: Metadata = {
  title: "Pricing · ReelClip",
  description:
    "Pick a Creator plan and start shipping share-ready clips. Cancel anytime.",
};

export default async function PricingPage(props: {
  searchParams: Promise<{ checkout?: string }>;
}) {
  const sp = await props.searchParams;
  const cancelled = sp.checkout === "cancelled";

  return (
    <>
      <Nav />
      <main className="px-6 sm:px-10 py-12 sm:py-16 max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs uppercase tracking-wider text-accent font-bold mb-3">
            Pricing
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Ship more, pay less.
          </h1>
          <p className="text-base text-text-muted mt-4">
            The free tier is generous enough for hobbyists. Upgrade when
            you need unlimited AI cuts, 1080p/60fps exports, voice
            enhancement, or subtitle files. Cancel anytime.
          </p>
        </div>

        {cancelled ? (
          <div className="max-w-md mx-auto mb-8 rounded-xl border border-hairline bg-control-surface p-4 text-sm text-text-muted text-center">
            Checkout was cancelled. No charge was made.
          </div>
        ) : null}

        <PricingClient />
      </main>
      <Footer />
    </>
  );
}
