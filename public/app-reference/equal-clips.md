# ReelClip controls: split a recording into equal clips

> In Cut, choose No gap, set Clip amount, check the calculated Clip duration, then Add the plan and preview its consecutive sections.

Reviewed 2026-10-21. Language: English. App version in the recording: not established.

[Readable reference with screenshots](https://www.reelclips.app/app-reference/equal-clips) · [Watch the walkthrough in its guide](https://www.reelclips.app/blog/video-length-social-media-reach#walkthrough) · [Screen recording](https://www.reelclips.app/tutorials/cut-equal-sections-v1.mp4) · [Structured JSON](https://www.reelclips.app/app-reference/equal-clips.json)

## Context

- The recording starts with a video already imported and Cut selected; importing is not demonstrated.
- This example uses the whole 4m14.2s source. Coverage is limited to the selected source window when a shorter window is chosen.
- Control meanings were cross-checked against the app catalog and the visible states in this recording. The app version and its match to the current source build are not established.

Existing native app recording with a few frames held for readability. It demonstrates planning and previewing three equal sections, without a completed save to Photos.

## Steps

1. **[0:00 — Choose No gap](https://www.reelclips.app/tutorials/cut-equal-sections-v1.mp4#t=0)**. Start in Cut with the full source selected. Hold the Space shuffle button until No gap appears. Check the whole-video coverage message.

2. **[0:04 — Set the clip count and check duration](https://www.reelclips.app/tutorials/cut-equal-sections-v1.mp4#t=4.533333)**. Use Clip amount to choose three clips. Check No gap remains selected and read the calculated 1m24.7s duration; the main label rounds this to 1m25s.

3. **[0:12 — Add and check the planned ranges](https://www.reelclips.app/tutorials/cut-equal-sections-v1.mp4#t=12.033333)**. Tap Add. Check that all three ranges meet end to start and cover 0:00–4:14.2 in Planned Clips.

4. **[0:17 — Preview the three planned clips](https://www.reelclips.app/tutorials/cut-equal-sections-v1.mp4#t=17.533333)**. Open the review and play each planned section. The walkthrough shows actual previews of all three; it ends before any completed Photos save.

## Controls

### Cut

Where: Editing mode selector, above Cut recipe.

Choose a recipe using clip count, clip length and source spacing.

In this recording: Cut is already selected when the walkthrough starts.

### Space / No gap

Where: Space row in Cut recipe; hold its shuffle button.

Space controls source time skipped between planned clips. Holding this row's shuffle button chooses No gap and turns off random spacing.

In this recording: Space changes from 10s to No gap. The recipe displays: No gaps · the whole video is fully covered.

### Clip amount

Where: Minus and plus controls at the top of Cut recipe.

Set the requested number of clips. With No gap and count-based sizing, changing this count recalculates the equal clip duration for the selected source.

In this recording: The minus control changes four clips to three. The rounded Clip duration changes from 1m04s to 1m25s.

### Clip duration

Where: Duration row below Clip amount.

Clip length is separate from skipped source spacing. In this count-based No gap example, check the calculated duration after setting the count.

In this recording: The large label reads 1m25s. The more precise readout is 4m14.2s ÷ 3 = 1m24.7s each.

### Add

Where: Cut recipe action, after checking the recipe values.

Add the current Cut recipe to Planned Clips for review. This action does not save the clips to Photos or publish them.

In this recording: Three consecutive ranges appear in Planned Clips and the bottom action becomes Review 3 clips.

## Observed example

- Source: 4m14.2s.
- Clip amount: 3.
- Space: No gap.
- Clip duration: 1m25s; precise readout: 4m14.2s ÷ 3 = 1m24.7s each.
- Planned clip 1: 0:00–1:24.7.
- Planned clip 2: 1:24.7–2:49.5.
- Planned clip 3: 2:49.5–4:14.2.

The visible duration and range labels are rounded. Use the actual planned ranges, rather than assuming every displayed value is exact to a frame.

## Reviewed screenshots

**0:10** — Cut recipe: Clip amount 3, Clip duration 1m25s, precise 1m24.7s readout and Space No gap. Review 0 clips is still disabled before Add.

![Cut recipe: Clip amount 3, Clip duration 1m25s, precise 1m24.7s readout and Space No gap. Review 0 clips is still disabled before Add.](https://www.reelclips.app/app-reference/equal-clips-recipe.jpg)

**0:16** — Planned Clips: three consecutive source ranges, with Review 3 clips available after Add.

![Planned Clips: three consecutive source ranges, with Review 3 clips available after Add.](https://www.reelclips.app/app-reference/equal-clips-ranges.jpg)

## What this evidence supports

- Space skips source time; it does not insert black frames or a blank pause into the output.
- Add creates a plan. Previewing that plan does not establish a successful save to Photos.
- The recording does not show importing, purchasing, a completed export or posting to a social platform.
- This is an English-control reference for this recording. Translated guide instructions and captions do not change the language of the app pixels.
- The example demonstrates equal sections, not a prediction of social reach or an automatic choice of the best moments.
