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
  slug: "how-to-apply-lut-on-iphone",
  title: "How to apply a .cube LUT on iPhone (free, on-device)",
  description:
    "A practical guide to importing and applying .cube LUTs on iPhone. Works with any camera log footage — DJI D-Log, Apple Log, HLG — and runs entirely on-device.",
  publishedAt: "2026-08-25",
  category: "How-to" as const,
  primaryKeyword: "how to apply a lut on iphone",
  readMinutes: 6,
};

export default function Post() {
  return (
    <>
      <PostHeader {...POST_META} />
      <PostBody>
        <PostP>
          LUTs (Look-Up Tables) are how video color grading gets done.
          A <code className="px-1.5 py-0.5 rounded bg-surface text-xs text-text-muted mx-1">.cube</code> {" "}
          file is a small text file that maps every input color to a
          new output color, applied uniformly across every frame of
          your video. Editors use them for everything from log-to-Rec.709
          conversion to film emulations to a specific look you saw on a
          YouTube video.
        </PostP>
        <PostP>
          For years, applying a LUT meant opening DaVinci Resolve or
          Premiere on a laptop. That is still the right tool for a
          full color grade, but for most creators the question is
          simpler: how do I get this look onto my iPhone footage
          without opening a laptop? The answer is yes — ReelClip
          imports <code className="px-1.5 py-0.5 rounded bg-surface text-xs text-text-muted mx-1">.cube</code> {" "}
          files from the Files app and applies them on-device.
        </PostP>

        <PostH2>Two kinds of LUT, and which to apply first</PostH2>
        <PostP>
          LUTs come in two broad categories, and the order you apply
          them matters:
        </PostP>
        <PostUl>
          <li>
            <strong className="text-text">Camera-transform LUTs.</strong>{" "}
            Convert log gamma footage (DJI D-Log, Apple Log, Sony
            S-Log, HLG) into a displayable color space like Rec.709.
            These must be applied first, directly on the raw log
            footage.
          </li>
          <li>
            <strong className="text-text">Creative LUTs.</strong>{" "}
            Apply a stylistic look on top of already-normalized footage
            — a film emulation, a warm cinematic grade, a desaturated
            action look. These go on after the camera transform.
          </li>
        </PostUl>
        <PostP>
          Applying a creative LUT to raw log footage gives unpredictable
          results. The creative LUT assumes it is being fed normal-range
          color, not a flat log signal. ReelClip handles this correctly
          by always applying the camera transform first, then letting
          you stack the creative look on top.
        </PostP>

        <PostH2>The on-device workflow</PostH2>

        <PostH3>Step 1: Get your LUT file</PostH3>
        <PostP>
          LUT packs usually arrive as a ZIP of{" "}
          <code className="px-1.5 py-0.5 rounded bg-surface text-xs text-text-muted mx-1">.cube</code> {" "}
          files. Save them to your iPhone — the Files app works, as
          does iCloud Drive, Dropbox, Google Drive, or anywhere else
          iOS can read. The file just needs to be reachable from the
          Files picker.
        </PostP>
        <PostP>
          A few popular free LUT packs to start with:
        </PostP>
        <PostUl>
          <li>
            DJI&apos;s official D-Log to Rec.709 conversion LUTs —
            available on the DJI website for each camera model.
          </li>
          <li>
            Apple&apos;s Final Cut Pro LUT packs — designed for Apple
            Log and convertible to .cube.
          </li>
          <li>
            Free LUT packs from Lutify.me, SmallHD, and others.
          </li>
        </PostUl>

        <PostH3>Step 2: Import into ReelClip</PostH3>
        <PostP>
          Open ReelClip, import the video you want to grade, and pick
          the matching camera color profile (DJI D-Log, DJI D-Log M,
          DJI D-Log 2, Apple Log, Apple Log 2, or HLG). ReelClip
          applies the correct built-in camera transform for that
          profile.
        </PostP>

        <PostH3>Step 3: Import your .cube file</PostH3>
        <PostP>
          In the Look panel, tap <strong className="text-text">Import LUT</strong>
          {" "}and pick the <code className="px-1.5 py-0.5 rounded bg-surface text-xs text-text-muted mx-1">.cube</code> {" "}
          file from Files. ReelClip parses the file, validates it (most
          are 17×17×17 or 33×33×33 cubes), and adds it to your on-device
          LUT library. The file stays on your iPhone — nothing is
          uploaded.
        </PostP>

        <PostH3>Step 4: Apply and adjust strength</PostH3>
        <PostP>
          Select the LUT from the list. ReelClip applies it on top of
          the camera transform. Most creative LUTs look too strong at
          100%, so use the strength slider to dial it back — somewhere
          between 60% and 85% usually hits the right note. You can
          preview the result on every frame in real time.
        </PostP>

        <PostH3>Step 5: Export the graded clip</PostH3>
        <PostP>
          Save to Photos. The output is a standard Rec.709 video file
          with both the camera transform and your creative look baked
          in. Ready to post, share, or edit further.
        </PostP>

        <PostH2>What this gets you</PostH2>
        <PostP>
          The traditional LUT workflow was: copy LUT file to laptop,
          copy footage to laptop, open Resolve, apply LUT, render,
          copy back. Hours of work for one clip.
        </PostP>
        <PostP>
          The on-device version is: import LUT once into your phone&apos;s
          library, then apply to any log footage you shoot, forever.
          The library persists across sessions, so once you have
          imported a LUT you like, it is one tap to apply to your next
          clip.
        </PostP>

        <PostH2>What to do next</PostH2>
        <PostP>
          If you are grading DJI footage specifically, see{" "}
          <PostLink href="/blog/dji-osmo-pocket-color-grading">
            DJI Osmo Pocket color grading on iPhone
          </PostLink>
          . For the broader DJI workflow from import to post, see{" "}
          <PostLink href="/blog/edit-dji-osmo-footage-iphone">
            how to edit DJI Osmo footage on iPhone
          </PostLink>
          .
        </PostP>

        <PostCta />
      </PostBody>
    </>
  );
}
