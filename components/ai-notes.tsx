import { getDictionary } from "@/i18n/server";

export async function AINotes() {
  const { aiNotes } = await getDictionary();
  return (
    <section id="ai-notes" className="relative border-t border-hairline px-6 py-20 sm:px-10 sm:py-28">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 text-center"><div className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.18em] text-accent">{aiNotes.eyebrow}</div><h2 className="mb-4 text-3xl font-black tracking-tight sm:text-4xl">{aiNotes.heading}</h2><p className="mx-auto max-w-2xl text-lg leading-relaxed text-text-muted">{aiNotes.body}</p></div>
        <div className="mb-8 grid gap-4 sm:grid-cols-2 sm:gap-6">
          <FeatureCard title={aiNotes.canDo} tone="positive" items={aiNotes.canDoItems} />
          <FeatureCard title={aiNotes.cantDo} tone="neutral" items={aiNotes.cantDoItems} />
        </div>
        <div className="rounded-2xl border border-accent/20 bg-accent/5 p-6 text-center sm:p-7"><h3 className="mb-2 text-lg font-bold">{aiNotes.limitsHeading}</h3><p className="mx-auto max-w-2xl text-sm leading-relaxed text-text-muted">{aiNotes.limitsBody}</p></div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-xs leading-relaxed text-text-faint">{aiNotes.footnote}</p>
      </div>
    </section>
  );
}

function FeatureCard({ title, tone, items }: { title: string; tone: "positive" | "neutral"; items: string[] }) {
  const positive = tone === "positive";
  return <div className="rounded-2xl border border-hairline bg-surface p-6 sm:p-7"><div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl border ${positive ? "border-accent/20 bg-accent/10 text-accent" : "border-hairline bg-text-faint/10 text-text-muted"}`}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">{positive ? <><path d="M12 11.5v-1.5M12 8v.01M5 19l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" /><circle cx="12" cy="12" r="9" /></> : <><circle cx="12" cy="12" r="9" /><path d="M5 5l14 14" strokeLinecap="round" /></>}</svg></div><h3 className="mb-2 text-lg font-bold">{title}</h3><ul className="space-y-2 text-sm leading-relaxed text-text-muted">{items.map((item) => <li key={item} className="flex gap-2.5"><span className={positive ? "shrink-0 text-accent" : "shrink-0 text-text-faint"}>•</span>{item}</li>)}</ul></div>;
}
