import type { Metadata } from "next";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Experience | Mohammed Ayaan",
  description: "Work experience and leadership roles across backend engineering, cloud systems, and student developer communities.",
};

export default function ExperiencePage() {
  return (
    <main>
      <Experience />
      <Contact />
    </main>
  );
}
