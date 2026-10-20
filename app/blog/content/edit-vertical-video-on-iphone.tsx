import { GuideVideo } from "@/components/guide-video";
import { PostBody, PostCta, PostH2, PostHeader, PostLink, PostOl, PostP } from "@/components/blog";

export const POST_META = {
  slug: "edit-vertical-video-on-iphone",
  title: "How to edit vertical video on iPhone (Reels, TikTok, Shorts)",
  description: "Choose and refine moments from portrait footage in ReelClip, review captions and framing, and save the clips you want to post.",
  publishedAt: "2026-08-25",
  updatedAt: "2026-10-20",
  category: "How-to" as const,
  primaryKeyword: "how to edit vertical video on iphone",
  readMinutes: 4,
};

export default function Post() {
  return <>
    <PostHeader {...POST_META} />
    <PostBody>
        <PostP>
          Start with a portrait recording and choose the moments you want to
          keep. In ReelClip, Slice selects a time range; it does not decide
          which part of the picture should fit a different aspect ratio.
          Check the framing separately before you post.
        </PostP>
        <GuideVideo id="choose-moment" />
        <PostH2>Choose a moment with Slice</PostH2>
        <PostOl>
          <li>Import the recording from Photos or Files, then open Clip.</li>
          <li>Choose Slice. Move the selection to the part you want to keep.</li>
          <li>Adjust the start and end so the action or sentence has enough context.</li>
          <li>Tap Add, then repeat for any other moments you want.</li>
        </PostOl>
        <PostP>
          The demo uses a short sample and three selections. Your recording can
          need a different number or length of clips. Watch each selection;
          a cut that works visually can still interrupt a spoken sentence.
        </PostP>
        <PostH2>Review the picture and the words</PostH2>
        <PostP>
          Play the planned clips and check their first and last frames. A
          portrait source already has a vertical picture; a landscape source
          needs a separate framing decision. Changing the selected time range
          does not automatically crop the image for a Reel or Short.
        </PostP>
        <PostP>
          For spoken footage, review the transcript and captions as well.
          Correct names and specialist terms, then check that the text stays
          readable over the picture. See the <PostLink href="/blog/extract-clip-from-podcast">transcript workflow</PostLink>
          {" "}for an example using speech.
        </PostP>
        <PostH2>Save, then upload</PostH2>
        <PostP>
          Choose Review and inspect the prepared output before saving to
          Photos. Export requires Creator. Wait for the save confirmation,
          then open the destination app and upload the saved file yourself.
          Check its current upload requirements if you change the output format.
        </PostP>
        <PostP>
          If you want regularly spaced clips instead of hand-picked moments,
          use <PostLink href="/blog/how-to-cut-long-video-for-tiktok">the Cut workflow</PostLink>.
        </PostP>
        <PostCta />
    </PostBody>
  </>;
}
