type Partner = {
  name: string;
  icon: string; // path under /partners
  description: string;
};

const PARTNERS: Partner[] = [
  {
    name: "CapCut",
    icon: "/partners/capcut.png",
    description: "Drop the clips straight into CapCut to add trending templates, captions, and sound.",
  },
  {
    name: "IG Edits",
    icon: "/partners/ig-edits.png",
    description: "Hand the clips to Instagram's editing app for filters, music, and Reel effects.",
  },
  {
    name: "Opus Clips",
    icon: "/partners/opus-clips.png",
    description: "ReelClips handles the picker locally — Opus Clips is the cloud render pipeline if you want it.",
  },
  {
    name: "YouTube Shorts",
    icon: "/partners/youtube-shorts.png",
    description: "Open YouTube directly with the latest clip ready as a Short draft.",
  },
];

export function CompatibleWith() {
  return (
    <section className="relative py-20 sm:py-28 px-6 sm:px-10 border-t border-hairline">
      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-accent mb-3">
            Plays nicely with
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Compatible with the editors you already use.
          </h2>
          <p className="text-base text-text-muted leading-relaxed">
            ReelClips picks the moments. These apps finish the job. Tap to send clips straight from the export sheet.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
          {PARTNERS.map((partner) => (
            <div
              key={partner.name}
              className="group flex flex-col items-center text-center"
            >
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden ring-1 ring-hairline bg-surface transition-transform group-hover:scale-105 group-hover:ring-accent/40">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={partner.icon}
                  alt={`${partner.name} icon`}
                  className="w-full h-full object-cover"
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
      </div>
    </section>
  );
}
