import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { LocalizedStaticPage } from "@/components/localized-static-page";
import { BreadcrumbJsonLd } from "@/components/structured-data";
import { getPostsSorted } from "./posts";
import { getRequestLocale } from "@/i18n/server";

export const metadata: Metadata = {
  title: "Blog · ReelClip — On-device video editing guides",
  description:
    "Practical guides for cutting long videos, clipping podcasts, and making short-form clips — all on iPhone, on-device. Written by the ReelClip team.",
  keywords: [
    "video editing tutorials",
    "how to cut a video on iphone",
    "podcast clipping",
    "remove silence from video",
    "capcut alternative",
    "on-device video editor",
  ],
  alternates: { canonical: "https://reelclips.app/blog" },
  openGraph: {
    title: "Blog · ReelClip — On-device video editing guides",
    description:
      "Practical guides for cutting long videos, clipping podcasts, and making short-form clips — all on iPhone, on-device.",
    url: "https://reelclips.app/blog",
    type: "website",
  },
};

export default async function BlogIndexPage() {
  const locale = await getRequestLocale();
  if (locale !== "en") return <LocalizedStaticPage locale={locale} document="blog" />;
  const posts = getPostsSorted();
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://reelclips.app" },
          { name: "Blog", url: "https://reelclips.app/blog" },
        ]}
      />
      <Nav />
      <main className="px-6 sm:px-10 py-12 sm:py-20 max-w-4xl mx-auto">
        <header className="mb-12">
          <p className="text-xs uppercase tracking-wider text-accent font-bold mb-3">
            Blog
          </p>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.05]">
            Guides for cutting long video on iPhone.
          </h1>
          <p className="text-base text-text-muted mt-4 leading-relaxed max-w-2xl">
            Practical walkthroughs for the workflows ReelClip is built for —
            cutting long recordings, clipping podcasts, removing silence,
            making short-form clips. All on-device, no upload.
          </p>
        </header>

        <ul className="space-y-8">
          {posts.map((post) => {
            const date = new Date(post.publishedAt).toLocaleDateString(
              "en-US",
              {
                year: "numeric",
                month: "short",
                day: "numeric",
              },
            );
            return (
              <li
                key={post.slug}
                className="rounded-2xl border border-hairline p-6 sm:p-7 bg-surface transition hover:border-accent/40"
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="block group"
                >
                  <div className="flex items-center gap-3 text-xs text-text-faint mb-3">
                    <span className="uppercase tracking-wider text-accent font-bold">
                      {post.category}
                    </span>
                    <span aria-hidden="true">·</span>
                    <time dateTime={post.publishedAt}>{date}</time>
                    <span aria-hidden="true">·</span>
                    <span>{post.readMinutes} min read</span>
                  </div>
                  <h2 className="text-2xl font-black tracking-tight mb-2 group-hover:text-accent transition">
                    {post.title}
                  </h2>
                  <p className="text-sm text-text-muted leading-relaxed">
                    {post.description}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-16 text-sm text-text-muted">
          Looking for the app itself?{" "}
          <Link href="/" className="text-accent hover:underline">
            See what ReelClip does
          </Link>
          .
        </div>
      </main>
      <Footer />
    </>
  );
}
