import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PricingClient } from "@/components/pricing-client";

export const metadata: Metadata = {
  title: "Pricing · ReelClip",
  description:
    "Creator plans for unlimited AI cuts, original-quality exports, voice enhancement, and subtitle files. Cancel anytime.",
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
            Start free. Upgrade when you need to.
          </h1>
          <p className="text-base text-text-muted mt-4">
            Free covers three AI cuts a month, 5-minute videos, and 720p exports.
            Creator lifts those limits and adds voice enhancement and subtitle
            files. Cancel anytime.
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
