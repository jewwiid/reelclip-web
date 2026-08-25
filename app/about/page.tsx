import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { BreadcrumbJsonLd } from "@/components/structured-data";
import { localizedPath } from "@/i18n/routing";
import { getDictionary, getRequestLocale } from "@/i18n/server";

export const metadata: Metadata = {
  title: "About ReelClip — On-device video clip preparation",
  description: "ReelClip is a strictly on-device iOS app for cutting long recordings into share-ready clips.",
};

export default async function AboutPage() {
  const locale = await getRequestLocale();
  const { about: copy } = await getDictionary(locale);
  return <><BreadcrumbJsonLd items={[{ name: "Home", url: "https://reelclips.app" }, { name: copy.eyebrow, url: `https://reelclips.app${localizedPath(locale, "/about")}` }]} /><Nav /><main className="mx-auto max-w-3xl px-6 py-12 sm:px-10 sm:py-20"><header className="mb-12"><p className="mb-3 text-xs font-bold uppercase tracking-wider text-accent">{copy.eyebrow}</p><h1 className="text-4xl font-black tracking-tight sm:text-5xl">{copy.heading}</h1><p className="mt-4 text-base leading-relaxed text-text-muted">{copy.intro}</p></header><article className="prose-sm space-y-10 leading-relaxed text-text"><Section title={copy.whyTitle}>{copy.whyParagraphs.map((paragraph) => <p key={paragraph} className="text-text-muted">{paragraph}</p>)}</Section><Section title={copy.doesTitle}><BulletList items={copy.doesItems} /></Section><Section title={copy.doesNotTitle}><BulletList items={copy.doesNotItems} /></Section><Section title={copy.whoTitle}><p className="text-text-muted">{copy.whoBody} <a href="mailto:jude@reelclips.app" className="text-accent hover:underline">jude@reelclips.app</a>.</p></Section><Section title={copy.nextTitle}><ul className="list-disc space-y-2 pl-6 text-text-muted"><li><a href={localizedPath(locale, "/privacy")} className="text-accent hover:underline">{copy.nextItems[0]}</a></li><li><a href={localizedPath(locale, "/competitors")} className="text-accent hover:underline">{copy.nextItems[1]}</a></li><li><a href={localizedPath(locale, "/pricing")} className="text-accent hover:underline">{copy.nextItems[2]}</a></li><li><a href="https://apps.apple.com/app/reelclip/id6787742864" target="_blank" rel="noreferrer" className="text-accent hover:underline">{copy.nextItems[3]}</a></li></ul></Section></article></main><Footer /></>;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return <section><h2 className="mb-4 text-2xl font-bold tracking-tight">{title}</h2>{children}</section>;
}

function BulletList({ items }: { items: string[] }) {
  return <ul className="list-disc space-y-2 pl-6 text-text-muted">{items.map((item) => <li key={item}>{item}</li>)}</ul>;
}
