const USE_CASES = [
  {
    title: "Podcasters",
    description: "Split 60-min episodes into quote clips for Reels, Shorts, and TikTok. Smart Pause finds natural breath points.",
    icon: "mic",
  },
  {
    title: "Coaches",
    description: "Tag standout plays from long practice recordings. Highlight mode finds the most engaging frames automatically.",
    icon: "court",
  },
  {
    title: "Creators",
    description: "Turn long vlogs into story sequences. Fixed mode for predictable posting cadence across your content calendar.",
    icon: "camera",
  },
  {
    title: "Anyone who records more than they publish",
    description: "Pick a source. Pick a mode. Ship the clip. Stop letting great footage die on your camera roll.",
    icon: "rocket",
  },
];

const ICONS: Record<string, React.ReactNode> = {
  mic: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
      <rect x="9" y="2" width="6" height="11" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3" strokeLinecap="round" />
    </svg>
  ),
  court: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3v18" />
    </svg>
  ),
  camera: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
      <rect x="3" y="6" width="18" height="14" rx="2" />
      <circle cx="12" cy="13" r="4" />
      <path d="M8 6l2-3h4l2 3" strokeLinejoin="round" />
    </svg>
  ),
  rocket: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
      <path d="M5 19c0-4 4-12 12-14-2 8-10 12-14 12l2 2z" strokeLinejoin="round" />
      <circle cx="14" cy="10" r="1.5" fill="currentColor" />
    </svg>
  ),
};

export function ForCreators() {
  return (
    <section id="for" className="relative py-20 sm:py-32 px-6 sm:px-10 border-t border-hairline">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-accent mb-3">
            Perfect for
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
            Anyone who records<br />
            <span className="text-text-muted">more than they publish.</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          {USE_CASES.map((uc) => (
            <div
              key={uc.title}
              className="p-6 sm:p-8 rounded-2xl bg-surface border border-hairline hover:border-accent/30 transition"
            >
              <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-4">
                {ICONS[uc.icon]}
              </div>
              <h3 className="text-xl font-bold mb-2">{uc.title}</h3>
              <p className="text-text-muted leading-relaxed">{uc.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}