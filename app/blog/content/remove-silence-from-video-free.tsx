import { GuideVideo } from "@/components/guide-video";
import { PostBody, PostCta, PostH2, PostHeader, PostLink, PostOl, PostP } from "@/components/blog";

export const POST_META = {
  slug: "remove-silence-from-video-free",
  title: "How to remove silence from a video on iPhone",
  description: "Use ReelClip’s Transcript pause controls, review the timing and check the edited video. Preview before export; saving requires Creator.",
  publishedAt: "2026-08-24",
  updatedAt: "2026-10-20",
  category: "How-to" as const,
  primaryKeyword: "remove silence from video iphone",
  readMinutes: 4,
};

export default function Post() {
  return <>
    <PostHeader {...POST_META} />
    <PostBody>
        <PostP>
          Long gaps can make a spoken video feel slow. ReelClip’s Transcript
          mode lets you remove pauses and review the resulting video on your
          iPhone. Preview the edit before deciding to export; saving the output
          requires Creator.
        </PostP>
        <GuideVideo id="pause-cleanup" />
        <PostH2>Find the pause controls</PostH2>
        <PostOl>
          <li>Import your video and choose Transcript. Wait for the transcript to finish.</li>
          <li>Open Audio, then find Cleanup and turn on Remove pauses.</li>
          <li>Expand Cut timing to inspect the pause threshold and the space left around speech.</li>
          <li>Tap Audio again to close its panel and check the pauses in the transcript.</li>
          <li>Choose Review video to prepare and play the edited result.</li>
        </PostOl>
        <PostP>
          In the recorded example, Cut pauses longer than is set to 0.35s.
          That is an example, not a setting every recording needs. A lower
          threshold removes shorter gaps; leave enough room for natural speech
          and any pauses that carry meaning.
        </PostP>
        <PostH2>Check which pauses will be removed</PostH2>
        <PostP>
          Green Auto keep leaves a pause in the edit. Red Auto remove or Remove
          marks it for removal. Check the label on the long pause itself before
          reviewing the output; the play button is only for listening to that gap.
        </PostP>
        <PostP>
          To remove one gap yourself, open its Pause action menu and choose
          Remove pause. Check the removal marker again before choosing Review video.
        </PostP>
        <PostH2>Listen at the cuts</PostH2>
        <PostP>
          Use headphones or your speaker to check the beginning and end of each
          phrase. If a breath or the end of a word feels clipped, adjust the
          timing and review again. Check the transcript too; recognition errors
          can make an edit behave differently from what you expect.
        </PostP>
        <PostP>
          Pause removal and filler-word removal are separate controls. Start
          with the change you need, then listen to the result before adding
          more cleanup.
        </PostP>
        <PostH2>Keep the version you reviewed</PostH2>
        <PostP>
          After reviewing the output, use Save to Photos and wait for completion.
          Your original recording stays intact. If you need caption files,
          inspect the transcript export options separately instead of assuming
          a video save also creates an SRT or VTT file.
        </PostP>
        <PostP>
          For selecting a particular spoken moment, see
          {" "}<PostLink href="/blog/extract-clip-from-podcast">the podcast clipping guide</PostLink>.
          For regularly spaced clips, use <PostLink href="/blog/how-to-cut-long-video-for-tiktok">Cut</PostLink>.
        </PostP>
        <PostCta />
    </PostBody>
  </>;
}
