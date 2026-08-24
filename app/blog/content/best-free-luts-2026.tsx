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
  slug: "best-free-luts-2026",
  title:
    "The best free LUT packs in 2026 (for DJI, Sony, Blackmagic, and iPhone)",
  description:
    "A curated list of the best free LUT packs available in 2026 — covering film emulations, cinematic looks, and camera-specific conversion LUTs for DJI, Sony, Blackmagic, and on-device iPhone workflows.",
  publishedAt: "2026-08-25",
  category: "Roundup" as const,
  primaryKeyword: "best free luts 2026",
  readMinutes: 9,
};

export default function Post() {
  return (
    <>
      <PostHeader {...POST_META} />
      <PostBody>
        <PostP>
          Free LUT packs have come a long way. A decade ago the only
          good ones were the official camera manufacturer conversions
          shipped with each body. In 2026 there are dozens of
          high-quality free packs covering film emulations, cinematic
          looks, and camera-specific log-to-Rec.709 conversions. This
          roundup covers the best of them, organized by what you shoot
          on.
        </PostP>
        <PostP>
          Every LUT listed here is a standard{" "}
          <code className="px-1.5 py-0.5 rounded bg-surface text-xs text-text-muted mx-1">.cube</code> {" "}
          file you can import on iPhone with ReelClip, on desktop with
          DaVinci Resolve or Premiere, or in any other tool that
          accepts the format. See{" "}
          <PostLink href="/blog/cube-lut-explained">
            what is a .cube LUT file
          </PostLink>{" "}
          for the format details if you are new to LUTs.
        </PostP>

        <PostH2>How this list is organized</PostH2>
        <PostP>
          Packs are grouped by camera system first (DJI, Sony,
          Blackmagic, general). Within each group, the conversion LUTs
          (which turn log footage into displayable color) come first —
          those are the ones you cannot skip — followed by creative
          looks you can stack on top.
        </PostP>

        <PostH2>DJI (Osmo Pocket, Air, Action, Mavic)</PostH2>

        <PostH3>1. DJI official D-Log to Rec.709 conversion LUTs</PostH3>
        <PostP>
          Free from DJI, one pack per camera model. Pocket 1 and 2
          share a D-Log pack; Pocket 3 gets its own D-Log M pack;
          Pocket 4 gets a D-Log 2 pack; Air 3 uses D-Log M; Air 4
          uses D-Log 2. These are the only LUTs you should use as a
          starting point — they are tuned to each profile&apos;s gamma
          curve.
        </PostP>
        <PostP>
          Available at dji.com under each product&apos;s support page.
        </PostP>

        <PostH3>2. DJI official D-Log M creative pack</PostH3>
        <PostP>
          Also free from DJI. Five or six stylized looks designed to
          stack on top of the official conversion LUT — cinematic
          warm, cinematic cool, high contrast, and a couple of natural
          options. The best free starting point if you want stylistic
          grades without buying anything.
        </PostP>

        <PostH3>3. DJI Mavic 3 / Inspire 2 official LUTs</PostH3>
        <PostP>
          Separate free packs for the higher-end DJI cameras. The
          Mavic 3 series uses D-Log; the Inspire 2 uses D-Log as
          well. Same workflow — convert first, then stack creative.
        </PostP>

        <PostH2>Sony (FX3, A7S III, A7 IV, ZV-E1)</PostH2>

        <PostH3>4. Sony official S-Log3 to Rec.709 LUT</PostH3>
        <PostP>
          Free from Sony. Covers S-Log3, S-Log2, and the hybrid log
          gamma (HLG) profiles. Designed for accurate conversion;
          pairs well with any creative LUT you stack on top. This is
          the one to download first.
        </PostP>

        <PostH3>5. Sony Cine panel LUTs</PostH3>
        <PostP>
          Sony&apos;s Cine mode ships a small set of in-camera LUTs
          that emulate film looks. Free to extract from the camera
          firmware or download from the Sony community. Useful as
          creative grades once you have applied the conversion LUT.
        </PostP>

        <PostH2>Blackmagic (Pocket 4K, 6K, URSA)</PostH2>

        <PostH3>6. Blackmagic Film to Rec.709 conversion LUT</PostH3>
        <PostP>
          Free from Blackmagic Design. The default LUT shipped with
          DaVinci Resolve. Converts Blackmagic Film (Gen 4 and Gen
          5) to Rec.709. Reliable, accurate, and a great starting
          point for any Blackmagic footage.
        </PostP>

        <PostH3>7. Blackmagic extended video LUT</PostH3>
        <PostP>
          Another official Blackmagic LUT. Converts the extended
          video profile (used for live HDR-style shooting) to a
          displayable color space. Less commonly needed than the
          Film-to-Rec.709 LUT, but free and worth having.
        </PostP>

        <PostH2>Apple (iPhone 15 Pro / 16 Pro / 17 Pro Apple Log)</PostH2>

        <PostH3>8. Apple official Apple Log conversion LUT</PostH3>
        <PostP>
          Free from Apple. Designed for the Apple Log profile that
          iPhone 15 Pro, 16 Pro, and 17 Pro can record when ProRes is
          enabled. The only LUT that gives a true Apple-blessed
          conversion. Apply first, then stack any creative look you
          want.
        </PostP>
        <PostP>
          Apple Log 2 (iPhone 17 Pro and the new iPad Pro M-series)
          uses a different curve — Apple ships a separate LUT for
          it. Make sure you download the right one for your device.
        </PostP>

        <PostH2>General creative LUT packs (work on any camera)</PostH2>

        <PostH3>9. Lutify.me 7-LUT starter pack</PostH3>
        <PostP>
          Free from Lutify.me. Seven film-emulation looks covering
          Kodak, Fuji, and Polaroid stocks. Designed for general log
          footage, so they stack cleanly on top of any conversion
          LUT from the categories above. The best free pack for
          cinematic looks if you only download one creative LUT
          pack.
        </PostP>

        <PostH3>10. SmallHD Movie Look pack</PostH3>
        <PostP>
          Free from SmallHD. Four film-stock emulations tuned for
          natural skin tones. Particularly good for interview and
          talking-head footage where skin needs to look right.
        </PostP>

        <PostH3>11. Color Grading Central free pack</PostH3>
        <PostP>
          Free from Color Grading Central. Seventeen looks covering
          cinematic, vintage, and modern grades. Useful as a
          sampler to figure out what kind of grade you want before
          investing in a paid pack.
        </PostP>

        <PostH3>12. PremiumBeat color grading pack</PostH3>
        <PostP>
          Free from PremiumBeat. Six cinematic looks designed for
          short-form video and social content. Pairs well with the
          vertical-video workflow covered in{" "}
          <PostLink href="/blog/edit-vertical-video-on-iphone">
            how to edit vertical video on iPhone
          </PostLink>
          .
        </PostP>

        <PostH2>How to stack these LUTs correctly</PostH2>
        <PostP>
          The order matters, every time:
        </PostP>
        <PostOl>
          <li>
            <strong className="text-text">Conversion LUT first.</strong>{" "}
            The official manufacturer LUT that converts your log
            profile to Rec.709.
          </li>
          <li>
            <strong className="text-text">Creative LUT on top.</strong>{" "}
            The film-emulation or cinematic pack stacked above the
            conversion LUT, at 60–85% strength.
          </li>
          <li>
            <strong className="text-text">Optional third layer.</strong>{" "}
            A subtle correction LUT (warming, cooling, skin tone fix)
            for fine-tuning. Most footage does not need this.
          </li>
        </PostOl>
        <PostP>
          See{" "}
          <PostLink href="/blog/how-to-apply-lut-on-iphone">
            how to apply a .cube LUT on iPhone
          </PostLink>{" "}
          for the on-device workflow, including how to stack the
          layers in ReelClip.
        </PostP>

        <PostH2>When to pay for LUT packs</PostH2>
        <PostP>
          Most paid LUT packs ($20–$50) ship 30–100 looks designed
          for a specific aesthetic — film stocks, music video looks,
          cinema-emulation packs. They are worth buying once you
          know what kind of grade you want. Until then, the twelve
          free packs above cover the vast majority of styles a
          creator will actually use.
        </PostP>

        <PostH2>What to do next</PostH2>
        <PostP>
          For the Osmo Pocket workflow specifically, see{" "}
          <PostLink href="/blog/dji-osmo-pocket-3-luts">
            DJI Osmo Pocket 3 LUTs
          </PostLink>
          . For the generic .cube format details, see{" "}
          <PostLink href="/blog/cube-lut-explained">
            what is a .cube LUT file
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
