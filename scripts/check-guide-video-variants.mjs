import { readFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";

const registry = JSON.parse(readFileSync("lib/guide-video-variants.json", "utf8"));
const locales = [...readFileSync("i18n/config.ts", "utf8").matchAll(/code: "([^"]+)"/g)].map(match => match[1]);
const ids = new Set(["cut-clips", "equal-sections", "choose-moment", "pause-cleanup", "apply-lut", "edit-transcript"]);
let count = 0;
for (const [id, variants] of Object.entries(registry)) {
  if (!ids.has(id)) throw new Error(`Unknown tutorial: ${id}`);
  for (const [locale, variant] of Object.entries(variants)) {
    const label = `${id}/${locale}`;
    if (!locales.includes(locale) || variant.appLanguage !== locale) throw new Error(`${label}: app language does not match the page`);
    if (!/^[a-z0-9][a-z0-9-]+$/.test(variant.asset)) throw new Error(`${label}: use a versioned asset filename`);
    if (!(variant.duration > 0) || !Number.isFinite(variant.duration)) throw new Error(`${label}: missing measured duration`);
    for (const key of ["title", "description", "note"]) {
      if (typeof variant[key] !== "string" || !variant[key].trim()) throw new Error(`${label}: missing ${key}`);
    }
    const base = `public/tutorials/locales/${locale}/${variant.asset}`;
    for (const extension of ["mp4", "jpg", "vtt"]) if (!existsSync(`${base}.${extension}`)) throw new Error(`${label}: missing ${extension}`);
    const hash = createHash("sha256").update(readFileSync(`${base}.mp4`)).digest("hex");
    if (hash !== variant.review?.outputSHA256 || !/^\d{4}-\d{2}-\d{2}$/.test(variant.review?.reviewedOn ?? "") || !variant.review?.evidence) throw new Error(`${label}: missing or stale output review`);
    const chapters = variant.chapters;
    if (!Array.isArray(chapters) || !chapters.length || chapters[0].start !== 0) throw new Error(`${label}: missing measured chapter timing`);
    chapters.forEach((chapter, index) => {
      if (!Number.isFinite(chapter.start) || chapter.start < 0 || chapter.start >= variant.duration || (index && chapter.start <= chapters[index - 1].start) || !chapter.title?.trim() || !chapter.description?.trim()) throw new Error(`${label}: invalid chapter ${index}`);
    });
    const captions = readFileSync(`${base}.vtt`, "utf8");
    if (!captions.startsWith("WEBVTT\n") || !captions.includes("-->")) throw new Error(`${label}: missing step captions`);
    count++;
  }
}
console.log(`${count} localized app recordings registered and checked; other tutorials retain their disclosed English recording.`);
