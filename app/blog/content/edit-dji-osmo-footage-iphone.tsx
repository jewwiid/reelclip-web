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
  slug: "edit-dji-osmo-footage-iphone",
  title:
    "How to edit DJI Osmo footage on iPhone (Pocket, Action, Air)",
  description:
    "From import to export: how to edit DJI Osmo Pocket, Action, and Air footage entirely on your iPhone. Covers log-to-Rec.709 conversion, clipping, captions, and export.",
  publishedAt: "2026-08-25",
  category: "How-to" as const,
  primaryKeyword: "edit dji osmo footage on iphone",
  readMinutes: 7,
};

export default function Post() {
  return (
    <>
      <PostHeader {...POST_META} />
      <PostBody>
        <PostP>
          You brought a DJI Osmo — Pocket, Action, or Air — on a trip
          and came back with hours of footage. The natural next step is
          to edit it down into shareable clips and post them. The
          traditional answer is "import to your laptop and use DaVinci
          Resolve." That works, but it requires you to be at a desk
          with the footage in front of you.
        </PostP>
        <PostP>
          A full Pocket/Action/Air edit — log-to-Rec.709 conversion,
          trimming, captions, and export — is now possible on your
          iPhone, with the footage never leaving the device. Here is the
          end-to-end workflow.
        </PostP>

        <PostH2>What you need</PostH2>
        <PostUl>
          <li>
            A DJI Osmo camera: Pocket 1/2/3/4, Action 2/3/4/5, or Air
            2/3/4. All shoot in a DJI log profile (D-Log, D-Log M, or
            D-Log 2 depending on the generation).
          </li>
          <li>
            An iPhone running iOS 26 or later.
          </li>
          <li>
            <PostLink href="/">ReelClip</PostLink>, which supports all
            three DJI log profiles plus Apple Log 1/2 and HLG, with
            on-device LUTs and a Creator plan for export.
          </li>
        </PostUl>

        <PostH2>The end-to-end workflow</PostH2>

        <PostH3>Step 1: Transfer footage to your iPhone</PostH3>
        <PostP>
          The fastest method depends on your Osmo model:
        </PostP>
        <PostUl>
          <li>
            <strong className="text-text">Osmo Pocket 3 and Pocket 4:</strong>{" "}
            plug into your iPhone over USB-C. The Pocket&apos;s storage
            mounts as a USB device. Use the Files app to copy the files
            into your Photos library or a folder ReelClip can read.
          </li>
          <li>
            <strong className="text-text">Older Osmo Pocket models and
            Action cameras:</strong> remove the SD card, use a Lightning
            or USB-C SD reader, or transfer via DJI Mimo over Wi-Fi.
          </li>
          <li>
            <strong className="text-text">DJI Air drones:</strong>{" "}
            transfer files the same way — USB-C connection to the
            iPhone, or pull from the SD card.
          </li>
        </PostUl>

        <PostH3>Step 2: Open ReelClip and import</PostH3>
        <PostP>
          Open ReelClip, tap <strong className="text-text">Import</strong>,
          and pick the clip from Photos or Files. The file is copied
          into ReelClip&apos;s private sandbox. The original file stays
          in your library untouched.
        </PostP>

        <PostH3>Step 3: Pick the camera color profile</PostH3>
        <PostP>
          When ReelClip opens the file, it reads the metadata to
          detect the color profile. For DJI footage that means:
        </PostP>
        <PostUl>
          <li>
            <strong className="text-text">DJI D-Log</strong> for Pocket
            1, Pocket 2, Action 2, original Mavics
          </li>
          <li>
            <strong className="text-text">DJI D-Log M</strong> for Pocket
            3, Action 5, Air 3
          </li>
          <li>
            <strong className="text-text">DJI D-Log 2</strong> for the
            newest generation (Pocket 4, Air 4)
          </li>
        </PostUl>
        <PostP>
          Auto-detection usually works, but DJI files occasionally lose
          their color profile tag during transfer. If that happens,
          ReelClip lets you confirm manually — important, because the
          wrong LUT will give a green or magenta cast.
        </PostP>

        <PostH3>Step 4: Apply the camera transform</PostH3>
        <PostP>
          ReelClip applies the correct camera-transform LUT for the
          chosen profile. This converts the flat log footage into a
          displayable Rec.709 color space. The conversion happens
          on-device via Core Image — your footage never leaves the
          phone.
        </PostP>
        <PostP>
          See{" "}
          <PostLink href="/blog/dji-d-log-to-rec709-iphone">
            how to convert DJI D-Log to Rec.709 on iPhone
          </PostLink>{" "}
          for the detailed explanation of why the conversion LUT
          matters.
        </PostP>

        <PostH3>Step 5: Pick a cut mode and find your clips</PostH3>
        <PostP>
          With the color sorted, choose a cut mode based on what you
          have:
        </PostP>
        <PostUl>
          <li>
            <strong className="text-text">Cut</strong> for travel
            montages or any footage with clear segments.
          </li>
          <li>
            <strong className="text-text">Transcript</strong> if you
            recorded voice-over, an interview, or commentary — the
            on-device speech recognition finds the pauses and lets you
            trim the dead air.
          </li>
          <li>
            <strong className="text-text">Slice</strong> for manual
            highlights when you already know which moments you want.
          </li>
          <li>
            <strong className="text-text">AI</strong> if you want Apple
            Intelligence on-device to pick the moments based on a
            prompt like &quot;the most cinematic shots&quot; or
            &quot;the funniest moments&quot;.
          </li>
        </PostUl>

        <PostH3>Step 6: Review every clip before exporting</PostH3>
        <PostP>
          Tap each planned clip and watch it start to finish. Trim
          the start (the first second is what viewers decide on) and
          the end. Reorder by tapping and dragging. Delete the ones
          that did not work. ReelClip never auto-exports.
        </PostP>

        <PostH3>Step 7: Export to Photos</PostH3>
        <PostP>
          When you are happy with the batch, tap{" "}
          <strong className="text-text">Save clips</strong>. ReelClip
          exports each approved clip to your Photos library, with a
          confirmation notification. The original DJI file stays
          untouched.
        </PostP>

        <PostH3>Step 8: Post or share</PostH3>
        <PostP>
          The clips are now in Photos as standard Rec.709 files.
          Upload them to Instagram Reels, TikTok, YouTube Shorts, or
          share via AirDrop. The footage never touched a cloud server
          between the camera and the post.
        </PostP>

        <PostH2>What about captions and LUTs?</PostH2>
        <PostP>
          Both are available in ReelClip once the clip is imported:
        </PostP>
        <PostUl>
          <li>
            <strong className="text-text">Captions.</strong> Burned-in
            subtitle styles (Pop, Karaoke, Clean, One word) generated
            from the on-device transcript. See{" "}
            <PostLink href="/blog/extract-clip-from-podcast">
              how to extract podcast highlights
            </PostLink>{" "}
            for the caption export workflow.
          </li>
          <li>
            <strong className="text-text">Creative LUTs.</strong>{" "}
            Import any <code className="px-1.5 py-0.5 rounded bg-surface text-xs text-text-muted mx-1">.cube</code> {" "}
            LUT from the Files app and stack it on top of the camera
            transform. See{" "}
            <PostLink href="/blog/how-to-apply-lut-on-iphone">
              how to apply a LUT on iPhone
            </PostLink>
            .
          </li>
        </PostUl>

        <PostCta />
      </PostBody>
    </>
  );
}
