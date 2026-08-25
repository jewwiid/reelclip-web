import Image from "next/image";
import { getDictionary } from "@/i18n/server";

const PARTNERS = [
  { name: "CapCut", icon: "/partners/capcut.png" },
  { name: "IG Edits", icon: "/partners/ig-edits.png" },
  { name: "YouTube Shorts", icon: "/partners/youtube-shorts.png" }
] as const;

export async function CompatibleWith() {
  const { compatible } = await getDictionary();
  return <section className="relative border-t border-hairline px-6 py-20 sm:px-10 sm:py-28"><div className="mx-auto max-w-5xl"><div className="mb-12 grid items-center gap-8 lg:grid-cols-[0.7fr_1fr] lg:gap-16"><div className="relative mx-auto w-48 sm:w-56"><div className="absolute inset-[16%] rounded-full bg-accent/10 blur-3xl" /><Image src="/mockups/reelclip-export-clips.png" alt={compatible.imageAlt} width={713} height={1441} sizes="(max-width: 1023px) 14rem, 18rem" className="relative h-auto w-full drop-shadow-[0_24px_34px_rgba(0,0,0,0.32)]" /></div><div className="text-center lg:text-left"><div className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.18em] text-accent">{compatible.eyebrow}</div><h2 className="mb-4 text-3xl font-black tracking-tight sm:text-4xl">{compatible.heading}</h2><p className="text-base leading-relaxed text-text-muted">{compatible.body}</p></div></div><div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">{PARTNERS.map((partner, index) => <div key={partner.name} className="group flex flex-col items-center text-center"><div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-surface p-2 ring-1 ring-hairline transition-transform group-hover:scale-105 group-hover:ring-accent/40 sm:h-24 sm:w-24 sm:p-3"><Image src={partner.icon} alt={compatible.items[index].iconAlt} width={512} height={512} sizes="(max-width: 640px) 4rem, 5rem" className="block h-full w-full object-contain" /></div><h3 className="mt-4 text-sm font-bold text-text sm:text-base">{partner.name}</h3><p className="mt-1.5 max-w-[200px] text-xs leading-snug text-text-muted">{compatible.items[index].description}</p></div>)}</div><div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"><a href="https://apps.apple.com/app/reelclip/id6787742864" target="_blank" rel="noreferrer" data-event-name="download_click_compatible" data-appstore-cta="true" className="w-full rounded-full bg-accent px-7 py-3.5 text-center text-base font-bold text-bg transition hover:bg-accent-deep sm:w-auto">{compatible.download}</a></div></div></section>;
}
