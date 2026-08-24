import type { MetadataRoute } from "next";
import { BLOG_POSTS, getPostsSorted } from "./blog/posts";

const SITE_URL = "https://reelclips.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/pricing`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/competitors`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/support`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Blog posts — auto-included from the registry, sorted newest first.
  // Each post uses its publishedAt as lastModified unless updatedAt is set.
  const blogPages: MetadataRoute.Sitemap = getPostsSorted().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.updatedAt ?? post.publishedAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Surface the count at build time so this can't silently drift.
  if (blogPages.length !== BLOG_POSTS.length) {
    throw new Error(
      `sitemap blog mismatch: ${blogPages.length} generated, ${BLOG_POSTS.length} registered`,
    );
  }

  return [...staticPages, ...blogPages];
}
