import { writeFileSync } from "node:fs";
import { posts, sourceFingerprint } from "./guide-source.mjs";
writeFileSync("i18n/guides/source-versions.json", JSON.stringify(Object.fromEntries(posts().map(post => [post.slug, sourceFingerprint(post)])), null, 2) + "\n");
