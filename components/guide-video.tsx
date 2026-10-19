"use client";

import { useRef } from "react";
import { trackWebsiteEvent } from "@/lib/site-analytics";

export function GuideVideo({ id, title, description, steps }: {
  id: "cut-clips" | "choose-moment" | "pause-cleanup" | "apply-lut" | "edit-transcript";
  title: string;
  description: string;
  steps: string[];
}) {
  const played = useRef(false);
  const ended = useRef(false);
  return (
    <figure className="my-10 rounded-2xl border border-border bg-surface p-5 sm:p-7">
      <figcaption className="mb-5">
        <h2 className="text-xl font-bold text-text">{title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-text-muted">{description}</p>
      </figcaption>
      <video
        aria-label={title}
        controls playsInline preload="none"
        width="720" height="1280"
        poster={`/tutorials/${id}.jpg`}
        className="mx-auto h-auto max-h-[72vh] w-auto max-w-full rounded-xl bg-black"
        onPlay={() => {
          if (played.current) return;
          played.current = true;
          trackWebsiteEvent("ReelClip.Web.tutorialPlayed", { tutorial: id });
        }}
        onEnded={() => {
          if (ended.current) return;
          ended.current = true;
          trackWebsiteEvent("ReelClip.Web.tutorialReachedEnd", { tutorial: id });
        }}
      >
        <source src={`/tutorials/${id}.mp4`} type="video/mp4" />
        <track kind="captions" src={`/tutorials/${id}.vtt`} srcLang="en" label="English steps" />
        <a href={`/tutorials/${id}.mp4`}>Download the screen recording</a>.
      </video>
      <ol className="mt-5 list-decimal space-y-2 pl-5 text-sm text-text-muted">
        {steps.map((step) => <li key={step}>{step}</li>)}
      </ol>
    </figure>
  );
}
