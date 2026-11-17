import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Certifications | Mohammed Ayaan",
  description: "Industry and curriculum certifications from Oracle, AWS, Google, DeepLearning.AI, and more.",
};

export default function CertificationsPage() {
  return (
    <main className="p-8">
      <h1 className="font-mono text-2xl uppercase tracking-wider">Certifications</h1>
    </main>
  );
}
