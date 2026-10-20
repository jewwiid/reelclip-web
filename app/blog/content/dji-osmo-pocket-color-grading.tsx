import { PostBody, PostCta, PostH2, PostHeader, PostLink, PostOl, PostP } from "@/components/blog";

export const POST_META = {
  "slug": "dji-osmo-pocket-color-grading",
  "title": "DJI Osmo Pocket color grading on iPhone: choose the right recording profile",
  "description": "Distinguish D-Cinelike, D-Log M and other Pocket profiles, choose a matching conversion and review creative color changes on your iPhone.",
  "publishedAt": "2026-08-25",
  "updatedAt": "2026-10-20",
  "category": "Use case" as const,
  "primaryKeyword": "dji osmo pocket color grading",
  "readMinutes": 4
};

export default function Post() {
  return <>
    <PostHeader {...POST_META} />
    <PostBody>
<PostP>Color grading Pocket footage starts with the recording mode, not the generation number alone. Establish how the source should be interpreted before adding a creative look. A recording that already has a finished Normal appearance does not need a Log conversion just because it came from a DJI camera.</PostP>
<PostH2>Check your model and mode</PostH2>
<PostP><PostLink href="https://repair.dji.com/help/content?customId=01700007105&amp;lang=en&amp;paperDocType=ARTICLE&amp;re=US&amp;spaceId=17" external>DJI’s profile and LUT reference</PostLink> lists the original Osmo Pocket and Pocket 2 with D-Cinelike, Pocket 3 with D-Log M, and Pocket 4 with D-Log. Treat variants separately and verify the current entry for your camera; those labels are not interchangeable.</PostP>
<PostP>Use the settings from the original recording, supported metadata and the camera documentation together. An image looking flat is not proof of its curve or gamut. A copy saved through another editing app may already have been transformed.</PostP>
<PostH2>Prepare the image before styling it</PostH2>
<PostP>For Log material, choose a conversion intended for the camera and profile. Check <PostLink href="https://www.dji.com/lut" external>DJI’s official resources</PostLink> and the selected file’s instructions. If your editor already converts the source correctly, do not add the conversion a second time.</PostP>
<PostP>For D-Cinelike, Normal or HDR material, follow a workflow that explicitly supports that mode. Do not choose a D-Log M file merely because it makes the image look more contrasty. Technical correctness and a preferred creative appearance are separate decisions.</PostP>
<PostH2>Try a creative look in ReelClip</PostH2>
<PostOl><li>Keep the original recording and import the clip you want to edit.</li><li>Save your compatible .cube file in Files. In ReelClip, open Adjust &amp; Style → LUTs → Import LUT.</li><li>Select the look and compare the preview with the original. Follow its expected-input requirements.</li><li>Adjust the creative strength to suit the shot. Check faces, bright areas and dark detail as the clip plays.</li><li>Review the rendered result and a saved sample before applying the settings across a project. Saving video requires Creator.</li></PostOl>
<PostP>The <PostLink href="/blog/how-to-apply-lut-on-iphone">LUT walkthrough</PostLink> shows an actual creative-look import. It demonstrates the controls rather than certifying every camera conversion, HDR output or technical LUT file.</PostP>
<PostH2>Match shots by what you can see</PostH2>
<PostP>Start with exposure and white balance, then compare skin, neutral objects and saturated areas between shots. The same LUT can look different on recordings made under different light. There is no strength percentage that works for every clip.</PostP>
<PostP>For the model-specific download, see <PostLink href="/blog/dji-osmo-pocket-3-luts">Pocket 3 LUTs</PostLink>. To prepare your finished moments for a post, continue with <PostLink href="/blog/edit-dji-osmo-footage-iphone">editing DJI footage on iPhone</PostLink>.</PostP>
      <PostCta />
    </PostBody>
  </>;
}
