import { AppStoreLink } from "@/components/app-store-link";
import { getGuideVideoForPost } from "@/lib/guide-videos";
/**
 * Reusable prose component for blog posts.
 * Keeps post files declarative (just call <PostTitle>, <PostH2>, etc).
 */

import Link from "next/link";

export function PostHeader({
  category,
  title,
  description,
  publishedAt,
  updatedAt,
  readMinutes,
  slug,
}: {
  category: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  readMinutes: number;
  slug?: string;
}) {
  const tutorial = getGuideVideoForPost(slug);
  const displayDate = updatedAt ?? publishedAt;
  const date = new Date(`${displayDate}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
  return (
    <header className="mx-auto mb-10 max-w-2xl sm:mb-12">
      <div className="mb-7 flex items-center gap-3 text-xs font-medium">
        <Link href="/blog" className="inline-flex items-center gap-2 text-text-muted transition-colors hover:text-text focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
          <span aria-hidden="true">←</span> All guides
        </Link>
        <span aria-hidden="true" className="text-text-faint">/</span>
        <span className="text-accent">{category}</span>
      </div>
      <h1 className="text-4xl leading-[1.08] font-black tracking-tight text-balance sm:text-5xl">
        {title}
      </h1>
      <p className="mt-5 text-base leading-relaxed text-pretty text-text-muted">
        {description}
      </p>
      <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-4 text-xs text-text-muted">
        <time dateTime={displayDate}>{updatedAt ? "Updated " : ""}{date}</time>
        <span aria-hidden="true">·</span>
        <span>{readMinutes} min read</span>
        {tutorial && (
          <a href="#walkthrough" className="inline-flex min-h-9 items-center gap-2 rounded-full border border-hairline px-3 font-medium text-accent transition-colors hover:border-accent/50 hover:bg-accent/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:ml-auto">
            <svg aria-hidden="true" viewBox="0 0 20 20" className="h-3 w-3 fill-current"><path d="m6 3 11 7L6 17V3Z" /></svg>
            Watch the {Math.round(tutorial.duration)} sec walkthrough
          </a>
        )}
      </div>
    </header>
  );
}

export function PostBody({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <article className="prose-sm max-w-none space-y-8 leading-relaxed text-text [&>:not(.guide-walkthrough)]:mx-auto [&>:not(.guide-walkthrough)]:max-w-2xl">
      {children}
    </article>
  );
}

export function PostH2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl sm:text-3xl font-black tracking-tight mt-12 mb-4">
      {children}
    </h2>
  );
}

export function PostH3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-xl font-bold tracking-tight mt-8 mb-3">{children}</h3>
  );
}

export function PostP({ children }: { children: React.ReactNode }) {
  return <p className="text-text-muted">{children}</p>;
}

export function PostUl({ children }: { children: React.ReactNode }) {
  return (
    <ul className="list-disc pl-6 space-y-2 text-text-muted">{children}</ul>
  );
}

export function PostOl({ children }: { children: React.ReactNode }) {
  return (
    <ol className="list-decimal pl-6 space-y-2 text-text-muted">{children}</ol>
  );
}

/** Inline emphasized link with accent color. */
export function PostLink({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="text-accent hover:underline"
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className="text-accent hover:underline">
      {children}
    </Link>
  );
}

/** The closing "what to do next" panel — drives traffic to /pricing etc. */
export function PostCta() {
  return (
    <aside data-guide-component="cta" className="mt-16 rounded-2xl border border-accent/25 bg-accent/5 p-6 sm:p-8">
      <p className="text-xs uppercase tracking-wider text-accent font-bold mb-3">
        Try it on your iPhone
      </p>
      <h3 className="text-2xl font-black tracking-tight mb-2">
        Cut, transcribe, and export — on-device, no upload.
      </h3>
      <p className="text-sm text-text-muted leading-relaxed mb-5">
        ReelClip is free to import and preview. Creator mode unlocks full access,
        including saving, sharing, and exporting your work on your iPhone.
        Choose Slice, Cut, Transcript or AI for your edit. All video and audio
        processing stays on your iPhone — nothing is uploaded to ReelClip servers.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <AppStoreLink
          target="_blank"
          rel="noreferrer"
          data-analytics-event="download_click_blog"
          data-analytics-event-placement="article_cta"
          className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-bg transition-[background-color,transform] hover:bg-accent-deep active:scale-[0.98] ease-out"
        >
          Download on the App Store
        </AppStoreLink>
        <Link
          href="/pricing"
          className="inline-flex items-center justify-center rounded-full border border-hairline px-5 py-2.5 text-sm font-semibold text-text transition-[background-color,transform] hover:bg-surface active:scale-[0.98] ease-out"
        >
          See Creator mode options
        </Link>
      </div>
    </aside>
  );
}
