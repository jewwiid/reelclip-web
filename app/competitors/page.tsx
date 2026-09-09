import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { localizedPath } from "@/i18n/routing";
import { getDictionary, getRequestLocale } from "@/i18n/server";

export const metadata: Metadata = {
  title: "ReelClip vs CapCut, InShot, VN, OpusClip, and Quik",
  description: "A practical guide to where ReelClip fits alongside CapCut, InShot, VN, OpusClip, and GoPro Quik. On-device clip preparation before your final edit.",
};

const COMPETITORS = [
  { name: "CapCut", logo: "/competitors/capcut.jpg" },
  { name: "InShot", logo: "/competitors/inshot.jpg" },
  { name: "VN", logo: "/competitors/vn.jpg" },
  { name: "OpusClip", logo: "/competitors/opusclip-webclip.png" },
  { name: "Quik", logo: "/competitors/quik.jpg" }
] as const;

const WORKFLOW_TOOLS = ["ReelClip", "CapCut", "InShot or VN", "OpusClip", "Quik"] as const;

function LogoTile({ name, logo }: (typeof COMPETITORS)[number]) {
  return <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-surface-2 ring-1 ring-hairline"><Image src={logo} alt={`${name} app icon`} fill sizes="48px" className="object-cover" /></div>;
}

export default async function CompetitorsPage() {
  const locale = await getRequestLocale();
  const { competitors: copy } = await getDictionary(locale);
  return <><Nav /><main>
    <section className="relative overflow-hidden border-b border-hairline px-6 pb-12 pt-16 sm:px-10 sm:pb-16 sm:pt-24"><div className="pointer-events-none absolute inset-0 bg-grid opacity-30" /><div className="relative mx-auto max-w-4xl text-center"><div className="mb-8 inline-flex items-center gap-2 rounded-full border border-hairline bg-surface/60 px-3 py-1.5 backdrop-blur"><span className="text-xs font-medium text-text-muted">{copy.heroBadge}</span></div><h1 className="mb-6 text-4xl font-black leading-[1.0] tracking-tight sm:text-6xl">{copy.heroHeading}<br />{copy.heroWith} <span className="gradient-text">{copy.heroHeadingAccent}</span></h1><p className="mx-auto max-w-2xl text-lg leading-relaxed text-text-muted">{copy.heroIntro}</p></div></section>

    <section className="border-b border-hairline px-6 py-16 sm:px-10 sm:py-20"><div className="mx-auto max-w-5xl"><SectionHeading eyebrow={copy.differenceEyebrow} heading={copy.differenceHeading} /><div className="grid gap-4 sm:grid-cols-3 sm:gap-6">{copy.differences.map((item) => <NicheCard key={item.title} {...item} />)}</div></div></section>

    <section className="border-b border-hairline px-6 py-16 sm:px-10 sm:py-20"><div className="mx-auto max-w-5xl"><div className="mb-12"><SectionHeading eyebrow={copy.toolsEyebrow} heading={copy.toolsHeading} /><p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-muted">{copy.toolsIntro}</p></div><div className="grid gap-4 sm:grid-cols-2 sm:gap-6">{COMPETITORS.map((competitor, index) => { const item = copy.items[index]; return <article key={competitor.name} className="rounded-2xl border border-hairline bg-surface p-6 sm:p-7"><div className="mb-5 flex items-start gap-4"><LogoTile {...competitor} /><div className="min-w-0"><h3 className="text-xl font-bold leading-tight">{competitor.name}</h3><p className="mt-1 text-xs text-text-muted">{item.availability}</p></div></div><p className="mb-4 text-sm leading-relaxed text-text-muted">{item.oneLiner}</p><div className="mb-1.5 text-xs font-bold uppercase tracking-wider text-text-faint">{copy.bestFor}</div><p className="mb-4 text-sm leading-snug text-text">{item.bestFor}</p><div className="grid gap-4 border-t border-hairline pt-5 sm:grid-cols-2"><ComparisonList title={copy.strengths} marker="+" tone="accent" items={item.strengths} /><ComparisonList title={copy.tradeoffs} marker="−" tone="faint" items={item.tradeoffs} /></div></article>; })}</div><p className="mt-6 text-xs leading-relaxed text-text-faint">{copy.disclaimer}</p></div></section>

    <section className="border-b border-hairline px-6 py-16 sm:px-10 sm:py-20"><div className="mx-auto max-w-5xl"><SectionHeading eyebrow={copy.workflowEyebrow} heading={copy.workflowHeading} /><div className="grid gap-4 sm:grid-cols-2 sm:gap-6">{copy.workflows.map((workflow, index) => <article key={WORKFLOW_TOOLS[index]} className="rounded-2xl border border-hairline bg-surface p-6"><div className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-accent">{WORKFLOW_TOOLS[index]}</div><h3 className="mb-2 text-lg font-bold">{workflow.title}</h3><p className="text-sm leading-relaxed text-text-muted">{workflow.body}</p></article>)}</div></div></section>

    <section className="border-b border-hairline px-6 py-16 sm:px-10 sm:py-20"><div className="mx-auto max-w-4xl"><SectionHeading eyebrow={copy.otherEyebrow} heading={copy.otherHeading} /><div className="grid gap-4 sm:grid-cols-2">{copy.alternatives.map((item) => <NicheCard key={item.title} {...item} />)}</div></div></section>

    <section className="px-6 py-20 sm:px-10 sm:py-28"><div className="mx-auto max-w-3xl text-center"><h2 className="mb-4 text-3xl font-black tracking-tight sm:text-4xl">{copy.ctaHeading}</h2><p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-text-muted">{copy.ctaBody}</p><div className="flex flex-col items-center justify-center gap-3 sm:flex-row"><a href="https://apps.apple.com/app/reelclip/id6787742864" target="_blank" rel="noreferrer" data-event-name="download_click_compare" className="accent-glow w-full rounded-full bg-accent px-7 py-3.5 text-base font-bold text-bg transition-[background-color,transform] hover:bg-accent-deep sm:w-auto active:scale-[0.98] ease-out">{copy.download}</a><Link href={localizedPath(locale, "/pricing")} className="w-full rounded-full border border-hairline px-7 py-3.5 text-base font-semibold text-text transition-[background-color,transform] hover:bg-surface sm:w-auto active:scale-[0.98] ease-out">{copy.seePricing}</Link></div></div></section>
  </main><Footer /></>;
}

function SectionHeading({ eyebrow, heading }: { eyebrow: string; heading: string }) {
  return <div className="mb-10 max-w-2xl"><div className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.18em] text-accent">{eyebrow}</div><h2 className="text-3xl font-black tracking-tight sm:text-4xl">{heading}</h2></div>;
}

function NicheCard({ title, body }: { title: string; body: string }) {
  return <div className="rounded-2xl border border-hairline bg-surface p-6"><h3 className="mb-2 text-lg font-bold">{title}</h3><p className="text-sm leading-relaxed text-text-muted">{body}</p></div>;
}

function ComparisonList({ title, marker, tone, items }: { title: string; marker: string; tone: "accent" | "faint"; items: string[] }) {
  return <div><div className={`mb-2 text-xs font-bold uppercase tracking-wider ${tone === "accent" ? "text-accent" : "text-text-faint"}`}>{title}</div><ul className="space-y-1.5 text-xs leading-relaxed text-text-muted">{items.map((item) => <li key={item} className="flex gap-2"><span className={`shrink-0 ${tone === "accent" ? "text-accent" : "text-text-faint"}`}>{marker}</span><span>{item}</span></li>)}</ul></div>;
}
