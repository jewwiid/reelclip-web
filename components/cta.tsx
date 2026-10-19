import { AppStoreLink } from "@/components/app-store-link";
import Image from "next/image";
import { getDictionary } from "@/i18n/server";


export async function CTA() {
  const { cta } = await getDictionary();
  return <section id="download" className="relative overflow-hidden border-t border-hairline px-6 py-24 sm:px-10 sm:py-36"><div className="absolute inset-0 bg-radial-spotlight opacity-50" /><div className="relative mx-auto max-w-3xl text-center"><Image src="/app-icon-button.png" alt="ReelClip" width={120} height={120} className="mx-auto mb-8 h-24 w-24 rounded-[26%] shadow-2xl shadow-accent/10 sm:h-28 sm:w-28" /><div className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.18em] text-accent">{cta.eyebrow}</div><h2 className="mb-5 text-4xl font-black tracking-tight sm:text-6xl">{cta.heading}</h2><p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-text-muted">{cta.body}</p><AppStoreLink target="_blank" rel="noreferrer" data-fast-goal="download_click_cta" className="inline-flex items-center justify-center rounded-full bg-accent px-7 py-3.5 font-bold text-bg transition-[background-color,transform] hover:bg-accent-deep active:scale-[0.98] ease-out">{cta.download}</AppStoreLink></div></section>;
}
