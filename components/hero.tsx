import Link from "next/link";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative pt-16 sm:pt-24 pb-20 sm:pb-32 px-6 sm:px-10 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-4">
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface/60 px-3 py-1.5 backdrop-blur mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-medium text-text-muted">TestFlight beta · iOS 17+</span>
          </div>

          <Image
            src="/wordmark.png"
            alt="ReelClip"
            width={300}
            height={86}
            preload
            className="mx-auto mb-8 h-16 w-auto lg:mx-0 sm:h-20"
          />

          <h1 className="mb-6 text-5xl font-black leading-[0.95] tracking-tight sm:text-7xl">
            Turn long footage
            <br />
            into <span className="gradient-text">clips for your next edit.</span>
          </h1>

          <p className="mx-auto mb-3 max-w-2xl text-lg leading-relaxed text-text-muted sm:text-xl lg:mx-0">
            Import one long video. ReelClip cuts it into smaller clips you can
            review, export to Photos, and use in CapCut, Shorts, or any editor.
          </p>

          <p className="mb-10 text-sm font-bold uppercase tracking-[0.22em] text-accent sm:text-base">
            ReelClip — make good clips, Really
          </p>

          <div className="mb-12 flex flex-col items-center gap-3 sm:flex-row lg:items-start">
            <Link
              href="#waitlist"
              className="w-full rounded-full bg-accent px-7 py-3.5 text-base font-bold text-bg transition hover:bg-accent-deep active:scale-[0.98] sm:w-auto"
            >
              Join the TestFlight beta
            </Link>
            <Link
              href="#modes"
              className="w-full rounded-full border border-hairline px-7 py-3.5 text-base font-semibold text-text transition hover:bg-surface active:scale-[0.98] sm:w-auto"
            >
              See the cut modes
            </Link>
          </div>

          <div className="mx-auto grid max-w-2xl grid-cols-3 gap-4 border-t border-hairline pt-8 lg:mx-0">
            <Stat label="On-device" detail="Your video stays private" />
            <Stat label="Review first" detail="Adjust every cut" />
            <Stat label="Editor-ready" detail="Export smaller source clips" />
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[29rem] lg:max-w-none">
          <div className="absolute inset-[12%] rounded-full bg-accent/10 blur-3xl" />
          <Image
            src="/mockups/reelclip-editor-angled.png"
            alt="ReelClip editor showing a scene preview and planned clips timeline"
            width={1166}
            height={1444}
            preload
            sizes="(max-width: 1023px) 82vw, 45vw"
            className="relative h-auto w-full drop-shadow-[0_28px_40px_rgba(0,0,0,0.38)]"
          />
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
