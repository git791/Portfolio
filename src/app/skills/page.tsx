import type { Metadata } from "next";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Skills & Tooling | Mohammed Ayaan",
  description: "Evidence-backed ledger of daily drivers, libraries, frameworks, and coursework.",
};

export default function SkillsPage() {
  return (
    <main>
      <Skills />
      <Contact />
    </main>
  );
}
