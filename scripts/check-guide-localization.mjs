#!/usr/bin/env node
import { readFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { posts, sourceFingerprint } from "./guide-source.mjs";
import { guideUiStrings } from "./export-guide-ui.mjs";

const locales = ["de", "es", "fr", "hi", "it", "ja", "ko", "nl", "pl", "pt-BR", "pt-PT"];
const partial = process.argv.includes("--partial");
const failures = [];
let documents = 0;
const fail = (path, message) => failures.push(`${path}: ${message}`);
const read = path => JSON.parse(readFileSync(path, "utf8"));
const plain = value => value.replace(/<[^>]*>/g, " ").replace(/&(?:amp|lt|gt|quot|#x27|#39|nbsp);/g, " ").replace(/\s+/g, " ").trim();
const sorted = value => JSON.stringify([...value].sort());
const placeholders = value => value.match(/\{[a-zA-Z][a-zA-Z0-9_]*\}/g) ?? [];
const tags = value => value.replace(/<!--[\s\S]*?-->/g, "").match(/<[^>]*>/g) ?? [];
const recordedLabels = new Set(["Clip amount", "Clip duration", "Adjust & Style", "Import LUT", "Remove pauses", "Cut timing", "Auto keep", "Auto remove", "Review video", "Save to Photos", "No gap", "Add as clip", "Remove pause", "Cut pauses longer than"]);
const unchangedNames = new Set(["Apple Intelligence", "Apple Log", "Apple Log 2", "Blackmagic Camera", "DaVinci Resolve", "YouTube Shorts", "DJI OSMO Pocket 3 D-Log M to Rec.709", "Clean Natural", "Soft Portrait", "Warm Daylight", "Cool Daylight", "Gentle Cinema", "Classic Mono"]);
const exactControls = ["Adjust & Style", "Remove pauses", "Clip duration", "Clip amount", "Auto remove", "Auto keep", "Cut timing", "Add as clip", "Import LUT", "Save to Photos", "Review video", "No gap", "Audio", "Cleanup", "Files", "Creative"];
function recordingChecks(source, target, path) {
  for (const control of exactControls) {
    if (source.includes(control) && !target?.includes(control)) fail(path, `recorded control name changed: ${control}`);
  }
  const numbers = value => (value.normalize("NFKC").match(/\d+(?:[.,]\d+)*/g) ?? []).map(number => number.replaceAll(/[.,]/g, ""));
  const expected = numbers(source), actual = numbers(target ?? "");
  if (expected.some(number => !actual.includes(number))) fail(path, "numeric value missing from tutorial text");
}
const shortEnglishPhrase = value => (plain(value).match(/[A-Za-z]{2,}/g) ?? []).length >= 2 && !recordedLabels.has(plain(value)) && !unchangedNames.has(plain(value));
function shortLabels(source, target, path) {
  // Compare labels by the unchanged URL. Natural language may reorder links.
  for (const original of source.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)) {
    const translated = [...target.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)].find(match => match[1] === original[1]);
    if (translated && shortEnglishPhrase(original[2]) && plain(original[2]) === plain(translated[2])) fail(path, `unchanged English link label: ${plain(original[2])}`);
  }
}
const localizeLinks = (value, locale) => value.replace(/href="\/(?!\/)([^"?#]*)([?#][^"]*)?"/g, (_, path, suffix = "") => `href="/${locale}/${path}${suffix}"`);

function copyChecks(source, target, path) {
  if (typeof target !== "string" || !target.trim()) { fail(path, "missing translated text"); return; }
  if (sorted(placeholders(source)) !== sorted(placeholders(target))) fail(path, "changed template placeholders");
  if (plain(source).length > 65 && plain(source).split(" ").length > 9 && plain(source) === plain(target)) fail(path, "unchanged English prose");
  if ((source.match(/\.cube/g) ?? []).length !== (target.match(/\.cube/g) ?? []).length) fail(path, "changed .cube extension");
  if (/<\s*(?:script|iframe|object|embed|form)\b/i.test(target)) fail(path, "unsafe element");
  if (/\b(?:Splice|AI Assist)\b/.test(target)) fail(path, "obsolete app control label");
}

for (const post of posts()) {
  const sourcePath = `i18n/guides/source/${post.slug}.json`;
  if (!existsSync(sourcePath)) { fail(sourcePath, "missing English source export"); continue; }
  const source = read(sourcePath);
  if (source.sourceFingerprint !== sourceFingerprint(post)) fail(sourcePath, "English source changed; rebuild and refresh translations");
  for (const locale of locales) {
    const path = `i18n/guides/${locale}/${post.slug}.json`;
    if (!existsSync(path)) { if (!partial) fail(path, "missing guide translation"); continue; }
    const guide = read(path); documents++;
    if (guide.locale !== locale || guide.slug !== post.slug || guide.schemaVersion !== 1) fail(path, "invalid identity/schema");
    if (guide.sourceFingerprint !== source.sourceFingerprint) fail(path, "translation is from an older English source");
    if (guide.publishedAt !== post.publishedAt) fail(path, "original publication date changed");
    if (!/^\d{4}-\d{2}-\d{2}$/.test(guide.updatedAt) || guide.updatedAt < post.publishedAt) fail(path, "invalid review date");
    for (const key of ["title", "description", "primaryKeyword", "category"]) copyChecks(source[key], guide[key], `${path} ${key}`);
    if (guide.title === source.title || guide.description === source.description) fail(path, "English search metadata");
    const dictionary = read(`i18n/guides/ui/${locale}.json`);
    if (guide.category !== dictionary[source.category]) fail(path, "category differs from translated interface copy");
    if (guide.blocks.length !== source.blocks.length) { fail(path, "missing/extra content blocks"); continue; }
    source.blocks.forEach((block, index) => {
      const translated = guide.blocks[index]; const label = `${path} block ${index}`;
      if (translated.kind !== block.kind) { fail(label, "wrong content/media type"); return; }
      if (block.kind === "html") {
        if (translated.tag !== block.tag || JSON.stringify(translated.attributes) !== JSON.stringify(block.attributes)) fail(label, "changed source element/attributes");
        copyChecks(block.html, translated.html, label);
        shortLabels(localizeLinks(block.html, locale), translated.html, label);
        if (["h2", "h3"].includes(block.tag) && shortEnglishPhrase(block.html) && plain(block.html) === plain(translated.html)) fail(label, "unchanged English heading");
        if (sorted(tags(localizeLinks(block.html, locale))) !== sorted(tags(translated.html))) fail(label, "changed markup/links");
        if (/href="\/(?:blog|pricing|support)(?:[\/#"?])/.test(translated.html)) fail(label, "internal link leaves selected language");
      } else if (JSON.stringify(block) !== JSON.stringify(translated)) fail(label, "changed media component identity");
    });
  }
}

const strings = guideUiStrings();
for (const locale of ["en", ...locales]) {
  const path = `i18n/guides/ui/${locale}.json`;
  if (!existsSync(path)) { fail(path, "missing shared interface translation"); continue; }
  const dictionary = read(path);
  if (sorted(Object.keys(dictionary)) !== sorted(strings)) fail(path, "interface source keys changed");
  for (const key of strings) {
    if (locale !== "en") copyChecks(key, dictionary[key], `${path} ${key.slice(0, 50)}`);
    if (locale !== "en") recordingChecks(key, dictionary[key], `${path} ${key.slice(0, 50)}`);
    if (locale !== "en" && key === dictionary[key] && shortEnglishPhrase(key)) fail(path, `unchanged English interface phrase: ${key}`);
    if (locale === "en" && dictionary[key] !== key) fail(path, "English interface copy differs from source");
  }
}

const assets = ["cut-clips", "choose-moment", "pause-cleanup-transcript-v5", "apply-lut", "edit-transcript"];
const manifestPath = "i18n/guides/caption-sources.json";
const manifest = existsSync(manifestPath) ? read(manifestPath) : {};
for (const asset of assets) {
  const source = readFileSync(`public/tutorials/${asset}.vtt`, "utf8");
  const hash = createHash("sha256").update(source).digest("hex");
  const cues = source.trim().split(/\n\n/).filter(cue => cue.includes("-->"));
  for (const locale of locales) {
    if (manifest.locales?.[locale]?.[asset] !== hash && !partial) fail(manifestPath, `${locale}/${asset} captions changed; refresh this translation`);
    const path = `public/tutorials/locales/${locale}/${asset}.vtt`;
    if (!existsSync(path)) { if (!partial) fail(path, "missing captions"); continue; }
    const content = readFileSync(path, "utf8");
    const translated = content.trim().split(/\n\n/).filter(cue => cue.includes("-->"));
    if (!content.startsWith("WEBVTT\n") || cues.length !== translated.length) { fail(path, "invalid VTT/cue count"); continue; }
    cues.forEach((cue, i) => {
      const lines = cue.split("\n"), translatedLines = translated[i].split("\n");
      const timing = lines.findIndex(line => line.includes("-->"));
      if (lines.slice(0, timing + 1).join("\n") !== translatedLines.slice(0, timing + 1).join("\n")) fail(path, `cue ${i} timing changed`);
      copyChecks(lines.slice(timing + 1).join(" "), translatedLines.slice(timing + 1).join(" "), `${path} cue ${i}`);
      recordingChecks(lines.slice(timing + 1).join(" "), translatedLines.slice(timing + 1).join(" "), `${path} cue ${i}`);
    });
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  console.error(`${failures.length} localization check(s) failed across ${documents} existing translations.`);
  process.exitCode = 1;
} else console.log(`${documents} guide translations, ${locales.length + 1} interface dictionaries and available captions match their source${partial ? " (partial coverage allowed)" : "; full coverage verified"}.`);
