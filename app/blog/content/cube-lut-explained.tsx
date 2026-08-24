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
  slug: "cube-lut-explained",
  title:
    "What is a .cube LUT file? Format, size limits, and how to use one",
  description:
    ".cube is the universal LUT format. This guide explains what a .cube file actually contains, the common size limits (17, 33, 65), and how to import one on iPhone.",
  publishedAt: "2026-08-25",
  category: "Tutorial" as const,
  primaryKeyword: "what is a .cube lut file",
  readMinutes: 7,
};

export default function Post() {
  return (
    <>
      <PostHeader {...POST_META} />
      <PostBody>
        <PostP>
          A <code className="px-1.5 py-0.5 rounded bg-surface text-xs text-text-muted mx-1">.cube</code> {" "}
          file is the universal format for video color LUTs (Look-Up
          Tables). If you have ever downloaded a LUT pack or a color
          grade from a creator online, it almost certainly arrived as
          a .cube file. This guide explains what is actually inside
          one, what the size numbers mean (17, 33, 65), and how to
          use one on iPhone.
        </PostP>

        <PostH2>What &quot;LUT&quot; means</PostH2>
        <PostP>
          LUT stands for Look-Up Table. In video color grading, a LUT
          is a list of mappings from an input color to an output
          color. The video player reads every pixel, looks up its
          color in the table, and replaces it with the mapped color.
          Applied uniformly across every frame, a LUT gives you a
          consistent color grade.
        </PostP>
        <PostP>
          LUTs come in two broad flavors:
        </PostP>
        <PostUl>
          <li>
            <strong className="text-text">1D LUTs.</strong> Map each
            color channel (red, green, blue) independently. Mostly
            used for simple gamma and contrast adjustments. Less
            common today.
          </li>
          <li>
            <strong className="text-text">3D LUTs.</strong> Map a
            three-dimensional color cube (RGB triplet in, RGB triplet
            out). These are what people mean when they say &quot;a
            LUT&quot; today. They can express any color
            transformation, including creative film looks.
          </li>
        </PostUl>
        <PostP>
          The <code className="px-1.5 py-0.5 rounded bg-surface text-xs text-text-muted mx-1">.cube</code> {" "}
          format supports both. Most files you will encounter are 3D.
        </PostP>

        <PostH2>What is inside a .cube file</PostH2>
        <PostP>
          A .cube file is plain text. You can open it in any text
          editor and read it. The structure looks like this:
        </PostP>
        <pre className="overflow-x-auto rounded-xl border border-hairline bg-surface p-4 text-xs leading-relaxed text-text-muted">
{`TITLE "My Film Look"
LUT_3D_SIZE 33
DOMAIN_MIN 0.0 0.0 0.0
DOMAIN_MAX 1.0 1.0 1.0

# A long list of RGB triplets, one per line.
# Each row is an output color, mapped from a position in a 3D color cube.
0.000000 0.000000 0.000000
0.031250 0.029167 0.026389
0.062500 0.058333 0.052778
...thousands more lines...
1.000000 1.000000 1.000000`}
        </pre>

        <PostP>
          The first few lines are metadata: a title, the size of the
          3D color cube, and the input range. The bulk of the file is
          a long list of RGB triplets — every possible input color
          and what it should become.
        </PostP>

        <PostH2>The size number: what 17, 33, and 65 mean</PostH2>
        <PostP>
          The <code className="px-1.5 py-0.5 rounded bg-surface text-xs text-text-muted mx-1">LUT_3D_SIZE</code> {" "}
          line tells you the resolution of the color cube. The number
          is the size of one edge — so a 33-cube has 33×33×33 ={" "}
          <strong className="text-text">35,937</strong> entries, and
          a 65-cube has 65×65×65 ={" "}
          <strong className="text-text">274,625</strong> entries.
        </PostP>
        <PostP>
          Common sizes and what they mean:
        </PostP>
        <PostUl>
          <li>
            <strong className="text-text">17-cube.</strong> 4,913
            entries. Smallest practical size. Fine for camera
            transforms and simple looks. Tiny file size, fast to
            load, very slightly less precise than larger sizes.
          </li>
          <li>
            <strong className="text-text">33-cube.</strong> 35,937
            entries. The default for most LUT packs. The size most
            creators ship and the size most editors default to. Good
            balance of precision and performance.
          </li>
          <li>
            <strong className="text-text">65-cube.</strong> 274,625
            entries. Used for high-end film emulations where subtle
            color differences matter. Larger file, slower to parse,
            no visible quality difference for most footage.
          </li>
        </PostUl>
        <PostP>
          For most creators, 33 is the sweet spot. The precision
          difference between 33 and 65 is invisible on consumer
          displays, and 65-cube files are roughly 8× the size of 33.
        </PostP>

        <PostH2>File size and limits</PostH2>
        <PostP>
          Because they are plain text, .cube files are tiny. A 33-cube
          is usually under 1 MB; a 65-cube tops out around 8 MB. The
          iPhone-native editor ReelClip accepts .cube files up to a
          reasonable size limit (its parser rejects files that are
          too large to safely load) and supports the standard
          17/33/65 sizes plus a few common variants.
        </PostP>
        <PostP>
          If you ever see a .cube file fail to load, the most common
          cause is an unsupported combined-table header (some
          editors write 1D + 3D LUTs in one file). The fix is to
          export just the 3D table from whichever tool created it.
        </PostP>

        <PostH2>How to import and use a .cube LUT on iPhone</PostH2>

        <PostH3>Step 1: Save the .cube file to your iPhone</PostH3>
        <PostP>
          Unzip the LUT pack if needed. Save the .cube file
          somewhere iOS can read: Files (on-device or iCloud Drive),
          Dropbox, Google Drive. The exact location does not matter
          — ReelClip reads it from any folder the Files picker can
          reach.
        </PostP>

        <PostH3>Step 2: Open the video in ReelClip</PostH3>
        <PostP>
          Import the clip you want to grade. If the clip is log
          footage (DJI D-Log, Apple Log, HLG), set the camera color
          profile first so ReelClip applies the right camera
          transform.
        </PostP>

        <PostH3>Step 3: Import the LUT</PostH3>
        <PostP>
          In the Look panel, tap{" "}
          <strong className="text-text">Import LUT</strong> and pick
          the .cube file. ReelClip validates the header, parses the
          color entries, and adds it to your on-device LUT library.
          The file stays on your phone.
        </PostP>

        <PostH3>Step 4: Apply and adjust</PostH3>
        <PostP>
          Select the LUT and adjust the strength slider. Stack a
          creative look on top of the camera transform for stylized
          grades, or apply just the camera transform alone for
          accurate color reproduction.
        </PostP>

        <PostH3>Step 5: Export</PostH3>
        <PostP>
          Save the graded clip to Photos. The output is a standard
          Rec.709 video file with the LUT baked in.
        </PostP>

        <PostH2>Common .cube gotchas</PostH2>
        <PostUl>
          <li>
            <strong className="text-text">1D and 3D combined
            tables.</strong> Some editors write both into a single
            .cube file. ReelClip rejects these and asks you to export
            just the 3D portion.
          </li>
          <li>
            <strong className="text-text">Wrong domain range.</strong>{" "}
            Most LUTs use 0.0–1.0 domain. Some older camera LUTs use
            -0.1 to 1.1 (extended range for highlights). Both work,
            but the editor needs to apply the right range.
          </li>
          <li>
            <strong className="text-text">Truncated files.</strong>{" "}
            If the file was cut off during download, the editor
            cannot fill in the missing entries. Re-download.
          </li>
          <li>
            <strong className="text-text">Unsupported sizes.</strong>{" "}
            Anything outside 2–65 (ReelClip&apos;s supported range)
            will be rejected. Convert to 33 if you have an unusual
            size.
          </li>
        </PostUl>

        <PostH2>What to do next</PostH2>
        <PostP>
          For the practical application side — what LUTs to use, how
          to stack them, and the exact settings for DJI Osmo Pocket
          footage — see{" "}
          <PostLink href="/blog/dji-osmo-pocket-3-luts">
            DJI Osmo Pocket 3 LUTs
          </PostLink>{" "}
          and{" "}
          <PostLink href="/blog/how-to-apply-lut-on-iphone">
            how to apply a .cube LUT on iPhone
          </PostLink>
          .
        </PostP>

        <PostCta />
      </PostBody>
    </>
  );
}
