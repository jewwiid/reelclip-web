import Link from "next/link";
import Image from "next/image";
import { localizedPath } from "@/i18n/routing";
import { getDictionary, getRequestLocale } from "@/i18n/server";

export async function Hero() {
  const locale = await getRequestLocale();
  const { hero } = await getDictionary(locale);

  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-16 sm:px-10 sm:pb-32 sm:pt-24">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-50" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-4">
        <div className="text-center lg:text-left">
          <Image src="/wordmark.png" alt="ReelClip" width={300} height={86} preload className="mx-auto mb-8 h-16 w-auto sm:h-20 lg:mx-0" />
          <h1 className="mb-6 text-5xl font-black leading-[0.95] tracking-tight sm:text-7xl">{hero.heading}</h1>
          <p className="mx-auto mb-3 max-w-2xl text-lg leading-relaxed text-text-muted sm:text-xl lg:mx-0">{hero.body}</p>
          <div className="mb-12 flex flex-col items-center gap-3 sm:flex-row lg:items-start">
            <a href="https://apps.apple.com/app/reelclip/id6787742864" target="_blank" rel="noreferrer" data-event-name="download_click_hero" className="w-full rounded-full bg-accent px-7 py-3.5 text-base font-bold text-bg transition-[background-color,transform] hover:bg-accent-deep active:scale-[0.98] sm:w-auto ease-out">{hero.download}</a>
            <Link href={localizedPath(locale, "/#modes")} className="w-full rounded-full border border-hairline px-7 py-3.5 text-base font-semibold text-text transition-[background-color,transform] hover:bg-surface active:scale-[0.98] sm:w-auto ease-out">{hero.seeModes}</Link>
          </div>
          <div className="mx-auto grid max-w-2xl grid-cols-3 gap-4 border-t border-hairline pt-8 lg:mx-0">
            {hero.stats.map((stat) => <Stat key={stat.label} {...stat} />)}
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-[29rem] lg:max-w-none">
          <div className="absolute inset-[12%] rounded-full bg-accent/10 blur-3xl" />
          <Image src="/mockups/reelclip-editor-angled.png" alt={hero.editorAlt} width={1166} height={1444} preload sizes="(max-width: 1023px) 82vw, 45vw" className="relative h-auto w-full drop-shadow-[0_28px_40px_rgba(0,0,0,0.38)]" />
        </div>
      </div>
    </section>
  );
}

function Stat({ label, detail }: { label: string; detail: string }) {
  return <div><div className="mb-1 text-base font-black text-accent sm:text-lg">{label}</div><div className="text-xs leading-tight text-text-muted sm:text-sm">{detail}</div></div>;
}
