import { GuideVideo } from "@/components/guide-video";
import {
  PostBody,
  PostCta,
  PostH2,
  PostH3,
  PostHeader,
  PostLink,
  PostP,
  PostUl,
} from "@/components/blog";

export const POST_META = {
  slug: "how-to-cut-long-video-for-tiktok",
  title: "How to cut a long video for TikTok on iPhone",
  description:
    "Prepare clips from a long recording with ReelClip’s Cut controls, review the framing and captions, then save the videos you want to upload to TikTok.",
  publishedAt: "2026-08-24",
  updatedAt: "2026-10-21",
  category: "Tutorial" as const,
  primaryKeyword: "how to cut a long video for tiktok",
  readMinutes: 5,
};

export default function Post() {
  return (
    <>
      <PostHeader {...POST_META} />
      <PostBody>
        <PostP>
          You have a 12-minute talking-head video, a stream recording, or a
          long vlog — and you want three or four TikTok-ready clips out of it.
          You can prepare those clips directly on your iPhone, review each
          moment, and save the ones you want to post. How long it takes
          depends on the recording, your device, and how much you edit.
        </PostP>

        <GuideVideo id="cut-clips" />

        <PostH2>What you need</PostH2>
        <PostUl>
          <li>
            The long recording already in your Photos library, or in the Files
            app.
          </li>
          <li>An iPhone running iOS 17 or later, as listed for the current app release.</li>
          <li>
            <PostLink href="/">ReelClip</PostLink> (free to import and
            preview; saving or exporting requires Creator mode). AI features have additional
            hardware and software requirements, including compatible, enabled
            Apple Intelligence. Check availability on your device.
          </li>
        </PostUl>

        <PostH2>The 7-step workflow</PostH2>

        <PostH3>1. Import the recording into ReelClip</PostH3>
        <PostP>
          Import your recording from Photos or Files. ReelClip copies it into
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
            <strong className="text-text">Slice</strong> — choose a moment
            yourself, move the selection and refine its start and end.
          </li>
          <li>
            <strong className="text-text">AI</strong> — describe what you
            want (“the funniest moment”, “the part where I explain the
            pricing”, “the most quotable line”) and on-device Apple
            Intelligence can propose moments for you to review when the
            feature is available on your device.
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
          Give each clip one complete idea. Tighten the start, remove any
          unnecessary lead-in, and keep enough context for someone who
          has never seen the full recording. Check TikTok’s current upload
          limits before posting; there is no universal ideal clip length.
        </PostP>

        <PostH3>5. Check the framing for a vertical post</PostH3>
        <PostP>
          If your source video is landscape, you have two choices: export as
          is, or crop it for a vertical post in your finishing editor.
          Choosing a time range and choosing the picture framing are separate
          decisions; inspect both before posting.
        </PostP>

        <PostH3>6. Save the batch to Photos</PostH3>
        <PostP>
          Tap <strong className="text-text">Review</strong> and wait for the
          clips to finish preparing. Play the outputs, then choose the save
          action for Photos. Wait for the completion confirmation before
          leaving the app. Saving or exporting a finished video requires Creator mode; the originals stay intact.
        </PostP>

        <PostH3>7. Upload to TikTok from Photos</PostH3>
        <PostP>
          Open TikTok, tap the plus button, then{" "}
          <strong className="text-text">Upload</strong>. Pick the first clip
          from your library. TikTok will pull it from your device — ReelClip
          never had access to your TikTok account and never uploaded
          anything to TikTok’s servers.
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
            file.</strong> Keep the source, then choose a version that fits the story
            and destination. A shorter clip does not guarantee more views.
          </li>
          <li>
            <strong className="text-text">No captions.</strong> Captions
            help people follow speech when they cannot listen. Check their
            spelling and timing in your finishing editor before posting.
          </li>
        </PostUl>

        <PostH2>What to do after TikTok</PostH2>
        <PostP>
          Before cross-posting to YouTube Shorts or Instagram Reels, check
          each platform’s current format and length requirements. The same
          moment may need different framing or duration for each destination.
          Read our <PostLink href="/blog/video-length-social-media-reach">guide to video length and reach</PostLink>
          {" "}for the platform distinctions, or see{" "}
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
