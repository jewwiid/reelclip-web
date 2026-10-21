import "server-only";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { Locale } from "./config";

/** Article metadata and index cards read the same versioned translation. */
export function getLocalizedBlogMetadata(locale: Locale, slug: string): {
  title: string; description: string; primaryKeyword: string; category: string; updatedAt: string;
} | null {
  if (locale === "en" || !/^[a-z0-9-]+$/.test(slug)) return null;
  const path = join(process.cwd(), "i18n", "guides", locale, `${slug}.json`);
  if (!existsSync(path)) return null;
  const { title, description, primaryKeyword, category, updatedAt } = JSON.parse(readFileSync(path, "utf8"));
  return { title, description, primaryKeyword, category, updatedAt };
}
