import HeroCover from "@/components/hero/HeroCover";
import { SectionCut } from "@/components/ui/SectionCut";

export default function Home() {
  return (
    <div className="font-mono">
      {/* Hero Cover (Pinned 250vh on desktop, registers on scroll) */}
      <HeroCover />

      {/* Slanted Section Cut: About */}
      <SectionCut id="about" slope="down-right" bg="paper" className="px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-display uppercase mb-2">About (Origin)</h2>
        <p className="font-[family-name:var(--font-body)] text-sm max-w-xl">
          Origin story section with slanted polygon gutter.
        </p>
      </SectionCut>

      {/* Slanted Section Cut: Work */}
      <SectionCut id="work" slope="down-left" bg="cyan" className="px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-display uppercase mb-2">Work (Splash Page)</h2>
        <p className="font-[family-name:var(--font-body)] text-sm max-w-xl">
          The collection spread.
        </p>
      </SectionCut>

      {/* Slanted Section Cut: Contact */}
      <SectionCut id="contact" slope="down-right" bg="yellow" className="px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-display uppercase mb-2">To Be Continued...</h2>
        <p className="font-[family-name:var(--font-body)] text-sm max-w-xl mb-4">
          Letters-page style closing block.
        </p>
        <button
          type="button"
          data-cursor="COPY"
          data-sfx="COPIED!"
          className="px-4 py-2 border-[3px] border-[var(--ink)] bg-[var(--paper)] font-mono font-bold text-xs uppercase shadow-comic"
        >
          m.ayaan.a.ahmed@gmail.com [CLICK TO COPY]
        </button>
      </SectionCut>
    </div>
  );
}
