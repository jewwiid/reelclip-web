import { DEFAULT_LOCALE, isLocale, type Locale } from "@/i18n/config";

const NON_LOCALIZED_PREFIXES = ["/_next", "/api"];

export function localeFromPathname(pathname: string): Locale | null {
  const segment = pathname.split("/")[1];
  return segment && isLocale(segment) ? segment : null;
}

export function localizedPath(locale: Locale, path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return locale === DEFAULT_LOCALE ? normalizedPath : `/${locale}${normalizedPath}`;
}

export function switchLocalePath(pathname: string, locale: Locale) {
  const [pathWithQuery, hash = ""] = pathname.split("#", 2);
  const [path = "/", query = ""] = pathWithQuery.split("?", 2);
  const currentLocale = localeFromPathname(path);
  const withoutLocale = currentLocale
    ? path.slice(currentLocale.length + 1) || "/"
    : path;
  const localized = localizedPath(locale, withoutLocale);
  return `${localized}${query ? `?${query}` : ""}${hash ? `#${hash}` : ""}`;
}

export function shouldSkipLocaleRouting(pathname: string) {
  return NON_LOCALIZED_PREFIXES.some((prefix) => pathname.startsWith(prefix)) ||
    /\.[^/]+$/.test(pathname);
}
