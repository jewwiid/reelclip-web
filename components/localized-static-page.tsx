import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import type { Locale } from "@/i18n/config";

export async function LocalizedStaticPage({
  locale,
  document,
}: {
  locale: Exclude<Locale, "en">;
  document: string;
}) {
  const source = await readFile(
    join(process.cwd(), "i18n", "static-pages", locale, `${document}.html`),
    "utf8",
  );

  return (
    <>
      <Nav />
      <div dangerouslySetInnerHTML={{ __html: source }} />
      <Footer />
    </>
  );
}
