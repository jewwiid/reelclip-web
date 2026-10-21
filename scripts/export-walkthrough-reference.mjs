import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, sep } from "node:path";

const origin = "https://www.reelclips.app";
const publicRoot = resolve("public");
const reference = JSON.parse(readFileSync("public/app-reference/equal-clips.json", "utf8"));
const hash = (bytes) => createHash("sha256").update(bytes).digest("hex");
const url = (path) => `${origin}${path}`;
const clock = (seconds) => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;

function publicFile(path) {
  assert.match(path, /^\/(?:app-reference|tutorials)\/[a-z0-9.-]+$/);
  const file = resolve(publicRoot, `.${path}`);
  assert.ok(file.startsWith(publicRoot + sep), "Asset must stay in public/");
  return file;
}

assert.equal(reference.schema, "reelclip.walkthrough-reference/1");
assert.equal(reference.language, "en");
assert.match(reference.reviewed_on, /^\d{4}-\d{2}-\d{2}$/);
assert.equal(reference.documents.json, "/app-reference/equal-clips.json");
assert.equal(reference.documents.page, "/app-reference/equal-clips");
assert.equal(reference.documents.markdown, "/app-reference/equal-clips.md");
assert.match(reference.guide, /^\/blog\/[a-z0-9-]+#walkthrough$/);
assert.ok(Number.isFinite(reference.video.duration_seconds) && reference.video.duration_seconds > 0);
for (const asset of [reference.video, ...reference.screenshots]) {
  assert.match(asset.sha256, /^[a-f0-9]{64}$/);
  assert.equal(hash(readFileSync(publicFile(asset.path))), asset.sha256, `Reviewed asset changed: ${asset.path}`);
}
const ids = reference.controls.map((control) => control.id);
assert.equal(new Set(ids).size, ids.length, "Control IDs must be unique");
assert.equal(new Set(reference.steps.map((step) => step.id)).size, reference.steps.length, "Step IDs must be unique");
let previous = -1;
for (const step of reference.steps) {
  assert.ok(Number.isFinite(step.start_seconds) && step.start_seconds > previous && step.start_seconds < reference.video.duration_seconds, "Step timestamp outside recording or out of order");
  assert.ok(step.control_ids.every((id) => ids.includes(id)), "Unknown control in a step");
  previous = step.start_seconds;
}
for (const frame of reference.screenshots) {
  assert.ok(Number.isFinite(frame.video_seconds) && frame.video_seconds >= 0 && frame.video_seconds < reference.video.duration_seconds, "Screenshot timestamp outside recording");
}
// Public references must not accidentally expose local provenance or credentials.
assert.ok(!/(?:\/Users\/|\.organic-runs|client_secret|refresh_token|BEGIN PRIVATE KEY)/i.test(JSON.stringify(reference)));

const lines = [
  `# ${reference.title}`, "",
  `> ${reference.summary}`, "",
  `Reviewed ${reference.reviewed_on}. Language: English. App version in the recording: ${reference.app_version_in_recording ?? "not established"}.`, "",
  `[Readable reference with screenshots](${url(reference.documents.page)}) · [Watch the walkthrough in its guide](${url(reference.guide)}) · [Screen recording](${url(reference.video.path)}) · [Structured JSON](${url(reference.documents.json)})`, "",
  "## Context", "",
  ...reference.context.map((text) => `- ${text}`), "",
  reference.video.scope, "",
  "## Steps", "",
  ...reference.steps.flatMap((step, index) => [
    `${index + 1}. **[${clock(step.start_seconds)} — ${step.title}](${url(reference.video.path)}#t=${step.start_seconds})**. ${step.instruction}`, "",
  ]),
  "## Controls", "",
  ...reference.controls.flatMap((control) => [
    `### ${control.label}`, "", `Where: ${control.location}.`, "", control.meaning, "", `In this recording: ${control.observed}`, "",
  ]),
  "## Observed example", "",
  `- Source: ${reference.example.source_duration_display}.`,
  `- Clip amount: ${reference.example.clip_count}.`,
  `- Space: ${reference.example.spacing_display}.`,
  `- Clip duration: ${reference.example.clip_duration_display}; precise readout: ${reference.example.precise_duration_readout}.`,
  ...reference.example.planned_ranges_display.map((range, index) => `- Planned clip ${index + 1}: ${range}.`), "",
  reference.example.rounding_note, "",
  "## Reviewed screenshots", "",
  ...reference.screenshots.flatMap((frame) => [
    `**${clock(frame.video_seconds)}** — ${frame.description}`, "", `![${frame.description}](${url(frame.path)})`, "",
  ]),
  "## What this evidence supports", "",
  ...reference.limits.map((text) => `- ${text}`), "",
];
const markdown = lines.join("\n");
const destination = publicFile(reference.documents.markdown);
if (process.argv.includes("--check")) {
  assert.equal(readFileSync(destination, "utf8"), markdown, "Run node scripts/export-walkthrough-reference.mjs to refresh the reference");
  console.log(`Walkthrough reference matches ${reference.controls.length} controls, ${reference.steps.length} steps and ${reference.screenshots.length} reviewed screenshots; all media hashes match.`);
} else {
  writeFileSync(destination, markdown);
  console.log(`Exported ${reference.documents.markdown}`);
}
