"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { translateGuide, type GuideTranslation } from "@/lib/guide-translation";

const scenes = [
  { id: "real-15725208", title: "Outdoor portrait", look: "Warm Daylight", detail: "Illustrative balance + Warm Daylight starter LUT.", alt: "Real frame of a woman with flowers in her hair, filmed by Rafael Nicida.", creator: "Rafael Nicida", source: "https://www.pexels.com/video/4k-slog-3-15725208/", portrait: false, originalLabel: "Flat source" },
  { id: "real-16270533", title: "Kashmir field", look: "Clean Natural", detail: "Illustrative balance + Clean Natural starter LUT.", alt: "Real frame of a woman walking through a field, filmed by Imad Clicks.", creator: "Imad Clicks", source: "https://www.pexels.com/video/sony-slog-3-footage-free-download-for-color-grading-16270533/", portrait: false, originalLabel: "Flat source" },
  { id: "real-27088216", title: "Studio portrait", look: "Soft Portrait", detail: "Illustrative balance + Soft Portrait starter LUT.", alt: "Real studio portrait frame filmed by Abdijabar Mohamud.", creator: "Abdijabar Mohamud", source: "https://www.pexels.com/video/make-up-slog-3-footage-27088216/", portrait: true, originalLabel: "Flat source" },
  { id: "real-34299523", title: "Ocean waves", look: "Cool Daylight", detail: "Illustrative balance + Cool Daylight starter LUT.", alt: "Real ocean waves breaking over a rocky shore, filmed by Wave Stock Footage Free.", creator: "Wave Stock Footage Free", source: "https://www.pexels.com/video/ungraded-ocean-waves-crashing-on-rocks-34299523/", portrait: false, originalLabel: "Flat source" },
  { id: "real-17964557", title: "Drakensberg mountains", look: "Gentle Cinema", detail: "Illustrative balance + Gentle Cinema starter LUT.", alt: "Real aerial frame over the Drakensberg mountains, filmed by Agnieszka Taggart.", creator: "Agnieszka Taggart", source: "https://www.pexels.com/video/drakensberg-mountains-ungraded-clip-for-editing-17964557/", portrait: false, originalLabel: "Flat source" },
  { id: "real-27814729", title: "City architecture", look: "Classic Mono", detail: "Classic Mono starter LUT on the display-ready source; no flat-to-normal balance.", alt: "Real red brick town hall in a city square, filmed by Baran Robin.", creator: "Baran Robin", source: "https://www.pexels.com/video/ungraded-apple-prores-log-footage-27814729/", portrait: true, originalLabel: "Original" },
] as const;

/** Real same-frame comparisons; balancing is explicit and never inferred as a camera transform. */
export function LUTFilmComparison({ translations }: { translations?: GuideTranslation } = {}) {
  const t = (text: string, values?: Record<string, string | number>) => translateGuide(translations, text, values);
  const id = useId();
  const [selected, setSelected] = useState(0);
  const [reveal, setReveal] = useState(50);
  const scene = scenes[selected];
  const path = `/lut-examples/${scene.id}`;

  return (
    <figure data-guide-component="comparison" className="guide-walkthrough overflow-hidden rounded-2xl border border-hairline bg-surface" aria-labelledby={`${id}-title`}>
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-text-muted">{t("Real footage · before and after")}</p>
          <h3 id={`${id}-title`} className="mt-1 text-xl font-semibold">{t(scene.title)} <span className="font-normal text-text-muted">/ {scene.look}</span></h3>
        </div>
        <span className="text-xs text-text-muted">{t("Drag to compare")}</span>
      </div>

      <div key={scene.id} className="group relative aspect-[3/2] overflow-hidden bg-black focus-within:outline-2 focus-within:outline-offset-[-3px] focus-within:outline-accent">
        <Image src={`${path}-after.webp`} alt={t(scene.alt)} fill unoptimized sizes="(min-width: 768px) 900px, 100vw" className={scene.portrait ? "object-contain" : "object-cover"} />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - reveal}% 0 0)` }} aria-hidden="true">
          <Image src={`${path}-before.webp`} alt="" fill unoptimized sizes="(min-width: 768px) 900px, 100vw" className={scene.portrait ? "object-contain" : "object-cover"} />
        </div>
        <div className="pointer-events-none absolute inset-x-4 top-4 flex justify-between gap-4 text-xs font-medium text-white" aria-hidden="true">
          <span className="rounded-full bg-black/65 px-3 py-1.5">{t(scene.originalLabel)}</span>
          <span className="rounded-full bg-black/65 px-3 py-1.5">{scene.look}</span>
        </div>
        <div className="pointer-events-none absolute inset-y-0 w-px bg-white/90 shadow-sm" style={{ left: `${reveal}%` }} aria-hidden="true">
          <div className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-black/45 text-white shadow-lg backdrop-blur-sm">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m8 7-5 5 5 5m8-10 5 5-5 5M10 5v14m4-14v14" /></svg>
          </div>
        </div>
        <input
          type="range" min="0" max="100" step="1" value={reveal}
          onChange={(event) => setReveal(Number(event.target.value))}
          aria-label={t("Reveal {source} before image on {title}", { source: t(scene.originalLabel), title: t(scene.title) })}
          aria-valuetext={t("{percent}% before image revealed", { percent: reveal })}
          aria-describedby={`${id}-instructions`}
          className="absolute inset-0 m-0 h-full w-full cursor-ew-resize opacity-0"
          style={{ touchAction: "pan-y" }}
        />
      </div>

      <div className="space-y-4 px-5 py-5 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-text-muted">{t(scene.detail)}</p>
          <div className="flex gap-2 text-xs">
            <button type="button" onClick={() => setReveal(100)} className="min-h-10 rounded-full border border-hairline px-3 hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">{t(scene.originalLabel)}</button>
            <button type="button" onClick={() => setReveal(0)} className="min-h-10 rounded-full border border-hairline px-3 hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">{t("Graded")}</button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6" aria-label={t("Choose an example scene")}>
          {scenes.map((item, index) => (
            <button key={item.id} type="button" aria-pressed={selected === index} onClick={() => { setSelected(index); setReveal(50); }}
              className={`overflow-hidden rounded-lg border text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${selected === index ? "border-accent text-text" : "border-hairline text-text-muted hover:border-text-muted"}`}>
              <Image src={`/lut-examples/${item.id}-thumb.webp`} alt="" width={240} height={160} unoptimized loading="lazy" className="aspect-[3/2] w-full object-cover" />
              <span className="block px-2 py-2 text-[11px] leading-snug">{t(item.title)}</span>
            </button>
          ))}
        </div>
        <figcaption className="space-y-2 text-xs leading-relaxed text-text-muted">
          <p id={`${id}-instructions`}>{t("Drag across the image, or focus the comparison and use the arrow keys. Before is on the left; graded is on the right. Home shows the grade; End shows the source.")}</p>
          <p>{t("Real stock footage. Log examples use an illustrative contrast/saturation balance followed by the named ReelClip starter LUT. The architecture example already looks display-ready and receives only Classic Mono. Uploader descriptions do not establish the recording curve and gamut of the downloaded files; these are grading illustrations, not calibrated camera conversions. No AI generation or subject replacement.")}</p>
          <p>{t("Footage:")}{" "}<a href={scene.source} className="underline underline-offset-2">{scene.creator} / Pexels</a> · <a href="https://www.pexels.com/license/" className="underline underline-offset-2">{t("License")}</a></p>
          <p><a href={`${path}-before.webp`} className="underline underline-offset-2">{t("Open original")}</a> <span aria-hidden="true">·</span> <a href={`${path}-after.webp`} className="underline underline-offset-2">{t("Open film look")}</a></p>
        </figcaption>
      </div>
    </figure>
  );
}
