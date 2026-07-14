import Image from "next/image";

type Partner = {
  name: string;
  icon: string; // path under /partners
  description: string;
};

const PARTNERS: Partner[] = [
  {
    name: "CapCut",
    icon: "/partners/capcut.png",
    description: "Bring prepared clips into CapCut and drop them into templates, captions, sound, and effects.",
  },
  {
    name: "IG Edits",
    icon: "/partners/ig-edits.png",
    description: "Use smaller source clips in Edits to build Reels with filters, music, and finishing touches.",
  },
  {
    name: "YouTube Shorts",
    icon: "/partners/youtube-shorts.png",
    description: "Use your exported clips as source footage when you create and publish YouTube Shorts.",
  },
];

export function CompatibleWith() {
  return (
    <section className="relative py-20 sm:py-28 px-6 sm:px-10 border-t border-hairline">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 grid items-center gap-8 lg:grid-cols-[0.7fr_1fr] lg:gap-16">
          <div className="relative mx-auto w-48 sm:w-56">
            <div className="absolute inset-[16%] rounded-full bg-accent/10 blur-3xl" />
            <Image
              src="/mockups/reelclip-export-clips.png"
              alt="ReelClip showing a planned set of clips ready to save or export"
              width={713}
              height={1441}
              sizes="(max-width: 1023px) 14rem, 18rem"
              className="relative h-auto w-full drop-shadow-[0_24px_34px_rgba(0,0,0,0.32)]"
            />
          </div>
          <div className="text-center lg:text-left">
            <div className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-accent mb-3">
              Your creation workflow
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
              Prep in ReelClip. Create anywhere.
            </h2>
            <p className="text-base text-text-muted leading-relaxed">
              ReelClip handles the first cut. Export smaller clips to Photos,
              then turn them into finished content with the templates and tools you already use.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {PARTNERS.map((partner) => (
            <div
              key={partner.name}
              className="group flex flex-col items-center text-center"
            >
              <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-surface p-2 ring-1 ring-hairline transition-transform group-hover:scale-105 group-hover:ring-accent/40 sm:h-24 sm:w-24 sm:p-3">
                <Image
                  src={partner.icon}
                  alt={`${partner.name} icon`}
                  width={512}
                  height={512}
                  sizes="(max-width: 640px) 4rem, 5rem"
                  className="block h-full w-full object-contain"
                />
              </div>
              <h3 className="mt-4 text-sm sm:text-base font-bold text-text">
                {partner.name}
              </h3>
              <p className="mt-1.5 text-xs text-text-muted leading-snug max-w-[200px]">
                {partner.description}
              </p>
            </div>
          ))}
        </div>

        {/* Single funnel CTA — every outbound click on the page should land
            back on ReelClip. Until the public TestFlight / App Store link
            is generated, this points at the in-page waitlist. Swap the
            href when the public link is ready. */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="#waitlist"
            data-appstore-cta="true"
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-accent text-bg font-bold text-base hover:bg-accent-deep transition accent-glow text-center"
          >
            Get the beta
          </a>
        </div>
      </div>
    </section>
  );
}
