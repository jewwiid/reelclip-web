import Image from "next/image";
import { getDictionary } from "@/i18n/server";

const MODE_PRESENTATION = [
  { symbol: "scissors", accent: "from-accent/30 to-accent/0" },
  { symbol: "waveform", accent: "from-accent/20 to-accent/0" },
  { symbol: "sparkles", accent: "from-accent/25 to-accent/0" },
  { symbol: "wand", accent: "from-accent/35 to-accent/0" }
] as const;

const ICONS: Record<(typeof MODE_PRESENTATION)[number]["symbol"], React.ReactNode> = {
  scissors: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6"><circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><line x1="20" y1="4" x2="8.12" y2="15.88" /><line x1="14.47" y1="14.48" x2="20" y2="20" /><line x1="8.12" y1="8.12" x2="12" y2="12" /></svg>,
  waveform: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6"><line x1="2" y1="12" x2="2" y2="12" /><line x1="6" y1="9" x2="6" y2="15" /><line x1="10" y1="5" x2="10" y2="19" /><line x1="14" y1="8" x2="14" y2="16" /><line x1="18" y1="11" x2="18" y2="13" /><line x1="22" y1="9" x2="22" y2="15" /></svg>,
  sparkles: <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6"><path d="M12 2l1.5 5.5L19 9l-5.5 1.5L12 16l-1.5-5.5L5 9l5.5-1.5L12 2z" /><circle cx="19" cy="17" r="2" /><circle cx="5" cy="19" r="1.5" /></svg>,
  wand: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6"><path d="M15 4V2M15 16v-2M8 9h2M20 9h2M17.8 11.8L19 13M15 9h0M17.8 6.2L19 5M3 21l9-9M12.2 6.2L11 5" strokeLinecap="round" /></svg>
};

export async function Modes() {
  const { modes } = await getDictionary();
  return (
    <section id="modes" className="relative border-t border-hairline px-6 py-20 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 grid items-center gap-8 lg:grid-cols-[1fr_0.42fr] lg:gap-16">
          <div className="text-center lg:text-left"><div className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.18em] text-accent">{modes.eyebrow}</div><h2 className="mb-4 text-4xl font-black tracking-tight sm:text-5xl">{modes.heading}<br /><span className="text-text-muted">{modes.headingMuted}</span></h2><p className="max-w-2xl text-base leading-relaxed text-text-muted lg:max-w-xl">{modes.body}</p></div>
          <div className="relative mx-auto w-40 sm:w-48 lg:w-full lg:max-w-[15rem]"><div className="absolute inset-[18%] rounded-full bg-accent/10 blur-2xl" /><Image src="/mockups/reelclip-editor-timeline.png" alt={modes.timelineAlt} width={741} height={1522} sizes="(max-width: 1023px) 12rem, 15rem" className="relative h-auto w-full drop-shadow-[0_22px_32px_rgba(0,0,0,0.3)]" /></div>
        </div>
        <div className="reveal-group grid gap-4 sm:grid-cols-2 sm:gap-6">
          {modes.items.map((mode, index) => {
            const presentation = MODE_PRESENTATION[index];
            return <article key={mode.name} className="group relative overflow-hidden rounded-2xl border border-hairline bg-surface p-7 transition-colors hover:border-accent/40"><div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${presentation.accent} opacity-0 transition-opacity group-hover:opacity-100`} /><div className="relative"><div className="mb-5 flex items-center justify-between"><div className="flex h-11 w-11 items-center justify-center rounded-xl border border-accent/20 bg-accent/10 text-accent">{ICONS[presentation.symbol]}</div><span className="text-xs font-bold uppercase tracking-wider text-text-faint">{String(index + 1).padStart(2, "0")}</span></div><h3 className="mb-2 text-2xl font-bold">{mode.name}</h3><p className="mb-4 text-sm font-semibold text-accent">{mode.tagline}</p><p className="mb-5 leading-relaxed text-text-muted">{mode.description}</p><ul className="space-y-2 border-t border-hairline pt-5">{mode.bullets.map((bullet) => <li key={bullet} className="flex items-center gap-2.5 text-sm text-text-muted"><span className="h-1 w-1 rounded-full bg-accent" />{bullet}</li>)}</ul></div></article>;
          })}
        </div>
      </div>
    </section>
  );
}
