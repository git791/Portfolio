import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Mohammed Ayaan",
  description: "Ledger of engineering builds, systems, agents, and prototypes.",
};

export default function ProjectsPage() {
  return (
    <main className="p-8">
      <h1 className="font-mono text-2xl uppercase tracking-wider">Projects</h1>
    </main>
  );
}
