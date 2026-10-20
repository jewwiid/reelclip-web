import type { Locale } from "./config";

type LocalizedBlogMetadata = {
  title: string;
  description: string;
  primaryKeyword: string;
  updatedAt?: string;
};

// Add an entry only when the corresponding translated article is reviewed.
const metadata: Partial<Record<Locale, Record<string, LocalizedBlogMetadata>>> = {
  es: {
    "best-free-luts-2026": {
      title: "LUTs gratis para DJI, Sony, Blackmagic e iPhone (2026)",
      description: "Descargas oficiales de LUTs gratuitos y cómo elegir el perfil correcto para DJI, Sony y Blackmagic Camera en iPhone. Incluye pasos para importar un .cube en ReelClip.",
      primaryKeyword: "luts gratis para iPhone",
      updatedAt: "2026-10-20",
    },
  },
};

export function getLocalizedBlogMetadata(locale: Locale, slug: string) {
  return metadata[locale]?.[slug];
}
