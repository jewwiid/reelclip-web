import Image from "next/image";
import { getDictionary } from "@/i18n/server";

export async function Safety() {
  const { safety } = await getDictionary();
  return <section id="safety" className="relative border-t border-hairline px-6 py-20 sm:px-10 sm:py-32"><div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_0.62fr] lg:gap-20"><div><div className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.18em] text-accent">{safety.eyebrow}</div><h2 className="mb-6 text-4xl font-black tracking-tight sm:text-5xl">{safety.heading}<br /><span className="text-text-muted">{safety.headingMuted}</span></h2><p className="mb-8 text-lg leading-relaxed text-text-muted">{safety.body}</p><div className="space-y-4">{safety.pills.map((text) => <Pill key={text} text={text} />)}</div></div><div className="relative mx-auto w-48 sm:w-56 lg:w-64"><div className="absolute inset-[16%] rounded-full bg-accent/10 blur-3xl" /><Image src="/mockups/reelclip-home-projects.png" alt={safety.imageAlt} width={713} height={1441} sizes="(max-width: 640px) 12rem, (max-width: 1023px) 14rem, 16rem" className="relative h-auto w-full drop-shadow-[0_24px_34px_rgba(0,0,0,0.32)]" /></div></div></section>;
}

function Pill({ text }: { text: string }) {
  return <div className="flex items-start gap-3"><div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/15"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="h-3 w-3 text-accent"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" /></svg></div><span className="leading-relaxed text-text">{text}</span></div>;
}
