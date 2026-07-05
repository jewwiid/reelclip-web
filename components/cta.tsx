"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export function CTA() {
  const joinWaitlist = useMutation(api.waitlist.join);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    try {
      const result = await joinWaitlist({ email: email.trim(), role: role.trim() || undefined });
      setStatus("success");
      setMessage(
        result.alreadyOnList
          ? "You're already on the list. We'll be in touch."
          : "You're on the list. Watch your email for the TestFlight invite."
      );
      setEmail("");
      setRole("");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong. Try again?");
    }
  }

  return (
    <section id="waitlist" className="relative py-24 sm:py-36 px-6 sm:px-10 border-t border-hairline overflow-hidden">
      <div className="absolute inset-0 bg-radial-spotlight opacity-50" />

      <div className="relative max-w-3xl mx-auto text-center">
        <div className="inline-block text-xs font-bold uppercase tracking-[0.18em] text-accent mb-4">
          TestFlight beta
        </div>
        <h2 className="text-4xl sm:text-6xl font-black tracking-tight mb-5">
          Join the beta.
        </h2>
        <p className="text-lg text-text-muted max-w-xl mx-auto mb-10 leading-relaxed">
          ReelClip is in active TestFlight. Drop your email and we'll send a TestFlight invite as soon as a build is ready for you.
        </p>

        {status === "success" ? (
          <div className="p-6 rounded-2xl bg-accent/10 border border-accent/30">
            <div className="text-3xl mb-2">✓</div>
            <div className="text-lg font-bold mb-1">You're on the list</div>
            <div className="text-text-muted">{message}</div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@yourdomain.com"
                disabled={status === "loading"}
                className="flex-1 px-5 py-3.5 rounded-full bg-surface border border-hairline text-text placeholder:text-text-faint focus:outline-none focus:border-accent transition"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="px-7 py-3.5 rounded-full bg-accent text-bg font-bold hover:bg-accent-deep transition accent-glow disabled:opacity-60"
              >
                {status === "loading" ? "Joining…" : "Join beta"}
              </button>
            </div>

            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Creator type (optional — podcaster, coach, etc.)"
              disabled={status === "loading"}
              className="w-full px-5 py-3 rounded-full bg-surface border border-hairline text-text placeholder:text-text-faint focus:outline-none focus:border-accent transition text-sm"
            />

            {status === "error" && (
              <p className="text-sm text-red-400">{message}</p>
            )}

            <p className="text-xs text-text-faint pt-2">
              We email once when your TestFlight invite is ready. No marketing, no spam.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}