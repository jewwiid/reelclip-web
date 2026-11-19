import "server-only";
import { readFile, access } from "node:fs/promises";
import { join } from "node:path";
import { cache } from "react";
import type { Locale } from "./config";
import type { GuideTranslation } from "@/lib/guide-translation";

export type GuideBlock =
  | { kind: "html"; tag: string; attributes: Record<string, string>; html: string }
  | { kind: "tutorial"; id: "cut-clips" | "equal-sections" | "choose-moment" | "pause-cleanup" | "apply-lut" | "edit-transcript" }
  | { kind: "cut-demo" }
  | { kind: "comparison" }
  | { kind: "cta" };

export type TranslatedGuide = {
  schemaVersion: 1;
  locale: Locale;
  slug: string;
  sourceFingerprint: string;
  title: string;
  description: string;
  primaryKeyword: string;
  category: string;
  publishedAt: string;
  updatedAt: string;
  readMinutes: number;
  blocks: GuideBlock[];
};

const directory = join(process.cwd(), "i18n", "guides");

export const getTranslatedGuide = cache(async (locale: Locale, slug: string): Promise<TranslatedGuide | null> => {
  if (locale === "en" || !/^[a-z0-9-]+$/.test(slug)) return null;
  const path = join(directory, locale, `${slug}.json`);
  try { await access(path); } catch { return null; }
  return JSON.parse(await readFile(path, "utf8")) as TranslatedGuide;
});

export const getGuideTranslations = cache(async (locale: Locale): Promise<GuideTranslation> => {
  const path = join(directory, "ui", `${locale}.json`);
  return JSON.parse(await readFile(path, "utf8")) as GuideTranslation;
});
