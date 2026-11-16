import Hero from "@/components/Hero";
import About from "@/components/About";
import WorkPreview from "@/components/WorkPreview";
import Experience from "@/components/Experience";
import IndexLedger from "@/components/IndexLedger";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <WorkPreview />
      <Experience />
      <IndexLedger />
      <Contact />
    </main>
  );
}
