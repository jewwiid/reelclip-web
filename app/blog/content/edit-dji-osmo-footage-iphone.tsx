import { PostBody, PostCta, PostH2, PostHeader, PostLink, PostP, PostUl } from "@/components/blog";

export const POST_META = {
  "slug": "edit-dji-osmo-footage-iphone",
  "title": "How to edit DJI footage on iPhone: import, choose moments and review the result",
  "description": "Bring DJI footage into ReelClip, choose Slice, Cut or Transcript for the task, check color and captions, then review before saving.",
  "publishedAt": "2026-08-25",
  "updatedAt": "2026-10-20",
  "category": "How-to" as const,
  "primaryKeyword": "edit dji osmo footage on iphone",
  "readMinutes": 4
};

export default function Post() {
  return <>
    <PostHeader {...POST_META} />
    <PostBody>
<PostP>To edit DJI footage on iPhone, transfer the original recording to a location you can access, import it in ReelClip, and choose how you want to select moments. Check color, framing and captions before saving the clips for your publishing workflow.</PostP>
<PostH2>Keep the original when transferring</PostH2>
<PostP>Use a transfer method supported by your camera and iPhone. Keep the original camera file and a note of its recording mode rather than relying on an already processed sharing copy. If the file is in cloud storage, make sure it is available before starting the edit.</PostP>
<PostP>For camera-specific transfer steps, use the <PostLink href="https://www.dji.com/downloads" external>DJI download and manual resources</PostLink> for your model. Transfer support depends on the camera, storage and connection; one method is not guaranteed for every Osmo, Action or drone.</PostP>
<PostH2>Choose the editing mode for the task</PostH2>
<PostUl><li>Slice lets you choose a time window, move it to a moment you want and refine the edges.</li><li>Cut plans clips using the amount, duration and spacing controls. Review the selected moments before saving.</li><li>Transcript is useful for spoken recordings: read the recognized words, check errors and choose the passage in context.</li><li>AI can help plan moments from a prompt when its required device features are available. Review the proposed cuts yourself.</li></PostUl>
<PostP>The <PostLink href="/blog/edit-vertical-video-on-iphone">Slice walkthrough</PostLink> and <PostLink href="/blog/how-to-cut-long-video-for-tiktok">Cut walkthrough</PostLink> show the actual selection controls. The app prepares clips; it does not post them directly to social platforms.</PostP>
<PostH2>Check the color profile</PostH2>
<PostP>DJI recording modes differ by model. Match the conversion to the source rather than applying the same LUT to every file. Normal, D-Cinelike, D-Log M and HLG should not be treated as one format. See the <PostLink href="/blog/dji-osmo-pocket-color-grading">Pocket color guide</PostLink> for profile identification and the <PostLink href="/blog/how-to-apply-lut-on-iphone">LUT import demo</PostLink> for the controls.</PostP>
<PostH2>Review captions, framing and sound</PostH2>
<PostP>Read captions against the spoken recording and correct recognition errors. Play through edits to check that words and gestures are not cut abruptly. Choosing a shorter time range does not by itself reframe a wide shot for a vertical post, so inspect the picture separately.</PostP>
<PostP>Different recording lengths, codecs and device conditions affect processing. Preview a representative section instead of relying on a fixed promise about transcription or export time.</PostP>
<PostH2>Save the version you checked</PostH2>
<PostP>Open Review, watch the rendered result and save the clips you want. Saving video requires Creator. Check the actual file in Photos before sharing, particularly if you changed color or caption settings. Keep the source so you can make another version later.</PostP>
      <PostCta />
    </PostBody>
  </>;
}
