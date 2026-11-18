import { SectionCut } from "@/components/ui/SectionCut";
import { CaptionBox } from "@/components/comic/CaptionBox";

export default function Home() {
  return (
    <div className="font-mono">
      {/* Hero section */}
      <section id="hero" className="p-8 max-w-7xl mx-auto">
        <CaptionBox variant="label" className="mb-4">
          ISSUE #1 · COVER
        </CaptionBox>
        <h1 className="text-4xl sm:text-6xl font-display uppercase tracking-tight mb-4">
          MESSY HUMAN INPUT, WORKING AGENTS.
        </h1>
        <p className="font-[family-name:var(--font-body)] text-base max-w-xl text-[var(--ink-muted)] mb-6">
          Third-year CSE student in Bengaluru building agentic AI and cloud apps.
        </p>
        <div className="flex flex-wrap gap-4">
          <button
            type="button"
            data-cursor="OPEN ISSUE"
            data-sfx="POW!"
            className="px-4 py-2 border-[3px] border-[var(--ink)] bg-[var(--yellow)] font-mono font-bold text-xs uppercase shadow-comic"
          >
            OPEN ISSUE
          </button>
          <button
            type="button"
            data-cursor="COPY EMAIL"
            data-sfx="COPIED!"
            className="px-4 py-2 border-[3px] border-[var(--ink)] bg-[var(--paper)] font-mono font-bold text-xs uppercase shadow-comic"
          >
            COPY EMAIL
          </button>
        </div>
      </section>

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
