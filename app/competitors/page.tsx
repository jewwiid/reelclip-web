import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "ReelClip vs CapCut, InShot, VN, OpusClip, Quik — ReelClip",
  description:
    "Honest side-by-side: how ReelClip's on-device privacy, four cut modes, and bring-your-own-AI stack up against CapCut, InShot, VN Editor, OpusClip, and Quik.",
};

type Check = "yes" | "no" | "partial";

type Competitor = {
  name: string;
  oneLiner: string;
  /** Background gradient classes for the logo tile (Tailwind utilities) */
  tile: string;
  /** Short letter or glyph for the logo tile */
  glyph: string;
  pricing: string;
  bestFor: string;
  strengths: string[];
  weaknesses: string[];
};

const COMPETITORS: Competitor[] = [
  {
    name: "CapCut",
    oneLiner: "ByteDance's full social-video editor and template engine.",
    tile: "from-cyan-500 to-blue-600",
    glyph: "CC",
    pricing: "Free + Pro tiers · 200M+ MAU",
    bestFor: "Template-driven trend replication inside the TikTok ecosystem.",
    strengths: [
      "Massive template library with one-tap trend formatting",
      "Free 1080p export, no watermark on the free tier",
      "Deep TikTok integration and creator monetization program",
    ],
    weaknesses: [
      "Cloud-first: your footage hits ByteDance servers",
      "Data-privacy concerns for unpublished work",
      "Editor-first — not optimised for pre-template clip prep",
    ],
  },
  {
    name: "InShot",
    oneLiner: "The casual mobile video editor with stickers and music.",
    tile: "from-pink-500 to-rose-600",
    glyph: "In",
    pricing: "$3.99/mo · $17.99/yr",
    bestFor: "Quick personal edits with text, stickers, and trending music.",
    strengths: [
      "Friendly UI, fast onboarding for non-pro creators",
      "Strong mobile market presence on iOS and Android",
      "Large template / effect library",
    ],
    weaknesses: [
      "Watermark on the free tier creates a hard conversion wall",
      "Limited template handoff to other editors",
      "No on-device AI for clip planning",
    ],
  },
  {
    name: "VN Editor",
    oneLiner: "Pro-grade mobile editor with a one-time-purchase model.",
    tile: "from-emerald-500 to-teal-600",
    glyph: "VN",
    pricing: "One-time purchase · No watermark",
    bestFor: "Prosumers who want full timeline control and own their tools.",
    strengths: [
      "Professional features: keyframes, curves, multi-track",
      "No watermark, no subscription, no recurring cost",
      "Strong creator community of paid-up loyalists",
    ],
    weaknesses: [
      "Smaller AI / automation feature set than CapCut",
      "No first-class template handoff workflow",
      "Complex UI for users who just want fast clips",
    ],
  },
  {
    name: "OpusClip",
    oneLiner: "Cloud AI that repackages long-form video into short clips.",
    tile: "from-amber-500 to-orange-600",
    glyph: "Op",
    pricing: "$19+/mo · $10–20M ARR · $215M valuation",
    bestFor: "Repurposing podcasts and YouTube videos into TikTok-ready clips.",
    strengths: [
      "Best-in-class long-form → short-form AI",
      "Viral-score prediction and auto-captioning",
      "Reaches 9-figure valuation on workflow focus",
    ],
    weaknesses: [
      "Cloud-only — your video is uploaded to their servers",
      "Subscription-only, no free tier, no lifetime option",
      "Single use-case: long-form → short, not general editing",
    ],
  },
  {
    name: "Quik (GoPro)",
    oneLiner: "Free auto-editing app aimed at action-camera footage.",
    tile: "from-blue-500 to-indigo-600",
    glyph: "Qk",
    pricing: "Free · Ad-supported",
    bestFor: "Auto-edits of action-camera and travel footage.",
    strengths: [
      "Completely free with no watermark",
      "Automatic highlight selection from action footage",
      "Tight GoPro hardware integration",
    ],
    weaknesses: [
      "Limited creative control — auto-edit only",
      "No on-device AI for clip planning or beat sync",
      "No template-editor hand-off",
    ],
  },
];

type Row = {
  feature: string;
  reelclip: Check;
  capcut: Check;
  inshot: Check;
  vn: Check;
  opus: Check;
  quik: Check;
};

const COMPARISON: Row[] = [
  {
    feature: "On-device analysis (your video never leaves the phone)",
    reelclip: "yes",
    capcut: "no",
    inshot: "partial",
    vn: "partial",
    opus: "no",
    quik: "no",
  },
  {
    feature: "Free tier with no watermark on creator work",
    reelclip: "partial",
    capcut: "yes",
    inshot: "no",
    vn: "yes",
    opus: "no",
    quik: "yes",
  },
  {
    feature: "Multiple cut strategies (fixed / smart / highlight / AI)",
    reelclip: "yes",
    capcut: "partial",
    inshot: "no",
    vn: "no",
    opus: "partial",
    quik: "no",
  },
  {
    feature: "Bring-your-own AI key (OpenAI, Claude, Gemini, MiniMax, Ollama)",
    reelclip: "yes",
    capcut: "no",
    inshot: "no",
    vn: "no",
    opus: "no",
    quik: "no",
  },
  {
    feature: "On-device Apple Intelligence (Foundation Models) when iOS 26",
    reelclip: "yes",
    capcut: "no",
    inshot: "no",
    vn: "no",
    opus: "no",
    quik: "no",
  },
  {
    feature: "Open project format you can AirDrop / save to Files",
    reelclip: "yes",
    capcut: "no",
    inshot: "no",
    vn: "no",
    opus: "no",
    quik: "no",
  },
  {
    feature: "Multi-scene per project with per-scene source video",
    reelclip: "yes",
    capcut: "partial",
    inshot: "no",
    vn: "partial",
    opus: "no",
    quik: "no",
  },
  {
    feature: "Subtitle / transcript export (SRT + VTT)",
    reelclip: "yes",
    capcut: "yes",
    inshot: "no",
    vn: "no",
    opus: "yes",
    quik: "no",
  },
  {
    feature: "Review-before-export safety (nothing lands in Photos without save)",
    reelclip: "yes",
    capcut: "partial",
    inshot: "no",
    vn: "no",
    opus: "no",
    quik: "no",
  },
  {
    feature: "Lifetime purchase option (one-time, no subscription)",
    reelclip: "no",
    capcut: "no",
    inshot: "no",
    vn: "yes",
    opus: "no",
    quik: "yes",
  },
  {
    feature: "Built-in template marketplace / trend replication",
    reelclip: "no",
    capcut: "yes",
    inshot: "partial",
    vn: "no",
    opus: "no",
    quik: "no",
  },
  {
    feature: "Optimised for creators on iPhone / iPad (iOS 17+)",
    reelclip: "yes",
    capcut: "partial",
    inshot: "partial",
    vn: "partial",
    opus: "no",
    quik: "partial",
  },
];

function Cell({ state }: { state: Check }) {
  if (state === "yes") {
    return (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent/15 text-accent">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-3.5 h-3.5">
          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    );
  }
  if (state === "no") {
    return (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-surface-2 text-text-faint">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3 h-3">
          <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
        </svg>
      </span>
    );
  }
  return (
    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-500/15 text-amber-300">
      <span className="block w-2 h-0.5 rounded-full bg-current" />
    </span>
  );
}

function LogoTile({ competitor }: { competitor: Competitor }) {
  return (
    <div
      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${competitor.tile} flex items-center justify-center text-white font-black text-base shrink-0 shadow-lg`}
      aria-hidden
    >
      {competitor.glyph}
    </div>
  );
}

export default function CompetitorsPage() {
  return (
    <>
      <Nav />
      <main>
        {/* Hero */}
        <section className="relative pt-16 sm:pt-24 pb-12 sm:pb-16 px-6 sm:px-10 overflow-hidden border-b border-hairline">
          <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
          <div className="relative max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-hairline bg-surface/60 backdrop-blur mb-8">
              <span className="text-xs font-medium text-text-muted">Honest comparison · Updated quarterly</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.0] mb-6">
              How ReelClip compares
              <br />
              to <span className="gradient-text">the rest.</span>
            </h1>
            <p className="text-lg text-text-muted max-w-2xl mx-auto leading-relaxed">
              A side-by-side look at where ReelClip fits in the clip-prep landscape. We list what we&apos;re good at,
              what we&apos;re not, and what the alternatives do better.
            </p>
          </div>
        </section>

        {/* At-a-glance — ReelClip's defensible niche */}
        <section className="px-6 sm:px-10 py-16 sm:py-20 border-b border-hairline">
          <div className="max-w-5xl mx-auto">
            <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
              <NicheCard
                title="On-device by default"
                body="ReelClip's analysis never uploads your source video. Speech, scene energy, and frame scoring all run locally."
              />
              <NicheCard
                title="Bring your own AI"
                body="6 providers (Apple Intelligence, Claude, OpenAI, Gemini, MiniMax, Ollama) with your own API key. We never see your video."
              />
              <NicheCard
                title="Open .reelclip format"
                body="Projects are tiny JSON files you can AirDrop, save to Files, or share in iCloud — and they survive reinstalls."
              />
            </div>
          </div>
        </section>

        {/* Competitor cards */}
        <section className="px-6 sm:px-10 py-16 sm:py-20 border-b border-hairline">
          <div className="max-w-5xl mx-auto">
            <div className="mb-12">
              <div className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-accent mb-3">
                Five apps, one niche
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                Who we share shelf space with.
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              {COMPETITORS.map((c) => (
                <article
                  key={c.name}
                  className="p-6 sm:p-7 rounded-2xl bg-surface border border-hairline"
                >
                  <div className="flex items-start gap-4 mb-5">
                    <LogoTile competitor={c} />
                    <div className="min-w-0">
                      <h3 className="text-xl font-bold leading-tight">{c.name}</h3>
                      <p className="text-xs text-text-muted mt-1">{c.pricing}</p>
                    </div>
                  </div>

                  <p className="text-sm text-text-muted leading-relaxed mb-4">{c.oneLiner}</p>

                  <div className="text-xs font-bold uppercase tracking-wider text-text-faint mb-1.5">
                    Best for
                  </div>
                  <p className="text-sm text-text leading-snug mb-4">{c.bestFor}</p>

                  <div className="grid sm:grid-cols-2 gap-4 pt-5 border-t border-hairline">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-accent mb-2">
                        Strengths
                      </div>
                      <ul className="space-y-1.5 text-xs text-text-muted leading-relaxed">
                        {c.strengths.map((s) => (
                          <li key={s} className="flex gap-2">
                            <span className="text-accent shrink-0">+</span>
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-text-faint mb-2">
                        Trade-offs
                      </div>
                      <ul className="space-y-1.5 text-xs text-text-muted leading-relaxed">
                        {c.weaknesses.map((w) => (
                          <li key={w} className="flex gap-2">
                            <span className="text-text-faint shrink-0">−</span>
                            <span>{w}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison matrix */}
        <section className="px-6 sm:px-10 py-16 sm:py-20 border-b border-hairline">
          <div className="max-w-6xl mx-auto">
            <div className="mb-10">
              <div className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-accent mb-3">
                Feature matrix
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                Twelve features, head-to-head.
              </h2>
              <p className="text-sm text-text-muted mt-3 max-w-2xl leading-relaxed">
                <span className="inline-block w-2 h-2 rounded-full bg-accent mr-1.5 align-middle" />
                Shipped
                <span className="inline-block w-2 h-2 rounded-full bg-amber-500 ml-4 mr-1.5 align-middle" />
                Partial
                <span className="inline-block w-2 h-2 rounded-full bg-surface-2 ml-4 mr-1.5 align-middle" />
                Not shipped
              </p>
            </div>

            <div className="rounded-2xl border border-hairline bg-surface overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-hairline bg-surface-2/50">
                      <th className="text-left font-bold text-text-muted px-4 sm:px-5 py-4 min-w-[260px]">
                        Feature
                      </th>
                      {[
                        { label: "ReelClip", accent: true },
                        { label: "CapCut" },
                        { label: "InShot" },
                        { label: "VN" },
                        { label: "Opus" },
                        { label: "Quik" },
                      ].map((c) => (
                        <th
                          key={c.label}
                          className={`text-center font-bold px-3 sm:px-4 py-4 whitespace-nowrap ${
                            c.accent ? "text-accent" : "text-text-muted"
                          }`}
                        >
                          {c.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON.map((row, i) => (
                      <tr
                        key={row.feature}
                        className={`border-b border-hairline last:border-b-0 ${
                          i % 2 === 0 ? "" : "bg-surface-2/20"
                        }`}
                      >
                        <td className="text-left text-text px-4 sm:px-5 py-3.5 leading-snug">
                          {row.feature}
                        </td>
                        <td className="text-center px-2 sm:px-4 py-3.5 bg-accent/5">
                          <Cell state={row.reelclip} />
                        </td>
                        <td className="text-center px-2 sm:px-4 py-3.5">
                          <Cell state={row.capcut} />
                        </td>
                        <td className="text-center px-2 sm:px-4 py-3.5">
                          <Cell state={row.inshot} />
                        </td>
                        <td className="text-center px-2 sm:px-4 py-3.5">
                          <Cell state={row.vn} />
                        </td>
                        <td className="text-center px-2 sm:px-4 py-3.5">
                          <Cell state={row.opus} />
                        </td>
                        <td className="text-center px-2 sm:px-4 py-3.5">
                          <Cell state={row.quik} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* When ReelClip is not the right tool */}
        <section className="px-6 sm:px-10 py-16 sm:py-20 border-b border-hairline">
          <div className="max-w-4xl mx-auto">
            <div className="mb-10">
              <div className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-accent mb-3">
                When to use something else
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                ReelClip is not the right tool if…
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <SkipCard
                title="You want one-tap trend replication"
                body="If your workflow is 'pick today's trending CapCut template and ship', use CapCut — that is its entire purpose."
              />
              <SkipCard
                title="You want a desktop non-linear editor"
                body="If you need Premiere / Final Cut / DaVinci, ReelClip is the wrong tool. We complement those, we don't replace them."
              />
              <SkipCard
                title="You want a free clipper with zero watermark"
                body="ReelClip's free tier caps at 720p with a Made with ReelClip pill. VN Editor and Quik are better fits."
              />
              <SkipCard
                title="You record under 30 seconds per clip"
                body="ReelClip is built for the long-form → short-form workflow. If your footage is already short, any editor will do."
              />
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="px-6 sm:px-10 py-20 sm:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
              On the fence?
            </h2>
            <p className="text-base text-text-muted max-w-xl mx-auto mb-8 leading-relaxed">
              ReelClip is in active TestFlight. Join the beta, ship a few clips, and decide for yourself.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/#waitlist"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-accent text-bg font-bold text-base hover:bg-accent-deep transition accent-glow"
              >
                Join the TestFlight beta
              </Link>
              <Link
                href="/pricing"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full border border-hairline text-text font-semibold text-base hover:bg-surface transition"
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
    <div className="p-6 rounded-2xl bg-surface border border-hairline">
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-sm text-text-muted leading-relaxed">{body}</p>
    </div>
  );
}

function SkipCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="p-6 rounded-2xl bg-surface border border-hairline">
      <h3 className="text-base font-bold mb-2 leading-snug">{title}</h3>
      <p className="text-sm text-text-muted leading-relaxed">{body}</p>
    </div>
  );
}
