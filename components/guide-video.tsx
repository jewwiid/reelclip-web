"use client";

import { useRef, useState } from "react";
import { videoTimestamp, type GuideVideoId } from "@/lib/guide-videos";
import { getGuideVideoPlayback } from "@/lib/guide-video-variants";
import { trackWebsiteEvent } from "@/lib/site-analytics";
import { translateGuide, type GuideTranslation } from "@/lib/guide-translation";

type GuideVideoProps = { id: GuideVideoId; translations?: GuideTranslation; captionLocale?: string };

export function GuideVideo(props: GuideVideoProps) {
  return <GuideVideoPlayer key={`${props.id}:${props.captionLocale ?? "en"}`} {...props} />;
}

function GuideVideoPlayer({ id, translations, captionLocale = "en" }: GuideVideoProps) {
  const t = (text: string, values?: Record<string, string | number>) => translateGuide(translations, text, values);
  const playback = getGuideVideoPlayback(id, captionLocale);
  const details = playback.details;
  const videoRef = useRef<HTMLVideoElement>(null);
  const pendingSeek = useRef<number | null>(null);
  const played = useRef(false);
  const ended = useRef(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoId = `guide-video-${id}`;

  function updateChapter(time: number) {
    let next = 0;
    for (let index = 0; index < details.chapters.length; index++) {
      if (time >= details.chapters[index].start) next = index;
    }
    setActiveChapter(next);
  }

  function playFrom(start: number) {
    const video = videoRef.current;
    if (!video) return;
    setHasError(false);
    updateChapter(start);
    // Keep the requested chapter when the first click also loads the file.
    pendingSeek.current = video.readyState < 1 ? start : null;
    video.currentTime = start;
    void video.play().catch(() => {
      setIsLoading(false);
      setHasError(true);
    });
  }

  return (
    <figure
      data-guide-component="tutorial"
      data-guide-video={id}
      data-app-language={playback.appLanguage}
      id="walkthrough"
      aria-labelledby={`${videoId}-title`}
      className="guide-walkthrough grid scroll-mt-8 grid-cols-1 overflow-hidden rounded-3xl border border-hairline bg-surface md:grid-cols-[0.9fr_1.1fr] md:grid-rows-[auto_1fr]"
    >
        <div className="row-start-2 flex items-center justify-center border-y border-hairline bg-surface-2/40 px-6 py-7 sm:px-8 md:col-start-1 md:row-span-2 md:row-start-1 md:border-y-0 md:border-r md:py-10">
          <div className="relative w-full max-w-[20rem] overflow-hidden rounded-xl border border-hairline bg-bg shadow-xl shadow-bg/30">
            <video
              ref={videoRef}
              id={videoId}
              aria-label={t(details.title)}
              aria-describedby={`${videoId}-description`}
              controls
              playsInline
              muted
              preload="none"
              width="720"
              height="1280"
              poster={playback.poster}
              className="aspect-[9/16] h-auto w-full focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent"
              onLoadedMetadata={() => {
                if (pendingSeek.current === null || !videoRef.current) return;
                videoRef.current.currentTime = pendingSeek.current;
                pendingSeek.current = null;
              }}
              onTimeUpdate={(event) => updateChapter(event.currentTarget.currentTime)}
              onSeeked={(event) => updateChapter(event.currentTarget.currentTime)}
              onWaiting={() => setIsLoading(true)}
              onPlaying={() => {
                setIsLoading(false);
                setHasError(false);
              }}
              onPause={() => setIsLoading(false)}
              onError={() => {
                setIsLoading(false);
                setHasError(true);
              }}
              onPlay={() => {
                setHasStarted(true);
                if (played.current) return;
                played.current = true;
                trackWebsiteEvent("ReelClip.Web.tutorialPlayed", { tutorial: id });
              }}
              onEnded={() => {
                setIsLoading(false);
                if (ended.current) return;
                ended.current = true;
                trackWebsiteEvent("ReelClip.Web.tutorialReachedEnd", { tutorial: id });
              }}
            >
              <source src={playback.video} type="video/mp4" />
              <track default={captionLocale !== "en"} kind="captions" src={playback.captions} srcLang={captionLocale} label={t("Step captions")} />
              <a href={playback.video}>{t("Open the screen recording")}</a>.
            </video>
            {!hasStarted && !hasError && (
              <button
                type="button"
                aria-label={t("Play {seconds}-second walkthrough", { seconds: Math.round(details.duration) })}
                aria-controls={videoId}
                onClick={() => playFrom(0)}
                className="absolute top-1/2 left-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-accent/60 bg-accent text-bg shadow-lg shadow-bg/40 transition-[background-color,scale] duration-200 hover:scale-105 hover:bg-accent-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent active:scale-95 motion-reduce:transition-none"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" className="ml-1 h-7 w-7 fill-current"><path d="M7 4.5v15L20 12 7 4.5Z" /></svg>
              </button>
            )}
            {isLoading && (
              <span role="status" className="pointer-events-none absolute inset-x-4 bottom-14 rounded-lg bg-bg/95 px-3 py-2 text-center text-xs text-text-muted">
                {t("Loading video…")}
              </span>
            )}
          </div>
        </div>

        <figcaption className="contents">
          <div className="row-start-1 min-w-0 px-6 pt-7 pb-6 sm:px-8 sm:pt-8 md:col-start-2 md:pb-0 lg:px-10 lg:pt-10">
          <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-medium">
            <span className="inline-flex items-center gap-2 text-accent">
              <svg aria-hidden="true" viewBox="0 0 20 20" className="h-3.5 w-3.5 fill-current"><path d="m6 3 11 7L6 17V3Z" /></svg>
              {t("Video walkthrough")}
            </span>
            <span className="text-text-muted">{t("{seconds} sec · Silent, captioned", { seconds: Math.round(details.duration) })}</span>
          </div>
          <h2 id={`${videoId}-title`} className="text-2xl leading-tight font-bold tracking-tight text-balance text-text sm:text-[1.75rem]">
            {t(details.title)}
          </h2>
          <p id={`${videoId}-description`} className="mt-3 text-sm leading-relaxed text-pretty text-text-muted">
            {t(details.description)}
          </p>
          </div>
          <div className="row-start-3 min-w-0 px-6 pt-6 pb-7 sm:px-8 sm:pb-8 md:col-start-2 md:row-start-2 lg:px-10 lg:pb-10">
          <p className="mb-2 text-xs text-text-muted">{t("Choose a step to watch from there")}</p>
          <ol aria-label={t("Video chapters")} className="-mx-3 space-y-1">
            {details.chapters.map((chapter, index) => {
              const isActive = hasStarted && activeChapter === index;
              return (
                <li key={chapter.start}>
                  <button
                    type="button"
                    aria-label={t("{title}, play from {time}", { title: t(chapter.title), time: videoTimestamp(chapter.start) })}
                    aria-controls={videoId}
                    aria-current={isActive ? "step" : undefined}
                    onClick={() => {
                      playFrom(chapter.start);
                      if (window.matchMedia("(max-width: 767px)").matches) {
                        videoRef.current?.scrollIntoView({
                          block: "center",
                          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
                        });
                      }
                      trackWebsiteEvent("ReelClip.Web.tutorialChapterPlayed", { tutorial: id, chapter: index + 1 });
                    }}
                    className={`group flex w-full items-start gap-3 rounded-xl p-3 text-left transition-colors duration-200 hover:bg-surface-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:bg-accent/10 ${isActive ? "bg-accent/5" : ""}`}
                  >
                    <span aria-hidden="true" className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold tabular-nums transition-colors ${isActive ? "border-accent bg-accent text-bg" : "border-hairline text-text-muted group-hover:border-accent/50 group-hover:text-accent"}`}>
                      {index + 1}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={`block text-sm font-semibold ${isActive ? "text-accent" : "text-text"}`}>{t(chapter.title)}</span>
                      <span className="mt-1 block text-xs leading-relaxed text-text-muted">{t(chapter.description)}</span>
                    </span>
                    <span className="pt-1 text-[11px] text-text-muted tabular-nums">{videoTimestamp(chapter.start)}</span>
                  </button>
                </li>
              );
            })}
          </ol>
          <p className="mt-6 border-t border-hairline pt-4 text-xs leading-relaxed text-text-muted">{t(details.note)}</p>
          {captionLocale !== playback.appLanguage && <p className="mt-3 text-xs leading-relaxed text-text-muted">{t("The recording uses English app controls. Step captions are translated.")}</p>}
          {hasError && (
            <p role="alert" className="mt-4 text-sm leading-relaxed text-text-muted">
              {t("Video couldn’t play. Try the player controls or open the recording below.")}{" "}<a href={playback.video} className="text-accent underline underline-offset-4">{t("Open the screen recording")}</a>.
            </p>
          )}
          </div>
        </figcaption>
    </figure>
  );
}
