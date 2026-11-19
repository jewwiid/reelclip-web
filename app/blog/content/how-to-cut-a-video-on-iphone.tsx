import { CutDemoVideo } from "@/components/cut-demo-video";
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
  slug: "how-to-cut-a-video-on-iphone",
  title: "How to cut a video on iPhone: trim or split it into clips",
  description:
    "Learn to trim one video with Photos, split at a chosen point with iMovie, or use ReelClip to select and review several clips.",
  publishedAt: "2026-10-21",
  category: "How-to" as const,
  primaryKeyword: "how to cut a video on iphone",
  readMinutes: 4,
};

export default function Post() {
  return (
    <>
      <PostHeader {...POST_META} />
      <PostBody>
        <PostP>
          For one quick trim, open a video in Photos, tap Edit, adjust its
          start and stop handles, tap Done, and choose Save Video or Save Video
          as New Clip. To divide a clip at a chosen point inside a movie
          project, use iMovie’s Split command. To prepare several excerpts
          from a long recording, use ReelClip’s Cut for a batch or Slice for
          moments you select.
        </PostP>

        <PostH2>Choose the right kind of cut</PostH2>
        <PostUl>
          <li>
            <strong className="text-text">Trim the start or end:</strong> Use
            Photos for a quick shorter version of one recording. Choose Save
            Video as New Clip if you want to keep the original alongside it.
          </li>
          <li>
            <strong className="text-text">Split at a point in a timeline:</strong>{" "}
            Use iMovie when you want to divide a clip inside a movie project and
            continue arranging the sections there.
          </li>
          <li>
            <strong className="text-text">Prepare several standalone clips:</strong>{" "}
            Use ReelClip when you want a set of selected or evenly sized
            moments from a source recording, then check each result before
            export.
          </li>
        </PostUl>

        <PostH2>Trim one video in Photos</PostH2>
        <PostOl>
          <li>Open Photos and select the video.</li>
          <li>Tap Edit.</li>
          <li>Drag the handles at the ends of the frame viewer to set the new start and stop times.</li>
          <li>Preview the selection, then tap Done.</li>
          <li>Choose Save Video to keep the trimmed version, or Save Video as New Clip to keep both versions.</li>
        </PostOl>
        <PostP>
          Photos changes the beginning and end of the selected video. For a
          detailed version of Apple’s current instructions, see{" "}
          <PostLink href="https://support.apple.com/guide/iphone/iph1d1344a2d/27/ios/27" external>
            Apple’s guide to trimming a video on iPhone
          </PostLink>
          .
        </PostP>

        <PostH2>Split a video at a chosen point in iMovie</PostH2>
        <PostP>
          In an iMovie project, move the playhead to the split point. Select
          the video clip, tap Actions, then tap Split. You can also select the
          clip and swipe down over the playhead. The two sections stay in the
          project while you continue editing. See{" "}
          <PostLink href="https://support.apple.com/guide/imovie-iphone/knac788312/ios" external>
            Apple’s iMovie instructions for splitting a clip
          </PostLink>
          .
        </PostP>

        <PostH2>Make a batch of clips in ReelClip</PostH2>
        <PostP>
          Import the source video from Photos or Files. For consecutive,
          equal-duration clips from the whole recording, choose{" "}
          <strong className="text-text">Cut</strong>, set{" "}
          <strong className="text-text">Space</strong> to{" "}
          <strong className="text-text">No gap</strong>, choose the{" "}
          <strong className="text-text">Clip amount</strong>, and check the
          resulting <strong className="text-text">Clip duration</strong>. Tap{" "}
          <strong className="text-text">Add</strong> to put the selection in
          Planned Clips. Choose <strong className="text-text">Slice</strong>{" "}
          to select start and end times yourself. Play every planned clip and
          adjust any cut that interrupts a sentence or action.
        </PostP>

        <CutDemoVideo />

        <PostP>
          This walkthrough shows an equal-clip Cut recipe and preview. It does
          not show a completed save to Photos. ReelClip is free to import and
          preview; saving or exporting your work requires Creator mode. The app prepares the
          video files but does not post them to TikTok, Instagram or YouTube.
          For a longer social workflow, see{" "}
          <PostLink href="/blog/how-to-cut-long-video-for-tiktok">
            how to prepare clips from a long video for TikTok
          </PostLink>
          , or read the{" "}
          <PostLink href="/blog/video-length-social-media-reach">
            guide to splitting a recording into equal clips
          </PostLink>
          .
        </PostP>

        <PostH3>Which option should I use?</PostH3>
        <PostP>
          Use Photos for one quick trim, iMovie for a timeline edit with a
          precise split point, and ReelClip when you want to choose or batch
          short sections from a longer recording. Keep the original until
          you’ve reviewed the versions you plan to share.
        </PostP>

        <PostCta />
      </PostBody>
    </>
  );
}
