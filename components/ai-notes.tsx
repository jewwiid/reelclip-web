export function AINotes() {
  return (
    <section id="ai-notes" className="relative py-20 sm:py-28 px-6 sm:px-10 border-t border-hairline">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <div className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-accent mb-3">
            How AI works in ReelClip
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            On-device intelligence, running on your iPhone.
          </h2>
          <p className="text-lg text-text-muted leading-relaxed max-w-2xl mx-auto">
            ReelClip uses Apple Intelligence to help you find moments worth keeping.
            It runs entirely on your iPhone. Your video never leaves your device.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
          <div className="rounded-2xl bg-surface border border-hairline p-6 sm:p-7">
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-4">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                <path d="M12 11.5v-1.5M12 8v.01M5 19l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="12" r="9" />
              </svg>
            </div>
            <h3 className="text-lg font-bold mb-2">What it can do</h3>
            <ul className="space-y-2 text-sm text-text-muted leading-relaxed">
              <li className="flex gap-2.5">
                <span className="text-accent shrink-0">•</span>
                Read your transcript to understand what was said and find moments like hooks, quotes, or key topics
              </li>
              <li className="flex gap-2.5">
                <span className="text-accent shrink-0">•</span>
                Use audio levels and visual cues from sampled frames as supporting signals
              </li>
              <li className="flex gap-2.5">
                <span className="text-accent shrink-0">•</span>
                Suggest clip ranges you can review, adjust, and approve before anything is saved
              </li>
            </ul>
          </div>

          <div className="rounded-2xl bg-surface border border-hairline p-6 sm:p-7">
            <div className="w-10 h-10 rounded-xl bg-text-faint/10 border border-hairline flex items-center justify-center text-text-muted mb-4">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                <circle cx="12" cy="12" r="9" />
                <path d="M5 5l14 14" strokeLinecap="round" />
              </svg>
            </div>
            <h3 className="text-lg font-bold mb-2">What it can&apos;t do yet</h3>
            <ul className="space-y-2 text-sm text-text-muted leading-relaxed">
              <li className="flex gap-2.5">
                <span className="text-text-faint shrink-0">•</span>
                Watch a video the way a human editor would. It works from a text summary, not the full video
              </li>
              <li className="flex gap-2.5">
                <span className="text-text-faint shrink-0">•</span>
                Understand audio emotionally (tone, sarcasm, music). It reads transcript text and audio levels
              </li>
              <li className="flex gap-2.5">
                <span className="text-text-faint shrink-0">•</span>
                Process arbitrarily long videos in a single pass. The on-device model has a fixed context budget
              </li>
            </ul>
          </div>
        </div>

        <div className="rounded-2xl bg-accent/5 border border-accent/20 p-6 sm:p-7 text-center">
          <h3 className="text-lg font-bold mb-2">ReelClip will grow with Apple Intelligence</h3>
          <p className="text-sm text-text-muted leading-relaxed max-w-2xl mx-auto">
            Apple Intelligence is actively evolving. As Apple expands the on-device model&apos;s
            context window, video understanding, and multimodal capabilities, ReelClip will adopt them.
            Today&apos;s limitations are not permanent. They reflect the current ceiling of what an
            on-device, privacy-preserving model can do. The architecture will adopt each
            improvement as Apple ships it.
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-text-faint leading-relaxed max-w-2xl mx-auto">
          Apple Intelligence requires iOS 26 and a supported device. It can be turned off at any time
          in Settings. When unavailable, ReelClip falls back to on-device audio and visual analysis
          without any AI features.
        </p>
      </div>
    </section>
  );
}