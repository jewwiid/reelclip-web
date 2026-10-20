import { PostBody, PostCta, PostH2, PostHeader, PostLink, PostOl, PostP, PostUl } from "@/components/blog";
import { LUTFilmComparison } from "@/components/lut-film-comparison";

export const POST_META = {
  slug: "edit-any-log-footage-iphone",
  title: "How to edit log footage on iPhone: camera conversion and creative LUTs",
  description: "Choose the correct camera profile, import a matching conversion LUT, and add a creative look in ReelClip. Learn what to check before exporting log footage.",
  publishedAt: "2026-10-20",
  updatedAt: "2026-10-20",
  category: "Use case" as const,
  primaryKeyword: "edit log footage on iphone",
  readMinutes: 5,
};

export default function Post() {
  return (
    <>
      <PostHeader {...POST_META} />
      <PostBody>
        <PostP>
          Log footage can look washed out before color conversion. To grade it,
          first match the camera&apos;s recording profile with the right technical
          transform, then choose a creative look. ReelClip keeps those two steps
          separate so you can adjust the style without replacing the camera conversion.
        </PostP>
        <PostP>
          Selecting a log profile does not install a conversion LUT. You need a
          compatible video file and a matching camera-conversion .cube file for
          the log workflow described below.
        </PostP>

        <PostH2>Which camera profiles can you select?</PostH2>
        <PostUl>
          <li><strong>DJI:</strong> D-Log, D-Log M and D-Log 2.</li>
          <li><strong>Apple:</strong> Apple Log and Apple Log 2.</li>
          <li><strong>HDR:</strong> HLG and PQ, handled separately from imported log-conversion LUTs.</li>
          <li><strong>Standard:</strong> footage that is already display-ready.</li>
          <li><strong>Other log:</strong> another log source with a matching imported camera transform.</li>
        </PostUl>
        <PostP>
          Automatic detection can use supported metadata and filename hints. Check
          the selection against your camera settings: a filename is a suggestion,
          and transfers or earlier edits can change the information available to the app.
        </PostP>
        <PostP>
          Sony, Canon, Panasonic and Blackmagic are not named profile presets in
          ReelClip. For footage from these cameras, use Other log with the correct
          conversion LUT, provided the iPhone can decode the video file. A camera
          brand alone does not establish compatibility with every codec or RAW format.
        </PostP>

        <PostH2>Convert log footage before adding a creative look</PostH2>
        <PostOl>
          <li><strong>Import your clip.</strong> Use the original recording where possible and confirm its recording profile and gamut.</li>
          <li><strong>Choose the source profile.</strong> In the color controls, check the detected profile or select the matching log option.</li>
          <li><strong>Import the camera transform.</strong> Choose a .cube conversion that matches the camera, recording curve and gamut. Check its documentation for the expected output color space. A log profile marked “LUT needed” still needs this file.</li>
          <li><strong>Add a creative LUT.</strong> Select a look intended for the converted image. The universal creative packs expect normalized sRGB/Rec.709 input. Use the strength control to adjust the creative effect.</li>
          <li><strong>Review, then export.</strong> Check skin tones, bright skies and shadow detail. Editing and preview are available free; saving the finished video requires Creator.</li>
        </PostOl>
        <PostP>
          Apply the technical conversion once. If another editor has already converted
          the file to standard SDR, select Standard rather than applying the original
          log conversion again. A double conversion can produce excessive contrast
          and clipped detail.
        </PostP>
        <PostP>
          For more on creative LUT selection and import, see{' '}
          <PostLink href="/blog/how-to-apply-lut-on-iphone">how to apply a LUT on iPhone</PostLink>.
          You can also browse{' '}
          <PostLink href="/blog/best-free-luts-2026">camera-conversion resources and starter looks</PostLink>.
        </PostP>

        <PostH2>Compare real footage before and after</PostH2>
        <PostP>
          Drag the slider to compare real stock-footage frames with illustrative
          grades. The ungraded frame is on the left, labelled Flat source (or
          Original for the display-ready city example), and the graded result
          is on the right. Stock uploads do not confirm a camera&apos;s exact log
          curve, so treat these as creative examples, not conversion references.
          Each scene includes its footage source and license link.
        </PostP>
        <LUTFilmComparison />
        <PostP>
          These examples use the same real footage and starter looks as our free
          LUT guide. The illustrative balance is not a calibrated manufacturer
          conversion. Evaluate a look on your own footage before deciding whether
          it suits your project.
        </PostP>

        <PostH2>Camera conversion and creative LUTs do different jobs</PostH2>
        <PostP>
          A <strong>camera conversion</strong> maps a specific recording encoding
          into the intended working or display space. Match both the log curve and
          color gamut: two files described as “log” can need different transforms.
        </PostP>
        <PostP>
          A <strong>creative LUT</strong> styles the converted image. It can warm
          highlights, cool shadows or reduce saturation. It cannot correct a wrong
          source transform, and a LUT alone does not add film grain or halation.
        </PostP>
        <PostP>
          ReelClip applies the supplied camera transform before the creative look.
          Keep the technical conversion in the camera-transform control and the
          style in the creative-look control. Check each LUT&apos;s input requirements
          rather than assuming every .cube file serves the same purpose.
        </PostP>

        <PostH2>If the result looks wrong</PostH2>
        <PostUl>
          <li><strong>Still washed out?</strong> Confirm that a camera transform is loaded, not just a log profile selected.</li>
          <li><strong>Too contrasty?</strong> Check for a conversion applied twice and confirm that the creative LUT expects your converted color space.</li>
          <li><strong>Unnatural colors?</strong> Recheck the recording gamut, white balance and conversion file before increasing the look strength.</li>
          <li><strong>A file will not import?</strong> Check the video container and codec. Selecting Other log does not add support for an otherwise unsupported video format.</li>
        </PostUl>

        <PostH2>Try the workflow on your own footage</PostH2>
        <PostP>
          Start with a short clip containing a face, neutral objects and some bright
          detail. Review the camera conversion with the creative look disabled,
          then add the look at a moderate strength. Clips from different cameras
          may still need individual exposure and white-balance adjustments.
        </PostP>
        <PostP>
          Color preview and rendering run on-device. You can import, edit and
          preview before upgrading. Video export requires Creator, available as a one-time
          purchase or a monthly plan.
        </PostP>
        <PostCta />
      </PostBody>
    </>
  );
}
