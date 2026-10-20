import { PostBody, PostCta, PostH2, PostHeader, PostLink, PostOl, PostP } from "@/components/blog";

export const POST_META = {
  "slug": "dji-d-log-to-rec709-iphone",
  "title": "DJI D-Log to Rec.709 on iPhone: match the camera and recording profile",
  "description": "Choose a model-specific DJI conversion, avoid applying it twice and test the result on iPhone before editing the full recording.",
  "publishedAt": "2026-08-25",
  "updatedAt": "2026-10-20",
  "category": "Tutorial" as const,
  "primaryKeyword": "convert dji d-log to rec 709 on iphone",
  "readMinutes": 4
};

export default function Post() {
  return <>
    <PostHeader {...POST_META} />
    <PostBody>
<PostP>To convert a DJI recording to Rec.709, identify the camera and the mode actually used, then choose a matching conversion. D-Log, D-Log M, D-Log 2, D-Cinelike and HLG are not interchangeable names for the same image.</PostP>
<PostH2>Identify the source first</PostH2>
<PostP>Check the camera settings, original file metadata and the camera’s documentation. Keep the original file when transferring footage; a processed copy from another app may already have a look or conversion applied.</PostP>
<PostP><PostLink href="https://repair.dji.com/help/content?customId=01700007105&amp;lang=en&amp;paperDocType=ARTICLE&amp;re=US&amp;spaceId=17" external>DJI’s model and LUT table</PostLink> lists the recording profiles and available resources. For example, Pocket 3 has a D-Log M conversion, while the original Osmo Pocket and Pocket 2 are listed with D-Cinelike. Do not infer the profile from the word Pocket alone.</PostP>
<PostH2>Choose the matching conversion</PostH2>
<PostP>Use <PostLink href="https://www.dji.com/lut" external>DJI’s official download directory</PostLink> and the instructions for your exact model. Check both the expected input and output. A LUT with Rec.709 in its filename can still expect a different source curve from the one you recorded.</PostP>
<PostP>Check whether your editor already manages the source conversion. Applying another camera conversion on top of an existing one can produce incorrect contrast and color. For HLG or another HDR workflow, use an editor and output setup that explicitly support that source rather than assuming a Log LUT also performs HDR tone mapping.</PostP>
<PostH2>Test a short section in ReelClip</PostH2>
<PostOl><li>Import the original recording and make the matching .cube file available in Files.</li><li>Open Adjust &amp; Style → LUTs → Import LUT and select the file.</li><li>Follow its provider’s instructions for the source interpretation. Compare the preview with the unadjusted image and check several frames.</li><li>Review the rendered result, then inspect a short saved sample. Saving video requires Creator.</li></PostOl>
<PostP>The recorded <PostLink href="/blog/how-to-apply-lut-on-iphone">ReelClip LUT demo</PostLink> shows import and strength controls with a creative look. It does not verify a calibrated DJI conversion, every input encoding or every LUT variant. If a technical file does not behave as intended, use a verified camera-specific color workflow before continuing your edit.</PostP>
<PostH2>Continue after checking color</PostH2>
<PostP>Once your sample looks right in the intended output setup, apply the same reviewed settings to the required clips. Keep exposure and white-balance differences between shots in mind. A LUT alone does not make differently lit shots match.</PostP>
<PostP>Use <PostLink href="/blog/how-to-cut-long-video-for-tiktok">Cut</PostLink> for a planned batch or the <PostLink href="/blog/extract-clip-from-podcast">Transcript workflow</PostLink> for spoken passages. Keep a copy of the original recording so you can revisit the color choices later.</PostP>
      <PostCta />
    </PostBody>
  </>;
}
