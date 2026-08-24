/**
 * Structured data (JSON-LD) for ReelClip marketing pages.
 * Rendered as a single <script type="application/ld+json"> tag.
 * Use one component per page that needs schema — Google can read multiple
 * objects in one block, but each object is its own component for clarity.
 *
 * Schema docs:
 * - SoftwareApplication: https://schema.org/SoftwareApplication
 * - Organization:         https://schema.org/Organization
 * - FAQPage:              https://schema.org/FAQPage
 * - BreadcrumbList:       https://schema.org/BreadcrumbList
 */

type JsonLd = Record<string, unknown>;

function JsonLdScript({ data, id }: { data: JsonLd; id: string }) {
  return (
    <script
      id={id}
      type="application/ld+json"
      // Server-rendered, static JSON — no escaping risk.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Site-wide Organization schema. Brand, contact, social, app store link. */
export function OrganizationJsonLd() {
  const data: JsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ReelClip",
    url: "https://reelclips.app",
    logo: "https://www.reelclips.app/icon.png",
    description:
      "ReelClip is a strictly on-device iOS video clip preparation tool. Cut long recordings into share-ready clips for Reels, TikTok, Shorts, or any editor you already use.",
    email: "jude@reelclips.app",
    sameAs: [
      "https://apps.apple.com/app/reelclip/id6787742864",
    ],
  };
  return <JsonLdScript id="ld-organization" data={data} />;
}

/**
 * SoftwareApplication schema for the App Store listing. Lives on the home
 * page so the marketing surface backs the iOS listing with identical facts
 * (Apple checks this for ASO 2.3.7 metadata accuracy).
 */
export function SoftwareApplicationJsonLd() {
  const data: JsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "ReelClip",
    applicationCategory: "MultimediaApplication",
    applicationSubCategory: "Video Editor",
    operatingSystem: "iOS 26.0 or later",
    description:
      "Cut long videos into share-ready clips on iPhone. Four cut modes (Cut, Transcript, Slice, AI with Apple Intelligence). On-device, no cloud upload. Translate captions and dub audio.",
    url: "https://reelclips.app",
    downloadUrl:
      "https://apps.apple.com/app/reelclip/id6787742864",
    softwareVersion: "1.3.1",
    fileSize: "varies by device",
    inLanguage: "en",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      category: "Free with in-app purchases",
    },
    author: {
      "@type": "Organization",
      name: "ReelClip",
      url: "https://reelclips.app",
    },
    featureList: [
      "On-device AI cut planning with Apple Intelligence",
      "Four cut modes: Cut, Transcript, Slice, AI",
      "On-device transcription (SFSpeechRecognizer + WhisperKit)",
      "Translate captions into other languages",
      "Dub audio with synthesized translated speech",
      "Export SRT, VTT, and plain-text subtitles",
      "Burned-in caption styles (Pop, Karaoke, Clean, One word)",
      "Silence and filler-word removal",
      "Saves clips directly to your Photos library",
      "No cloud upload, no analytics, no tracking",
    ],
    aggregateRating: undefined,
    screenshot: [
      "https://www.reelclips.app/opengraph-image.png",
    ],
  };
  return <JsonLdScript id="ld-software-application" data={data} />;
}

export type FaqItem = {
  question: string;
  answer: string;
};

/**
 * FAQPage schema. Wraps the visible Q&A blocks so Google can render rich
 * results (the FAQ accordion you see under some #1 SERPs).
 *
 * Pass an `items` array. Each item.answer is rendered as plain text — keep
 * answers self-contained (no HTML, no internal links inside the answer).
 */
export function FaqPageJsonLd({ items }: { items: FaqItem[] }) {
  const data: JsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
  return <JsonLdScript id="ld-faq" data={data} />;
}

/**
 * BreadcrumbList schema. Use on any non-root page so Google shows the path.
 */
export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const data: JsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
  return <JsonLdScript id="ld-breadcrumb" data={data} />;
}

/** WebSite + SearchAction — gives Google a sitelinks searchbox. */
export function WebSiteJsonLd() {
  const data: JsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ReelClip",
    url: "https://reelclips.app",
    publisher: {
      "@type": "Organization",
      name: "ReelClip",
      logo: {
        "@type": "ImageObject",
        url: "https://www.reelclips.app/icon.png",
      },
    },
  };
  return <JsonLdScript id="ld-website" data={data} />;
}

/**
 * BlogPosting schema. Pass an ISO datePublished and ISO dateModified —
 * Google uses these to determine freshness. author is the ReelClip org.
 */
export function BlogPostingJsonLd({
  url,
  headline,
  description,
  datePublished,
  dateModified,
  imageUrl,
}: {
  url: string;
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  imageUrl?: string;
}) {
  const data: JsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    headline,
    description,
    datePublished,
    dateModified: dateModified ?? datePublished,
    inLanguage: "en",
    author: {
      "@type": "Organization",
      name: "ReelClip",
      url: "https://reelclips.app",
    },
    publisher: {
      "@type": "Organization",
      name: "ReelClip",
      logo: {
        "@type": "ImageObject",
        url: "https://www.reelclips.app/icon.png",
      },
    },
    image: imageUrl ?? "https://www.reelclips.app/opengraph-image.png",
  };
  return <JsonLdScript id="ld-blog-posting" data={data} />;
}
