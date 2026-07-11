import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Support — ReelClips",
  description:
    "Get help with ReelClips. Bug reports, feature requests, and account questions. We respond within one business day.",
};

const CONTACT_EMAIL = "support@reelclips.app";

export default function SupportPage() {
  return (
    <>
      <Nav />
      <main className="px-6 sm:px-10 py-12 sm:py-20 max-w-3xl mx-auto">
        <header className="mb-12">
          <p className="text-xs uppercase tracking-wider text-accent font-bold mb-3">
            Support
          </p>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
            We're here to help.
          </h1>
          <p className="text-base text-text-muted mt-4 leading-relaxed">
            ReelClips is currently in active TestFlight. The fastest way to reach
            a human is email — we respond within one business day. If you're a
            beta tester, please include your build number (Settings → General →
            About) and the device + iOS version you're on.
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
              a="No. ReelClips runs every analysis (cuts, AI plans, transcripts) entirely on-device. Your source video is copied into the app's private sandbox, processed locally, and the original file in Photos is never touched. See the Privacy Policy for the full data flow."
            />
            <QA
              q="My import says 'file doesn't exist' even though the video is there."
              a="The file is likely in iCloud Drive and only a placeholder is on device. Open the file in the Files app once to trigger the iCloud download, then re-import. iOS 17+ sometimes needs the local copy before ReelClips can read the bytes."
            />
            <QA
              q="How do I leave the TestFlight beta?"
              a="Open TestFlight → tap ReelClips → scroll to the bottom → 'Stop Testing'. You'll stop getting builds and the next App Store release won't include your account."
            />
            <QA
              q="Can I get a refund on my subscription?"
              a="Yes. Refunds are handled by Apple — go to reportaproblem.apple.com, sign in with the Apple ID you used to subscribe, and request a refund for the ReelClips charge. We can't process refunds directly."
            />
            <QA
              q="Why is the iOS app called 'ReelClip' but the website says 'ReelClips'?"
              a="The App Store listing still uses the singular ReelClip because it was created before the rebrand. The website, wordmark, and marketing surface all use the plural ReelClips. They refer to the same product — the singular is the company name, the plural is the product brand surface."
            />
          </div>
        </section>

        <section className="text-sm text-text-muted">
          <p>
            Beta feedback is gold. If you find a rough edge, a confusing
            affordance, or a feature you'd pay for — let us know at{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=ReelClips%20feedback`}
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
