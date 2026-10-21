export type GuideVideoChapter = {
  start: number;
  title: string;
  description: string;
};

type GuideVideoDetails = {
  asset: string;
  slug: string;
  duration: number;
  title: string;
  description: string;
  note: string;
  chapters: GuideVideoChapter[];
};

// Chapter boundaries match the captions in public/tutorials/*.vtt.
// The guide and index share metadata for the existing recordings.
export const GUIDE_VIDEOS = {
  "cut-clips": {
    asset: "cut-clips",
    slug: "how-to-cut-long-video-for-tiktok",
    duration: 26.2,
    title: "Build a batch of clips",
    description: "Set the number, length and spacing of your clips, then preview the moments you’ve chosen.",
    note: "Shown on a short gym recording. Check your picture framing separately before posting.",
    chapters: [
      { start: 0, title: "Set up your clips", description: "Choose the clip amount and the length of each clip." },
      { start: 7.2, title: "Check the spacing", description: "This recipe leaves five seconds between clips." },
      { start: 11.2, title: "Play the selected moments", description: "Check what each clip keeps before you save." },
    ],
  },
  "equal-sections": {
    asset: "cut-equal-sections-v1",
    slug: "video-length-social-media-reach",
    duration: 26.533333,
    title: "Split the whole recording into equal clips",
    description: "Choose No gap, set the clip count and review three consecutive sections of the same recording.",
    note: "This 4:14 multi-scene sample makes three clips of about 1:25. A few native frames pause for readability. Check each clip’s story and framing before posting.",
    chapters: [
      { start: 0, title: "Choose No gap", description: "Start with the full source, then hold the Space shuffle button to choose No gap." },
      { start: 4.533333, title: "Set the clip count", description: "Choose three clips and check the calculated 1m24.7s duration." },
      { start: 12.033332999999999, title: "Check the equal ranges", description: "Tap Add and check all three consecutive sections cover 0:00–4:14.2." },
      { start: 17.533333, title: "Play each planned clip", description: "Watch all three sections in the actual project preview." },
    ],
  },
  "choose-moment": {
    asset: "choose-moment",
    slug: "edit-vertical-video-on-iphone",
    duration: 24.6,
    title: "Find the moment worth keeping",
    description: "Move the selection, refine its edges and play back your slices before you save.",
    note: "Slice selects a time range. Review the picture framing separately for your vertical post.",
    chapters: [
      { start: 0, title: "Choose a slice length", description: "Start with a selection that fits your moment." },
      { start: 4.1, title: "Pick your moment", description: "Move the green window, then tap Add." },
      { start: 8.7, title: "Refine the edges", description: "Adjust the start and end of the selection." },
      { start: 12.8, title: "Watch your chosen clips", description: "Play back the three slices in this example." },
    ],
  },
  "pause-cleanup": {
    asset: "pause-cleanup-transcript-v5",
    slug: "remove-silence-from-video-free",
    duration: 18.6,
    title: "Tighten the gaps in your video",
    description: "Turn on cleanup, check the red removal marker in the transcript and play the shorter edit.",
    note: "Timing and transcript frames pause briefly for readability. The opening “So” was already removed in this example.",
    chapters: [
      { start: 0, title: "Turn on pause removal", description: "Enable Remove pauses under Audio → Cleanup." },
      { start: 2.6, title: "Check the threshold", description: "Inspect the 0.35-second setting in Cut timing." },
      { start: 4.6, title: "Check the transcript", description: "Red Auto remove marks the long pause for removal." },
      { start: 9.6, title: "Play the edited result", description: "Watch the actual 31.9-second preview of this 45-second source." },
    ],
  },
  "apply-lut": {
    asset: "apply-lut",
    slug: "how-to-apply-lut-on-iphone",
    duration: 11.3,
    title: "Bring your saved look into ReelClip",
    description: "Choose a saved .cube file, then adjust its strength and compare the result with your original.",
    note: "This example uses a creative look. For log footage, match your conversion LUT to the camera profile.",
    chapters: [
      { start: 0, title: "Choose your saved LUT", description: "Select your .cube look from the Files picker." },
      { start: 2, title: "Make the look your own", description: "Adjust the strength and compare both versions." },
    ],
  },
  "edit-transcript": {
    asset: "edit-transcript",
    slug: "extract-clip-from-podcast",
    duration: 18.6,
    title: "Edit the video through its words",
    description: "See a word removed from the edit, check the playback and preview captions that follow the speech.",
    note: "This demonstrates speech editing. Choose your podcast passage in context before making cuts.",
    chapters: [
      { start: 0, title: "Remove an unwanted word", description: "Tap a word in the transcript to cut it from the video." },
      { start: 4.4, title: "Watch the edit", description: "Listen at the cut and check the surrounding speech." },
      { start: 10.6, title: "Preview the captions", description: "Check the words as they follow the video." },
      { start: 16.6, title: "Find transcript export options", description: "Open the menu for text, SRT and VTT files." },
    ],
  },
} satisfies Record<string, GuideVideoDetails>;

export type GuideVideoId = keyof typeof GUIDE_VIDEOS;

export function getGuideVideoForPost(slug?: string) {
  const id = (Object.keys(GUIDE_VIDEOS) as GuideVideoId[]).find(
    (id) => GUIDE_VIDEOS[id].slug === slug,
  );
  return id ? { id, ...GUIDE_VIDEOS[id] } : undefined;
}

export function videoTimestamp(seconds: number) {
  return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
}
