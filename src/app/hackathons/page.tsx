import Navbar from "@/components/Navbar";
import Hackathons from "@/components/Hackathons";
import Contact from "@/components/Contact";

export default function HackathonsPage() {
  return (
    <main>
      <Navbar />
      <div style={{ paddingTop: "80px" }}>
        <Hackathons />
      </div>
      <Contact />
    </main>
  );
}
