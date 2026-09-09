import Image from "next/image";
import { getDictionary } from "@/i18n/server";

const USE_CASE_MEDIA = [
  "/audience/podcasters.webp",
  "/audience/coaches.webp",
  "/audience/everyday-vloggers.webp",
  "/audience/travel-vloggers.webp"
] as const;

export async function ForCreators() {
  const { creators } = await getDictionary();
  return <section id="for" className="relative border-t border-hairline px-6 py-20 sm:px-10 sm:py-32"><div className="mx-auto max-w-6xl"><div className="mb-12 max-w-2xl sm:mb-16"><div className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.18em] text-accent">{creators.eyebrow}</div><h2 className="text-4xl font-black tracking-tight sm:text-5xl">{creators.heading}</h2></div><div className="reveal-group grid gap-5 sm:gap-6 md:grid-cols-2">{creators.items.map((useCase, index) => <article key={useCase.title} className="group overflow-hidden rounded-2xl border border-hairline bg-surface"><div className="relative aspect-[16/10] overflow-hidden"><Image src={USE_CASE_MEDIA[index]} alt={useCase.alt} fill sizes="(max-width: 767px) 100vw, 50vw" className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]" /></div><div className="p-6 sm:p-8"><h3 className="mb-2 text-xl font-bold">{useCase.title}</h3><p className="leading-relaxed text-text-muted">{useCase.description}</p></div></article>)}</div></div></section>;
}
