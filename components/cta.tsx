import Image from "next/image";

const APP_STORE_URL = "https://apps.apple.com/app/reelclip/id6787742864";

export function CTA() {
  return (
    <section id="waitlist" className="relative py-24 sm:py-36 px-6 sm:px-10 border-t border-hairline overflow-hidden">
      <div className="absolute inset-0 bg-radial-spotlight opacity-50" />

      <div className="relative max-w-3xl mx-auto text-center">
        <Image
          src="/app-icon-button.png"
          alt="ReelClip"
          width={120}
          height={120}
          className="w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-8 rounded-[26%] shadow-2xl shadow-accent/10"
        />
        <div className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-accent mb-4">
          Now on the App Store
        </div>
        <h2 className="text-4xl sm:text-6xl font-black tracking-tight mb-5">
          Download ReelClip.
        </h2>
        <p className="text-lg text-text-muted max-w-xl mx-auto mb-10 leading-relaxed">
          ReelClip is available on the App Store for iPhone running iOS 26 or later.
        </p>

        <div className="flex flex-col items-center gap-3">
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noreferrer"
            data-event-name="download_click_cta"
            className="inline-flex items-center justify-center rounded-full bg-accent px-7 py-3.5 font-bold text-bg transition hover:bg-accent-deep active:scale-[0.98]"
          >
            Download on the App Store
          </a>
        </div>
      </div>
    </section>
  );
}
