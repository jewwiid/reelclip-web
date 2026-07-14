import type { Metadata } from "next";
import Image from "next/image";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Brand assets — ReelClip",
  description: "Official ReelClip logos, app icon, and brand colours for press, partners, and collaborators.",
};

const colours = [
  { name: "ReelClip Lime", hex: "#C4EF33", className: "bg-accent" },
  { name: "Off-black", hex: "#0E0F11", className: "bg-bg" },
  { name: "Soft white", hex: "#F0F1ED", className: "bg-text" },
  { name: "Muted grey", hex: "#A6ABAB", className: "bg-text-muted" },
];

const rules = [
  ["Name", "Always write ReelClip as one word, with a capital R and C."],
  ["Clear space", "Give the logo room to breathe. Keep nearby copy, edges, and graphics at least one mark-width away."],
  ["Background", "Use the lime logo on off-black or dark footage. Use the app icon when space is tight."],
  ["Keep it intact", "Do not recolour, outline, stretch, crop, or add effects to the logos."],
];

export default function BrandPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="relative overflow-hidden border-b border-hairline px-6 pb-16 pt-16 sm:px-10 sm:pb-24 sm:pt-24">
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
          <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_0.86fr] lg:items-end">
            <div>
              <div className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-accent">Brand assets</div>
              <h1 className="max-w-xl text-4xl font-black leading-[0.98] tracking-tight sm:text-6xl">
                Everything you need to represent ReelClip.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-text-muted sm:text-lg">
                Official logos, the app icon, and the core colours for press, partners, and anyone sharing ReelClip.
              </p>
            </div>
            <div className="rounded-[2rem] border border-hairline bg-surface p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:p-10">
              <div className="relative h-24 w-full sm:h-32">
                <Image src="/wordmark.png" alt="ReelClip wordmark" fill sizes="(max-width: 1024px) 100vw, 32rem" className="object-contain object-left" priority />
              </div>
              <p className="mt-7 max-w-sm text-sm leading-relaxed text-text-muted">
                ReelClip helps creators turn a longer recording into smaller clips, ready for the editor they already use.
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-hairline px-6 py-16 sm:px-10 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-accent">Logos</div>
                <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Use the original files.</h2>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-text-muted">Transparent PNGs, ready for dark backgrounds, presentations, and social posts.</p>
            </div>

            <div className="grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
              <AssetPanel
                title="Primary wordmark"
                detail="Best for websites, press coverage, and wide-format placements."
                href="/wordmark.png"
                download="reelclip-wordmark.png"
              >
                <div className="relative h-32 w-full sm:h-40">
                  <Image src="/wordmark.png" alt="ReelClip primary wordmark" fill sizes="(max-width: 1024px) 100vw, 42rem" className="object-contain object-left" />
                </div>
              </AssetPanel>
              <AssetPanel
                title="Logo mark"
                detail="Use where the full wordmark would be too small."
                href="/logomark.png"
                download="reelclip-logo-mark.png"
              >
                <div className="relative mx-auto h-40 w-32 sm:h-48 sm:w-40">
                  <Image src="/logomark.png" alt="ReelClip logo mark" fill sizes="10rem" className="object-contain" />
                </div>
              </AssetPanel>
            </div>

            <div className="mt-5 grid gap-5 md:grid-cols-[0.7fr_1.3fr]">
              <AssetPanel
                title="App icon"
                detail="Use for app references, device mock-ups, and product listings."
                href="/app-icon-button.png"
                download="reelclip-app-icon.png"
              >
                <div className="relative mx-auto h-36 w-36 sm:h-40 sm:w-40">
                  <Image src="/app-icon-button.png" alt="ReelClip app icon" fill sizes="10rem" className="object-contain" />
                </div>
              </AssetPanel>
              <div className="flex flex-col justify-between rounded-[2rem] border border-hairline bg-surface p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:p-8">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Short description</div>
                  <p className="mt-4 max-w-xl text-xl font-bold leading-snug sm:text-2xl">
                    ReelClip prepares a long video for the content you make next.
                  </p>
                </div>
                <p className="mt-6 max-w-2xl text-sm leading-relaxed text-text-muted">
                  Import footage, cut it into smaller clips, then export to Photos and finish in CapCut, YouTube Shorts, or another editor.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-hairline px-6 py-16 sm:px-10 sm:py-20">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <div className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-accent">Colour</div>
              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">A tight, high-contrast palette.</h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-text-muted">
                Lime carries the action. Deep neutrals keep footage and the interface in focus.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {colours.map((colour) => (
                <div key={colour.hex} className="flex items-center gap-4 border-b border-hairline py-4 first:pt-0 sm:odd:pr-5 sm:even:pl-5">
                  <span className={`h-12 w-12 shrink-0 rounded-full border border-white/10 ${colour.className}`} />
                  <div>
                    <div className="font-bold">{colour.name}</div>
                    <div className="mt-1 font-mono text-xs text-text-muted">{colour.hex}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-16 sm:px-10 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 max-w-2xl">
              <div className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-accent">A few rules</div>
              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Keep ReelClip recognisable.</h2>
            </div>
            <dl className="divide-y divide-hairline border-y border-hairline">
              {rules.map(([term, description]) => (
                <div key={term} className="grid gap-2 py-5 sm:grid-cols-[11rem_1fr] sm:gap-6">
                  <dt className="font-bold text-accent">{term}</dt>
                  <dd className="max-w-2xl text-sm leading-relaxed text-text-muted">{description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function AssetPanel({
  title,
  detail,
  href,
  download,
  children,
}: {
  title: string;
  detail: string;
  href: string;
  download: string;
  children: React.ReactNode;
}) {
  return (
    <article className="flex min-h-80 flex-col rounded-[2rem] border border-hairline bg-surface p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:p-8">
      <div className="flex min-h-44 flex-1 items-center rounded-2xl border border-white/[0.06] bg-bg p-6 sm:min-h-52 sm:p-8">{children}</div>
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="mt-1 max-w-md text-sm leading-relaxed text-text-muted">{detail}</p>
        </div>
        <a
          href={href}
          download={download}
          className="inline-flex w-fit shrink-0 items-center rounded-full bg-accent px-4 py-2 text-sm font-bold text-bg transition hover:bg-accent-deep active:translate-y-px"
        >
          Download PNG
        </a>
      </div>
    </article>
  );
}
