import { createElement } from "react";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PostBody } from "@/components/blog";
import { GuideVideo } from "@/components/guide-video";
import { CutDemoVideo } from "@/components/cut-demo-video";
import { LUTFilmComparison } from "@/components/lut-film-comparison";
import { AppStoreLink } from "@/components/app-store-link";
import { BlogPostingJsonLd, BreadcrumbJsonLd } from "@/components/structured-data";
import { getGuideTranslations, type TranslatedGuide } from "@/i18n/guide-content";
import { localizedPath } from "@/i18n/routing";
import { localesForPage, pageUrl } from "@/i18n/seo";
import { translateGuide } from "@/lib/guide-translation";
import { GUIDE_VIDEOS } from "@/lib/guide-videos";

export async function LocalizedGuide({ guide }: { guide: TranslatedGuide }) {
  const { locale, slug } = guide;
  const translations = await getGuideTranslations(locale);
  const t = (source: string, values?: Record<string, string | number>) => translateGuide(translations, source, values);
  const date = (value: string) => new Intl.DateTimeFormat(locale, { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }).format(new Date(`${value}T00:00:00Z`));
  const tutorial = guide.blocks.find(block => block.kind === "tutorial");
  const videoDuration = tutorial?.kind === "tutorial" ? GUIDE_VIDEOS[tutorial.id].duration : null;
  const path = `/blog/${slug}`;
  const url = pageUrl(locale, path);
  return <>
    <BreadcrumbJsonLd items={[
      { name: t("Home"), url: pageUrl(locale) },
      { name: t("Blog"), url: pageUrl(locale, "/blog") },
      { name: guide.title, url },
    ]} />
    <BlogPostingJsonLd url={url} headline={guide.title} description={guide.description} datePublished={guide.publishedAt} dateModified={guide.updatedAt} language={locale} />
    <Nav availableLocales={localesForPage(path)} />
    <main className={`mx-auto px-5 py-10 sm:px-10 sm:py-14 ${tutorial ? "max-w-6xl" : "max-w-3xl"}`} data-guide-locale={locale} data-source-version={guide.sourceFingerprint}>
      <header className="mx-auto mb-10 max-w-2xl sm:mb-12">
        <div className="mb-7 flex items-center gap-3 text-xs font-medium">
          <Link href={localizedPath(locale, "/blog")} className="inline-flex items-center gap-2 text-text-muted hover:text-text"><span aria-hidden="true">←</span> {t("All guides")}</Link>
          <span aria-hidden="true" className="text-text-faint">/</span><span className="text-accent">{guide.category}</span>
        </div>
        <h1 className="text-4xl leading-[1.08] font-black tracking-tight text-balance sm:text-5xl">{guide.title}</h1>
        <p className="mt-5 text-base leading-relaxed text-pretty text-text-muted">{guide.description}</p>
        <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-4 text-xs text-text-muted">
          <time dateTime={guide.publishedAt}>{t("Published {date}", { date: date(guide.publishedAt) })}</time>
          {guide.updatedAt !== guide.publishedAt && <time dateTime={guide.updatedAt}>{t("Updated {date}", { date: date(guide.updatedAt) })}</time>}
          <span aria-hidden="true">·</span><span>{t("{minutes} min read", { minutes: guide.readMinutes })}</span>
          {videoDuration && <a href="#walkthrough" className="inline-flex min-h-9 items-center gap-2 rounded-full border border-hairline px-3 font-medium text-accent hover:bg-accent/5 sm:ml-auto">▶ {t("Watch the {seconds} sec walkthrough", { seconds: Math.round(videoDuration) })}</a>}
        </div>
      </header>
      <PostBody>{guide.blocks.map((block, index) => {
        switch (block.kind) {
          case "tutorial": return <GuideVideo key={index} id={block.id} translations={translations} captionLocale={locale} />;
          case "cut-demo": return <CutDemoVideo key={index} translations={translations} captionLocale={locale} />;
          case "comparison": return <LUTFilmComparison key={index} translations={translations} />;
          case "cta": return <aside key={index} data-guide-component="cta" className="mt-16 rounded-2xl border border-accent/25 bg-accent/5 p-6 sm:p-8">
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-accent">{t("Try it on your iPhone")}</p>
            <h3 className="mb-2 text-2xl font-black tracking-tight">{t("Cut, transcribe, and export — on-device, no upload.")}</h3>
            <p className="mb-5 text-sm leading-relaxed text-text-muted">{t("ReelClip is free to import and preview. A Creator plan unlocks export. Choose Slice, Cut, Transcript or AI for your edit. All video and audio processing stays on your iPhone — nothing is uploaded to ReelClip servers.")}</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <AppStoreLink target="_blank" rel="noreferrer" data-analytics-event="download_click_blog" data-analytics-event-placement="article_cta" className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-bg hover:bg-accent-deep">{t("Download on the App Store")}</AppStoreLink>
              <Link href={localizedPath(locale, "/pricing")} className="inline-flex items-center justify-center rounded-full border border-hairline px-5 py-2.5 text-sm font-semibold hover:bg-surface">{t("See Creator pricing")}</Link>
            </div>
          </aside>;
          // Only versioned, structurally checked content is loaded here. The generator
          // preserves the reviewed English element/attribute allowlist and links.
          case "html": {
            const { class: className, ...attributes } = block.attributes;
            return createElement(block.tag, { ...attributes, className, key: index, dangerouslySetInnerHTML: { __html: block.html } });
          }
        }
      })}</PostBody>
    </main>
    <Footer />
  </>;
}
