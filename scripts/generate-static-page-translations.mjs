#!/usr/bin/env node

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const projectRoot = dirname(scriptDirectory);
const outputDirectory = join(projectRoot, "i18n", "static-pages");
const endpoint = process.env.REELCLIP_TRANSLATION_ENDPOINT ?? "http://127.0.0.1:11434/api/generate";
const model = process.env.REELCLIP_TRANSLATION_MODEL ?? "kimi-k2.6:cloud";
const baseUrl = process.env.REELCLIP_LOCALIZATION_SOURCE_URL ?? "http://localhost:3111";

const locales = [
  ["de", "German"], ["es", "Spanish"], ["fr", "French"], ["hi", "Hindi"],
  ["it", "Italian"], ["ja", "Japanese"], ["ko", "Korean"], ["nl", "Dutch"],
  ["pl", "Polish"], ["pt-BR", "Brazilian Portuguese"], ["pt-PT", "Portuguese (Portugal)"]
];

const documents = [
  ["privacy", "/privacy"],
  ["terms", "/terms"],
  ["blog", "/blog"],
  ["blog/best-free-luts-2026", "/blog/best-free-luts-2026"],
  ["blog/edit-vertical-video-on-iphone", "/blog/edit-vertical-video-on-iphone"],
  ["blog/dji-osmo-pocket-3-luts", "/blog/dji-osmo-pocket-3-luts"],
  ["blog/cube-lut-explained", "/blog/cube-lut-explained"],
  ["blog/dji-d-log-to-rec709-iphone", "/blog/dji-d-log-to-rec709-iphone"],
  ["blog/dji-osmo-pocket-color-grading", "/blog/dji-osmo-pocket-color-grading"],
  ["blog/edit-dji-osmo-footage-iphone", "/blog/edit-dji-osmo-footage-iphone"],
  ["blog/how-to-apply-lut-on-iphone", "/blog/how-to-apply-lut-on-iphone"],
  ["blog/capcut-alternative-no-watermark", "/blog/capcut-alternative-no-watermark"],
  ["blog/how-to-cut-long-video-for-tiktok", "/blog/how-to-cut-long-video-for-tiktok"],
  ["blog/extract-clip-from-podcast", "/blog/extract-clip-from-podcast"],
  ["blog/remove-silence-from-video-free", "/blog/remove-silence-from-video-free"],
];

const requestedLocales = process.argv.filter((argument) => !argument.startsWith("--")).slice(2);
const requestedDocuments = process.argv.filter((argument) => argument.startsWith("--document=")).map((argument) => argument.slice("--document=".length));
const targets = requestedLocales.length === 0 ? locales : requestedLocales.map((locale) => {
  const target = locales.find(([code]) => code === locale);
  if (!target) throw new Error(`Unsupported locale '${locale}'.`);
  return target;
});
const selectedDocuments = requestedDocuments.length === 0 ? documents : requestedDocuments.map((name) => {
  const document = documents.find(([documentName]) => documentName === name);
  if (!document) throw new Error(`Unknown document '${name}'.`);
  return document;
});

function extractMain(html) {
  const start = html.indexOf("<main");
  const end = html.indexOf("</main>", start);
  if (start < 0 || end < 0) throw new Error("Could not find a complete <main> element in the source page.");
  return html.slice(start, end + "</main>".length);
}

function decodeEntities(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'")
    .replaceAll("&#39;", "'")
    .replaceAll("&apos;", "'");
}

function escapeText(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function textNodes(html) {
  const parts = html.split(/(<[^>]+>)/g);
  const nodes = [];
  parts.forEach((part, index) => {
    if (part.startsWith("<") || part.trim().length === 0) return;
    const leading = part.match(/^\s*/)?.[0] ?? "";
    const trailing = part.match(/\s*$/)?.[0] ?? "";
    nodes.push({ index, leading, trailing, text: decodeEntities(part.trim()) });
  });
  return { parts, nodes };
}

function chunks(values, size = 50) {
  return Array.from({ length: Math.ceil(values.length / size) }, (_, index) => values.slice(index * size, (index + 1) * size));
}

function localizeLinks(html, locale) {
  return html.replace(/href="\/(?!\/)([^"?#]*)([?#][^"]*)?"/g, (_, target, suffix = "") => {
    const path = target ? `/${target}` : "/";
    return `href="/${locale}${path}${suffix}"`;
  });
}

async function sourceFor(route) {
  const response = await fetch(`${baseUrl}${route}`);
  if (!response.ok) throw new Error(`${route}: ${response.status}`);
  return extractMain(await response.text());
}

async function translate(values, language) {
  const prompt = [
    `Translate these ReelClip website strings from English to ${language}.`,
    "Return exactly one JSON array of strings in the original order, and no markdown or explanation.",
    "Never translate ReelClip, Apple Intelligence, iPhone, iOS, App Store, Photos, CapCut, IG Edits, Reels, TikTok, YouTube Shorts, DJI, GoPro, InShot, VN, OpusClip, Quik, SRT, VTT, LUT, .cube, or technical file names.",
    "Keep numbers, dates, prices, URLs, email addresses, and product names exactly intact. Translate naturally for a polished iPhone video-editing website.",
    `Input: ${JSON.stringify(values)}`,
  ].join("\n");

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model, prompt, format: "json", stream: false, think: false, options: { temperature: 0 } }),
    });
    if (!response.ok) throw new Error(`${language}: ${response.status} ${await response.text()}`);
    try {
      const parsed = JSON.parse((await response.json()).response);
      if (Array.isArray(parsed) && parsed.length === values.length && parsed.every((value) => typeof value === "string" && value.trim().length > 0)) {
        return parsed;
      }
    } catch {
      // Retry a malformed response.
    }
  }
  throw new Error(`${language}: model did not return a valid translation array.`);
}

async function translateChunk(values, language) {
  try {
    return await translate(values, language);
  } catch (error) {
    if (values.length <= 1) throw error;
    const midpoint = Math.ceil(values.length / 2);
    return [
      ...(await translateChunk(values.slice(0, midpoint), language)),
      ...(await translateChunk(values.slice(midpoint), language)),
    ];
  }
}

const sourceDocuments = new Map();
for (const [name, route] of selectedDocuments) sourceDocuments.set(name, await sourceFor(route));

for (const [locale, language] of targets) {
  for (const [name] of selectedDocuments) {
    const outputPath = join(outputDirectory, locale, `${name}.html`);
    try {
      await readFile(outputPath, "utf8");
      console.log(`[${locale}] ${name}: existing`);
      continue;
    } catch {
      // Generate the missing page.
    }
    const { parts, nodes } = textNodes(sourceDocuments.get(name));
    const translatedValues = [];
    for (const group of chunks(nodes)) translatedValues.push(...await translateChunk(group.map((node) => node.text), language));
    nodes.forEach((node, index) => {
      parts[node.index] = `${node.leading}${escapeText(translatedValues[index])}${node.trailing}`;
    });
    const translated = localizeLinks(parts.join(""), locale);
    await mkdir(dirname(outputPath), { recursive: true });
    await writeFile(outputPath, `${translated}\n`, "utf8");
    console.log(`[${locale}] ${name}: translated`);
  }
}
