import { GuideVideo } from "@/components/guide-video";
import { PostBody, PostCta, PostH2, PostHeader, PostLink, PostOl, PostP } from "@/components/blog";

export const POST_META = {
  slug: "how-to-apply-lut-on-iphone",
  title: "How to apply a .cube LUT on iPhone",
  description: "Import a .cube LUT from Files, adjust its strength and compare the preview in ReelClip. Includes a short recording of the actual controls.",
  publishedAt: "2026-08-25",
  updatedAt: "2026-10-20",
  category: "How-to" as const,
  primaryKeyword: "how to apply a lut on iphone",
  readMinutes: 4,
};

export default function Post() {
  return <>
    <PostHeader {...POST_META} />
    <PostBody>
        <PostP>
          If you already have a .cube LUT, you can import it from Files and
          adjust its strength in ReelClip. Start with a LUT intended for your
          footage and colour setup; a creative look and a camera conversion
          serve different purposes.
        </PostP>
        <GuideVideo id="apply-lut" />
        <PostH2>Choose the correct input before a creative look</PostH2>
        <PostP>
          Normalize Log or HDR footage before applying a display-ready creative
          LUT. ReelClip’s own exported creative LUTs use encoded sRGB; Rec.709
          shares its primaries but has different transfer behavior. Match the
          LUT’s documented input, and avoid applying camera normalization twice.
          Our original starter collection is currently being tested. See the
          {" "}<PostLink href="/blog/best-free-luts-2026">free LUT resource guide</PostLink>
          {" "}for its development status and official camera resources.
        </PostP>
        <PostH2>Bring the file into ReelClip</PostH2>
        <PostOl>
          <li>Import the video you want to edit.</li>
          <li>Open Adjust &amp; Style and choose LUTs.</li>
          <li>Tap Import LUT and choose the .cube file from Files.</li>
          <li>Select the imported look in the LUT library.</li>
        </PostOl>
        <PostP>
          The demo uses the Creative tab and a previously saved ReelClip look.
          Once the LUT appears in your library, select it and check its effect
          on your own footage.
        </PostP>
        <PostH2>Check the strength against your footage</PostH2>
        <PostP>
          Move the strength slider and compare the result with the original.
          Check skin, bright areas and dark detail as the footage plays. The
          example reaches 68%; that value belongs to this sample rather than
          a recommended setting for every clip.
        </PostP>
        <PostP>
          For a camera conversion, follow the instructions supplied with the
          LUT and match the source recording profile. Do not assume that a LUT
          made for one log profile is suitable for another. The sample here
          establishes the import and adjustment controls, not support for every
          camera or LUT file.
        </PostP>
        <PostH2>Review the finished video</PostH2>
        <PostP>
          Finish the adjustment, open Review and inspect the rendered output.
          Saving the video requires Creator. Check the actual saved file before
          sharing it, especially if colour or HDR settings changed during the edit.
        </PostP>
        <PostP>
          For background on the file itself, read
          {" "}<PostLink href="/blog/cube-lut-explained">what a .cube LUT contains</PostLink>.
        </PostP>
        <PostCta />
    </PostBody>
  </>;
}
