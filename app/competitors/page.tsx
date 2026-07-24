import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "ReelClip vs CapCut, InShot, VN, OpusClip, and Quik",
  description:
    "A practical guide to where ReelClip fits alongside CapCut, InShot, VN, OpusClip, and GoPro Quik.",
};

type Competitor = {
  name: string;
  logo: string;
  oneLiner: string;
  availability: string;
  bestFor: string;
  strengths: string[];
  tradeoffs: string[];
};

const COMPETITORS: Competitor[] = [
  {
    name: "CapCut",
    logo: "/competitors/capcut.jpg",
    oneLiner: "A full social-video editor built around editable templates.",
    availability: "Free templates · paid tools available",
    bestFor: "Turning clips into a finished, template-led post.",
    strengths: [
      "Large library of editable templates",
      "Template support on mobile and web",
      "Editing tools for a complete social video",
    ],
    tradeoffs: [
      "Best when you plan to finish inside CapCut",
      "Template availability can vary by platform and region",
    ],
  },
  {
    name: "InShot",
    logo: "/competitors/inshot.jpg",
    oneLiner: "A mobile editor for videos, photos, and collages.",
    availability: "Free app · optional Pro",
    bestFor: "Fast finishing edits with music, captions, and effects.",
    strengths: [
      "Auto captions and AI effects",
      "Keyframes, chroma key, and layered editing",
      "Up to 4K/60fps export",
    ],
    tradeoffs: [
      "A complete editing workflow, rather than clip prep",
      "Pro unlocks paid materials and removes ads and watermarks",
    ],
  },
  {
    name: "VN",
    logo: "/competitors/vn.jpg",
    oneLiner: "A multi-track mobile editor with hands-on timeline control.",
    availability: "Free app · in-app purchases",
    bestFor: "Creators who want to shape a full edit on a mobile timeline.",
    strengths: [
      "Multi-track timeline, keyframes, and speed curves",
      "Templates, captions, and text-to-speech",
      "4K/60fps export and project transfer",
    ],
    tradeoffs: [
      "More manual editing than automated clip prep",
      "Its broad toolset takes longer to learn",
    ],
  },
  {
    name: "OpusClip",
    logo: "/competitors/opusclip-webclip.png",
    oneLiner: "A web app that turns long videos into social clips with AI.",
    availability: "Free plan · paid plans",
    bestFor: "Repurposing long-form video with AI clipping and captions.",
    strengths: [
      "AI clipping and virality scoring",
      "Captions and social publishing tools",
      "Paid plans add editing and NLE export options",
    ],
    tradeoffs: [
      "A web workflow rather than an on-device one",
      "Free exports are watermarked and time-limited",
    ],
  },
  {
    name: "Quik",
    logo: "/competitors/quik.jpg",
    oneLiner: "GoPro's editor for highlight videos and action footage.",
    availability: "Free app · premium tools",
    bestFor: "GoPro, action, and travel footage with quick highlight edits.",
    strengths: [
      "Automatic highlight videos",
      "Import from a GoPro, phone, or another camera",
      "Beat-synced edits, themes, and manual controls",
    ],
    tradeoffs: [
      "Cloud features are part of the GoPro workflow",
      "Best suited to GoPro and action-footage use cases",
    ],
  },
];

const WORKFLOWS = [
  {
    tool: "ReelClip",
    title: "Prep clips before your final edit",
    body: "Start with one longer recording, review the cuts, then save smaller source clips for the editor you already use.",
  },
  {
    tool: "CapCut",
    title: "Build around a trend template",
    body: "Choose a template and make the finished social post in the same editing workspace.",
  },
  {
    tool: "InShot or VN",
    title: "Make a full mobile edit",
    body: "Use a timeline editor when you want to add music, effects, captions, or more hands-on control.",
  },
  {
    tool: "OpusClip",
    title: "Automate a web-first long-form workflow",
    body: "Use AI clipping and social tools from a browser when your source footage already lives in a web workflow.",
  },
  {
    tool: "Quik",
    title: "Turn action footage into highlights",
    body: "Use GoPro's tools for quick highlight videos from action, travel, or GoPro footage.",
  },
];

function LogoTile({ competitor }: { competitor: Competitor }) {
  return (
    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-surface-2 ring-1 ring-hairline">
      <Image
        src={competitor.logo}
        alt={`${competitor.name} app icon`}
        fill
        sizes="48px"
        className="object-cover"
      />
    </div>
  );
}

export default function CompetitorsPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="relative overflow-hidden border-b border-hairline px-6 pb-12 pt-16 sm:px-10 sm:pb-16 sm:pt-24">
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
          <div className="relative mx-auto max-w-4xl text-center">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-hairline bg-surface/60 px-3 py-1.5 backdrop-blur">
              <span className="text-xs font-medium text-text-muted">A practical workflow guide · Checked July 2026</span>
            </div>
            <h1 className="mb-6 text-4xl font-black leading-[1.0] tracking-tight sm:text-6xl">
              How ReelClip fits
              <br />
              with <span className="gradient-text">the rest.</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-text-muted">
              ReelClip is for preparing smaller clips from a longer recording before you make the final post. The editors and AI tools around it
              fit different parts of the workflow.
            </p>
          </div>
        </section>

        <section className="border-b border-hairline px-6 py-16 sm:px-10 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="mb-10 max-w-2xl">
              <div className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.18em] text-accent">
                What makes ReelClip different
              </div>
              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Prep first. Create anywhere.</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-3 sm:gap-6">
              <NicheCard title="Private by design" body="Your source video is analysed on your device." />
              <NicheCard title="Review every cut" body="Adjust the clips before you save anything." />
              <NicheCard title="Ready for your editor" body="Export smaller source clips to Photos, then create wherever you like." />
            </div>
          </div>
        </section>

        <section className="border-b border-hairline px-6 py-16 sm:px-10 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="mb-12">
              <div className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.18em] text-accent">
                The tools around ReelClip
              </div>
              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Different jobs, different tools.</h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-muted">
                These are good tools. They solve different parts of the content workflow.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              {COMPETITORS.map((competitor) => (
                <article key={competitor.name} className="rounded-2xl border border-hairline bg-surface p-6 sm:p-7">
                  <div className="mb-5 flex items-start gap-4">
                    <LogoTile competitor={competitor} />
                    <div className="min-w-0">
                      <h3 className="text-xl font-bold leading-tight">{competitor.name}</h3>
                      <p className="mt-1 text-xs text-text-muted">{competitor.availability}</p>
                    </div>
                  </div>

                  <p className="mb-4 text-sm leading-relaxed text-text-muted">{competitor.oneLiner}</p>

                  <div className="mb-1.5 text-xs font-bold uppercase tracking-wider text-text-faint">Best for</div>
                  <p className="mb-4 text-sm leading-snug text-text">{competitor.bestFor}</p>

                  <div className="grid gap-4 border-t border-hairline pt-5 sm:grid-cols-2">
                    <div>
                      <div className="mb-2 text-xs font-bold uppercase tracking-wider text-accent">What it does well</div>
                      <ul className="space-y-1.5 text-xs leading-relaxed text-text-muted">
                        {competitor.strengths.map((strength) => (
                          <li key={strength} className="flex gap-2">
                            <span className="shrink-0 text-accent">+</span>
                            <span>{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="mb-2 text-xs font-bold uppercase tracking-wider text-text-faint">Keep in mind</div>
                      <ul className="space-y-1.5 text-xs leading-relaxed text-text-muted">
                        {competitor.tradeoffs.map((tradeoff) => (
                          <li key={tradeoff} className="flex gap-2">
                            <span className="shrink-0 text-text-faint">−</span>
                            <span>{tradeoff}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <p className="mt-6 text-xs leading-relaxed text-text-faint">
              Product details and plans can change. This page was checked against each product&apos;s current official
              site or App Store listing in July 2026.
            </p>
          </div>
        </section>

        <section className="border-b border-hairline px-6 py-16 sm:px-10 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <div className="mb-10 max-w-2xl">
              <div className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.18em] text-accent">
                Choose the workflow
              </div>
              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Pick the job, not a winner.</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              {WORKFLOWS.map((workflow) => (
                <article key={workflow.tool} className="rounded-2xl border border-hairline bg-surface p-6">
                  <div className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-accent">{workflow.tool}</div>
                  <h3 className="mb-2 text-lg font-bold">{workflow.title}</h3>
                  <p className="text-sm leading-relaxed text-text-muted">{workflow.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-hairline px-6 py-16 sm:px-10 sm:py-20">
          <div className="mx-auto max-w-4xl">
            <div className="mb-10">
              <div className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.18em] text-accent">
                When to use something else
              </div>
              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">ReelClip is not the right tool if…</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <SkipCard
                title="You want one-tap trend templates"
                body="Choose CapCut when you want to start from a template and finish the whole post there."
              />
              <SkipCard
                title="You want a desktop editor"
                body="If you need Premiere Pro, Final Cut Pro, or DaVinci Resolve, use ReelClip only to prepare the clips first."
              />
              <SkipCard
                title="You want a free full-timeline editor"
                body="VN is a better fit when you want to build your entire edit directly on a mobile timeline."
              />
              <SkipCard
                title="Your footage is already short"
                body="ReelClip earns its place when you have a longer recording to split into usable moments."
              />
            </div>
          </div>
        </section>

        <section className="px-6 py-20 sm:px-10 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-black tracking-tight sm:text-4xl">See if it fits your workflow.</h2>
            <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-text-muted">
              Join the beta and turn one longer recording into smaller clips for the editor you already use.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/#waitlist"
                className="accent-glow w-full rounded-full bg-accent px-7 py-3.5 text-base font-bold text-bg transition hover:bg-accent-deep sm:w-auto"
              >
                Join beta
              </Link>
              <Link
                href="/pricing"
                className="w-full rounded-full border border-hairline px-7 py-3.5 text-base font-semibold text-text transition hover:bg-surface sm:w-auto"
              >
                See pricing
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function NicheCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-hairline bg-surface p-6">
      <h3 className="mb-2 text-lg font-bold">{title}</h3>
      <p className="text-sm leading-relaxed text-text-muted">{body}</p>
    </div>
  );
}

function SkipCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-hairline bg-surface p-6">
      <h3 className="mb-2 text-base font-bold leading-snug">{title}</h3>
      <p className="text-sm leading-relaxed text-text-muted">{body}</p>
    </div>
  );
}
