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
  slug: "dji-osmo-pocket-color-grading",
  title:
    "DJI Osmo Pocket color grading on iPhone — D-Log, D-Log M, D-Log 2",
  description:
    "A practical workflow for grading DJI Osmo Pocket footage on iPhone. Covers D-Log, D-Log M, and D-Log 2 — the three log profiles Osmo Pocket 1, 2, 3, and 4 shoot — and how to handle them with on-device LUTs.",
  publishedAt: "2026-08-25",
  category: "Use case" as const,
  primaryKeyword: "dji osmo pocket color grading",
  readMinutes: 9,
};

export default function Post() {
  return (
    <>
      <PostHeader {...POST_META} />
      <PostBody>
        <PostP>
          The DJI Osmo Pocket line is one of the most popular cameras
          among solo creators and travelers, and for good reason: small
          form factor, excellent stabilization, and serious image quality
          when shot in a log gamma profile. The catch is that the
          footage looks flat out of the camera, and grading it on a
          phone used to mean either a stripped-down editor or an
          upload-and-wait workflow.
        </PostP>
        <PostP>
          This guide walks through the on-device grading workflow for
          every DJI Osmo Pocket generation, from the original Pocket 1
          to the Pocket 4. The principle is the same across all
          generations: identify the log profile, apply a camera-transform
          LUT to bring it back to Rec.709, then layer any creative look
          you want on top.
        </PostP>

        <PostH2>Which log profile does your Pocket shoot?</PostH2>
        <PostP>
          DJI has shipped three log profiles across the Osmo Pocket
          line. Each one captures more dynamic range than Rec.709, but
          the gamma curve differs between them — a LUT that converts
          one profile will not give a correct conversion for another.
        </PostP>

        <PostH3>Osmo Pocket 1 — D-Log</PostH3>
        <PostP>
          The original Osmo Pocket records 10-bit D-Log. This is DJI&apos;s
          first-generation log profile, designed for cinema workflows.
          The footage has the most headroom of any DJI profile but also
          needs the most accurate conversion LUT. Wrong LUTs will give a
          green or magenta cast.
        </PostP>

        <PostH3>Osmo Pocket 2 — D-Log (still)</PostH3>
        <PostP>
          The Pocket 2 used the same D-Log curve as the original.
          Conversion is identical: any D-Log-to-Rec.709 LUT designed for
          the Pocket 1 will work here.
        </PostP>

        <PostH3>Osmo Pocket 3 — D-Log M</PostH3>
        <PostP>
          The Pocket 3 introduced D-Log M, a slightly more forgiving
          curve. Footage is still flat out of camera but with a bit more
          latitude in the shadows, which makes it easier to recover
          detail in post. Conversion is similar to D-Log but requires
          the D-Log M-specific LUT.
        </PostP>

        <PostH3>Osmo Pocket 4 — D-Log 2</PostH3>
        <PostP>
          The newest Pocket ships D-Log 2, designed for 10-bit HDR
          pipelines. Conversion is closer to a true cinema log curve.
          Treat D-Log 2 footage as you would ARRI LogC or Sony S-Log3
          — it is designed to be graded, not displayed.
        </PostP>

        <PostH2>The on-device grading workflow</PostH2>

        <PostH3>Step 1: Import the footage</PostH3>
        <PostP>
          Transfer your Pocket files to your iPhone. The fastest method
          is the DJI Mimo app&apos;s export to Photos, or a direct USB-C
          import if your Pocket supports it. Once the file is in Photos
          or Files, open ReelClip and import it. The file is copied
          into the app&apos;s private sandbox — nothing is uploaded.
        </PostP>

        <PostH3>Step 2: Identify the color profile</PostH3>
        <PostP>
          ReelClip reads the metadata tag in the file and tries to
          auto-detect the log profile. If the file lost its tag during
          transfer (common with DJI files), the app will let you
          confirm manually. Pick the profile that matches what you shot
          in: <strong className="text-text">DJI D-Log</strong>, {" "}
          <strong className="text-text">DJI D-Log M</strong>, or {" "}
          <strong className="text-text">DJI D-Log 2</strong>.
        </PostP>

        <PostH3>Step 3: Apply the camera-transform LUT</PostH3>
        <PostP>
          ReelClip applies the correct built-in camera-transform LUT
          for whichever profile you selected. This is the conversion
          from log gamma to Rec.709. The result should look like a
          normal video file: proper contrast, saturation, and skin
          tones.
        </PostP>

        <PostH3>Step 4: Layer a creative look on top</PostH3>
        <PostP>
          Once the camera transform is applied, you can stack any
          additional creative LUT on top. ReelClip supports user-imported{" "}
          <code className="px-1.5 py-0.5 rounded bg-surface text-xs text-text-muted mx-1">.cube</code> {" "}
          LUTs from the Files app. This is where you can dial in a
          specific look — a film emulation, a warm cinematic grade, a
          cold action-camera feel. The creative LUT is applied at a
          strength you control, so you can dial it back if it is too
          strong.
        </PostP>

        <PostH3>Step 5: Export</PostH3>
        <PostP>
          Save the graded clip to Photos. The output is a standard
          Rec.709 file that any editor can read. From there you can
          post it directly, edit it further, or share it via the iOS
          share sheet.
        </PostP>

        <PostH2>Why this matters for Osmo Pocket shooters</PostH2>
        <PostP>
          The traditional Pocket workflow was: import to SD card, copy
          to laptop, open DaVinci Resolve, apply conversion LUT, grade,
          render, copy back to phone, post. That is a 30-minute minimum
          turnaround for a single clip.
        </PostP>
        <PostP>
          The on-device workflow is: pull the file off the camera with
          DJI Mimo, import into ReelClip, apply the LUT, export. That
          is two minutes, and the file never leaves your phone between
          import and post. For travel creators, run-and-gun shooters,
          and anyone posting same-day content, that is the workflow you
          actually want.
        </PostP>

        <PostH2>What to do next</PostH2>
        <PostP>
          For the broader Osmo workflow including cut planning and
          caption export, see{" "}
          <PostLink href="/blog/edit-dji-osmo-footage-iphone">
            how to edit DJI Osmo footage on iPhone
          </PostLink>
          . For the LUT side specifically (including how to import{" "}
          <code className="px-1.5 py-0.5 rounded bg-surface text-xs text-text-muted mx-1">.cube</code> {" "}
          files from a pack you downloaded), see{" "}
          <PostLink href="/blog/how-to-apply-lut-on-iphone">
            how to apply a LUT on iPhone
          </PostLink>
          .
        </PostP>

        <PostCta />
      </PostBody>
    </>
  );
}
