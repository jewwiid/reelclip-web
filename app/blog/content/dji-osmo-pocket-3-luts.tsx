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
  slug: "dji-osmo-pocket-3-luts",
  title:
    "DJI Osmo Pocket 3 LUTs — the best free LUT packs (and how to apply them)",
  description:
    "A curated list of the best free DJI Osmo Pocket 3 LUT packs for D-Log M, plus the exact workflow to apply them on iPhone with no upload and no desktop.",
  publishedAt: "2026-08-25",
  category: "Roundup" as const,
  primaryKeyword: "dji osmo pocket 3 luts",
  readMinutes: 8,
};

export default function Post() {
  return (
    <>
      <PostHeader {...POST_META} />
      <PostBody>
        <PostP>
          The DJI Osmo Pocket 3 shoots gorgeous footage in D-Log M, but
          out of the camera it looks flat and washed out. To get the
          cinematic look DJI Pocket shooters are known for, you need a
          conversion LUT (Look-Up Table) — a small file that maps the
          flat log values back into a displayable color space, with an
          optional creative grade stacked on top.
        </PostP>
        <PostP>
          This guide rounds up the best free LUT packs for the Osmo
          Pocket 3, and walks through the exact workflow to apply them
          on your iPhone — without uploading your footage anywhere.
        </PostP>

        <PostH2>Why the Pocket 3 needs D-Log M LUTs specifically</PostH2>
        <PostP>
          D-Log M is DJI&apos;s mid-generation log profile, introduced
          with the Pocket 3. It is a slightly more forgiving curve
          than the original D-Log (used on Pocket 1 and Pocket 2), but
          it still needs a profile-specific conversion LUT.
        </PostP>
        <PostP>
          Applying a D-Log LUT to D-Log M footage — or vice versa —
          gives wrong colors. The gamma curves are different, and the
          conversion math only lines up if you feed the right curve to
          the right LUT. This is the single most common mistake in
          Pocket 3 grading workflows.
        </PostP>

        <PostH2>The best free DJI Osmo Pocket 3 LUT packs</PostH2>
        <PostP>
          Curated list, ordered by how often each gets recommended
          across creator communities in 2026:
        </PostP>

        <PostH3>1. DJI&apos;s official D-Log M to Rec.709 conversion LUT</PostH3>
        <PostP>
          Free, official, and the one DJI ships in their color
          reference for the Pocket 3. Available as a direct download
          from the DJI website under support / downloads for the
          Pocket 3. This is the LUT you want for accurate color
          reproduction — not stylized, just correct.
        </PostP>

        <PostH3>2. DJI D-Log M to Rec.709 creative pack (official)</PostH3>
        <PostP>
          Also free from DJI. A small set of stylized looks designed
          for Pocket 3 D-Log M footage: cinematic warm, cinematic cool,
          high-contrast, and a couple of natural options. Less popular
          than the standalone conversion LUT but useful if you want a
          stylistic grade without buying a third-party pack.
        </PostP>

        <PostH3>3. Free LUT packs from Lutify.me</PostH3>
        <PostP>
          Lutify.me ships a free 7-LUT starter pack covering film
          emulations (Kodak, Fuji, Polaroid) and cinematic looks. Not
          Pocket 3-specific — these are designed for general log
          footage — but they stack cleanly on top of DJI&apos;s
          conversion LUT and work well with the Pocket 3&apos;s color
          science.
        </PostP>

        <PostH3>4. SmallHD&apos;s free movie LUT pack</PostH3>
        <PostP>
          SmallHD (a monitor company) ships a free 4-LUT pack modeled
          on film stocks. Designed for any log camera, including the
          Pocket 3. Particularly good for skin tones.
        </PostP>

        <PostH3>5. Color Grading Central free pack</PostH3>
        <PostP>
          A 17-LUT freebie aimed at indie filmmakers. Includes some
          Pocket-3-friendly cinematic looks. Useful as a sampler if
          you are deciding whether to buy a paid pack later.
        </PostP>

        <PostP>
          Most paid LUT packs (Ground Control, Rocket Stock, BMDFilm)
          are $20–50 and ship 30–100 looks. They are worth buying
          once you know what kind of grade you want. Start with the
          free DJI conversion LUT first; everything else is decoration.
        </PostP>

        <PostH2>How to apply a Pocket 3 LUT on iPhone</PostH2>

        <PostH3>Step 1: Get the LUT file</PostH3>
        <PostP>
          Download the .cube file you want. It usually arrives in a
          ZIP — unzip it. Save the .cube file to a folder your iPhone
          can read: Files (on-device or iCloud Drive), Dropbox, or
          any cloud storage iOS supports.
        </PostP>

        <PostH3>Step 2: Import the Pocket 3 clip into ReelClip</PostH3>
        <PostP>
          Open ReelClip and import the Pocket 3 footage from Photos
          or Files. The file is copied into the app&apos;s private
          sandbox — nothing is uploaded.
        </PostP>

        <PostH3>Step 3: Pick the camera color profile</PostH3>
        <PostP>
          When ReelClip opens the file, set the camera color profile
          to <strong className="text-text">DJI D-Log M</strong>. This
          is the Pocket 3&apos;s log profile. The app will apply the
          built-in camera-transform LUT for D-Log M, which converts
          your flat footage into a normal Rec.709 color space.
        </PostP>

        <PostH3>Step 4: Import your creative .cube LUT</PostH3>
        <PostP>
          In the Look panel, tap{" "}
          <strong className="text-text">Import LUT</strong> and pick
          the .cube file from Files. ReelClip parses it, validates
          it, and adds it to your on-device LUT library.
        </PostP>

        <PostH3>Step 5: Apply and tune strength</PostH3>
        <PostP>
          Select the LUT you imported. ReelClip stacks it on top of
          the camera transform. Most creative LUTs look too strong at
          100% — start at 70–80% strength and adjust. You can preview
          the result on every frame in real time.
        </PostP>

        <PostH3>Step 6: Save to Photos</PostH3>
        <PostP>
          Save the graded clip. The output is a standard Rec.709
          file ready to post, share, or edit further.
        </PostP>

        <PostH2>Stacking LUTs the right way</PostH2>
        <PostP>
          The order matters. Camera-transform first (DJI D-Log M to
          Rec.709), then creative on top. If you reverse the order —
          creative LUT on raw log footage — the result is unpredictable.
          ReelClip enforces the correct order by applying the camera
          transform automatically and letting you add the creative
          look as a second layer.
        </PostP>

        <PostH2>Common Pocket 3 LUT mistakes</PostH2>
        <PostUl>
          <li>
            <strong className="text-text">Using a D-Log LUT on
            D-Log M footage.</strong> The gamma curves are different.
            The colors come out wrong. Always match the LUT to the
            profile you shot in.
          </li>
          <li>
            <strong className="text-text">Applying creative LUTs at
            100% strength.</strong> Most look better at 60–85%. Dial
            back until the grade feels natural.
          </li>
          <li>
            <strong className="text-text">Using the same LUT for every
            shot.</strong> Different lighting conditions call for
            different grades. Outdoor golden hour, indoor mixed
            light, night footage — each wants its own LUT or at
            least its own strength setting.
          </li>
          <li>
            <strong className="text-text">Stacking too many LUTs.</strong>{" "}
            One camera transform, one creative look. Adding a third
            layer usually makes things worse.
          </li>
        </PostUl>

        <PostH2>What to do next</PostH2>
        <PostP>
          See{" "}
          <PostLink href="/blog/how-to-apply-lut-on-iphone">
            how to apply a .cube LUT on iPhone
          </PostLink>{" "}
          for the generic LUT workflow, or{" "}
          <PostLink href="/blog/cube-lut-explained">
            what is a .cube LUT file
          </PostLink>{" "}
          for the format details. For the broader Pocket workflow
          from import to post, see{" "}
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
