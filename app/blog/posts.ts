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
    slug: "dji-osmo-pocket-3-luts",
    title:
      "DJI Osmo Pocket 3 LUTs — the best free LUT packs (and how to apply them)",
    description:
      "A curated list of the best free DJI Osmo Pocket 3 LUT packs for D-Log M, plus the exact workflow to apply them on iPhone with no upload and no desktop.",
    publishedAt: "2026-08-25",
    category: "Roundup",
    primaryKeyword: "dji osmo pocket 3 luts",
    readMinutes: 8,
  },
  {
    slug: "cube-lut-explained",
    title:
      "What is a .cube LUT file? Format, size limits, and how to use one",
    description:
      ".cube is the universal LUT format. This guide explains what a .cube file actually contains, the common size limits (17, 33, 65), and how to import one on iPhone.",
    publishedAt: "2026-08-25",
    category: "Tutorial",
    primaryKeyword: "what is a .cube lut file",
    readMinutes: 7,
  },
  {
    slug: "dji-d-log-to-rec709-iphone",
    title:
      "How to convert DJI D-Log to Rec.709 on iPhone (Osmo Pocket, Air, Action)",
    description:
      "DJI cameras shoot flat D-Log footage that looks washed out until you convert it. Here is the on-device workflow to apply a D-Log to Rec.709 conversion on your iPhone, with no upload and no desktop.",
    publishedAt: "2026-08-25",
    category: "Tutorial",
    primaryKeyword: "convert dji d-log to rec 709 on iphone",
    readMinutes: 8,
  },
  {
    slug: "dji-osmo-pocket-color-grading",
    title:
      "DJI Osmo Pocket color grading on iPhone — D-Log, D-Log M, D-Log 2",
    description:
      "A practical workflow for grading DJI Osmo Pocket footage on iPhone. Covers D-Log, D-Log M, and D-Log 2 — the three log profiles Osmo Pocket 1, 2, 3, and 4 shoot — and how to handle them with on-device LUTs.",
    publishedAt: "2026-08-25",
    category: "Use case",
    primaryKeyword: "dji osmo pocket color grading",
    readMinutes: 9,
  },
  {
    slug: "edit-dji-osmo-footage-iphone",
    title:
      "How to edit DJI Osmo footage on iPhone (Pocket, Action, Air)",
    description:
      "From import to export: how to edit DJI Osmo Pocket, Action, and Air footage entirely on your iPhone. Covers log-to-Rec.709 conversion, clipping, captions, and export.",
    publishedAt: "2026-08-25",
    category: "How-to",
    primaryKeyword: "edit dji osmo footage on iphone",
    readMinutes: 7,
  },
  {
    slug: "how-to-apply-lut-on-iphone",
    title: "How to apply a .cube LUT on iPhone (free, on-device)",
    description:
      "A practical guide to importing and applying .cube LUTs on iPhone. Works with any camera log footage — DJI D-Log, Apple Log, HLG — and runs entirely on-device.",
    publishedAt: "2026-08-25",
    category: "How-to",
    primaryKeyword: "how to apply a lut on iphone",
    readMinutes: 6,
  },
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
