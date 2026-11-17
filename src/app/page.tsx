import Hero from "@/components/Hero";
import About from "@/components/About";
import Work from "@/components/Work";
import SkillsTeaser from "@/components/SkillsTeaser";
import FixturesTeaser from "@/components/FixturesTeaser";
import Career from "@/components/Career";
import Contact from "@/components/Contact";
import SurfaceWipe from "@/components/ui/SurfaceWipe";

export default function Home() {
  return (
    <main>
      {/* 1. Hero (Stadium Night) */}
      <Hero />

      {/* 2. About (Stadium Night) */}
      <About />

      {/* 3. Work & Skills (Newsprint Programme) with SurfaceWipe transition */}
      <SurfaceWipe scrub={false} direction="bottom-to-top">
        <Work />
        <SkillsTeaser />
      </SurfaceWipe>

      {/* 4. Fixtures Teaser (Match Turf) with SurfaceWipe transition */}
      <SurfaceWipe scrub={false} direction="bottom-to-top">
        <FixturesTeaser />
      </SurfaceWipe>

      {/* 5. Career (Newsprint Programme) with SurfaceWipe transition */}
      <SurfaceWipe scrub={false} direction="bottom-to-top">
        <Career />
      </SurfaceWipe>

      {/* 6. Contact Finale (Red Surface) with SurfaceWipe transition */}
      <SurfaceWipe scrub={false} direction="bottom-to-top">
        <Contact />
      </SurfaceWipe>
    </main>
  );
}
