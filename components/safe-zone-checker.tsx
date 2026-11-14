"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Safe-zone checker. Everything runs in the browser: the chosen file is
 * read through an object URL and never uploaded.
 *
 * Margins are percentages of the 9:16 frame. Only the Instagram/Facebook
 * Reels preset is published by the platform (Meta Ads Guide); the TikTok
 * and Shorts presets are editable planning margins and are labelled so.
 */

type Margins = { top: number; bottom: number; left: number; right: number };

type Preset = {
  id: string;
  label: string;
  margins: Margins;
  source: "published" | "planning";
};

export const SAFE_ZONE_PRESETS: Preset[] = [
  { id: "reels", label: "Instagram & Facebook Reels", margins: { top: 14, bottom: 35, left: 6, right: 6 }, source: "published" },
  { id: "tiktok", label: "TikTok", margins: { top: 12.5, bottom: 34, left: 6, right: 17 }, source: "planning" },
  { id: "shorts", label: "YouTube Shorts", margins: { top: 15, bottom: 30, left: 6, right: 17 }, source: "planning" },
];

const FIELDS: { key: keyof Margins; label: string }[] = [
  { key: "top", label: "Top" },
  { key: "bottom", label: "Bottom" },
  { key: "left", label: "Left" },
  { key: "right", label: "Right" },
];

export function SafeZoneChecker() {
  const [presetId, setPresetId] = useState(SAFE_ZONE_PRESETS[0].id);
  const [margins, setMargins] = useState<Margins>(SAFE_ZONE_PRESETS[0].margins);
  const [media, setMedia] = useState<{ url: string; kind: "image" | "video"; name: string } | null>(null);
  const [aspectWarning, setAspectWarning] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const preset = SAFE_ZONE_PRESETS.find((p) => p.id === presetId) ?? SAFE_ZONE_PRESETS[0];

  useEffect(() => () => { if (media) URL.revokeObjectURL(media.url); }, [media]);

  function choosePreset(id: string) {
    const next = SAFE_ZONE_PRESETS.find((p) => p.id === id);
    if (!next) return;
    setPresetId(id);
    setMargins(next.margins);
  }

  function loadFile(file: File | undefined) {
    if (!file) return;
    const kind = file.type.startsWith("video/") ? "video" : file.type.startsWith("image/") ? "image" : null;
    if (!kind) return;
    setAspectWarning(null);
    setMedia({ url: URL.createObjectURL(file), kind, name: file.name });
  }

  function checkAspect(width: number, height: number) {
    if (!width || !height) return;
    const ratio = width / height;
    setAspectWarning(Math.abs(ratio - 9 / 16) > 0.01
      ? `This file is ${width}×${height} (${ratio.toFixed(3)}:1), not 9:16. The platform will crop or letterbox it, so the overlay shows a 9:16 fill crop.`
      : null);
  }

  const edited = FIELDS.some(({ key }) => margins[key] !== preset.margins[key]);
  const px = (pct: number, total: number) => Math.round((pct / 100) * total);

  return (
    <div className="grid gap-8 md:grid-cols-[minmax(0,320px)_1fr] md:items-start">
      <div
        className="relative mx-auto w-full max-w-[320px] overflow-hidden rounded-2xl border border-hairline bg-surface"
        style={{ aspectRatio: "9 / 16" }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); loadFile(e.dataTransfer.files[0]); }}
      >
        {media?.kind === "image" && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={media.url} alt="Your frame" className="absolute inset-0 h-full w-full object-cover"
            onLoad={(e) => checkAspect(e.currentTarget.naturalWidth, e.currentTarget.naturalHeight)} />
        )}
        {media?.kind === "video" && (
          <video src={media.url} className="absolute inset-0 h-full w-full object-cover" controls muted playsInline preload="metadata"
            onLoadedMetadata={(e) => checkAspect(e.currentTarget.videoWidth, e.currentTarget.videoHeight)} />
        )}
        {!media && (
          <button type="button" onClick={() => inputRef.current?.click()}
            className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center text-sm text-text-muted">
            <span className="text-base font-bold text-text">Drop a video or image</span>
            <span>or tap to choose one. It stays in your browser.</span>
          </button>
        )}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-x-0 top-0 bg-red-500/35" style={{ height: `${margins.top}%` }} />
          <div className="absolute inset-x-0 bottom-0 bg-red-500/35" style={{ height: `${margins.bottom}%` }} />
          <div className="absolute left-0 bg-red-500/35" style={{ top: `${margins.top}%`, bottom: `${margins.bottom}%`, width: `${margins.left}%` }} />
          <div className="absolute right-0 bg-red-500/35" style={{ top: `${margins.top}%`, bottom: `${margins.bottom}%`, width: `${margins.right}%` }} />
          <div className="absolute border-2 border-dashed border-accent"
            style={{ top: `${margins.top}%`, bottom: `${margins.bottom}%`, left: `${margins.left}%`, right: `${margins.right}%` }} />
        </div>
      </div>

      <div className="space-y-6">
        <input ref={inputRef} type="file" accept="video/*,image/*" className="sr-only" onChange={(e) => loadFile(e.target.files?.[0])} />
        <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Platform">
          {SAFE_ZONE_PRESETS.map((p) => (
            <button key={p.id} type="button" role="radio" aria-checked={p.id === presetId} onClick={() => choosePreset(p.id)}
              className={`rounded-full border px-4 py-2 text-sm font-bold transition-colors ${p.id === presetId ? "border-accent bg-accent text-bg" : "border-hairline text-text-muted hover:text-text"}`}>
              {p.label}
            </button>
          ))}
        </div>

        <p className="text-sm leading-relaxed text-text-muted">
          {preset.source === "published"
            ? "Margins from Meta’s Instagram Reels ad specifications: leave about 14% at the top, 35% at the bottom and 6% on each side free of text, logos and key details."
            : "Planning margins, not a published platform number. The app’s buttons and caption block move with caption length and app version, so adjust the margins to match what you see on your phone."}
          {edited && " (Edited.)"}
        </p>

        <div className="grid grid-cols-2 gap-4">
          {FIELDS.map(({ key, label }) => (
            <label key={key} className="block text-sm">
              <span className="mb-1 flex justify-between text-text-muted">
                <span>{label}</span>
                <span className="tabular-nums text-text">{margins[key]}% · {px(margins[key], key === "top" || key === "bottom" ? 1920 : 1080)}px</span>
              </span>
              <input type="range" min={0} max={key === "bottom" ? 50 : 30} step={0.5} value={margins[key]}
                onChange={(e) => setMargins({ ...margins, [key]: Number(e.target.value) })}
                className="w-full accent-[var(--accent)]" />
            </label>
          ))}
        </div>

        <p className="text-sm text-text-muted">
          Safe area on a 1080×1920 frame:{" "}
          <strong className="tabular-nums text-text">
            {1080 - px(margins.left, 1080) - px(margins.right, 1080)}×{1920 - px(margins.top, 1920) - px(margins.bottom, 1920)}px
          </strong>
          , starting {px(margins.left, 1080)}px from the left and {px(margins.top, 1920)}px from the top.
        </p>

        {aspectWarning && <p className="rounded-xl border border-hairline bg-surface p-3 text-sm text-text-muted">{aspectWarning}</p>}

        {media && (
          <button type="button" onClick={() => inputRef.current?.click()} className="text-sm font-bold text-accent hover:underline">
            Check another file ({media.name})
          </button>
        )}
      </div>
    </div>
  );
}
