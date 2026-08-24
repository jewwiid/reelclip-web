import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Modes } from "@/components/modes";
import { Safety } from "@/components/safety";
import { AINotes } from "@/components/ai-notes";
import { ForCreators } from "@/components/for-creators";
import { CompatibleWith } from "@/components/compatible-with";
import { CTA } from "@/components/cta";
import { Footer } from "@/components/footer";
import { SoftwareApplicationJsonLd } from "@/components/structured-data";

export default function Home() {
  return (
    <>
      <SoftwareApplicationJsonLd />
      <div className="bg-radial-spotlight">
        <Nav />
        <Hero />
      </div>
      <Modes />
      <Safety />
      <AINotes />
      <ForCreators />
      <CompatibleWith />
      <CTA />
      <Footer />
    </>
  );
}