/**
 * Blog post registry.
 *
 * Why a registry: we want /blog and /sitemap.xml to auto-pick up new posts
 * without touching the routing code. Add a new entry here and Next.js + the
 * sitemap pick it up at build time.
 *
 * Body content lives in app/blog/content/<slug>.tsx as React components
 * (not raw markdown) so they can use the same design system as the rest of
 * the marketing site.
 */

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  /** ISO date — YYYY-MM-DD. Used as datePublished in schema + sitemap. */
  publishedAt: string;
  /** Optional ISO date if the post has been updated since publish. */
  updatedAt?: string;
  /** Short label used in the index card (e.g. "Comparison", "Tutorial"). */
  category:
    | "Comparison"
    | "Tutorial"
    | "Use case"
    | "How-to"
    | "Roundup";
  /** One primary keyword phrase the post targets. Used for internal hints. */
  primaryKeyword: string;
  /** Estimated read time in minutes (whole numbers). */
  readMinutes: number;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "capcut-alternative-no-watermark",
    title:
      "The best CapCut alternative without a watermark (2026, iPhone)",
    description:
      "CapCut adds a watermark to some exports, requires an account, and uploads your footage to its servers. Here are four iPhone-first alternatives that ship clean exports without the upload.",
    publishedAt: "2026-08-24",
    category: "Comparison",
    primaryKeyword: "capcut alternative no watermark",
    readMinutes: 7,
  },
  {
    slug: "how-to-cut-long-video-for-tiktok",
    title:
      "How to cut a long video for TikTok on iPhone (without re-uploading)",
    description:
      "A 7-step workflow that takes one long recording and turns it into 3–5 TikTok-ready vertical clips — all on your iPhone, with no cloud upload.",
    publishedAt: "2026-08-24",
    category: "Tutorial",
    primaryKeyword: "how to cut a long video for tiktok",
    readMinutes: 6,
  },
  {
    slug: "extract-clip-from-podcast",
    title:
      "How to extract highlights from a podcast on iPhone",
    description:
      "Podcasters: how to turn a one-hour recording into five short highlight clips for Reels, TikTok, and Shorts — using on-device transcription so the audio never leaves your phone.",
    publishedAt: "2026-08-24",
    category: "Use case",
    primaryKeyword: "how to clip podcast highlights",
    readMinutes: 8,
  },
  {
    slug: "remove-silence-from-video-free",
    title:
      "How to remove silence from a video on iPhone (free, on-device)",
    description:
      "Pause detection and dead-air removal in a free iPhone app — no upload, no signup, and your audio stays on your device. Includes the exact settings to use.",
    publishedAt: "2026-08-24",
    category: "How-to",
    primaryKeyword: "remove silence from video iphone",
    readMinutes: 5,
  },
];

/** Most recent first. Sort defensively in case the array gets reshuffled. */
export function getPostsSorted(): BlogPost[] {
  return [...BLOG_POSTS].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
