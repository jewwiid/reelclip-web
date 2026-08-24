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
  slug: "remove-silence-from-video-free",
  title: "How to remove silence from a video on iPhone (free, on-device)",
  description:
    "Pause detection and dead-air removal in a free iPhone app — no upload, no signup, and your audio stays on your device. Includes the exact settings to use.",
  publishedAt: "2026-08-24",
  category: "How-to" as const,
  primaryKeyword: "remove silence from video iphone",
  readMinutes: 5,
};

export default function Post() {
  return (
    <>
      <PostHeader {...POST_META} />
      <PostBody>
        <PostP>
          You recorded a screen capture, a tutorial, or a talking-head
          video and the audio has long pauses between every sentence. You
          could open a desktop editor, find each pause, and trim it
          manually. Or you could let your iPhone find the pauses for you
          and ship a tighter version in five minutes.
        </PostP>

        <PostH2>The right tool: ReelClip's Transcript mode</PostH2>
        <PostP>
          ReelClip's Transcript mode is built around on-device speech
          recognition. It does three things at once:
        </PostP>
        <PostOl>
          <li>Transcribes your video locally.</li>
          <li>Detects pauses longer than a threshold you set.</li>
          <li>Flags filler words ("um", "uh", "like") for individual
            removal.</li>
        </PostOl>
        <PostP>
          You see the transcript, the pause markers, and the filler-word
          markers side by side with the video timeline. From there you can
          keep all the cuts the AI suggests, cherry-pick, or ignore them
          entirely. You stay in control.
        </PostP>

        <PostH2>The exact settings to use</PostH2>
        <PostP>
          Open ReelClip, import your video, and choose Transcript mode.
          These are the settings that work for most talking-head content:
        </PostP>
        <PostUl>
          <li>
            <strong className="text-text">Pause threshold:</strong>{" "}
            0.75 seconds. Below this and you will cut natural breaths.
            Above this and you start to skip intended pauses.
          </li>
          <li>
            <strong className="text-text">Filler-word removal:</strong>{" "}
            On. The default conservative list catches "um", "uh", "er",
            and "like" when they are clearly filler, not content words.
          </li>
          <li>
            <strong className="text-text">Maximum cut duration:</strong>{" "}
            2.0 seconds. You do not want a single cut to remove more than
            two seconds of audio — longer gaps often have intentional
            content.
          </li>
          <li>
            <strong className="text-text">Review every clip:</strong>{" "}
            On. ReelClip never auto-exports; you approve each cut.
          </li>
        </PostUl>

        <PostH3>Step-by-step</PostH3>
        <PostOl>
          <li>
            Open ReelClip and import the video from Photos. The file is
            copied into the app's sandbox — nothing is uploaded.
          </li>
          <li>
            Switch to Transcript mode. Wait for transcription to finish
            (usually a few minutes for a 10-minute video on Apple
            Silicon).
          </li>
          <li>
            The transcript appears in a side panel. Each pause longer than
            your threshold is highlighted.
          </li>
          <li>
            Tap each pause marker to preview the cut. If you want it
            trimmed, accept it. If it is intentional, leave it.
          </li>
          <li>
            Once you have accepted the cuts you want, tap{" "}
            <strong className="text-text">Save clips</strong>.
          </li>
        </PostOl>

        <PostH2>Why this works better than a desktop editor</PostH2>
        <PostP>
          Manual silence removal is slow because every pause looks the
          same on a waveform. The transcript gives you context — you can
          see that the 1.5-second gap you just trimmed was right after the
          sentence "and that's why we use Apple Intelligence", not after
          a joke you wanted to keep.
        </PostP>
        <PostP>
          And because the work is on-device, you can do it on recordings
          that you would not upload anywhere — internal meetings, sensitive
          interviews, unreleased podcast material.
        </PostP>

        <PostH2>What you get out</PostH2>
        <PostP>
          When you save, ReelClip exports the trimmed clip to your Photos
          library. The original video stays untouched. You also get the
          transcript as a separate text file, and an SRT or VTT file with
          word-level cues — useful if you want captions in CapCut, VN, or
          any other editor.
        </PostP>

        <PostH2>What to do next</PostH2>
        <PostP>
          See{" "}
          <PostLink href="/blog/extract-clip-from-podcast">
            how to extract podcast highlights
          </PostLink>{" "}
          for the broader podcaster workflow, or{" "}
          <PostLink href="/blog/how-to-cut-long-video-for-tiktok">
            how to cut a long video for TikTok
          </PostLink>{" "}
          for the short-form workflow that pairs with this.
        </PostP>

        <PostCta />
      </PostBody>
    </>
  );
}
