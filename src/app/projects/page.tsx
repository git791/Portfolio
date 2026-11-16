import type { Metadata } from "next";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Projects | Mohammed Ayaan",
  description: "Ledger of engineering builds, systems, agents, and prototypes.",
};

export default function ProjectsPage() {
  return (
    <main>
      <Projects />
      <Contact />
    </main>
  );
}
