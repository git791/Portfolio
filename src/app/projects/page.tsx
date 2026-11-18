import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Mohammed Ayaan",
  description: "Ledger of engineering builds, systems, agents, and prototypes.",
};

export default function ProjectsPage() {
  return (
    <main className="p-8 font-mono">
      <h1 className="text-3xl font-bold uppercase mb-4">The Collection</h1>
      <p className="text-sm">Projects ledger stub.</p>
    </main>
  );
}
