import "server-only";

import { headers } from "next/headers";
import { cache } from "react";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/i18n/config";
import en from "@/i18n/messages/en.json";

export type Dictionary = typeof en;

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: async () => en,
  de: async () => (await import("@/i18n/messages/de.json")).default as Dictionary,
  es: async () => (await import("@/i18n/messages/es.json")).default as Dictionary,
  fr: async () => (await import("@/i18n/messages/fr.json")).default as Dictionary,
  hi: async () => (await import("@/i18n/messages/hi.json")).default as Dictionary,
  it: async () => (await import("@/i18n/messages/it.json")).default as Dictionary,
  ja: async () => (await import("@/i18n/messages/ja.json")).default as Dictionary,
  ko: async () => (await import("@/i18n/messages/ko.json")).default as Dictionary,
  nl: async () => (await import("@/i18n/messages/nl.json")).default as Dictionary,
  pl: async () => (await import("@/i18n/messages/pl.json")).default as Dictionary,
  "pt-BR": async () => (await import("@/i18n/messages/pt-BR.json")).default as Dictionary,
  "pt-PT": async () => (await import("@/i18n/messages/pt-PT.json")).default as Dictionary
};

export async function getRequestLocale(): Promise<Locale> {
  const locale = (await headers()).get("x-reelclip-locale");
  return locale && isLocale(locale) ? locale : DEFAULT_LOCALE;
}

export const getDictionary = cache(async (locale?: Locale) => {
  const resolvedLocale = locale ?? await getRequestLocale();
  return dictionaries[resolvedLocale]();
});
