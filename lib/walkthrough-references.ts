import equalClips from "@/public/app-reference/equal-clips.json";
import type { GuideVideoId } from "./guide-videos";

export function getWalkthroughReference(id: GuideVideoId, videoPath: string) {
  // A different recording needs its own reviewed control reference.
  return id === equalClips.id && videoPath === equalClips.video.path
    ? equalClips.documents.page
    : null;
}
