import HeroCover from "@/components/hero/HeroCover";
import SplashPage from "@/components/home/SplashPage";
import PageTurn from "@/components/home/PageTurn";
import AboutSection from "@/components/home/AboutSection";
import BackIssues from "@/components/home/BackIssues";
import TeasersAndContact from "@/components/home/TeasersAndContact";

export default function Home() {
  return (
    <div className="w-full overflow-x-hidden bg-[var(--paper)]">
      {/* Beat A: Pinned Registration Cover Panel */}
      <HeroCover />

      {/* Beat B: The Splash Page & Beat C: The Page Turn */}
      <PageTurn>
        <SplashPage />
      </PageTurn>

      {/* Origin Story / About */}
      <AboutSection />

      {/* Back Issues: Commit History Timeline */}
      <BackIssues />

      {/* Teasers (Skills & Hackathons) & Closing Contact Block */}
      <TeasersAndContact />
    </div>
  );
}
