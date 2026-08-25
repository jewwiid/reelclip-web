import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import {
  BreadcrumbJsonLd,
  FaqPageJsonLd,
} from "@/components/structured-data";
import { getDictionary } from "@/i18n/server";

export const metadata: Metadata = {
  title: "Support · ReelClip",
  description:
    "Get help with ReelClip. Bug reports, feature requests, and account questions. We respond within one business day.",
  alternates: { canonical: "https://reelclips.app/support" },
  openGraph: {
    title: "Support · ReelClip",
    description:
      "Get help with ReelClip. Bug reports, feature requests, and account questions. We respond within one business day.",
    url: "https://reelclips.app/support",
    type: "website",
  },
};

const CONTACT_EMAIL = "jude@reelclips.app";

export default async function SupportPage() {
  const { support } = await getDictionary();
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://reelclips.app" },
          { name: "Support", url: "https://reelclips.app/support" },
        ]}
      />
      <FaqPageJsonLd items={support.faqs} />
      <Nav />
      <main className="px-6 sm:px-10 py-12 sm:py-20 max-w-3xl mx-auto">
        <header className="mb-12">
          <p className="text-xs uppercase tracking-wider text-accent font-bold mb-3">
            {support.eyebrow}
          </p>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
            {support.heading}
          </h1>
          <p className="text-base text-text-muted mt-4 leading-relaxed">
            {support.intro}
          </p>
        </header>

        <section className="mb-12 p-6 sm:p-8 rounded-2xl bg-surface border border-hairline">
          <h2 className="text-xl font-bold mb-2">{support.email}</h2>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-accent text-lg font-semibold hover:underline break-all"
          >
            {CONTACT_EMAIL}
          </a>
          <p className="text-sm text-text-muted mt-3">
            {support.bestFor}
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">{support.commonQuestions}</h2>

          <div className="space-y-6">
            {support.faqs.map((faq) => <QA key={faq.question} q={faq.question} a={faq.answer} />)}
          </div>
        </section>

        <section className="text-sm text-text-muted">
          <p>
            {support.feedbackPrefix}{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=ReelClip%20feedback`}
              className="text-accent hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}

function QA({ q, a }: { q: string; a: string }) {
  return (
    <div className="border-l-2 border-accent pl-4">
      <h3 className="text-base font-bold mb-1.5">{q}</h3>
      <p className="text-sm text-text-muted leading-relaxed">{a}</p>
    </div>
  );
}
