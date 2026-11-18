import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skills & Tooling | Mohammed Ayaan",
  description: "Evidence-backed ledger of daily drivers, libraries, frameworks, and coursework.",
};

export default function SkillsPage() {
  return (
    <main className="p-8 font-mono">
      <h1 className="text-3xl font-bold uppercase mb-4">Character Sheet</h1>
      <p className="text-sm">Skills ledger stub.</p>
    </main>
  );
}
