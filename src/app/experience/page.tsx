import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience | Mohammed Ayaan",
  description: "Work experience and leadership roles across backend engineering, cloud systems, and student developer communities.",
};

export default function ExperiencePage() {
  return (
    <main className="p-8">
      <h1 className="font-mono text-2xl uppercase tracking-wider">Experience</h1>
    </main>
  );
}
