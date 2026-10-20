import type { MetadataRoute } from "next";
import { getPostsSorted } from "./blog/posts";
import { languageAlternates, localesForPage, pageUrl } from "@/i18n/seo";
import { getLocalizedBlogMetadata } from "@/i18n/blog-metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number; slug?: string; publishedAt?: string; updatedAt?: string }[] = [
    { path: "/", priority: 1 },
    { path: "/pricing", priority: 0.8 },
    { path: "/competitors", priority: 0.8 },
    { path: "/blog", priority: 0.8 },
    { path: "/support", priority: 0.6 },
    { path: "/about", priority: 0.5 },
    { path: "/brand", priority: 0.3 },
    { path: "/privacy", priority: 0.3 },
    { path: "/terms", priority: 0.3 },
    ...getPostsSorted().map((post) => ({
      path: `/blog/${post.slug}`,
      slug: post.slug,
      priority: 0.7,
      publishedAt: post.publishedAt,
      updatedAt: post.updatedAt,
    })),
  ];

  return pages.flatMap((page) => localesForPage(page.path).map((locale) => ({
    url: pageUrl(locale, page.path),
    ...(page.publishedAt ? {
      lastModified: (page.slug ? getLocalizedBlogMetadata(locale, page.slug)?.updatedAt : undefined)
        ?? (locale === "en" ? page.updatedAt : undefined)
        ?? page.publishedAt,
    } : {}),
    priority: page.priority,
    alternates: { languages: languageAlternates(page.path) },
  })));
}
