import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { LocalizedStaticPage } from "@/components/localized-static-page";
import {
  BlogPostingJsonLd,
  BreadcrumbJsonLd,
} from "@/components/structured-data";
import { BLOG_POSTS, getPostBySlug } from "../posts";
import { getRequestLocale } from "@/i18n/server";
import { localizedMetadata, localesForPage, pageUrl } from "@/i18n/seo";

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
  const path = `/blog/${post.slug}`;
  const url = pageUrl(locale, path);
  return localizedMetadata(locale, path, {
    title: `${post.title} · ReelClip Blog`,
    description: post.description,
    keywords: [post.primaryKeyword, post.category, "video editing iphone"],
    authors: [{ name: "ReelClip" }],
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: locale === "en" ? (post.updatedAt ?? post.publishedAt) : post.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
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
  if (locale !== "en") return <LocalizedStaticPage locale={locale} document={`blog/${slug}`} />;

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
      <Nav />
      <main className="px-6 sm:px-10 py-12 sm:py-16 max-w-3xl mx-auto">
        <PostComponent />
      </main>
      <Footer />
    </>
  );
}
