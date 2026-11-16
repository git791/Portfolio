import type { Metadata } from "next";
import Hackathons from "@/components/Hackathons";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Hackathons | Mohammed Ayaan",
  description: "21 hackathons and competitive sprint builds since 2025.",
};

export default function HackathonsPage() {
  return (
    <main>
      <Hackathons />
      <Contact />
    </main>
  );
}
