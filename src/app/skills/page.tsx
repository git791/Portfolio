import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skills & Tooling | Mohammed Ayaan",
  description: "Evidence-backed ledger of daily drivers, libraries, frameworks, and coursework.",
};

export default function SkillsPage() {
  return (
    <main className="p-8">
      <h1 className="font-mono text-2xl uppercase tracking-wider">Skills</h1>
    </main>
  );
}
