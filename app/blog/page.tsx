import { localizedMetadata } from "@/i18n/seo";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { getGuideTranslations } from "@/i18n/guide-content";
import { getLocalizedBlogMetadata } from "@/i18n/blog-metadata";
import { localizedPath } from "@/i18n/routing";
import { localesForPage, pageUrl } from "@/i18n/seo";
import { translateGuide } from "@/lib/guide-translation";
import { BreadcrumbJsonLd } from "@/components/structured-data";
import { getPostsSorted, type BlogPost } from "./posts";
import { getRequestLocale } from "@/i18n/server";
import { getGuideVideoForPost } from "@/lib/guide-videos";

const indexDescription = "Short video walkthroughs and practical guides for cutting recordings, clipping podcasts and finding your look. Follow along on your iPhone, with no upload.";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const translations = await getGuideTranslations(locale);
  const title = translateGuide(translations, "Blog · ReelClip — On-device video editing guides");
  const description = translateGuide(translations, indexDescription);
  return localizedMetadata(locale, "/blog", {
    title, description,
    openGraph: { title, description, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  });
}

export default async function BlogIndexPage() {
  const locale = await getRequestLocale();
  const translations = await getGuideTranslations(locale);
  const t = (source: string, values?: Record<string, string | number>) => translateGuide(translations, source, values);
  const posts = getPostsSorted().flatMap<Omit<BlogPost, "category"> & { category: string }>(post => {
    if (locale === "en") return [post];
    const translated = getLocalizedBlogMetadata(locale, post.slug);
    return translated ? [{ ...post, ...translated }] : [];
  });
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: t("Home"), url: pageUrl(locale) },
          { name: t("Blog"), url: pageUrl(locale, "/blog") },
        ]}
      />
      <Nav availableLocales={localesForPage("/blog")} />
      <main className="px-6 sm:px-10 py-12 sm:py-20 max-w-4xl mx-auto">
        <header className="mb-12">
          <p className="text-xs uppercase tracking-wider text-accent font-bold mb-3">
            {t("Blog")}
          </p>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.05]">
            {t("Guides for cutting long video on iPhone.")}
          </h1>
          <p className="text-base text-text-muted mt-4 leading-relaxed max-w-2xl">
            {t(indexDescription)}
          </p>
        </header>

        <ul className="divide-y divide-hairline border-y border-hairline">
          {posts.map((post) => {
            const tutorial = getGuideVideoForPost(post.slug);
            const date = new Date(`${post.publishedAt}T00:00:00Z`).toLocaleDateString(
              locale,
              {
                year: "numeric",
                month: "short",
                day: "numeric",
                timeZone: "UTC",
              },
            );
            return (
              <li key={post.slug}>
                <Link
                  href={localizedPath(locale, `/blog/${post.slug}`)}
                  className={`group grid items-center gap-5 rounded-lg py-7 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:gap-8 sm:py-8 ${tutorial ? "grid-cols-[1fr_4.5rem] sm:grid-cols-[1fr_6rem]" : "grid-cols-1"}`}
                >
                  <div className="min-w-0">
                  <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-text-muted">
                    <span className="uppercase tracking-wider text-accent font-bold">
                      {post.category}
                    </span>
                    <span aria-hidden="true">·</span>
                    <time dateTime={post.publishedAt}>{date}</time>
                    <span aria-hidden="true">·</span>
                    <span>{t("{minutes} min read", { minutes: post.readMinutes })}</span>
                    {tutorial && (
                      <span className="inline-flex items-center gap-1.5 font-medium text-accent">
                        <svg aria-hidden="true" viewBox="0 0 20 20" className="h-3 w-3 fill-current"><path d="m6 3 11 7L6 17V3Z" /></svg>
                        {t("{seconds} sec video", { seconds: Math.round(tutorial.duration) })}
                      </span>
                    )}
                  </div>
                  <h2 className="mb-2 text-xl leading-snug font-bold tracking-tight text-pretty transition-colors group-hover:text-accent sm:text-2xl">
                    {post.title}
                  </h2>
                  <p className="text-sm text-text-muted leading-relaxed">
                    {post.description}
                  </p>
                  </div>
                  {tutorial && (
                    <div className="relative overflow-hidden rounded-lg border border-hairline bg-surface transition-colors group-hover:border-accent/40">
                      <Image
                        src={`/tutorials/${tutorial.asset}.jpg`}
                        alt={t("{title} — video preview", { title: t(tutorial.title) })}
                        width={720}
                        height={1280}
                        sizes="(min-width: 640px) 96px, 72px"
                        className="aspect-[9/16] h-auto w-full"
                      />
                      <span aria-hidden="true" className="absolute top-1/2 left-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-bg transition-transform group-hover:scale-110 motion-reduce:transition-none">
                        <svg viewBox="0 0 20 20" className="ml-0.5 h-4 w-4 fill-current"><path d="m6 3 11 7L6 17V3Z" /></svg>
                      </span>
                    </div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-16 text-sm text-text-muted">
          {t("Looking for the app itself?")}{" "}
          <Link href={localizedPath(locale, "/")} className="text-accent hover:underline">
            {t("See what ReelClip does")}
          </Link>
          .
        </div>
      </main>
      <Footer />
    </>
  );
}
