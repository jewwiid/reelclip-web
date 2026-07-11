import Link from "next/link";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative pt-16 sm:pt-24 pb-20 sm:pb-32 px-6 sm:px-10 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-hairline bg-surface/60 backdrop-blur mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="text-xs font-medium text-text-muted">TestFlight beta · iOS 17+</span>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <Image
          src="/wordmark.png"
          alt="ReelClip"
          width={300}
          height={86}
          priority
          className="h-16 sm:h-20 w-auto mx-auto mb-8"
        />

        <h1 className="text-5xl sm:text-7xl font-black tracking-tight leading-[0.95] mb-6">
          Cut any video
          <br />
          into <span className="gradient-text">share-ready clips.</span>
        </h1>

        <p className="text-lg sm:text-xl text-text-muted max-w-2xl mx-auto mb-3 leading-relaxed">
          Built for creators who publish to Reels, TikTok, and Shorts.
          Four cut modes. On-device analysis. Review before export.
        </p>

        <p className="text-sm sm:text-base font-bold uppercase tracking-[0.22em] text-accent mb-10">
          ReelClips — make good clips, Really
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
          <Link
            href="#waitlist"
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-accent text-bg font-bold text-base hover:bg-accent-deep transition accent-glow"
          >
            Join the TestFlight beta
          </Link>
          <Link
            href="#modes"
            className="w-full sm:w-auto px-7 py-3.5 rounded-full border border-hairline text-text font-semibold text-base hover:bg-surface transition"
          >
            See the four modes
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-4 sm:gap-12 max-w-2xl mx-auto pt-8 border-t border-hairline">
          <Stat label="On-device" detail="No upload to cloud" />
          <Stat label="30 min" detail="Max source length" />
          <Stat label="4 modes" detail="Cut / Silence / Splice / AI" />
        </div>
      </div>
    </section>
  );
}

function Stat({ label, detail }: { label: string; detail: string }) {
  return (
    <div>
      <div className="text-2xl sm:text-3xl font-black text-accent mb-1">{label}</div>
      <div className="text-xs sm:text-sm text-text-muted leading-tight">{detail}</div>
    </div>
  );
}