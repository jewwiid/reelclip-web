import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import {
  BlogPostingJsonLd,
  BreadcrumbJsonLd,
} from "@/components/structured-data";
import { BLOG_POSTS, getPostBySlug } from "../posts";

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

  const url = `https://reelclips.app/blog/${post.slug}`;
  return {
    title: `${post.title} · ReelClip Blog`,
    description: post.description,
    keywords: [post.primaryKeyword, post.category, "video editing iphone"],
    alternates: { canonical: url },
    authors: [{ name: "ReelClip" }],
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  // Lazy-import the matching content component.
  // The blog registry is the source of truth for slugs.
  let PostComponent: React.ComponentType;
  try {
    const mod = await import(`../content/${slug}.tsx`);
    PostComponent = mod.default;
  } catch {
    notFound();
  }

  const url = `https://reelclips.app/blog/${slug}`;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://reelclips.app" },
          { name: "Blog", url: "https://reelclips.app/blog" },
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
