import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Terms of Service — ReelClip",
  description:
    "The terms that govern your use of ReelClip, including subscription terms, auto-renewal disclosure, and acceptable use.",
};

const UPDATED = "July 8, 2026";
const EFFECTIVE = "July 8, 2026";

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main className="px-6 sm:px-10 py-12 sm:py-20 max-w-3xl mx-auto">
        <header className="mb-12">
          <p className="text-xs uppercase tracking-wider text-accent font-bold mb-3">
            Terms of Service
          </p>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
            The rules of the road.
          </h1>
          <p className="text-base text-text-muted mt-4 leading-relaxed">
            These terms govern your use of ReelClip (the "Service"). By installing
            the app, joining the waitlist, or purchasing a subscription, you agree
            to them. Effective {EFFECTIVE}. Last updated {UPDATED}.
          </p>
        </header>

        <article className="prose-sm space-y-10 text-text leading-relaxed">
          <Section title="1. Who we are">
            <p className="text-text-muted">
              ReelClip is operated by an individual developer ("we", "us"). Contact:
              {" "}
              <a href="mailto:legal@reelclip.app" className="text-accent hover:underline">
                legal@reelclip.app
              </a>.
            </p>
          </Section>

          <Section title="2. The Service">
            <p className="text-text-muted">
              ReelClip is a video clip preparation tool for iOS. It analyses videos
              on your device, plans cut points using one of four modes (Fixed,
              Smart Pause, Highlight, AI Assist), and exports the resulting clips
              to your Photos library or to a <code className="px-1.5 py-0.5 rounded bg-surface text-text-muted text-xs">.reelclip</code> project file.
              Some features require a paid subscription.
            </p>
          </Section>

          <Section title="3. Subscriptions, auto-renewal, and cancellation">
            <p className="text-text-muted">
              ReelClip offers auto-renewable subscriptions through Apple&apos;s
              in-app purchase system (StoreKit 2) and, where available, through
              Stripe on the web at
              {" "}
              <Link href="/pricing" className="text-accent hover:underline">reelclip.app / pricing</Link>.
              The current in-app plans are:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-text-muted mt-3">
              <li><strong className="text-text">Creator Monthly</strong> — $9.99 / month (with a 3-day free trial on the first purchase)</li>
              <li><strong className="text-text">Creator Yearly</strong> — $59.99 / year (≈50% off vs monthly)</li>
              <li><strong className="text-text">Studio Monthly</strong> — $19.99 / month</li>
              <li><strong className="text-text">Studio Yearly</strong> — $119.99 / year (≈50% off vs monthly)</li>
            </ul>
            <p className="text-text-muted mt-4">
              <strong className="text-text">Auto-renewal.</strong> Your subscription
              automatically renews at the end of each billing period unless you
              cancel at least 24 hours before the end of the current period. Your
              Apple ID or Stripe account is charged the renewal amount within 24
              hours before the end of the current period.
            </p>
            <p className="text-text-muted mt-3">
              <strong className="text-text">Cancellation.</strong> You can cancel
              anytime in iOS Settings → Apple ID → Subscriptions. Cancellation
              takes effect at the end of your current billing period. You will
              continue to have access to paid features until then.
            </p>
            <p className="text-text-muted mt-3">
              <strong className="text-text">Free trial.</strong> The 3-day free
              trial on Creator Monthly converts to a paid subscription unless you
              cancel at least 24 hours before the trial ends. We will not charge
              you during the trial period.
            </p>
            <p className="text-text-muted mt-3">
              <strong className="text-text">Pricing changes.</strong> If we change
              subscription pricing, we will notify you in advance via email and
              an in-app notice. Price changes take effect at the start of your
              next renewal period after the notice.
            </p>
          </Section>

          <Section title="4. Manage your subscription">
            <p className="text-text-muted">
              Manage your App Store subscription at any time:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-text-muted mt-3">
              <li>
                On your iPhone: Settings → tap your name → Subscriptions → ReelClip.
              </li>
              <li>
                On the web:{" "}
                <a
                  href="https://apps.apple.com/account/subscriptions"
                  target="_blank"
                  rel="noreferrer"
                  className="text-accent hover:underline"
                >
                  apps.apple.com/account/subscriptions
                </a>
                .
              </li>
              <li>
                Manage your ReelClip account, look up your tier, and request data
                deletion at{" "}
                <Link href="/account" className="text-accent hover:underline">
                  reelclip.app / account
                </Link>
                .
              </li>
            </ul>
          </Section>

          <Section title="5. Refunds">
            <p className="text-text-muted">
              Subscriptions purchased through the App Store are governed by
              Apple&apos;s refund policy. You can request a refund from Apple at
              {" "}
              <a
                href="https://reportaproblem.apple.com"
                target="_blank"
                rel="noreferrer"
                className="text-accent hover:underline"
              >
                reportaproblem.apple.com
              </a>
              . Subscriptions purchased through Stripe on our website are governed
              by our refund policy — contact{" "}
              <a href="mailto:support@reelclip.app" className="text-accent hover:underline">
                support@reelclip.app
              </a>{" "}
              within 14 days of purchase.
            </p>
          </Section>

          <Section title="6. Acceptable use">
            <p className="text-text-muted">You agree not to:</p>
            <ul className="list-disc pl-6 space-y-2 text-text-muted mt-3">
              <li>Use ReelClip to process content you do not own or have permission to use.</li>
              <li>Reverse engineer, decompile, or attempt to extract the source code of the Service.</li>
              <li>Resell, rent, or lease access to the Service.</li>
              <li>Use the Service to violate any applicable law or third-party right.</li>
              <li>Attempt to bypass the paid tier gate (e.g. by tampering with the app binary or subscription state).</li>
            </ul>
          </Section>

          <Section title="7. Your content">
            <p className="text-text-muted">
              You retain ownership of every video, project, and clip you create in
              ReelClip. We claim no rights over your content. We do not access,
              upload, or process your source video on our servers. When you use
              a cloud AI provider in AI Assist mode, you are sending a feature
              pack directly from your device to the provider you selected, under
              that provider&apos;s own terms.
            </p>
          </Section>

          <Section title="8. Third-party services">
            <p className="text-text-muted">
              The Service integrates with third-party services that have their own
              terms:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-text-muted text-sm mt-3">
              <li>Apple App Store / StoreKit 2 — governed by the Apple Media Services Terms and Conditions.</li>
              <li>Apple iCloud (for project backup) — governed by the iCloud Terms and Conditions.</li>
              <li>Stripe (for web subscriptions) — governed by the Stripe Services Agreement.</li>
              <li>Convex (for the waitlist backend) — governed by the Convex terms of service.</li>
              <li>Cloud AI providers (Claude, OpenAI, Gemini, MiniMax, Ollama) — governed by each provider&apos;s terms. See the in-app AI Provider settings for current links.</li>
            </ul>
          </Section>

          <Section title="9. Beta disclaimer">
            <p className="text-text-muted">
              ReelClip is currently distributed via Apple&apos;s TestFlight beta
              programme. TestFlight builds may be unstable, may be missing
              features described in our marketing materials, and may change
              before general release. We provide TestFlight builds "as is" and do
              not guarantee availability, data retention, or feature parity
              between beta and release builds.
            </p>
          </Section>

          <Section title="10. Disclaimers and limitation of liability">
            <p className="text-text-muted">
              The Service is provided "as is" and "as available" without
              warranties of any kind, either express or implied, including but not
              limited to warranties of merchantability, fitness for a particular
              purpose, and non-infringement. We do not warrant that the Service
              will be uninterrupted, error-free, or that the results obtained from
              using the Service will meet your requirements.
            </p>
            <p className="text-text-muted mt-3">
              To the maximum extent permitted by law, our total liability for any
              claim arising out of or relating to the Service is limited to the
              amount you paid us for the Service in the 12 months preceding the
              claim, or $100, whichever is greater. We are not liable for any
              indirect, incidental, special, consequential, or punitive damages.
            </p>
          </Section>

          <Section title="11. Indemnification">
            <p className="text-text-muted">
              You agree to indemnify and hold us harmless from any claim arising
              out of your use of the Service, your violation of these terms, or
              your violation of any third-party right.
            </p>
          </Section>

          <Section title="12. Termination">
            <p className="text-text-muted">
              We may suspend or terminate your access to the Service at any time
              if we reasonably believe you have violated these terms. You may
              stop using the Service at any time. Upon termination, your right to
              use paid features ends, but sections 7, 10, 11, and 13 survive.
            </p>
          </Section>

          <Section title="13. Governing law and disputes">
            <p className="text-text-muted">
              These terms are governed by the laws of the jurisdiction in which
              the controlling entity is established, without regard to its
              conflict of laws rules. Any dispute arising from these terms will
              be resolved in the courts of that jurisdiction. Nothing in this
              section limits your right to bring a claim in your local courts
              under mandatory local consumer protection law.
            </p>
          </Section>

          <Section title="14. Changes to these terms">
            <p className="text-text-muted">
              We may update these terms. The "Last updated" date at the top will
              change. Material changes (e.g. pricing changes or new restrictions)
              will be announced via an in-app notice or an email to active
              subscribers at least 14 days before they take effect. Continued use
              of the Service after the effective date of the updated terms
              constitutes acceptance.
            </p>
          </Section>

          <Section title="15. Contact">
            <p className="text-text-muted">
              Questions about these terms:
            </p>
            <ul className="list-none space-y-1.5 text-text-muted mt-3">
              <li>Email: <a href="mailto:legal@reelclip.app" className="text-accent hover:underline">legal@reelclip.app</a></li>
              <li>Support: <a href="mailto:support@reelclip.app" className="text-accent hover:underline">support@reelclip.app</a></li>
              <li>Privacy: <a href="mailto:privacy@reelclip.app" className="text-accent hover:underline">privacy@reelclip.app</a></li>
            </ul>
          </Section>

          <Section title="16. Apple EULA reference">
            <p className="text-text-muted">
              For end users, the terms of the{" "}
              <a
                href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"
                target="_blank"
                rel="noreferrer"
                className="text-accent hover:underline"
              >
                Apple Standard End User License Agreement
              </a>{" "}
              apply as a baseline to your use of ReelClip obtained through the
              App Store. In the event of a conflict between these terms and the
              Apple EULA, the Apple EULA controls for App Store–distributed
              builds.
            </p>
          </Section>
        </article>
      </main>
      <Footer />
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4 tracking-tight">{title}</h2>
      {children}
    </section>
  );
}
