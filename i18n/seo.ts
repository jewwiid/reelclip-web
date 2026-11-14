import type { Metadata } from "next";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { LOCALES, localeLanguageTag, type Locale } from "./config";
import { localizedPath } from "./routing";

/** Production redirects the apex to www. Publish the final URL everywhere. */
export const SITE_URL = "https://www.reelclips.app";

export function localesForPage(path: string): Locale[] {
  // Tools and control references need reviewed translations before advertising them.
  if (path.startsWith("/tools/") || path.startsWith("/app-reference/")) return ["en"];
  if (path.startsWith("/blog/")) {
    const slug = path.slice("/blog/".length);
    if (!/^[a-z0-9-]+$/.test(slug)) return [];
    return LOCALES.filter(({ code }) => code === "en" || existsSync(join(process.cwd(), "i18n", "guides", code, `${slug}.json`))).map(({ code }) => code);
  }
  const document = path === "/privacy" || path === "/terms"
    ? path.slice(1)
    : null;

  return LOCALES.filter(({ code }) => code === "en" || !document || existsSync(
    join(process.cwd(), "i18n", "static-pages", code, `${document}.html`),
  )).map(({ code }) => code);
}

export function pageUrl(locale: Locale, path = "/") {
  return new URL(localizedPath(locale, path), SITE_URL).href;
}

export function languageAlternates(path = "/") {
  return {
    ...Object.fromEntries(localesForPage(path).map((locale) => [localeLanguageTag(locale), pageUrl(locale, path)])),
    "x-default": pageUrl("en", path),
  };
}

export function localizedMetadata(locale: Locale, path: string, metadata: Metadata): Metadata {
  const url = pageUrl(locale, path);
  return {
    ...metadata,
    alternates: {
      ...metadata.alternates,
      canonical: url,
      languages: languageAlternates(path),
    },
    openGraph: { ...metadata.openGraph, url },
  };
}
