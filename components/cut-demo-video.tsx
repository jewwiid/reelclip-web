import { GuideVideo } from "@/components/guide-video";
import type { GuideTranslation } from "@/lib/guide-translation";

export function CutDemoVideo({ translations, captionLocale = "en" }: { translations?: GuideTranslation; captionLocale?: string } = {}) {
  return <GuideVideo id="equal-sections" translations={translations} captionLocale={captionLocale} />;
}
