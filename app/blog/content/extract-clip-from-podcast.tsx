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
  slug: "extract-clip-from-podcast",
  title: "How to extract highlights from a podcast on iPhone",
  description:
    "Podcasters: how to turn a one-hour recording into five short highlight clips for Reels, TikTok, and Shorts — using on-device transcription so the audio never leaves your phone.",
  publishedAt: "2026-08-24",
  category: "Use case" as const,
  primaryKeyword: "how to clip podcast highlights",
  readMinutes: 8,
};

export default function Post() {
  return (
    <>
      <PostHeader {...POST_META} />
      <PostBody>
        <PostP>
          You have finished a one-hour podcast episode. You know there are
          five moments in there that would make great TikTok clips — a strong
          opinion, a funny aside, a quotable line. The problem is finding
          them. Scrubbing a timeline at 1x speed takes longer than the
          episode itself.
        </PostP>

        <PostP>
          The fix is on-device transcription. Your iPhone can turn the
          episode into a searchable transcript in minutes, and from there
          you can pick the moments worth clipping without watching the
          whole thing.
        </PostP>

        <PostH2>Why on-device matters for podcasts</PostH2>
        <PostP>
          Most podcasters do not upload raw audio to a cloud service, full
          stop. Conversations with sources, unreleased material, sensitive
          topics — these all stay local. If your highlight tool uploads
          the audio, it is the wrong tool.
        </PostP>
        <PostP>
          ReelClip runs the entire workflow on-device via Apple's{" "}
          <code className="px-1.5 py-0.5 rounded bg-surface text-xs text-text-muted mx-1">
            SFSpeechRecognizer
          </code>
          . Your audio is copied into the app's private sandbox, transcribed
          locally, and never sent to any server. The transcript itself is
          on-device.
        </PostP>

        <PostH2>The workflow</PostH2>

        <PostH3>1. Import the episode audio</PostH3>
        <PostP>
          ReelClip can import any video or audio file from the Files app or
          Photos. If you have the audio as a separate file (mp3, wav,
          m4a), import that — it is faster and skips the video decoding
          step. If you only have video, that works too.
        </PostP>

        <PostH3>2. Choose Transcript mode</PostH3>
        <PostP>
          ReelClip's Transcript mode does three things:
        </PostP>
        <PostOl>
          <li>Transcribes the audio on-device.</li>
          <li>Finds pauses longer than 0.75 seconds and flags them as cuts.</li>
          <li>Identifies filler words ("um", "uh", "you know") and lets you
            remove them individually.</li>
        </PostOl>
        <PostP>
          By the end of the import step you have a transcript with
          timecodes, a list of pause markers, and a list of filler-word
          markers. This is the part that used to take a human assistant
          hours.
        </PostP>

        <PostH3>3. Read the transcript, not the audio</PostH3>
        <PostP>
          This is the unlock. Open the transcript side panel and skim it.
          Strong opinions, jokes, and quotable lines are obvious in text
          form — you can read a one-hour transcript in 15 minutes and pick
          the moments you would have scrubbed for.
        </PostP>
        <PostP>
          Tap any line in the transcript to jump the playhead to that
          moment. You are not scrubbing a waveform; you are reading a
          document.
        </PostP>

        <PostH3>4. Mark the highlight ranges</PostH3>
        <PostP>
          When you find a moment worth clipping, mark a range around it.
          ReelClip gives you a one-tap "make this a clip" button plus
          fine-grained drag handles for the exact start and end. A good
          highlight clip is usually 30–90 seconds — long enough to give
          context, short enough to keep attention.
        </PostP>

        <PostH3>5. Stack up 4–8 candidates before exporting</PostH3>
        <PostP>
          Plan more than you will use. From a one-hour podcast you can
          usually find 6–10 highlight candidates. Pick the strongest 4–5
          for the first round — the algorithm rewards consistency over a
          single viral hit, so a steady drip of clips outperforms one big
          post.
        </PostP>

        <PostH3>6. Export with captions</PostH3>
        <PostP>
          Each clip exports with the matching transcript slice attached.
          From there you can:
        </PostP>
        <PostUl>
          <li>
            Burn in captions using one of four styles (Pop, Karaoke, Clean,
            One word) — useful when the clip will live on Reels or TikTok,
            where most viewers watch on mute.
          </li>
          <li>
            Export the SRT or VTT file separately and bring it into CapCut
            or your editor of choice.
          </li>
          <li>
            Export the plain-text transcript for show notes, a Substack
            post, or an X thread.
          </li>
        </PostUl>

        <PostH3>7. Post to all three short-form platforms</PostH3>
        <PostP>
          One clip, three platforms. The caption files export the same on
          each platform — you do not need to re-cut for vertical versus
          square if your source audio was landscape video. The same clip
          works on Reels (vertical 9:16), TikTok (vertical 9:16), and
          Shorts (vertical 9:16).
        </PostP>

        <PostH2>What this looks like in practice</PostH2>
        <PostP>
          A one-hour podcast episode, end-to-end:
        </PostP>
        <PostUl>
          <li>
            <strong className="text-text">10–15 minutes</strong> to
            import and transcribe (depends on device; Apple Silicon does
            this fast).
          </li>
          <li>
            <strong className="text-text">15–20 minutes</strong> to read
            the transcript and mark highlight ranges.
          </li>
          <li>
            <strong className="text-text">5 minutes</strong> to review
            each clip and trim the start/end.
          </li>
          <li>
            <strong className="text-text">5 minutes</strong> to export and
            post across platforms.
          </li>
        </PostUl>
        <PostP>
          Total: roughly 40 minutes from episode to five posted clips,
          compared to several hours of timeline scrubbing. And because
          the audio never left the device, you can do this on a sensitive
          recording without sending it to a third party.
        </PostP>

        <PostH2>What to do next</PostH2>
        <PostP>
          See{" "}
          <PostLink href="/blog/how-to-cut-long-video-for-tiktok">
            how to cut a long video for TikTok
          </PostLink>{" "}
          for the broader short-form workflow, or{" "}
          <PostLink href="/blog/remove-silence-from-video-free">
            remove silence from video on iPhone
          </PostLink>{" "}
          for a faster path when you do not need captions.
        </PostP>

        <PostCta />
      </PostBody>
    </>
  );
}
