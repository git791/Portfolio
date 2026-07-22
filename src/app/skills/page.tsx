import Navbar from "@/components/Navbar";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

export default function SkillsPage() {
  return (
    <main>
      <Navbar />
      <div style={{ paddingTop: "80px" }}>
        <Skills />
      </div>
      <Contact />
    </main>
  );
}
