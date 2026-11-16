import Hero from "@/components/Hero";
import About from "@/components/About";
import Education from "@/components/Education";
import ArchiveLinks from "@/components/ArchiveLinks";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Experience />
      <Education />
      <ArchiveLinks />
      <Contact />
    </main>
  );
}
