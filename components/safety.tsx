export function Safety() {
  return (
    <section id="safety" className="relative py-20 sm:py-32 px-6 sm:px-10 border-t border-hairline">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <div className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-accent mb-3">
              Built for safety
            </div>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-6">
              Review every cut<br />
              <span className="text-text-muted">before anything ships.</span>
            </h2>
            <p className="text-lg text-text-muted leading-relaxed mb-8">
              ReelClip never writes generated clips to your Photos until you tap save.
              Every plan shows thumbnails, waveform, and frame-snapped trim handles so you can adjust before export.
            </p>

            <div className="space-y-4">
              <Pill text="No clips land in Photos without explicit save" />
              <Pill text="On-device analysis by default — your video stays on your phone" />
              <Pill text="30-minute source / 180-clip plan caps protect your phone and your time" />
              <Pill text="Bounded iOS background task — never an unsafe infinite render" />
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-accent/5 blur-3xl rounded-full" />
            <div className="relative aspect-[9/16] max-w-sm mx-auto rounded-[2.5rem] bg-surface border border-hairline p-3 shadow-2xl">
              <div className="w-full h-full rounded-[1.75rem] bg-bg overflow-hidden relative">
                <div className="absolute inset-x-0 top-0 h-7 bg-bg flex items-center justify-center">
                  <div className="w-20 h-4 rounded-full bg-surface-2 mt-1" />
                </div>

                <div className="pt-10 px-5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-accent mb-1.5">
                    Creator workspace
                  </div>
                  <div className="text-2xl font-black mb-1">Projects</div>
                  <div className="text-xs text-text-muted leading-tight mb-5">
                    Continue a saved plan or start fresh.
                  </div>

                  <div className="flex gap-2 mb-4">
                    <div className="flex-1 h-9 rounded-lg bg-surface border border-hairline flex items-center justify-center text-xs font-semibold">
                      Files
                    </div>
                    <div className="flex-1 h-9 rounded-lg bg-accent text-bg flex items-center justify-center text-xs font-bold">
                      Photos
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-surface border border-hairline">
                    <div className="flex items-center justify-center w-10 h-10 mx-auto mb-2 rounded-full bg-accent/10 text-accent">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M12 2l1.5 5.5L19 9l-5.5 1.5L12 16l-1.5-5.5L5 9l5.5-1.5L12 2z" />
                      </svg>
                    </div>
                    <div className="text-center text-sm font-bold">No saved projects yet</div>
                    <div className="text-center text-[10px] text-text-muted leading-tight mt-1">
                      One project per source video.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pill({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 w-5 h-5 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center shrink-0">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-3 h-3 text-accent">
          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <span className="text-text leading-relaxed">{text}</span>
    </div>
  );
}