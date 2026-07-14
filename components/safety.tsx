import Image from "next/image";

export function Safety() {
  return (
    <section id="safety" className="relative py-20 sm:py-32 px-6 sm:px-10 border-t border-hairline">
      <div className="max-w-3xl mx-auto">
        <div>
          <div className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-accent mb-3">
            You&apos;re in control
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-6">
            You make the final cut.<br />
            <span className="text-text-muted">Nothing saves until you say so.</span>
          </h2>
          <p className="text-lg text-text-muted leading-relaxed mb-8">
            ReelClip shows every suggested clip before saving anything to Photos.
            Review the moment, adjust the trim, and export only what you want.
          </p>

          <div className="space-y-4">
            <Pill text="Nothing is saved until you approve it" />
            <Pill text="Your original video stays untouched" />
            <Pill text="Every clip can be reviewed and adjusted first" />
            <Pill text="Analysis happens on-device — your video stays on your phone" />
          </div>

          <div className="relative mt-10 mx-auto w-48 sm:w-56">
            <div className="absolute inset-[16%] rounded-full bg-accent/10 blur-3xl" />
            <Image
              src="/mockups/reelclip-home-projects.png"
              alt="ReelClip home screen showing a saved project and import options"
              width={713}
              height={1441}
              sizes="(max-width: 640px) 12rem, 14rem"
              className="relative h-auto w-full drop-shadow-[0_24px_34px_rgba(0,0,0,0.32)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Pill({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 w-5 h-5 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center shrink-0">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-3 h-3 text-accent">
          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <span className="text-text leading-relaxed">{text}</span>
    </div>
  );
}
