export type GuideTranslation = Record<string, string>;

export function translateGuide(
  translations: GuideTranslation | undefined,
  source: string,
  values: Record<string, string | number> = {},
) {
  let result = translations?.[source] ?? source;
  for (const [key, value] of Object.entries(values)) {
    result = result.replaceAll(`{${key}}`, String(value));
  }
  return result;
}
