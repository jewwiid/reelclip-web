import { PostBody, PostCta, PostH2, PostHeader, PostLink, PostOl, PostP } from "@/components/blog";

export const POST_META = {
  "slug": "dji-osmo-pocket-3-luts",
  "title": "DJI Osmo Pocket 3 LUTs: the official download and iPhone workflow",
  "description": "Find DJI’s official Pocket 3 D-Log M to Rec.709 LUT, identify your recording mode and test a matching .cube file on iPhone.",
  "publishedAt": "2026-08-25",
  "updatedAt": "2026-10-20",
  "category": "Roundup" as const,
  "primaryKeyword": "dji osmo pocket 3 luts",
  "readMinutes": 4
};

export default function Post() {
  return <>
    <PostHeader {...POST_META} />
    <PostBody>
<PostP>If you recorded your Osmo Pocket 3 video in D-Log M, start with DJI’s conversion for that camera and profile. If you recorded in Normal or HLG, choose a workflow for that mode instead. Flat-looking footage alone is not enough to identify the recording format.</PostP>
<PostH2>Get the official Pocket 3 LUT</PostH2>
<PostP>DJI publishes <PostLink href="https://www.dji.com/downloads/softwares/osmo-pocket-3-dlog-to-rec709" external>DJI OSMO Pocket 3 D-Log M to Rec.709</PostLink>. Download the file from DJI and follow its instructions. The <PostLink href="https://www.dji.com/lut" external>official LUT directory</PostLink> also separates resources by camera model.</PostP>
<PostP>D-Log and D-Log M are separate profiles. Do not substitute a file intended for another recording curve simply because both cameras are made by DJI. The original Osmo Pocket and Pocket 2 use D-Cinelike rather than the Pocket 3’s D-Log M workflow.</PostP>
<PostH2>Conversion and creative looks serve different purposes</PostH2>
<PostP>A camera conversion prepares the source for a destination such as Rec.709. A creative look changes the appearance according to its declared input. Read the provider’s instructions: some looks expect Log directly, while others expect an already normalized image.</PostP>
<PostP>If the editor already interprets or converts the source correctly, avoid adding the same conversion twice. There is no universal rule that every creative LUT should be stacked after any other LUT at a fixed strength.</PostP>
<PostH2>Test your file on iPhone</PostH2>
<PostOl><li>Keep the original camera file and a note of the recording mode. Transfer it to a location your iPhone can access.</li><li>Extract the downloaded .cube file if necessary and make it available in Files.</li><li>In ReelClip, open your clip and use Adjust &amp; Style → LUTs → Import LUT. Select the imported file and inspect the preview.</li><li>For a technical conversion, follow the provider’s input requirements. Check skin, highlights and saturated colors across several parts of the recording.</li><li>Review a short saved sample before grading the whole project. Saving video requires Creator.</li></PostOl>
<PostP>Our <PostLink href="/blog/how-to-apply-lut-on-iphone">import walkthrough</PostLink> demonstrates the controls with a creative look. It does not establish calibrated conversion support for every DJI file or promise that a finished export will match another editor.</PostP>
<PostH2>Choose additional looks carefully</PostH2>
<PostP>Keep the author’s instructions and license with each download. A free creative collection is not necessarily Pocket 3-specific. The <PostLink href="/blog/best-free-luts-2026">free-LUT guide</PostLink> links official resources and explains how to choose by the expected input.</PostP>
<PostP>For footage from a different Pocket model, see <PostLink href="/blog/dji-osmo-pocket-color-grading">matching the Pocket recording profile</PostLink>. For clipping and captions after color work, use the <PostLink href="/blog/edit-dji-osmo-footage-iphone">DJI editing workflow</PostLink>.</PostP>
      <PostCta />
    </PostBody>
  </>;
}
