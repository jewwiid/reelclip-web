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
  readMinutes,
}: {
  category: string;
  title: string;
  description: string;
  publishedAt: string;
  readMinutes: number;
}) {
  const date = new Date(publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <header className="mb-12">
      <p className="text-xs uppercase tracking-wider text-accent font-bold mb-4">
        {category}
      </p>
      <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.05]">
        {title}
      </h1>
      <p className="text-base text-text-muted mt-4 leading-relaxed">
        {description}
      </p>
      <div className="mt-6 flex items-center gap-3 text-xs text-text-faint">
        <time dateTime={publishedAt}>{date}</time>
        <span aria-hidden="true">·</span>
        <span>{readMinutes} min read</span>
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
    <article className="prose-sm space-y-8 text-text leading-relaxed max-w-none">
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
    <aside className="mt-16 rounded-2xl border border-accent/25 bg-accent/5 p-6 sm:p-8">
      <p className="text-xs uppercase tracking-wider text-accent font-bold mb-3">
        Try it on your iPhone
      </p>
      <h3 className="text-2xl font-black tracking-tight mb-2">
        Cut, transcribe, and export — on-device, no upload.
      </h3>
      <p className="text-sm text-text-muted leading-relaxed mb-5">
        ReelClip is free to import and preview. A Creator plan unlocks export
        and the four cut modes (Cut, Transcript, Slice, AI). All video and
        audio processing stays on your iPhone — nothing is uploaded to
        ReelClip servers.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href="https://apps.apple.com/app/reelclip/id6787742864"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-bg transition hover:bg-accent-deep"
        >
          Download on the App Store
        </a>
        <Link
          href="/pricing"
          className="inline-flex items-center justify-center rounded-full border border-hairline px-5 py-2.5 text-sm font-semibold text-text transition hover:bg-surface"
        >
          See Creator pricing
        </Link>
      </div>
    </aside>
  );
}
