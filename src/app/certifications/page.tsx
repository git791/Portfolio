import Navbar from "@/components/Navbar";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";

export default function CertificationsPage() {
  return (
    <main>
      <Navbar />
      <div style={{ paddingTop: "80px" }}>
        <Certifications />
      </div>
      <Contact />
    </main>
  );
}
