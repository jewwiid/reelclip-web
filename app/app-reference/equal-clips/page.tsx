import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PostCta } from "@/components/blog";
import { getRequestLocale } from "@/i18n/server";
import { localizedMetadata } from "@/i18n/seo";
import { videoTimestamp } from "@/lib/guide-videos";
import reference from "@/public/app-reference/equal-clips.json";

export function generateMetadata(): Metadata {
  return localizedMetadata("en", reference.documents.page, {
    title: `${reference.title} · ReelClip`,
    description: reference.summary,
    openGraph: { title: reference.title, description: reference.summary, type: "website" },
  });
}

export default async function EqualClipsReference() {
  if (await getRequestLocale() !== "en") notFound();
  const linkClass = "text-accent underline underline-offset-4 hover:text-accent-deep";
  return (
    <>
      <Nav availableLocales={["en"]} />
      <main className="mx-auto w-full max-w-5xl px-6 py-12 sm:px-10 sm:py-16">
        <article className="space-y-10">
          <header className="max-w-3xl space-y-4">
            <p className="text-xs font-bold uppercase tracking-wider text-accent">App control reference · English</p>
            <h1 className="text-3xl font-black tracking-tight sm:text-4xl">{reference.title}</h1>
            <p className="leading-relaxed text-text-muted">{reference.summary}</p>
            <p className="text-sm text-text-muted">Reviewed <time dateTime={reference.reviewed_on}>{reference.reviewed_on}</time>. The app version in this recording is not established.</p>
            <p><a className={linkClass} href={reference.guide}>Watch the walkthrough in its guide</a></p>
          </header>

          <section aria-labelledby="reference-context" className="max-w-3xl space-y-3 leading-relaxed">
            <h2 id="reference-context" className="text-2xl font-bold">Before you start</h2>
            <ul className="list-disc space-y-2 pl-5 text-text-muted">{reference.context.map((text) => <li key={text}>{text}</li>)}</ul>
            <p className="text-text-muted">{reference.video.scope}</p>
          </section>

          <section aria-labelledby="reference-steps" className="max-w-3xl space-y-4">
            <h2 id="reference-steps" className="text-2xl font-bold">Follow the recorded steps</h2>
            <ol className="list-decimal space-y-5 pl-5">
              {reference.steps.map((step) => <li key={step.id} className="pl-1">
                <h3 className="font-semibold">{step.title} <a className={`${linkClass} ml-1 text-sm font-normal`} href={`${reference.video.path}#t=${step.start_seconds}`}>{videoTimestamp(step.start_seconds)}</a></h3>
                <p className="mt-1 leading-relaxed text-text-muted">{step.instruction}</p>
              </li>)}
            </ol>
          </section>

          <section aria-labelledby="reference-controls" className="max-w-3xl space-y-5">
            <h2 id="reference-controls" className="text-2xl font-bold">What each control means</h2>
            {reference.controls.map((control) => <div key={control.id} id={`control-${control.id}`} className="space-y-2 border-t border-hairline pt-5">
              <h3 className="text-lg font-semibold">{control.label}</h3>
              <p className="text-sm text-text-muted">Where: {control.location}.</p>
              <p className="leading-relaxed">{control.meaning}</p>
              <p className="text-sm leading-relaxed text-text-muted">In this recording: {control.observed}</p>
            </div>)}
          </section>

          <section aria-labelledby="reference-example" className="max-w-3xl space-y-3">
            <h2 id="reference-example" className="text-2xl font-bold">Check the result against this example</h2>
            <p className="leading-relaxed text-text-muted">Source: {reference.example.source_duration_display}. Clip amount: {reference.example.clip_count}. Space: {reference.example.spacing_display}. The main duration label reads {reference.example.clip_duration_display}; the precise readout is {reference.example.precise_duration_readout}.</p>
            <ol className="list-decimal space-y-1 pl-5">{reference.example.planned_ranges_display.map((range) => <li key={range}>{range}</li>)}</ol>
            <p className="text-sm leading-relaxed text-text-muted">{reference.example.rounding_note}</p>
          </section>

          <section aria-labelledby="reference-screenshots" className="space-y-5">
            <h2 id="reference-screenshots" className="text-2xl font-bold">Reviewed app screenshots</h2>
            <div className="grid max-w-3xl gap-8 sm:grid-cols-2">
              {reference.screenshots.map((frame) => <figure key={frame.id} className="min-w-0 space-y-3">
                <Image unoptimized src={frame.path} alt={frame.description} width={720} height={1280} className="h-auto w-full rounded-xl border border-hairline" />
                <figcaption className="text-sm leading-relaxed text-text-muted">{videoTimestamp(frame.video_seconds)} — {frame.description}</figcaption>
              </figure>)}
            </div>
          </section>

          <section aria-labelledby="reference-limits" className="max-w-3xl space-y-3">
            <h2 id="reference-limits" className="text-2xl font-bold">What this recording establishes</h2>
            <ul className="list-disc space-y-2 pl-5 leading-relaxed text-text-muted">{reference.limits.map((text) => <li key={text}>{text}</li>)}</ul>
            <p className="pt-2 text-sm"><a className={linkClass} href={reference.documents.markdown} download>Markdown for AI tools</a>{" · "}<a className={linkClass} href={reference.documents.json}>Structured JSON</a></p>
          </section>
          <PostCta />
        </article>
      </main>
      <Footer />
    </>
  );
}
