import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { pathToFileURL } from "node:url";
import ts from "typescript";

function exportsFor(path) {
  const source = readFileSync(path, "utf8");
  const javascript = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const compiled = { exports: {} };
  new Function("exports", "module", javascript)(compiled.exports, compiled);
  return compiled.exports;
}

export function posts() { return exportsFor("app/blog/posts.ts").BLOG_POSTS; }

export function sourceFingerprint(post) {
  const fingerprint = createHash("sha256")
    .update(JSON.stringify(post))
    .update("\n")
    .update(readFileSync(`app/blog/content/${post.slug}.tsx`));
  const videos = exportsFor("lib/guide-videos.ts").GUIDE_VIDEOS;
  const video = Object.entries(videos).find(([, details]) => details.slug === post.slug);
  if (video) fingerprint.update("\nvideo:").update(JSON.stringify(video));
  return fingerprint.digest("hex");
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  console.log(JSON.stringify(posts().map(post => ({ ...post, sourceFingerprint: sourceFingerprint(post) }))));
}
