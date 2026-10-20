import { PostBody, PostCta, PostH2, PostHeader, PostLink, PostOl, PostP } from "@/components/blog";

export const POST_META = {
  "slug": "cube-lut-explained",
  "title": "What is a .cube LUT file? Format, table sizes and iPhone import",
  "description": "Understand 1D and 3D lookup tables, what 17, 33 and 65 mean, and how to test a .cube file in ReelClip without confusing a creative look with a camera conversion.",
  "publishedAt": "2026-08-25",
  "updatedAt": "2026-10-20",
  "category": "Tutorial" as const,
  "primaryKeyword": "what is a .cube lut file",
  "readMinutes": 4
};

export default function Post() {
  return <>
    <PostHeader {...POST_META} />
    <PostBody>
<PostP>A .cube file stores a lookup table: a set of numerical mappings used to change color. It can describe a technical camera conversion or a creative look. The filename alone does not tell you which one it is, or which recording profile it expects.</PostP>
<PostH2>1D and 3D tables</PostH2>
<PostP>A 1D LUT maps each color channel independently. A 3D LUT maps combinations of red, green and blue, so one output channel can depend on more than one input channel. Neither kind repairs missed focus, removes noise or restores detail clipped during recording.</PostP>
<PostP>The .cube format is plain text. Headers describe the table and its input range, followed by rows of color values. A file extension is not a compatibility guarantee: editors can support different table sizes, header variants and combinations of tables.</PostP>
<PostH2>What the size number means</PostH2>
<PostP>For a 3D table, LUT_3D_SIZE gives the length of one edge. A 17-point cube contains 17 × 17 × 17 = 4,913 entries; a 33-point cube contains 35,937; a 65-point cube contains 274,625. These numbers describe the sampling grid, not video resolution.</PostP>
<PostP>A larger table needs more entries, but it is not automatically a better look. File size also depends on the precision and formatting of its text. Choose a file supported by your editor and appropriate for the source profile; do not choose by the largest number alone.</PostP>
<PostH2>Check the intended input</PostH2>
<PostP>A LUT made for Apple Log, D-Log M or S-Log3 expects that particular source interpretation. A creative LUT intended for an already normalized image expects something different. If your editor already applies a camera conversion, applying another can produce excessive contrast or color shifts.</PostP>
<PostP><PostLink href="https://support.apple.com/guide/final-cut-pro/apply-luts-ver24f966423/mac" external>Apple’s LUT documentation</PostLink> explains the distinction between camera LUTs and custom creative effects. Its Final Cut Pro controls are separate from ReelClip’s interface.</PostP>
<PostH2>Import and test on iPhone</PostH2>
<PostOl><li>Extract the download if it is a ZIP and save the .cube file somewhere accessible from Files.</li><li>Import your video in ReelClip. Open Adjust &amp; Style, choose LUTs, then use Import LUT.</li><li>Select the look and compare its preview with the original. Follow the file provider’s instructions for a technical conversion; adjust a creative look to suit your footage.</li><li>Review a short rendered sample before applying the look across a project. Saving video requires Creator.</li></PostOl>
<PostP>The <PostLink href="/blog/how-to-apply-lut-on-iphone">LUT import walkthrough</PostLink> shows a real creative-look import and strength adjustment. It does not verify every camera conversion or every .cube variant.</PostP>
<PostH2>If the file will not import</PostH2>
<PostP>Check that you selected the extracted .cube file, that the download completed, and that the provider supports your editor. A combined shaper/3D table or an unsupported size may need a separate compatible export. Keep the original download rather than editing numerical rows to force a file to load.</PostP>
<PostP>For sources to explore, see <PostLink href="/blog/best-free-luts-2026">free LUT resources</PostLink>. Start with a small set of suitable files and test them on your own recordings.</PostP>
      <PostCta />
    </PostBody>
  </>;
}
