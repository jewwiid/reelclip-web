import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import {
  BreadcrumbJsonLd,
  FaqPageJsonLd,
  type FaqItem,
} from "@/components/structured-data";

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

// Plain-text answers (no HTML, no internal links inside the answer body)
// — Google indexes FAQPage text verbatim. Keep them self-contained.
const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Is my video uploaded to a server?",
    answer:
      "No. ReelClip runs every analysis (cuts, AI plans, transcripts) entirely on-device. Your source video is copied into the app's private sandbox, processed locally, and the original file in Photos is never touched. See the Privacy Policy for the full data flow.",
  },
  {
    question:
      "My import says 'file doesn't exist' even though the video is there.",
    answer:
      "The video is probably still in iCloud Drive, with only a placeholder on your iPhone. Open it once in the Files app to pull down the full copy, then import again. ReelClip needs the real file on the device before it can read it.",
  },
  {
    question: "How do I get ReelClip?",
    answer:
      "ReelClip is available on the App Store. Search for ReelClip or visit the App Store link on this page. It requires iPhone running iOS 26 or later.",
  },
  {
    question: "Can I get a refund on my subscription?",
    answer:
      "Yes. Refunds are handled by Apple. Go to reportaproblem.apple.com, sign in with the Apple ID you used to subscribe, and request a refund for the ReelClip charge. We can't process refunds directly.",
  },
  {
    question: "Why does the website use reelclips.app?",
    answer:
      "ReelClip is the product name. We keep the existing reelclips.app domain so existing links and emails continue to work. The iOS bundle id and .reelclip project extension also remain unchanged for compatibility.",
  },
];

export default function SupportPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://reelclips.app" },
          { name: "Support", url: "https://reelclips.app/support" },
        ]}
      />
      <FaqPageJsonLd items={FAQ_ITEMS} />
      <Nav />
      <main className="px-6 sm:px-10 py-12 sm:py-20 max-w-3xl mx-auto">
        <header className="mb-12">
          <p className="text-xs uppercase tracking-wider text-accent font-bold mb-3">
            Support
          </p>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
            Email us.
          </h1>
          <p className="text-base text-text-muted mt-4 leading-relaxed">
            Email is the fastest way to reach a person, and we answer within one
            business day. If you're reporting a bug, include your iOS version and
            which iPhone you're on.
          </p>
        </header>

        <section className="mb-12 p-6 sm:p-8 rounded-2xl bg-surface border border-hairline">
          <h2 className="text-xl font-bold mb-2">Email</h2>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-accent text-lg font-semibold hover:underline break-all"
          >
            {CONTACT_EMAIL}
          </a>
          <p className="text-sm text-text-muted mt-3">
            Best for: bug reports, feature requests, account / subscription
            questions, App Store submission issues.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">Common questions</h2>

          <div className="space-y-6">
            <QA
              q="Is my video uploaded to a server?"
              a="No. ReelClip runs every analysis (cuts, AI plans, transcripts) entirely on-device. Your source video is copied into the app's private sandbox, processed locally, and the original file in Photos is never touched. See the Privacy Policy for the full data flow."
            />
            <QA
              q="My import says 'file doesn't exist' even though the video is there."
              a="The video is probably still in iCloud Drive, with only a placeholder on your iPhone. Open it once in the Files app to pull down the full copy, then import again. ReelClip needs the real file on the device before it can read it."
            />
            <QA
              q="How do I get ReelClip?"
              a="ReelClip is available on the App Store. Search for ReelClip or visit the App Store link on this page. It requires iPhone running iOS 26 or later."
            />
            <QA
              q="Can I get a refund on my subscription?"
              a="Yes. Refunds are handled by Apple. Go to reportaproblem.apple.com, sign in with the Apple ID you used to subscribe, and request a refund for the ReelClip charge. We can't process refunds directly."
            />
            <QA
              q="Why does the website use reelclips.app?"
              a="ReelClip is the product name. We keep the existing reelclips.app domain so existing links and emails continue to work. The iOS bundle id and .reelclip project extension also remain unchanged for compatibility."
            />
          </div>
        </section>

        <section className="text-sm text-text-muted">
          <p>
            If you hit a rough edge, or there's a feature you'd pay for, tell us at{" "}
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
