import { getPostsSorted } from "../blog/posts";
import { SITE_URL } from "@/i18n/seo";

/**
 * /llms.txt — a plain-text summary for AI assistants and answer engines
 * (https://llmstxt.org). Built from the guide registry so a new guide is
 * listed without touching this file. Keep the product facts in step with
 * the released App Store listing, not unreleased branches.
 */

export const dynamic = "force-static";

const APP_STORE_URL = "https://apps.apple.com/app/reelclip/id6787742864";

export function GET() {
  const guides = getPostsSorted()
    .map((post) => `- [${post.title}](${SITE_URL}/blog/${post.slug}): ${post.description}`)
    .join("\n");

  const body = `# ReelClip

> ReelClip is an iPhone app that turns longer recordings into share-ready short clips for Instagram Reels, TikTok and YouTube Shorts. Video is processed on device and never uploaded. Free to create and preview; saving and exporting clips needs a Creator plan.

ReelClip is a clip-preparation tool, not a full multitrack timeline editor. It suits creators, podcasters and camera owners (DJI Osmo, GoPro, iPhone) who need several short clips out of one long video.

Editing paths:
- Slice: select the moments to keep.
- Cut: split a video by clip count, clip length and spacing (for example, equal parts).
- Transcript: remove words, sentences and pauses by editing the text.
- AI: describe the moments you want and ReelClip plans the cuts. Uses Apple Intelligence, so it needs a supported device with Apple Intelligence enabled.

Also: timed captions (Pop, Karaoke, Clean, One Word styles), caption translation, synthetic dubbing, .cube LUT colour grading, SRT/VTT/plain-text subtitle export, and resumable ReelClip project files. Every cut is previewed before saving to Photos.

Requirements: iPhone with iOS 17.0 or later. Feature-specific requirements (Apple Intelligence for AI mode) are separate.

## Links

- [Download on the App Store](${APP_STORE_URL})
- [Website](${SITE_URL}/)
- [Pricing](${SITE_URL}/pricing)
- [How ReelClip compares with CapCut, InShot, VN, OpusClip and Quik](${SITE_URL}/competitors)
- [Support](${SITE_URL}/support)
- [Privacy policy](${SITE_URL}/privacy)

## Guides

${guides}

## Optional

- [About ReelClip](${SITE_URL}/about)
- [Brand assets](${SITE_URL}/brand)
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
