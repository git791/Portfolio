import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hackathons | Mohammed Ayaan",
  description: "21 hackathons and competitive sprint builds since 2025.",
};

export default function HackathonsPage() {
  return (
    <main className="p-8">
      <h1 className="font-mono text-2xl uppercase tracking-wider">Hackathons</h1>
    </main>
  );
}
