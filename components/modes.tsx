import Image from "next/image";

type Mode = {
  name: string;
  symbol: string;
  tagline: string;
  description: string;
  bullets: string[];
  accent: string;
};

const MODES: Mode[] = [
  {
    name: "Cut",
    symbol: "scissors",
    tagline: "Predictable equal-length clips.",
    description:
      "Choose how many clips you want and how long each should be. Ideal for recurring series, podcast excerpts, and scheduled posts.",
    bullets: ["Choose the clip count", "Set the duration", "Export them together"],
    accent: "from-accent/30 to-accent/0",
  },
  {
    name: "Silence",
    symbol: "waveform",
    tagline: "Cuts that breathe with the speaker.",
    description:
      "Finds natural pauses in speech so cuts feel cleaner. If there are no clear pauses, ReelClip keeps the timing consistent.",
    bullets: ["Find natural pauses", "Keep speech flowing", "Adjust every cut"],
    accent: "from-accent/20 to-accent/0",
  },
  {
    name: "Splice",
    symbol: "sparkles",
    tagline: "Find the moments that stand out.",
    description:
      "ReelClip looks at movement, faces, sharpness, and audio to surface the strongest moments — all on your iPhone.",
    bullets: ["Surface standout moments", "Use visual and audio cues", "Review before export"],
    accent: "from-accent/25 to-accent/0",
  },
  {
    name: "AI Assist",
    symbol: "wand",
    tagline: "Describe what you want. Get a clip plan.",
    description:
      "Ask for the funniest moments, the product demo, or the strongest quotes. Apple Intelligence creates suggestions on-device for you to review.",
    bullets: ["Use everyday language", "No account or upload", "Review every suggestion"],
    accent: "from-accent/35 to-accent/0",
  },
];

const ICONS: Record<string, React.ReactNode> = {
  scissors: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <line x1="20" y1="4" x2="8.12" y2="15.88" />
      <line x1="14.47" y1="14.48" x2="20" y2="20" />
      <line x1="8.12" y1="8.12" x2="12" y2="12" />
    </svg>
  ),
  waveform: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
      <line x1="2" y1="12" x2="2" y2="12" />
      <line x1="6" y1="9" x2="6" y2="15" />
      <line x1="10" y1="5" x2="10" y2="19" />
      <line x1="14" y1="8" x2="14" y2="16" />
      <line x1="18" y1="11" x2="18" y2="13" />
      <line x1="22" y1="9" x2="22" y2="15" />
    </svg>
  ),
  sparkles: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M12 2l1.5 5.5L19 9l-5.5 1.5L12 16l-1.5-5.5L5 9l5.5-1.5L12 2z" />
      <circle cx="19" cy="17" r="2" />
      <circle cx="5" cy="19" r="1.5" />
    </svg>
  ),
  wand: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
      <path d="M15 4V2M15 16v-2M8 9h2M20 9h2M17.8 11.8L19 13M15 9h0M17.8 6.2L19 5M3 21l9-9M12.2 6.2L11 5" strokeLinecap="round" />
    </svg>
  ),
};

export function Modes() {
  return (
    <section id="modes" className="relative py-20 sm:py-32 px-6 sm:px-10 border-t border-hairline">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 grid items-center gap-8 lg:grid-cols-[1fr_0.42fr] lg:gap-16">
          <div className="text-center lg:text-left">
            <div className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-accent mb-3">
              Bring every scene together
            </div>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
              Keep a whole shoot in one project.<br />
              <span className="text-text-muted">Switch scenes, then choose the cut.</span>
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-text-muted lg:max-w-xl">
              Add separate videos as scenes, move between them without losing your place, and choose the cut mode that gets each part of the shoot ready fastest.
            </p>
          </div>
          <div className="relative mx-auto w-40 sm:w-48 lg:w-full lg:max-w-[15rem]">
            <div className="absolute inset-[18%] rounded-full bg-accent/10 blur-2xl" />
            <Image
              src="/mockups/reelclip-editor-timeline.png"
              alt="ReelClip timeline with scene controls and a clip preview"
              width={741}
              height={1522}
              sizes="(max-width: 1023px) 12rem, 15rem"
              className="relative h-auto w-full drop-shadow-[0_22px_32px_rgba(0,0,0,0.3)]"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          {MODES.map((mode) => (
            <article
              key={mode.name}
              className="group relative p-7 rounded-2xl bg-surface border border-hairline hover:border-accent/40 transition-colors overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${mode.accent} opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`} />

              <div className="relative">
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                    {ICONS[mode.symbol]}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-text-faint">
                    {String(MODES.indexOf(mode) + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="text-2xl font-bold mb-2">{mode.name}</h3>
                <p className="text-sm font-semibold text-accent mb-4">{mode.tagline}</p>
                <p className="text-text-muted leading-relaxed mb-5">{mode.description}</p>

                <ul className="space-y-2 pt-5 border-t border-hairline">
                  {mode.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2.5 text-sm text-text-muted">
                      <span className="w-1 h-1 rounded-full bg-accent" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
