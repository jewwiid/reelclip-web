import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
export function guideUiStrings() {
const inputs = ["components/guide-video.tsx", "components/cut-demo-video.tsx", "components/lut-film-comparison.tsx", "lib/guide-videos.ts"];
const strings = new Set([
  "All guides", "Home", "Blog", "{title} — video preview", "Blog · ReelClip — On-device video editing guides", "Guides for cutting long video on iPhone.",
  "Short video walkthroughs and practical guides for cutting recordings, clipping podcasts and finding your look. Follow along on your iPhone, with no upload.",
  "{minutes} min read", "{seconds} sec video", "Watch the {seconds} sec walkthrough", "Published {date}", "Updated {date}",
  "Tutorial", "Roundup", "Comparison", "How-to", "Use case", "Video preview",
  "Looking for the app itself?", "See what ReelClip does", "Try it on your iPhone",
  "Cut, transcribe, and export — on-device, no upload.",
  "ReelClip is free to import and preview. Creator mode unlocks full access, including saving, sharing, and exporting your work on your iPhone. Choose Slice, Cut, Transcript or AI for your edit. All video and audio processing stays on your iPhone — nothing is uploaded to ReelClip servers.",
  "Download on the App Store", "See Creator mode options", "Flat source", "Original",
]);
for (const path of inputs) {
  const source = readFileSync(path, "utf8");
  for (const match of source.matchAll(/\bt\("((?:[^"\\]|\\.)*)"/g)) strings.add(JSON.parse(`"${match[1]}"`));
  if (path === "lib/guide-videos.ts" || path.includes("lut-film-comparison")) {
    for (const match of source.matchAll(/(?:title|description|note|detail|alt|originalLabel):\s*"((?:[^"\\]|\\.)*)"/g)) strings.add(JSON.parse(`"${match[1]}"`));
  }
}
return [...strings].sort();
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const strings = guideUiStrings();
  mkdirSync("i18n/guides/ui", { recursive: true });
  writeFileSync("i18n/guides/ui/en.json", JSON.stringify(Object.fromEntries(strings.map(s => [s, s])), null, 2) + "\n");
  console.log(`Exported ${strings.length} shared guide/interface strings.`);
}
