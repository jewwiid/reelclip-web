// Resolver tests use synthetic registry data only, never an asset approval.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";

function compile(path, require) {
  const javascript = ts.transpileModule(readFileSync(path, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true } }).outputText;
  const exports = {};
  new Function("exports", "require", javascript)(exports, require);
  return exports;
}
const base = compile("lib/guide-videos.ts", () => { throw new Error("Unexpected dependency"); });
function resolver(registry) {
  return compile("lib/guide-video-variants.ts", name => {
    if (name === "./guide-videos") return base;
    if (name === "./guide-video-variants.json") return registry;
    throw new Error(`Unexpected dependency ${name}`);
  }).getGuideVideoPlayback;
}
const current = resolver({});
for (const [id, details] of Object.entries(base.GUIDE_VIDEOS)) {
  const english = current(id, "en");
  assert.equal(english.video, `/tutorials/${details.asset}.mp4`);
  assert.equal(english.appLanguage, "en");
  const japanese = current(id, "ja");
  assert.equal(japanese.captions, `/tutorials/locales/ja/${details.asset}.vtt`);
}
const synthetic = { ...base.GUIDE_VIDEOS["equal-sections"], asset: "test-only-german-variant", appLanguage: "de", duration: 31, chapters: [{ start: 0, title: "Test", description: "Synthetic test only" }] };
const withVariant = resolver({ "equal-sections": { de: synthetic } });
const german = withVariant("equal-sections", "de");
assert.equal(german.video, "/tutorials/locales/de/test-only-german-variant.mp4");
assert.equal(german.poster, "/tutorials/locales/de/test-only-german-variant.jpg");
assert.equal(german.captions, "/tutorials/locales/de/test-only-german-variant.vtt");
assert.equal(german.appLanguage, "de");
assert.equal(german.details.duration, 31);
assert.equal(german.details.chapters.length, 1);
assert.equal(withVariant("equal-sections", "fr").appLanguage, "en");
assert.equal(withVariant("cut-clips", "de").appLanguage, "en");
console.log("Guide playback selects the matching locale's video, poster, captions and timing, with an honest English fallback.");
