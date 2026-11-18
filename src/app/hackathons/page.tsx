import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hackathons | Mohammed Ayaan",
  description: "21 hackathons and competitive sprint builds since 2025.",
};

export default function HackathonsPage() {
  return (
    <main className="p-8 font-mono">
      <h1 className="text-3xl font-bold uppercase mb-4">Crossovers</h1>
      <p className="text-sm">Hackathons ledger stub.</p>
    </main>
  );
}
