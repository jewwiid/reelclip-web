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

> ReelClip is an iPhone app that turns longer recordings into share-ready short clips for Instagram Reels, TikTok and YouTube Shorts. Video is processed on device and never uploaded. Free to create and preview; saving and exporting clips needs Creator: $14.99 one-time or $4.99 a month (US App Store prices; Apple shows the local price before purchase). No watermark.

ReelClip is a clip-preparation tool, not a full multitrack timeline editor, stream recorder, stream downloader or social publisher. It suits creators, streamers, gamers, podcasters and camera owners who need to edit a video file already in Photos or Files into shorter clips. ReelClip does not grant permission to reuse another person's stream or game footage.

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

## Free tools

- [Reels, TikTok and Shorts safe zone checker](${SITE_URL}/tools/safe-zone-checker): drop a 9:16 video or frame and see which areas platform buttons and captions cover. Runs in the browser; nothing is uploaded.

## App controls and walkthrough evidence

- [Cut: split a recording into equal clips — control reference](${SITE_URL}/app-reference/equal-clips.md): exact English UI labels, control meanings, steps with video timestamps and two reviewed screenshots. Also available as a [readable reference page](${SITE_URL}/app-reference/equal-clips). Explains No gap, Clip amount, calculated Clip duration and Add to Planned Clips. This recording demonstrates planning and preview; it does not show a completed save to Photos.
- [Structured equal-clips reference](${SITE_URL}/app-reference/equal-clips.json): the same reviewed facts in JSON, including recording and screenshot hashes. Scope is this walkthrough; it is not a complete app reference or proof of current-build runtime coverage.

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
