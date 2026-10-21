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
    slug: "edit-any-log-footage-iphone",
    title: "How to edit log footage on iPhone: camera conversion and creative LUTs",
    description: "Choose the correct camera profile, import a matching conversion LUT, and add a creative look in ReelClip. Learn what to check before exporting log footage.",
    publishedAt: "2026-10-20",
    updatedAt: "2026-10-20",
    category: "Use case",
    primaryKeyword: "edit log footage on iphone",
    readMinutes: 5,
  },
  {
    slug: "video-length-social-media-reach",
    title: "Does video length hurt social media reach?",
    description:
      "A clear guide to length limits and viewer signals on Instagram, YouTube Shorts, and TikTok, plus a practical way to split long source videos into equal clips.",
    publishedAt: "2026-10-20",
    updatedAt: "2026-10-20",
    category: "Tutorial",
    primaryKeyword: "video length and social media reach",
    readMinutes: 6,
  },
  {
    slug: "best-free-luts-2026",
    title:
      "Free LUTs in 2026: choose the right camera conversion and creative look",
    description:
      "Find official camera LUT resources and compare real flat footage and original starter looks using a before-and-after slider.",
    publishedAt: "2026-08-25",
    updatedAt: "2026-10-20",
    category: "Roundup",
    primaryKeyword: "best free luts 2026",
    readMinutes: 7,
  },
  {
    slug: "edit-vertical-video-on-iphone",
    title: "How to edit vertical video on iPhone (Reels, TikTok, Shorts)",
    description: "Choose and refine moments from portrait footage in ReelClip, review captions and framing, and save the clips you want to post.",
    publishedAt: "2026-08-25",
    updatedAt: "2026-10-20",
    category: "How-to",
    primaryKeyword: "how to edit vertical video on iphone",
    readMinutes: 4,
  },
  {
    slug: "dji-osmo-pocket-3-luts",
    title: "DJI Osmo Pocket 3 LUTs: the official download and iPhone workflow",
    description: "Find DJI’s official Pocket 3 D-Log M to Rec.709 LUT, identify your recording mode and test a matching .cube file on iPhone.",
    publishedAt: "2026-08-25",
    updatedAt: "2026-10-20",
    category: "Roundup",
    primaryKeyword: "dji osmo pocket 3 luts",
    readMinutes: 4,
  },
  {
    slug: "cube-lut-explained",
    title: "What is a .cube LUT file? Format, table sizes and iPhone import",
    description: "Understand 1D and 3D lookup tables, what 17, 33 and 65 mean, and how to test a .cube file in ReelClip without confusing a creative look with a camera conversion.",
    publishedAt: "2026-08-25",
    updatedAt: "2026-10-20",
    category: "Tutorial",
    primaryKeyword: "what is a .cube lut file",
    readMinutes: 4,
  },
  {
    slug: "dji-d-log-to-rec709-iphone",
    title: "DJI D-Log to Rec.709 on iPhone: match the camera and recording profile",
    description: "Choose a model-specific DJI conversion, avoid applying it twice and test the result on iPhone before editing the full recording.",
    publishedAt: "2026-08-25",
    updatedAt: "2026-10-20",
    category: "Tutorial",
    primaryKeyword: "convert dji d-log to rec 709 on iphone",
    readMinutes: 4,
  },
  {
    slug: "dji-osmo-pocket-color-grading",
    title: "DJI Osmo Pocket color grading on iPhone: choose the right recording profile",
    description: "Distinguish D-Cinelike, D-Log M and other Pocket profiles, choose a matching conversion and review creative color changes on your iPhone.",
    publishedAt: "2026-08-25",
    updatedAt: "2026-10-20",
    category: "Use case",
    primaryKeyword: "dji osmo pocket color grading",
    readMinutes: 4,
  },
  {
    slug: "edit-dji-osmo-footage-iphone",
    title: "How to edit DJI footage on iPhone: import, choose moments and review the result",
    description: "Transfer Osmo footage with DJI Mimo or a compatible card reader, import from Photos or Files, then choose and review clips in ReelClip.",
    publishedAt: "2026-08-25",
    updatedAt: "2026-10-21",
    category: "How-to",
    primaryKeyword: "edit dji osmo footage on iphone",
    readMinutes: 5,
  },
  {
    slug: "how-to-apply-lut-on-iphone",
    title: "How to apply a .cube LUT on iPhone",
    description: "Import a .cube LUT from Files, adjust its strength and compare the preview in ReelClip. Includes a short recording of the actual controls.",
    publishedAt: "2026-08-25",
    updatedAt: "2026-10-20",
    category: "How-to",
    primaryKeyword: "how to apply a lut on iphone",
    readMinutes: 4,
  },
  {
    slug: "capcut-alternative-no-watermark",
    title: "A CapCut alternative without a watermark: choose by the edit you need",
    description: "Compare ReelClip for selecting and captioning short clips with iMovie for a timeline edit, and check the actual export requirements before choosing a plan.",
    publishedAt: "2026-08-24",
    updatedAt: "2026-10-20",
    category: "Comparison",
    primaryKeyword: "capcut alternative no watermark",
    readMinutes: 4,
  },
  {
    slug: "how-to-cut-long-video-for-tiktok",
    title:
      "How to cut a long video for TikTok on iPhone",
    description:
      "Prepare clips from a long recording with ReelClip’s Cut controls, review the framing and captions, then save the videos you want to upload to TikTok.",
    publishedAt: "2026-08-24",
    updatedAt: "2026-10-20",
    category: "Tutorial",
    primaryKeyword: "how to cut a long video for tiktok",
    readMinutes: 5,
  },
  {
    slug: "extract-clip-from-podcast",
    title: "How to extract highlights from a podcast on iPhone",
    description: "Use the transcript to find and review spoken moments from a podcast video, check captions, and prepare clips for export on iPhone.",
    publishedAt: "2026-08-24",
    updatedAt: "2026-10-20",
    category: "Use case",
    primaryKeyword: "how to clip podcast highlights",
    readMinutes: 4,
  },
  {
    slug: "remove-silence-from-video-free",
    title: "How to remove silence from a video on iPhone",
    description: "Use ReelClip’s Transcript pause controls, review the timing and check the edited video. Preview before export; saving requires Creator.",
    publishedAt: "2026-08-24",
    updatedAt: "2026-10-20",
    category: "How-to",
    primaryKeyword: "remove silence from video iphone",
    readMinutes: 4,
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
