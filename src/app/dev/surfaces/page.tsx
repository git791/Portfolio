import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Surfaces & Typography Testbed | Dev",
};

export default function SurfacesDevPage() {
  return (
    <div className="w-full min-h-screen">
      {/* 1. NIGHT SURFACE */}
      <section className="surface-night p-8 lg:p-16 border-b border-[var(--rule)]">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--rule)] pb-4">
            <span className="text-label">SURFACE 01 · NIGHT (STADIUM) · #0B0D0C</span>
            <span className="text-label text-[var(--muted)]">CONTRAST 16.96:1 (CHALK) · 5.61:1 (MUTED)</span>
          </div>

          <h1 className="text-display-xl">MESSY HUMAN INPUT, WORKING AGENTS.</h1>
          <h2 className="text-display-l">STAND BEHIND THE GOAL · AYAAN</h2>
          <h3 className="text-display-m">SECTION 01 · ABOUT THE WORK</h3>

          <p className="text-body max-w-2xl">
            Third-year CSE student in Bengaluru, building since 2019. I make AI agents for
            problems that rarely get software: a shopkeeper dictating in Hindi, a rural clinic, a
            railway announcement in three languages.
          </p>

          <p className="text-caption text-[var(--muted)] max-w-2xl">
            Muted text test: IBM Plex Mono labels and Newsreader italic captions rendered against
            night surface. Contrast ratio is 5.61:1 (exceeds WCAG AA 4.5:1 minimum).
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-4">
            <span className="text-label border border-[var(--rule)] px-3 py-1">
              BENGALURU · B.TECH CSE 2028
            </span>
            <span className="font-stencil text-2xl tracking-wider">AYAAN 2026</span>
            <span className="font-dot text-2xl text-[var(--amber)]">35 REPOS · 21 HACKS</span>
          </div>
        </div>
      </section>

      {/* 2. NEWSPRINT SURFACE */}
      <section className="surface-newsprint p-8 lg:p-16 border-b border-[var(--rule)]">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--rule)] pb-4">
            <span className="text-label">SURFACE 02 · NEWSPRINT (PROGRAMME) · #E8E1CF</span>
            <span className="text-label text-[var(--muted)]">CONTRAST 14.95:1 (NIGHT) · 5.28:1 (MUTED)</span>
          </div>

          <h1 className="text-display-xl">PROGRAMME SPREAD · PEN PICTURES</h1>
          <h2 className="text-display-l">WORK & CASE STUDIES</h2>
          <h3 className="text-display-m">FIRST TEAM · 18 APPS ACTIVE</h3>

          <p className="text-body max-w-2xl">
            Decodes trilingual Indian railway announcements: three speech passes, cross-language
            voting, timetable verification. Written as an editorial programme with team sheets and
            repo facts.
          </p>

          <p className="text-caption text-[var(--muted)] max-w-2xl">
            Muted programme text test: Newsreader caption style on newsprint background.
            Contrast ratio is 5.28:1 (exceeds WCAG AA 4.5:1 minimum).
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-4">
            <span className="text-label border border-[var(--rule)] px-3 py-1">
              TEAM SHEET · PYTHON · FASTAPI
            </span>
            <span className="font-stencil text-2xl tracking-wider">LFC 1892</span>
            <span className="text-label text-[var(--red)] font-bold">● LIVE DEMO ON BOARD</span>
          </div>
        </div>
      </section>

      {/* 3. TURF SURFACE */}
      <section className="surface-turf p-8 lg:p-16 border-b border-[var(--rule)]">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--rule)] pb-4">
            <span className="text-label">SURFACE 03 · TURF (THE PITCH) · #0F3D26</span>
            <span className="text-label text-[var(--muted)]">CONTRAST 10.65:1 (CHALK) · 6.73:1 (MUTED)</span>
          </div>

          <h1 className="text-display-xl">FIXTURES & CUP RUNS</h1>
          <h2 className="text-display-l">21 HACKATHONS COMPLETED</h2>
          <h3 className="text-display-m">CUP LADDER · GROUP · SEMI · FINAL</h3>

          <p className="text-body max-w-2xl">
            Sprint builds, hackathons, and high-pressure competitive delivery on the pitch.
            Chalk line borders mark the perimeter and fixture groupings.
          </p>

          <p className="text-caption text-[var(--muted)] max-w-2xl">
            Turf muted test: High-visibility turf-adjusted tint (#A3C9B0) achieving 6.73:1 contrast
            ratio against deep pitch green (#0F3D26).
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-4">
            <span className="text-label border border-[var(--rule)] px-3 py-1">
              NOV 2025 · GENAI EXCHANGE HACKATHON
            </span>
            <span className="text-label bg-[var(--red)] text-[var(--chalk)] px-2 py-0.5">3RD PLACE</span>
            <span className="font-dot text-2xl text-[var(--amber)]">SCORE: 03 - 01</span>
          </div>
        </div>
      </section>

      {/* 4. RED SURFACE */}
      <section className="surface-red p-8 lg:p-16">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--rule)] pb-4">
            <span className="text-label">SURFACE 04 · RED (FINALE) · #D62A1F</span>
            <span className="text-label text-[var(--chalk)]">LARGE CHALK 4.34:1 (HEADINGS) · BLOCKS FOR SMALL TEXT</span>
          </div>

          <h1 className="text-display-xl">FULL TIME</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {/* Night block on red */}
            <div className="surface-night p-6 border border-[var(--rule)]">
              <span className="text-label text-[var(--muted)]">SCOREBOARD BLOCK</span>
              <div className="font-dot text-3xl text-[var(--amber)] my-3">FT: 90+6'</div>
              <p className="text-caption text-[var(--muted)]">
                Small text housed safely inside solid night block on red. Contrast is 16.96:1.
              </p>
            </div>

            {/* Chalk block on red */}
            <div className="surface-newsprint p-6 border border-[var(--rule)]">
              <span className="text-label text-[var(--muted)]">TICKET STUB BLOCK</span>
              <div className="text-xl font-bold uppercase my-3 font-mono">ADMIT ONE · AYAAN · 2026</div>
              <p className="text-caption text-[var(--muted)]">
                Contact links and email sit inside high-contrast ticket blocks. Contrast is 14.95:1.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
