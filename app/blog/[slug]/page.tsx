import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { LocalizedGuide } from "@/components/localized-guide";
import { getTranslatedGuide } from "@/i18n/guide-content";
import {
  BlogPostingJsonLd,
  BreadcrumbJsonLd,
} from "@/components/structured-data";
import { BLOG_POSTS, getPostBySlug } from "../posts";
import { getRequestLocale } from "@/i18n/server";
import { localizedMetadata, localesForPage, pageUrl } from "@/i18n/seo";
import { getLocalizedBlogMetadata } from "@/i18n/blog-metadata";
import { getGuideVideoForPost } from "@/lib/guide-videos";
import sourceVersions from "@/i18n/guides/source-versions.json";

/**
 * Dynamic route for blog posts. Each post is a standalone React component
 * in /app/blog/content/<slug>.tsx — body content stays co-located with its
 * own metadata export. Adding a post is a single file plus one entry in
 * /app/blog/posts.ts.
 */

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const locale = await getRequestLocale();
  const translated = getLocalizedBlogMetadata(locale, slug);
  if (locale !== "en" && !translated) return {};
  const title = translated?.title ?? post.title;
  const description = translated?.description ?? post.description;
  const path = `/blog/${post.slug}`;
  const url = pageUrl(locale, path);
  return localizedMetadata(locale, path, {
    title: `${title} · ReelClip`,
    description,
    keywords: [translated?.primaryKeyword ?? post.primaryKeyword],
    authors: [{ name: "ReelClip" }],
    openGraph: {
      title,
      description,
      url,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: translated?.updatedAt ?? (locale === "en" ? post.updatedAt : undefined) ?? post.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  });
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();
  const locale = await getRequestLocale();
  if (!localesForPage(`/blog/${slug}`).includes(locale)) notFound();
  if (locale !== "en") {
    const guide = await getTranslatedGuide(locale, slug);
    if (!guide) notFound();
    return <LocalizedGuide guide={guide} />;
  }

  // Lazy-import the matching content component.
  // The blog registry is the source of truth for slugs.
  let PostComponent: React.ComponentType;
  try {
    const mod = await import(`../content/${slug}.tsx`);
    PostComponent = mod.default;
  } catch {
    notFound();
  }

  const url = `https://www.reelclips.app/blog/${slug}`;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://www.reelclips.app" },
          { name: "Blog", url: "https://www.reelclips.app/blog" },
          { name: post.title, url },
        ]}
      />
      <BlogPostingJsonLd
        url={url}
        headline={post.title}
        description={post.description}
        datePublished={post.publishedAt}
        dateModified={post.updatedAt}
      />
      <Nav availableLocales={localesForPage(`/blog/${slug}`)} />
      <main data-guide-locale="en" data-source-version={(sourceVersions as Record<string, string>)[slug]} className={`mx-auto px-5 py-10 sm:px-10 sm:py-14 ${getGuideVideoForPost(slug) ? "max-w-6xl" : "max-w-3xl"}`}>
        <PostComponent />
      </main>
      <Footer />
    </>
  );
}
