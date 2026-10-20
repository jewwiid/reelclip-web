import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { pathToFileURL } from "node:url";
import ts from "typescript";

export function posts() {
  const source = readFileSync("app/blog/posts.ts", "utf8");
  const javascript = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const compiled = { exports: {} };
  new Function("exports", "module", javascript)(compiled.exports, compiled);
  return compiled.exports.BLOG_POSTS;
}

export function sourceFingerprint(post) {
  return createHash("sha256")
    .update(JSON.stringify(post))
    .update("\n")
    .update(readFileSync(`app/blog/content/${post.slug}.tsx`))
    .digest("hex");
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  console.log(JSON.stringify(posts().map(post => ({ ...post, sourceFingerprint: sourceFingerprint(post) }))));
}
