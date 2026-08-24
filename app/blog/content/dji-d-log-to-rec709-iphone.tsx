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
  slug: "dji-d-log-to-rec709-iphone",
  title:
    "How to convert DJI D-Log to Rec.709 on iPhone (Osmo Pocket, Air, Action)",
  description:
    "DJI cameras shoot flat D-Log footage that looks washed out until you convert it. Here is the on-device workflow to apply a D-Log to Rec.709 conversion on your iPhone, with no upload and no desktop.",
  publishedAt: "2026-08-25",
  category: "Tutorial" as const,
  primaryKeyword: "convert dji d-log to rec 709 on iphone",
  readMinutes: 8,
};

export default function Post() {
  return (
    <>
      <PostHeader {...POST_META} />
      <PostBody>
        <PostP>
          You shot a beautiful sunset on your DJI Osmo Pocket 3 in D-Log,
          pulled the file into Photos, and it looks washed out — flat,
          gray, low-contrast. That is what D-Log is supposed to look like
          before color conversion. The footage is fine; it just needs to be
          converted from log gamma to Rec.709 (the color space phones and
          TVs actually display).
        </PostP>
        <PostP>
          The standard answer is "open DaVinci Resolve on your laptop." But
          you can do the conversion on your iPhone in under a minute, with
          no upload, no desktop, and no subscription. Here is the workflow.
        </PostP>

        <PostH2>What D-Log actually is</PostH2>
        <PostP>
          D-Log is a log gamma profile. It captures more dynamic range than
          Rec.709 by recording flat values across the sensor. The
          trade-off is that the file looks washed out until you apply a
          conversion LUT (a <em>Look-Up Table</em>) that maps the log
          values back into a displayable color space.
        </PostP>
        <PostP>
          DJI ships three log profiles across its product line:
        </PostP>
        <PostUl>
          <li>
            <strong className="text-text">D-Log</strong> — older Osmo
            Pocket 1, original Mavic, Action 2. 10-bit log, requires a
            camera-specific conversion LUT.
          </li>
          <li>
            <strong className="text-text">D-Log M</strong> — Osmo Pocket
            3, Air 3, Action 5. A newer, more forgiving log curve. Still
            flat, but with slightly more headroom baked in.
          </li>
          <li>
            <strong className="text-text">D-Log 2</strong> — Osmo Pocket
            4 / Air 4 generation. The latest DJI log profile, designed
            for 10-bit HDR pipelines.
          </li>
        </PostUl>
        <PostP>
          Each profile has a different gamma curve. A LUT that converts
          D-Log will not give you a correct conversion for D-Log M. This
          is where most iPhone workflows fail — they only ship one LUT
          and apply it to all log footage.
        </PostP>

        <PostH2>The on-device conversion workflow</PostH2>

        <PostH3>What you need</PostH3>
        <PostUl>
          <li>
            A DJI camera that records D-Log, D-Log M, or D-Log 2 (Osmo
            Pocket 1/2/3/4, Action 2/3/4/5, Air 2/3/4, Mini 3/4 Pro).
          </li>
          <li>
            The footage imported into your iPhone&apos;s Photos library
            or the Files app.
          </li>
          <li>
            <PostLink href="/">ReelClip</PostLink> on iOS 26 or later.
            The app ships first-class support for all three DJI log
            profiles plus Apple Log 1/2 and HLG.
          </li>
        </PostUl>

        <PostH3>Step-by-step</PostH3>
        <PostOl>
          <li>
            Open ReelClip and import the DJI clip. The file is copied into
            the app&apos;s private sandbox — nothing is uploaded.
          </li>
          <li>
            When prompted, pick the camera color profile that matches
            what you shot in. ReelClip can usually detect this
            automatically from the file metadata; if not, choose
            <strong className="text-text"> DJI D-Log</strong>, {" "}
            <strong className="text-text">DJI D-Log M</strong>, or {" "}
            <strong className="text-text">DJI D-Log 2</strong> manually.
            DJI files occasionally lose their color profile tag when
            transferred through another app, so manual confirmation is
            always available.
          </li>
          <li>
            ReelClip applies a built-in camera-transform LUT that
            converts the chosen log profile to Rec.709. The conversion
            runs on-device via Core Image — your footage never leaves the
            phone.
          </li>
          <li>
            Preview the converted clip. The colors should now look
            correct: proper contrast, saturation, and skin tones. If
            they look slightly off (some DJI cameras have a green or
            magenta tint depending on the firmware), apply a{" "}
            <strong className="text-text">creative look</strong> on top
            of the camera transform to fine-tune.
          </li>
          <li>
            Export to Photos. The saved file is now a displayable
            Rec.709 clip that any editor (including CapCut, iMovie, or
            ReelClip itself) can work with directly.
          </li>
        </PostOl>

        <PostH2>What to do with the converted clip</PostH2>
        <PostP>
          Once converted to Rec.709, your DJI footage is a normal video
          file. You can:
        </PostP>
        <PostUl>
          <li>
            Post it directly to Instagram, TikTok, or YouTube — the file
            is already in a displayable color space.
          </li>
          <li>
            Trim it into shorter clips using ReelClip&apos;s{" "}
            <strong className="text-text">Cut</strong>, {" "}
            <strong className="text-text">Transcript</strong>, or {" "}
            <strong className="text-text">Slice</strong> modes (see{" "}
            <PostLink href="/blog/how-to-cut-long-video-for-tiktok">
              how to cut a long video for TikTok
            </PostLink>{" "}
            for the short-form workflow).
          </li>
          <li>
            Apply additional creative LUTs on top — ReelClip lets you
            import <code className="px-1.5 py-0.5 rounded bg-surface text-xs text-text-muted mx-1">.cube</code> {" "}
            LUTs from the Files app, then stack them on top of the
            camera transform. See{" "}
            <PostLink href="/blog/how-to-apply-lut-on-iphone">
              how to apply a LUT on iPhone
            </PostLink>{" "}
            for that workflow.
          </li>
          <li>
            Burn in subtitles with one of four caption styles, then
            export the finished clip.
          </li>
        </PostUl>

        <PostH2>Common pitfalls</PostH2>
        <PostUl>
          <li>
            <strong className="text-text">Using the wrong LUT for the
            log profile.</strong> D-Log, D-Log M, and D-Log 2 each
            require a different conversion LUT. ReelClip ships the right
            one for each profile; other apps often apply the same LUT to
            all log footage and the result looks wrong.
          </li>
          <li>
            <strong className="text-text">Uploading to a cloud
            editor.</strong> Most cloud editors will re-encode your
            footage in a different color space, often losing the original
            log profile information. On-device conversion preserves the
            full original file.
          </li>
          <li>
            <strong className="text-text">Forgetting to set the color
            profile before applying creative LUTs.</strong> Creative
            LUTs are designed to be applied <em>after</em> the
            log-to-Rec.709 conversion, not on top of raw log footage.
            Apply the camera transform first.
          </li>
        </PostUl>

        <PostCta />
      </PostBody>
    </>
  );
}
