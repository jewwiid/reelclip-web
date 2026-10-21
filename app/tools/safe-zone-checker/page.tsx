import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PostCta, PostH2, PostLink, PostP, PostUl } from "@/components/blog";
import { SafeZoneChecker } from "@/components/safe-zone-checker";
import { BreadcrumbJsonLd, FaqPageJsonLd } from "@/components/structured-data";
import { localizedMetadata, SITE_URL } from "@/i18n/seo";

const PATH = "/tools/safe-zone-checker";
const TITLE = "Reels, TikTok & Shorts safe zone checker (free, in your browser)";
const DESCRIPTION =
  "Check whether captions, faces and logos sit inside the Instagram Reels, TikTok and YouTube Shorts safe zone. Drop a 9:16 video or frame; nothing is uploaded.";

const FAQ = [
  {
    question: "What is the Instagram Reels safe zone?",
    answer:
      "Meta’s Instagram Reels ad specifications suggest leaving about 14% of the top, 35% of the bottom and 6% of each side free of text, logos and other key details. On a 1080×1920 frame that is roughly 269px at the top, 672px at the bottom and 65px on each side.",
  },
  {
    question: "What is the TikTok safe zone?",
    answer:
      "TikTok does not publish one fixed number. Its ads help centre provides downloadable safe-zone files and says the safe area shrinks as the caption gets longer. Treat any single margin as a planning starting point and check the result on your phone.",
  },
  {
    question: "Does YouTube publish a Shorts safe zone?",
    answer:
      "YouTube does not publish a Shorts safe-zone specification. The title and channel block at the bottom and the action buttons on the right cover part of the frame, so keep captions and faces in the centre band and preview the upload.",
  },
  {
    question: "Is my video uploaded?",
    answer:
      "No. The checker reads your file inside the browser and draws the overlay locally. Nothing is sent to ReelClip or anyone else.",
  },
];

const pageMetadata: Metadata = {
  title: `${TITLE} · ReelClip`,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

export function generateMetadata(): Metadata {
  return localizedMetadata("en", PATH, pageMetadata);
}

export default function SafeZoneCheckerPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Safe zone checker", url: `${SITE_URL}${PATH}` },
        ]}
      />
      <FaqPageJsonLd items={FAQ} />
      <Nav />
      <main className="px-6 sm:px-10 py-12 sm:py-16 max-w-5xl mx-auto">
        <header className="mb-10 max-w-3xl">
          <p className="text-xs uppercase tracking-wider text-accent font-bold mb-3">Free tool</p>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">Safe zone checker for Reels, TikTok and Shorts</h1>
          <p className="text-base text-text-muted mt-4 leading-relaxed">
            Drop a vertical video or a still frame to see which parts the app’s buttons, captions and
            profile row are likely to cover. The file never leaves your browser.
          </p>
        </header>

        <SafeZoneChecker />

        <article className="mt-16 max-w-3xl space-y-4 leading-relaxed">
          <PostH2>Where the margins come from</PostH2>
          <PostUl>
            <li>
              <strong className="text-text">Instagram and Facebook Reels:</strong> the 14% top, 35% bottom and 6% side
              margins are from Meta’s{" "}
              <PostLink href="https://www.facebook.com/business/ads-guide/update/video/instagram-reels" external>
                Instagram Reels ad specifications
              </PostLink>{" "}
              (checked 20 October 2026). Meta writes them for ads, but organic Reels show the same caption, profile and
              button overlays, so they are a sensible default for any Reel.
            </li>
            <li>
              <strong className="text-text">TikTok:</strong> TikTok’s{" "}
              <PostLink href="https://ads.tiktok.com/help/article/video-ads-specifications?lang=en" external>
                in-feed ad specifications
              </PostLink>{" "}
              offer downloadable safe-zone files and note that longer captions leave a smaller safe area. The preset here
              is a planning margin that leaves room for the right-hand button column and a two-line caption.
            </li>
            <li>
              <strong className="text-text">YouTube Shorts:</strong> YouTube does not publish a Shorts safe zone. The
              preset leaves room for the right-hand actions and the title and channel block at the bottom.
            </li>
          </PostUl>
          <PostP>
            Interfaces change with app versions, languages and caption length. Use the sliders to match what you see on
            your own phone, and preview a private or draft post before publishing anything with text near the edges.
          </PostP>

          <PostH2>Fixing a clip that breaks the safe zone</PostH2>
          <PostP>
            Burned-in captions are the usual problem: they sit in the bottom third, exactly where the platform puts its own
            caption and username. Move them up into the centre band, or keep the text off the video and add it in the
            platform’s caption field instead. If you are cutting several clips from one long recording, it is easier to
            place captions once per clip while you review the cut than to fix every export afterwards. See{" "}
            <PostLink href="/blog/edit-vertical-video-on-iphone">how to edit vertical video on iPhone</PostLink> and{" "}
            <PostLink href="/blog/how-to-cut-long-video-for-tiktok">how to cut a long video for TikTok</PostLink>.
          </PostP>

          <PostH2>Questions</PostH2>
          {FAQ.map((item) => (
            <div key={item.question}>
              <h3 className="text-lg font-bold text-text mt-6 mb-2">{item.question}</h3>
              <PostP>{item.answer}</PostP>
            </div>
          ))}

          <PostCta />
        </article>
      </main>
      <Footer />
    </>
  );
}
