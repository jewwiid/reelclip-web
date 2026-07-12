import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Modes } from "@/components/modes";
import { Safety } from "@/components/safety";
import { ForCreators } from "@/components/for-creators";
import { CompatibleWith } from "@/components/compatible-with";
import { CTA } from "@/components/cta";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <div className="bg-radial-spotlight">
        <Nav />
        <Hero />
      </div>
      <Modes />
      <Safety />
      <ForCreators />
      <CompatibleWith />
      <CTA />
      <Footer />
    </>
  );
}