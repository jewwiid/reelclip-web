import {
  PostBody,
  PostCta,
  PostH2,
  PostH3,
  PostHeader,
  PostLink,
  PostOl,
  PostP,
  PostUl,
} from "@/components/blog";

export const POST_META = {
  slug: "how-to-cut-long-video-for-tiktok",
  title: "How to cut a long video for TikTok on iPhone (without re-uploading)",
  description:
    "A 7-step workflow that takes one long recording and turns it into 3–5 TikTok-ready vertical clips — all on your iPhone, with no cloud upload.",
  publishedAt: "2026-08-24",
  category: "Tutorial" as const,
  primaryKeyword: "how to cut a long video for tiktok",
  readMinutes: 6,
};

export default function Post() {
  return (
    <>
      <PostHeader {...POST_META} />
      <PostBody>
        <PostP>
          You have a 12-minute talking-head video, a stream recording, or a
          long vlog — and you want three or four TikTok-ready clips out of it.
          Uploading the whole thing to a desktop editor, scrubbing a timeline,
          and rendering each clip is the slow way. On iPhone, with on-device
          AI, it is now a 5-minute job. Here is the workflow.
        </PostP>

        <PostH2>What you need</PostH2>
        <PostUl>
          <li>
            The long recording already in your Photos library, or in the Files
            app.
          </li>
          <li>An iPhone running iOS 26 or later.</li>
          <li>
            <PostLink href="/">ReelClip</PostLink> (free to import and
            preview, Creator plan to export). For iOS 26+ devices with Apple
            Intelligence enabled, the AI mode is available too.
          </li>
        </PostUl>

        <PostH2>The 7-step workflow</PostH2>

        <PostH3>1. Import the recording into ReelClip</PostH3>
        <PostP>
          Open ReelClip and tap <strong className="text-text">Import</strong>.
          Pick the long video from the Photos picker. ReelClip copies it into
          its private sandbox — the original file in Photos stays untouched,
          and nothing is uploaded.
        </PostP>

        <PostH3>2. Pick the right cut mode</PostH3>
        <PostP>
          There are four cut modes. Pick the one that matches your source
          material:
        </PostP>
        <PostUl>
          <li>
            <strong className="text-text">Cut</strong> — splits the video
            into equal-duration pieces. Good when the recording has clear
            segments (interview sections, list items, chapters).
          </li>
          <li>
            <strong className="text-text">Transcript</strong> — runs
            on-device speech recognition, finds the pauses, and lets you trim
            the dead air. Good for talking-head content and podcasts.
          </li>
          <li>
            <strong className="text-text">Slice</strong> — manual highlight
            mode. Drag start and end points on the timeline. Good when you
            already know which moments you want.
          </li>
          <li>
            <strong className="text-text">AI</strong> — describe what you
            want ("the funniest moment", "the part where I explain the
            pricing", "the most quotable line") and on-device Apple
            Intelligence picks the moments. Good when you do not want to
            scrub yourself.
          </li>
        </PostUl>

        <PostH3>3. Review every planned clip</PostH3>
        <PostP>
          This is the step people skip, and it is the one that matters. Tap
          each planned clip, watch it from start to finish, and either keep,
          trim, or reject it. ReelClip never auto-exports. You decide what
          ships.
        </PostP>

        <PostH3>4. Trim each clip to TikTok length</PostH3>
        <PostP>
          TikTok supports videos up to 10 minutes, but the algorithm
          consistently rewards clips under 90 seconds. While you are
          reviewing, tighten the start and end of each clip — the first
          second is the one viewers decide on.
        </PostP>

        <PostH3>5. Pick a vertical export</PostH3>
        <PostP>
          If your source video is landscape, you have two choices: export as
          is (TikTok accepts landscape and will letterbox), or change the
          framing in your finishing editor. ReelClip exports the trimmed
          range at the original aspect ratio — it does not crop or zoom.
        </PostP>

        <PostH3>6. Save the batch to Photos</PostH3>
        <PostP>
          When you are happy with the review screen, tap{" "}
          <strong className="text-text">Save clips</strong>. ReelClip exports
          each approved clip to your Photos library with a confirmation
          notification. The originals are not modified.
        </PostP>

        <PostH3>7. Upload to TikTok from Photos</PostH3>
        <PostP>
          Open TikTok, tap the plus button, then{" "}
          <strong className="text-text">Upload</strong>. Pick the first clip
          from your library. TikTok will pull it from your device — ReelClip
          never had access to your TikTok account and never uploaded
          anything to TikTok's servers.
        </PostP>

        <PostH2>Common pitfalls</PostH2>
        <PostUl>
          <li>
            <strong className="text-text">Skipping the review.</strong> The
            AI mode is good but not perfect. Always watch each clip
            start-to-finish before exporting.
          </li>
          <li>
            <strong className="text-text">Uploading the original 12-minute
            file.</strong> That is the workflow ReelClip exists to avoid.
            Smaller, tighter clips get watched further.
          </li>
          <li>
            <strong className="text-text">No captions.</strong> 80% of
            TikTok is watched on mute. Add burned-in captions in your
            finishing editor — or use ReelClip's caption export if you want
            an SRT/VTT file to drop into CapCut.
          </li>
        </PostUl>

        <PostH2>What to do after TikTok</PostH2>
        <PostP>
          Once you have a TikTok workflow, the same clips usually work on
          YouTube Shorts and Instagram Reels. Cross-posting is the cheapest
          growth move in short-form video — one batch of clips, three
          platforms, three audiences. See{" "}
          <PostLink href="/blog/extract-clip-from-podcast">
            how to extract podcast highlights
          </PostLink>{" "}
          for a related workflow.
        </PostP>

        <PostCta />
      </PostBody>
    </>
  );
}
