import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Privacy Policy — ReelClip",
  description:
    "What data ReelClip collects, how it is used, and the rights you have. On-device by default.",
};

const UPDATED = "July 8, 2026";

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main className="px-6 sm:px-10 py-12 sm:py-20 max-w-3xl mx-auto">
        <header className="mb-12">
          <p className="text-xs uppercase tracking-wider text-accent font-bold mb-3">
            Privacy Policy
          </p>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
            Your footage stays yours.
          </h1>
          <p className="text-base text-text-muted mt-4 leading-relaxed">
            ReelClip is strictly an iOS-Apple-native app. Every AI run starts
            and finishes on your device. This page lists what data we collect,
            when we collect it, what we do with it, and the rights you have. Last
            updated {UPDATED}.
          </p>
        </header>

        <article className="prose-sm space-y-10 text-text leading-relaxed">
          <Section title="1. The short version">
            <ul className="list-disc pl-6 space-y-2 text-text-muted">
              <li>Your source video is analyzed on your device. It is not uploaded to ReelClip servers.</li>
              <li>AI runs entirely on-device via Apple Intelligence. No API keys, no cloud round-trips, no third-party AI providers.</li>
              <li>The only personal data ReelClip stores is your email address (for the waitlist) and your subscription receipt (for billing).</li>
              <li>We do not use third-party analytics, advertising SDKs, or cross-app tracking.</li>
            </ul>
          </Section>

          <Section title="2. Data we collect">
            <h3 className="text-base font-bold text-text mb-2">2.1 Account and subscription data</h3>
            <p className="text-text-muted">
              If you join the TestFlight waitlist, we collect your email address and an
              optional role label (e.g. "podcaster"). If you purchase a subscription, Apple
              and / or Stripe send us a subscription receipt that confirms your tier. We
              do not see or store your credit card number, billing address, or Apple ID
              password.
            </p>

            <h3 className="text-base font-bold text-text mb-2 mt-6">2.2 iOS permissions</h3>
            <p className="text-text-muted">
              ReelClip requests the following iOS permissions. We only ask when the
              feature is first used. You can revoke any of these in iOS Settings at any
              time.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-text-muted mt-3">
              <li>
                <strong className="text-text">Photos library (read)</strong> — to load
                a source video you have selected via the system Photos picker.
              </li>
              <li>
                <strong className="text-text">Photos library (add)</strong> — to save
                the final exported clips you confirm in the export preview.
              </li>
              <li>
                <strong className="text-text">Speech recognition</strong> — to generate
                the local transcript used by the Smart Pause mode and the SRT / VTT
                subtitle export. Recognition runs on-device via Apple&apos;s
                <code className="px-1.5 py-0.5 rounded bg-surface text-text-muted text-xs mx-1">SFSpeechRecognizer</code>
                with <code className="px-1.5 py-0.5 rounded bg-surface text-text-muted text-xs mx-1">requiresOnDeviceRecognition</code> enabled.
                Audio is not sent to Apple servers.
              </li>
              <li>
                <strong className="text-text">Apple Intelligence</strong> — to run the
                AI Assist cut planner on-device via the
                <code className="px-1.5 py-0.5 rounded bg-surface text-text-muted text-xs mx-1">FoundationModels</code>
                framework. Requires iOS 26+ and Apple Intelligence enabled in iOS
                Settings. The on-device AI runtime processes your feature pack
                locally; no video, audio, or analysis data is transmitted.
              </li>
              <li>
                <strong className="text-text">File access (Files / external drives)</strong> — to import a video you have chosen from the Files app or a connected drive, and to export your <code className="px-1.5 py-0.5 rounded bg-surface text-text-muted text-xs">.reelclip</code> project files.
              </li>
            </ul>

            <h3 className="text-base font-bold text-text mb-2 mt-6">2.3 What we never collect</h3>
            <ul className="list-disc pl-6 space-y-2 text-text-muted">
              <li>Your source video or any rendered clip.</li>
              <li>Your audio, transcript, or any AI feature pack sent to the on-device model.</li>
              <li>Your contact list, photo library contents, location, or device identifiers.</li>
              <li>Crash reports, analytics, or behavioural telemetry.</li>
            </ul>
          </Section>

          <Section title="3. How we use data">
            <p className="text-text-muted">
              We use the data we collect only to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-text-muted mt-3">
              <li>Send you the TestFlight invitation you signed up for.</li>
              <li>Verify your subscription tier and unlock the corresponding features.</li>
              <li>Respond to your support requests if you email us.</li>
              <li>Comply with legal obligations (e.g. tax records for paid subscriptions).</li>
            </ul>
            <p className="text-text-muted mt-3">
              We do not sell, rent, or share your personal data with third parties for
              marketing or advertising.
            </p>
          </Section>

          <Section title="4. AI processing — fully on-device">
            <p className="text-text-muted">
              ReelClip ships with an "AI Assist" cut planner powered by
              <strong className="text-text"> Apple Intelligence</strong>, the
              on-device foundation-model framework that Apple introduced in iOS 26.
              When you tap "Ask Apple Intelligence" in AI mode, ReelClip builds a
              compact feature pack from your video — audio energy levels, silence
              markers, planned segment durations, and your edit prompt — and
              passes it to the on-device model. The model runs entirely on your
              phone&apos;s Neural Engine:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-text-muted mt-3">
              <li>No part of the feature pack leaves your device.</li>
              <li>No video, audio, or transcript is uploaded to Apple, ReelClip, or any third party.</li>
              <li>No API key is required and none is stored. Apple Intelligence is a system framework, not a service.</li>
              <li>If your device is ineligible (pre-iOS 26, or Apple Intelligence disabled in iOS Settings), AI Assist is unavailable — ReelClip does not silently fall back to a cloud provider. The other three cut modes (Cut, Silence, Splice) remain fully usable on any device.</li>
            </ul>
            <p className="text-text-muted mt-3">
              Apple Intelligence is governed by{" "}
              <a
                href="https://www.apple.com/legal/privacy/"
                target="_blank"
                rel="noreferrer"
                className="text-accent hover:underline"
              >
                Apple&apos;s Privacy Policy
              </a>
              . Apple has stated that Foundation Models requests are processed
              on-device; the on-device AI runtime does not send prompts to Apple
              servers.
            </p>
          </Section>

          <Section title="5. Project data on your device">
            <p className="text-text-muted">
              ReelClip stores your projects, planned ranges, scene metadata, and
              highlight drafts in a JSON file inside the app&apos;s sandbox
              (<code className="px-1.5 py-0.5 rounded bg-surface text-text-muted text-xs">Application Support / ReelClip /</code>).
              This directory is excluded from iCloud backup. The data never leaves
              your device unless you explicitly share a <code className="px-1.5 py-0.5 rounded bg-surface text-text-muted text-xs">.reelclip</code>
              project file via the iOS share sheet, AirDrop, or Files.
            </p>
          </Section>

          <Section title="6. Children">
            <p className="text-text-muted">
              ReelClip is not directed to children under 13. We do not knowingly
              collect personal data from children. If you believe a child has
              submitted an email to our waitlist, contact us and we will delete it.
            </p>
          </Section>

          <Section title="7. International data transfers">
            <p className="text-text-muted">
              The waitlist backend (Convex) is hosted in the European Union. Stripe
              and Apple may process payment data in the United States or other
              regions under their own privacy frameworks. The on-device AI runtime
              does not introduce any cross-border data flow.
            </p>
            <p className="text-text-muted mt-3">
              If you are in the European Economic Area, United Kingdom, or
              California, you have the right to access, correct, port, or delete
              the personal data we hold about you. Email
              {" "}
              <a href="mailto:privacy@reelclip.app" className="text-accent hover:underline">
                privacy@reelclip.app
              </a>{" "}
              to exercise these rights. We respond within 30 days.
            </p>
          </Section>

          <Section title="8. Data retention">
            <ul className="list-disc pl-6 space-y-2 text-text-muted">
              <li>Waitlist email: until you ask us to delete it, or until you unsubscribe.</li>
              <li>Subscription receipts: 7 years (tax / accounting obligations).</li>
              <li>Support emails: 2 years.</li>
              <li>On-device project data: until you delete the app or the project.</li>
            </ul>
          </Section>

          <Section title="9. Security">
            <p className="text-text-muted">
              We use industry-standard transport security (HTTPS / TLS) for all
              network communication. Because ReelClip has no API-key storage and
              no traditional account system, there is no credential material for
              us to protect beyond your email address and subscription receipt.
            </p>
          </Section>

          <Section title="10. Changes to this policy">
            <p className="text-text-muted">
              We may update this privacy policy as the product evolves. The "Last
              updated" date at the top will change. Material changes (e.g. adding a
              new data category) will be announced via a TestFlight build release
              note or an email to active subscribers.
            </p>
          </Section>

          <Section title="11. Contact">
            <p className="text-text-muted">
              Questions, data requests, or complaints:
            </p>
            <ul className="list-none space-y-1.5 text-text-muted mt-3">
              <li>Email: <a href="mailto:privacy@reelclip.app" className="text-accent hover:underline">privacy@reelclip.app</a></li>
              <li>Post: see Terms page for the controlling entity and address.</li>
            </ul>
          </Section>

          <Section title="12. Manage your data and subscription">
            <p className="text-text-muted">
              You can review and manage your App Store subscription, including
              cancellation, at any time in iOS Settings → Apple ID → Subscriptions.
              You can also manage your ReelClip account and request data deletion at
              {" "}
              <a href="/account" className="text-accent hover:underline">reelclip.app / account</a>.
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
