"use client";

import { useRef } from "react";
import { trackWebsiteEvent } from "@/lib/site-analytics";

export function CutDemoVideo() {
  const played = useRef(false);
  const ended = useRef(false);

  return (
    <figure className="my-10 rounded-2xl border border-border bg-surface p-5 sm:p-7">
      <figcaption className="mb-5">
        <h3 className="text-xl font-bold text-text">Watch: ReelClip’s Cut controls</h3>
        <p className="mt-2 text-sm leading-relaxed text-text-muted">
          This 26-second screen recording shows Cut on a short gym recording.
          Watch the clip count, duration and spacing controls, then preview the
          planned clips. The steps below show how No gap divides a longer source
          into equal parts.
        </p>
      </figcaption>
      <video
        aria-label="ReelClip Cut feature demo"
        controls
        playsInline
        preload="none"
        width="720"
        height="1280"
        poster="/tutorials/cut-clips.jpg"
        className="mx-auto h-auto max-h-[72vh] w-auto max-w-full rounded-xl bg-black"
        onPlay={() => {
          if (played.current) return;
          played.current = true;
          trackWebsiteEvent("ReelClip.Web.tutorialPlayed", { tutorial: "cut-clips" });
        }}
        onEnded={() => {
          if (ended.current) return;
          ended.current = true;
          trackWebsiteEvent("ReelClip.Web.tutorialReachedEnd", { tutorial: "cut-clips" });
        }}
      >
        <source src="/tutorials/cut-clips.mp4" type="video/mp4" />
        <track kind="captions" src="/tutorials/cut-clips.vtt" srcLang="en" label="English steps" />
        <a href="/tutorials/cut-clips.mp4">Download the screen recording</a>.
      </video>
      <ol className="mt-5 list-decimal space-y-2 pl-5 text-sm text-text-muted">
        <li>Open Cut and set the Clip amount.</li>
        <li>Choose Space → No gap for consecutive sections.</li>
        <li>Check the displayed Clip duration is below 3:00.</li>
        <li>Play each preview; move a cut if it lands in the middle of an idea.</li>
      </ol>
    </figure>
  );
}
