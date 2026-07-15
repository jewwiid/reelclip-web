"use client";

import { useState } from "react";
import Image from "next/image";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const CREATOR_OPTIONS = [
  "Podcasts",
  "Coaching or educational videos",
  "Vlogs",
  "Livestreams or event videos",
  "Business or product videos",
] as const;

const TESTFLIGHT_JOIN_URL = "https://testflight.apple.com/join/KFA3haEA";

export function CTA() {
  const joinWaitlist = useMutation(api.waitlist.join);
  const [email, setEmail] = useState("");
  const [creatorType, setCreatorType] = useState("");
  const [customCreatorType, setCustomCreatorType] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const selectedRole = creatorType === "Other" ? customCreatorType.trim() : creatorType;
  const hasValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const isFormComplete = hasValidEmail && Boolean(selectedRole);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isFormComplete) return;

    setStatus("loading");
    try {
      const result = await joinWaitlist({ email: email.trim(), role: selectedRole });
      setStatus("success");
      setMessage(
        result.alreadyOnList
          ? "Your details are already saved. Your beta link is ready below."
          : "Your details are saved. Your beta link is ready below."
      );
      setEmail("");
      setCreatorType("");
      setCustomCreatorType("");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong. Try again?");
    }
  }

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
          TestFlight beta
        </div>
        <h2 className="text-4xl sm:text-6xl font-black tracking-tight mb-5">
          Join the beta.
        </h2>
        <p className="text-lg text-text-muted max-w-xl mx-auto mb-10 leading-relaxed">
          ReelClip is in active TestFlight. Complete the form to get your beta link.
        </p>

        {status === "success" ? (
          <div className="p-6 rounded-2xl bg-accent/10 border border-accent/30">
            <div className="text-3xl mb-2">✓</div>
            <div className="text-lg font-bold mb-1">Your beta link is ready</div>
            <p className="text-text-muted">{message}</p>
            <a
              href={TESTFLIGHT_JOIN_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center justify-center rounded-full bg-accent px-7 py-3.5 font-bold text-bg transition hover:bg-accent-deep active:scale-[0.98]"
            >
              Open TestFlight
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-3">
            <div className="grid gap-3 sm:grid-cols-[minmax(0,1.25fr)_minmax(12rem,0.85fr)_auto] sm:items-end">
              <div className="flex-1 text-left">
                <label htmlFor="waitlist-email" className="block text-xs font-semibold text-text-muted mb-2 ml-1">
                  Email address
                </label>
                <input
                  id="waitlist-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@yourdomain.com"
                  disabled={status === "loading"}
                  className="w-full px-5 py-3.5 rounded-full bg-surface border border-hairline text-text placeholder:text-text-faint focus:outline-none focus:border-accent transition"
                />
              </div>
              <div className="text-left">
                <label htmlFor="waitlist-role" className="block text-xs font-semibold text-text-muted mb-2 ml-1">
                  What do you create?
                </label>
                <div className="relative">
                  <select
                    id="waitlist-role"
                    required
                    value={creatorType}
                    onChange={(e) => {
                      setCreatorType(e.target.value);
                      if (e.target.value !== "Other") setCustomCreatorType("");
                    }}
                    disabled={status === "loading"}
                    className="w-full appearance-none rounded-full border border-hairline bg-surface px-5 py-3.5 pr-12 text-sm text-text transition focus:border-accent focus:outline-none disabled:opacity-60"
                  >
                    <option value="">Choose one</option>
                    {CREATOR_OPTIONS.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                    <option value="Other">Other</option>
                  </select>
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="pointer-events-none absolute right-5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
                  >
                    <path d="m4 6 4 4 4-4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              {isFormComplete && (
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full px-7 py-3.5 rounded-full bg-accent text-bg font-bold hover:bg-accent-deep transition accent-glow active:scale-[0.98] disabled:opacity-60 sm:w-auto"
                >
                  {status === "loading" ? "Joining…" : "Join beta"}
                </button>
              )}
            </div>

            {creatorType === "Other" && (
              <div className="text-left">
                <label htmlFor="waitlist-role-other" className="block text-xs font-semibold text-text-muted mb-2 ml-1">
                  Tell us what you create
                </label>
                <input
                  id="waitlist-role-other"
                  type="text"
                  required
                  value={customCreatorType}
                  onChange={(e) => setCustomCreatorType(e.target.value)}
                  placeholder="Music videos, interviews…"
                  disabled={status === "loading"}
                  className="w-full px-5 py-3 rounded-full bg-surface border border-hairline text-text placeholder:text-text-faint focus:outline-none focus:border-accent transition text-sm"
                />
              </div>
            )}

            {!isFormComplete && (
              <p className="text-xs text-text-faint pt-1">
                Complete the fields above to continue.
              </p>
            )}

            {status === "error" && (
              <p className="text-sm text-red-400">{message}</p>
            )}

            <p className="text-xs text-text-faint pt-2">
              We only use your email for beta updates. No marketing or spam.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
