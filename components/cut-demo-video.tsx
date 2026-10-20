"use client";

import { useRef } from "react";
import { trackWebsiteEvent } from "@/lib/site-analytics";
import { translateGuide, type GuideTranslation } from "@/lib/guide-translation";

export function CutDemoVideo({ translations, captionLocale = "en" }: { translations?: GuideTranslation; captionLocale?: string } = {}) {
  const t = (text: string) => translateGuide(translations, text);
  const played = useRef(false);
  const ended = useRef(false);

  return (
    <figure data-guide-component="cut-demo" className="guide-walkthrough my-10 rounded-2xl border border-border bg-surface p-5 sm:p-7">
      <figcaption className="mb-5">
        <h3 className="text-xl font-bold text-text">{t("Watch: ReelClip’s Cut controls")}</h3>
        <p className="mt-2 text-sm leading-relaxed text-text-muted">
          {t("This 26-second screen recording shows Cut on a short gym recording. Watch the clip count, duration and spacing controls, then preview the planned clips. The steps below show how No gap divides a longer source into equal parts.")}
        </p>
      </figcaption>
      <video
        aria-label={t("ReelClip Cut feature demo")}
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
        <track default={captionLocale !== "en"} kind="captions" src={captionLocale === "en" ? "/tutorials/cut-clips.vtt" : `/tutorials/locales/${captionLocale}/cut-clips.vtt`} srcLang={captionLocale} label={t("Step captions")} />
        <a href="/tutorials/cut-clips.mp4">{t("Open the screen recording")}</a>.
      </video>
      <ol className="mt-5 list-decimal space-y-2 pl-5 text-sm text-text-muted">
        <li>{t("Open Cut and set the Clip amount.")}</li>
        <li>{t("Choose Space → No gap for consecutive sections.")}</li>
        <li>{t("Check the displayed Clip duration is below 3:00.")}</li>
        <li>{t("Play each preview; move a cut if it lands in the middle of an idea.")}</li>
      </ol>
      {captionLocale !== "en" && <p className="mt-4 text-xs text-text-muted">{t("The recording uses English app controls. Step captions are translated.")}</p>}
    </figure>
  );
}
