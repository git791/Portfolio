import type { Metadata } from "next";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Certifications | Mohammed Ayaan",
  description: "Industry and curriculum certifications from Oracle, AWS, Google, DeepLearning.AI, and more.",
};

export default function CertificationsPage() {
  return (
    <main>
      <Certifications />
      <Contact />
    </main>
  );
}
