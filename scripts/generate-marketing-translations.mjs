#!/usr/bin/env node

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const projectRoot = dirname(scriptDirectory);
const messagesDirectory = join(projectRoot, "i18n", "messages");
const sourcePath = join(messagesDirectory, "en.json");
const endpoint = process.env.REELCLIP_TRANSLATION_ENDPOINT ?? "http://127.0.0.1:11434/api/generate";
const model = process.env.REELCLIP_TRANSLATION_MODEL ?? "kimi-k2.6:cloud";
const chunkSize = 50;

const locales = [
  ["de", "German"],
  ["es", "Spanish"],
  ["fr", "French"],
  ["hi", "Hindi"],
  ["it", "Italian"],
  ["ja", "Japanese"],
  ["ko", "Korean"],
  ["nl", "Dutch"],
  ["pl", "Polish"],
  ["pt-BR", "Brazilian Portuguese"],
  ["pt-PT", "Portuguese (Portugal)"]
];

// The model preserves this boilerplate in English for Japanese and Korean.
// Keep the approved native wording when the catalog is regenerated.
const editorialOverrides = {
  ja: { "footer.rights": "無断複製を禁じます。" },
  ko: { "footer.rights": "모든 권리 보유." }
};

const requestedLocales = process.argv.slice(2);
const targets = requestedLocales.length === 0
  ? locales
  : requestedLocales.map((locale) => {
      const target = locales.find(([code]) => code === locale);
      if (!target) throw new Error(`Unsupported locale '${locale}'.`);
      return target;
    });

function stringLeaves(value, path = [], leaves = []) {
  if (typeof value === "string") {
    leaves.push({ path, value });
  } else if (Array.isArray(value)) {
    value.forEach((entry, index) => stringLeaves(entry, [...path, index], leaves));
  } else if (value && typeof value === "object") {
    Object.entries(value).forEach(([key, entry]) => stringLeaves(entry, [...path, key], leaves));
  }
  return leaves;
}

function chunks(values) {
  return Array.from(
    { length: Math.ceil(values.length / chunkSize) },
    (_, index) => values.slice(index * chunkSize, (index + 1) * chunkSize)
  );
}

function setAtPath(target, path, value) {
  let current = target;
  for (const part of path.slice(0, -1)) current = current[part];
  current[path.at(-1)] = value;
}

async function translate(values, language) {
  const prompt = [
    `Translate the following ReelClip marketing website strings from English to ${language}.`,
    "Return exactly one JSON array of strings in the original order. Return no markdown, explanation, or code fence.",
    "Keep the copy natural, concise, and suitable for a polished iPhone video-editing product.",
    "Never translate product, platform, or trademark names: ReelClip, Apple Intelligence, iPhone, iOS, App Store, Photos, CapCut, IG Edits, Reels, TikTok, YouTube Shorts, or Settings.",
    "Use the standard local name for common video-editing terms such as clip, captions, transcript, export, and timeline.",
    `Input: ${JSON.stringify(values)}`
  ].join("\n");

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        prompt,
        format: "json",
        stream: false,
        think: false,
        options: { temperature: 0 }
      })
    });
    if (!response.ok) throw new Error(`${language}: ${response.status} ${await response.text()}`);

    const payload = await response.json();
    try {
      const result = JSON.parse(payload.response);
      if (Array.isArray(result) && result.length === values.length && result.every((value) => typeof value === "string" && value.trim())) {
        return result;
      }
    } catch {
      // Retry a malformed model response.
    }
  }

  throw new Error(`${language}: model did not return a valid ${values.length}-item string array.`);
}

const source = JSON.parse(await readFile(sourcePath, "utf8"));
const leaves = stringLeaves(source);
await mkdir(messagesDirectory, { recursive: true });

for (const [locale, language] of targets) {
  const translated = structuredClone(source);
  const translatedValues = [];
  for (const group of chunks(leaves)) {
    translatedValues.push(...await translate(group.map(({ value }) => value), language));
    console.log(`[${locale}] ${translatedValues.length}/${leaves.length} strings translated`);
  }

  leaves.forEach(({ path }, index) => setAtPath(translated, path, translatedValues[index]));
  Object.entries(editorialOverrides[locale] ?? {}).forEach(([path, value]) => {
    setAtPath(translated, path.split("."), value);
  });
  await writeFile(join(messagesDirectory, `${locale}.json`), `${JSON.stringify(translated, null, 2)}\n`);
}
