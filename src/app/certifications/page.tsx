import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Certifications | Mohammed Ayaan",
  description: "Industry and curriculum certifications from Oracle, AWS, Google, DeepLearning.AI, and more.",
};

export default function CertificationsPage() {
  return (
    <main className="p-8 font-mono">
      <h1 className="text-3xl font-bold uppercase mb-4">Collected Editions</h1>
      <p className="text-sm">Certifications ledger stub.</p>
    </main>
  );
}
