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
  slug: "edit-vertical-video-on-iphone",
  title:
    "How to edit vertical video on iPhone (Reels, TikTok, Shorts)",
  description:
    "A practical guide to editing vertical 9:16 video on iPhone — from import to caption export — with the on-device workflows that work for Instagram Reels, TikTok, and YouTube Shorts.",
  publishedAt: "2026-08-25",
  category: "How-to" as const,
  primaryKeyword: "how to edit vertical video on iphone",
  readMinutes: 7,
};

export default function Post() {
  return (
    <>
      <PostHeader {...POST_META} />
      <PostBody>
        <PostP>
          Vertical video is no longer the future — it is the present.
          Instagram Reels, TikTok, YouTube Shorts, Snapchat, and
          Pinterest all serve vertical 9:16 video first. If you are
          shooting on iPhone, the cleanest workflow is to edit the
          vertical video on iPhone too. No round-trip through a
          laptop, no upload, no waiting for a render.
        </PostP>
        <PostP>
          This guide walks through the on-device workflow for editing
          vertical video — from import to caption export to post —
          with the settings that work for all three platforms.
        </PostP>

        <PostH2>Vertical video specs in 2026</PostH2>
        <PostP>
          All three short-form platforms converge on the same aspect
          ratio:
        </PostP>
        <PostUl>
          <li>
            <strong className="text-text">Aspect ratio:</strong> 9:16
            (vertical). Some platforms accept 1:1 and 4:5 but
            9:16 fills the screen.
          </li>
          <li>
            <strong className="text-text">Resolution:</strong>{" "}
            1080×1920 minimum, 2160×3840 (4K vertical) supported on
            all three platforms.
          </li>
          <li>
            <strong className="text-text">Frame rate:</strong> 24, 30,
            or 60 fps. 30 fps is the safe default.
          </li>
          <li>
            <strong className="text-text">Duration:</strong> TikTok
            up to 10 minutes, Reels up to 3 minutes (with longer
            for some accounts), Shorts up to 3 minutes.
          </li>
          <li>
            <strong className="text-text">File format:</strong> MP4 or
            MOV. Both work everywhere.
          </li>
        </PostUl>

        <PostH2>Two ways to start: shoot vertical or shoot horizontal</PostH2>

        <PostH3>Option A: Shoot vertical (recommended for native feel)</PostH3>
        <PostP>
          Hold the iPhone vertically (portrait orientation) and shoot.
          The footage is already 9:16, so no conversion is needed.
          This is the right call when you know the final destination
          is short-form — the framing is honest, the motion feels
          native, and you skip the cropping step.
        </PostP>

        <PostH3>Option B: Shoot horizontal and crop in post</PostH3>
        <PostP>
          Shoot in landscape if you need flexibility — interviews,
          documentary footage, travel clips where the horizontal
          framing is part of the look. Crop to 9:16 in your editor
          by reframing the shot.
        </PostP>
        <PostP>
          ReelClip exports trimmed clips at the original aspect ratio
          — it does not auto-crop or zoom. If you shoot horizontal
          and want vertical output, crop the framing yourself in
          your finishing editor, or use ReelClip&apos;s Slice mode
          which gives you full manual control over the frame.
        </PostP>

        <PostH2>The on-device workflow</PostH2>

        <PostH3>Step 1: Import the footage</PostH3>
        <PostP>
          Open ReelClip and import from Photos or Files. The file is
          copied into the app&apos;s private sandbox — nothing is
          uploaded.
        </PostP>

        <PostH3>Step 2: Pick a cut mode</PostH3>
        <PostP>
          For vertical content, the right cut mode depends on what
          you are editing:
        </PostP>
        <PostUl>
          <li>
            <strong className="text-text">Cut</strong> — splits by
            duration. Good for cooking videos, tutorials, listicles
            where each segment is roughly equal.
          </li>
          <li>
            <strong className="text-text">Transcript</strong> — finds
            pauses in talking-head footage and lets you trim them.
            Good for podcasts, vlogs, interviews.
          </li>
          <li>
            <strong className="text-text">Slice</strong> — manual
            highlight mode. Good when you already know which moments
            you want.
          </li>
          <li>
            <strong className="text-text">AI</strong> — asks
            on-device Apple Intelligence to pick the moments based
            on a prompt. Good for vlogs where you have not yet
            decided which parts are best.
          </li>
        </PostUl>
        <PostP>
          See{" "}
          <PostLink href="/blog/how-to-cut-long-video-for-tiktok">
            how to cut a long video for TikTok
          </PostLink>{" "}
          for the detailed Cut mode workflow.
        </PostP>

        <PostH3>Step 3: Review every clip</PostH3>
        <PostP>
          Tap each planned clip, watch it from start to finish, and
          decide: keep, trim, or reject. ReelClip never auto-exports
          — you stay in control. Trim the start (the first second is
          what viewers decide on) and the end of each clip.
        </PostP>

        <PostH3>Step 4: Add captions</PostH3>
        <PostP>
          Around 80% of vertical video is watched on mute. Burned-in
          captions are not optional. ReelClip generates captions from
          the on-device transcript with one of four styles:
        </PostP>
        <PostUl>
          <li>
            <strong className="text-text">Pop</strong> — bold, single
            word highlighted at a time. High-energy style for Reels
            and TikTok.
          </li>
          <li>
            <strong className="text-text">Karaoke</strong> — word-by-word
            color change as it is spoken. Lively, good for music
            and entertainment.
          </li>
          <li>
            <strong className="text-text">Clean</strong> — minimal
            styling, white text on a subtle background. Good for
            tutorials and explainers.
          </li>
          <li>
            <strong className="text-text">One word</strong> — single
            large word at a time. Good for storytelling and
            short-form drama.
          </li>
        </PostUl>
        <PostP>
          You can also export the SRT or VTT file separately and
          bring it into CapCut, VN, or any other editor that
          accepts caption files.
        </PostP>

        <PostH3>Step 5: Apply a LUT if you want a stylized grade</PostH3>
        <PostP>
          If you are grading DJI, Sony, or other log footage, apply
          the camera transform first, then stack a creative LUT on
          top. See{" "}
          <PostLink href="/blog/best-free-luts-2026">
            the best free LUT packs in 2026
          </PostLink>{" "}
          for the curated list of free packs and{" "}
          <PostLink href="/blog/how-to-apply-lut-on-iphone">
            how to apply a .cube LUT on iPhone
          </PostLink>{" "}
          for the apply workflow.
        </PostP>

        <PostH3>Step 6: Export to Photos</PostH3>
        <PostP>
          Tap <strong className="text-text">Save clips</strong>.
          ReelClip exports each approved clip to your Photos library
          at the original aspect ratio. The original file stays
          untouched.
        </PostP>

        <PostH3>Step 7: Post to all three platforms</PostH3>
        <PostP>
          One clip, three platforms. Upload the same file to
          Instagram Reels, TikTok, and YouTube Shorts — they all
          accept the same 9:16 MP4. Cross-posting is the cheapest
          growth move in short-form video.
        </PostP>

        <PostH2>Common vertical-video mistakes</PostH2>
        <PostUl>
          <li>
            <strong className="text-text">Uploading landscape
            footage with letterboxing.</strong> The viewer&apos;s
            phone is full-bleed vertical; a letterboxed video looks
            small and dated. Crop or reframe before posting.
          </li>
          <li>
            <strong className="text-text">No captions.</strong>{" "}
            80% mute-watched. Always add captions.
          </li>
          <li>
            <strong className="text-text">Captions in the platform&apos;s
            auto-captioner.</strong> They drift, miss words, and look
            generic. Burned-in captions you control look better and
            reinforce brand consistency.
          </li>
          <li>
            <strong className="text-text">Watermark on the export.</strong>{" "}
            Some iOS editors stamp every export with their logo. ReelClip&apos;s
            Creator tier does not.
          </li>
          <li>
            <strong className="text-text">Uploading the raw 12-minute
            file.</strong> Tighter clips get watched further. Aim
            for under 90 seconds unless the content genuinely runs
            longer.
          </li>
        </PostUl>

        <PostH2>What to do next</PostH2>
        <PostP>
          For the broader short-form workflow including the Cut mode
          settings, see{" "}
          <PostLink href="/blog/how-to-cut-long-video-for-tiktok">
            how to cut a long video for TikTok
          </PostLink>
          . For the podcast angle, see{" "}
          <PostLink href="/blog/extract-clip-from-podcast">
            how to extract highlights from a podcast
          </PostLink>
          . For a comparison with CapCut and other iOS editors, see{" "}
          <PostLink href="/blog/capcut-alternative-no-watermark">
            the best CapCut alternative without a watermark
          </PostLink>
          .
        </PostP>

        <PostCta />
      </PostBody>
    </>
  );
}
