export const LOCALES = [
  { code: "en", language: "English", nativeName: "English" },
  { code: "de", language: "German", nativeName: "Deutsch" },
  { code: "es", language: "Spanish", nativeName: "Español" },
  { code: "fr", language: "French", nativeName: "Français" },
  { code: "hi", language: "Hindi", nativeName: "हिन्दी" },
  { code: "it", language: "Italian", nativeName: "Italiano" },
  { code: "ja", language: "Japanese", nativeName: "日本語" },
  { code: "ko", language: "Korean", nativeName: "한국어" },
  { code: "nl", language: "Dutch", nativeName: "Nederlands" },
  { code: "pl", language: "Polish", nativeName: "Polski" },
  { code: "pt-BR", language: "Brazilian Portuguese", nativeName: "Português (Brasil)" },
  { code: "pt-PT", language: "Portuguese (Portugal)", nativeName: "Português (Portugal)" }
] as const;

export const DEFAULT_LOCALE = "en" as const;

export type Locale = (typeof LOCALES)[number]["code"];

export function isLocale(value: string): value is Locale {
  return LOCALES.some((locale) => locale.code === value);
}

export function localeLanguageTag(locale: Locale) {
  return locale === "pt-BR" || locale === "pt-PT" ? locale : locale;
}
