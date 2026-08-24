import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { BreadcrumbJsonLd } from "@/components/structured-data";

export const metadata: Metadata = {
  title: "About ReelClip — On-device video clip preparation",
  description:
    "ReelClip is a strictly on-device iOS app for cutting long recordings into share-ready clips. Built by an independent developer who wanted AI cut planning that doesn't upload your footage.",
  keywords: [
    "about reelclip",
    "reelclip team",
    "on-device video editor",
    "private video editor",
    "apple intelligence video editor",
    "independent ios developer",
  ],
  alternates: { canonical: "https://reelclips.app/about" },
  openGraph: {
    title: "About ReelClip — On-device video clip preparation",
    description:
      "ReelClip is a strictly on-device iOS app for cutting long recordings into share-ready clips.",
    url: "https://reelclips.app/about",
    type: "profile",
  },
};

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://reelclips.app" },
          { name: "About", url: "https://reelclips.app/about" },
        ]}
      />
      <Nav />
      <main className="px-6 sm:px-10 py-12 sm:py-20 max-w-3xl mx-auto">
        <header className="mb-12">
          <p className="text-xs uppercase tracking-wider text-accent font-bold mb-3">
            About
          </p>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
            Built for video that never leaves your phone.
          </h1>
          <p className="text-base text-text-muted mt-4 leading-relaxed">
            ReelClip is a strictly on-device iOS app for cutting long recordings
            into share-ready clips. Every cut plan, transcript, and AI pass runs
            on your iPhone. Nothing is uploaded, nothing is logged, nothing is
            shared with anyone.
          </p>
        </header>

        <article className="prose-sm space-y-10 text-text leading-relaxed">
          <Section title="Why we built it">
            <p className="text-text-muted">
              Most AI video editors upload your footage to a cloud server, run
              it through a third-party model, and ship back a finished clip.
              That is the wrong default. Long recordings — interviews,
              podcasts, vlogs, screen captures — often contain material that
              is private, sensitive, or unreleased. The right answer is to do
              the work on the device that already has the video.
            </p>
            <p className="text-text-muted mt-3">
              Apple Intelligence and the Foundation Models framework made that
              possible on iPhone in 2025. ReelClip is built on top of that.
            </p>
          </Section>

          <Section title="What ReelClip does">
            <ul className="list-disc pl-6 space-y-2 text-text-muted">
              <li>
                Four cut modes: <strong className="text-text">Cut</strong> (split
                by duration),
                {" "}<strong className="text-text">Transcript</strong> (cut the
                dead air),{" "}
                <strong className="text-text">Slice</strong> (manual highlights),
                {" "}<strong className="text-text">AI</strong> (describe what
                you want, let on-device Apple Intelligence pick the moments).
              </li>
              <li>
                Translate captions into other languages and dub the audio with
                synthesized translated speech — all on-device.
              </li>
              <li>
                Export SRT, VTT, and plain-text subtitles. Burn captions into
                the final clip with four caption styles.
              </li>
              <li>Save the finished clips straight to your Photos library.</li>
            </ul>
          </Section>

          <Section title="What ReelClip does not do">
            <ul className="list-disc pl-6 space-y-2 text-text-muted">
              <li>
                We do not upload your video, audio, transcripts, or AI feature
                packs to any server.
              </li>
              <li>
                We do not use third-party AI providers, cloud LLMs, or
                bring-your-own-API-key integrations.
              </li>
              <li>
                We do not embed third-party analytics, ad SDKs, or
                cross-app trackers.
              </li>
              <li>
                We do not place watermarks on paid-plan exports.
              </li>
            </ul>
          </Section>

          <Section title="Who built it">
            <p className="text-text-muted">
              ReelClip is built and operated by an independent iOS developer.
              Contact:{" "}
              <a
                href="mailto:jude@reelclips.app"
                className="text-accent hover:underline"
              >
                jude@reelclips.app
              </a>
              .
            </p>
          </Section>

          <Section title="Where to next">
            <ul className="list-disc pl-6 space-y-2 text-text-muted">
              <li>
                Read the{" "}
                <a
                  href="/privacy"
                  className="text-accent hover:underline"
                >
                  Privacy Policy
                </a>{" "}
                for the full data flow.
              </li>
              <li>
                See{" "}
                <a
                  href="/competitors"
                  className="text-accent hover:underline"
                >
                  how ReelClip compares to CapCut, InShot, VN, OpusClip, and
                  Quik
                </a>
                .
              </li>
              <li>
                Check the{" "}
                <a
                  href="/pricing"
                  className="text-accent hover:underline"
                >
                  Creator plans
                </a>{" "}
                if you&apos;re ready to export.
              </li>
              <li>
                Get the app on the{" "}
                <a
                  href="https://apps.apple.com/app/reelclip/id6787742864"
                  target="_blank"
                  rel="noreferrer"
                  className="text-accent hover:underline"
                >
                  App Store
                </a>
                .
              </li>
            </ul>
          </Section>
        </article>
      </main>
      <Footer />
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4 tracking-tight">{title}</h2>
      {children}
    </section>
  );
}
