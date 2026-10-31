import registry from "./guide-video-variants.json";
import { GUIDE_VIDEOS, type GuideVideoChapter, type GuideVideoId } from "./guide-videos";

export type GuideVideoVariant = {
  appLanguage: string;
  asset: string;
  duration: number;
  title: string;
  description: string;
  note: string;
  chapters: GuideVideoChapter[];
  review: {
    outputSHA256: string;
    reviewedOn: string;
    evidence: string;
  };
};

export function getGuideVideoPlayback(id: GuideVideoId, locale: string) {
  const variants = registry as Partial<Record<GuideVideoId, Partial<Record<string, GuideVideoVariant>>>>;
  const variant = variants[id]?.[locale];
  const details = variant ?? GUIDE_VIDEOS[id];
  const directory = variant ? `/tutorials/locales/${locale}` : "/tutorials";
  const captionDirectory = variant || locale === "en" ? directory : `/tutorials/locales/${locale}`;
  return {
    details,
    appLanguage: variant?.appLanguage ?? "en",
    video: `${directory}/${details.asset}.mp4`,
    poster: `${directory}/${details.asset}.jpg`,
    captions: `${captionDirectory}/${details.asset}.vtt`,
  };
}
