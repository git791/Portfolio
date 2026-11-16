"use client";

import Decode from "@/components/ui/Decode";
import { hackathons } from "@/lib/data";
import type { Hackathon } from "@/lib/types";

function HackathonChip({ item }: { item: Hackathon }) {
  if (item.placement) {
    return (
      <span className="font-mono text-xs uppercase px-2 py-0.5 bg-[var(--fg)] text-[var(--bg)] font-semibold">
        {item.placement}
      </span>
    );
  }

  if (item.stage === "finalist" || item.stage === "semi-finalist") {
    return (
      <span className="font-mono text-xs uppercase px-2 py-0.5 border border-[var(--rule)] text-[var(--fg)]">
        {item.stage.toUpperCase()}
      </span>
    );
  }

  return null;
}

export default function Hackathons() {
  // Notable hackathons (with placement or finalist/semi-finalist stage)
  const notableHackathons = hackathons.filter(
    (h) => Boolean(h.placement) || h.stage === "finalist" || h.stage === "semi-finalist"
  );

  // Parse approximate date for sorting newest first
  const sortedHackathons = [...hackathons].sort((a, b) => {
    // Reverse id order if date strings vary, or string compare
    return b.id - a.id;
  });

  return (
    <section className="py-24 border-t border-[var(--rule)] min-h-screen">
      <div className="container-main">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--muted)]">
                INDEX /
              </span>
              <Decode
                text="HACKATHONS"
                className="font-display font-bold text-4xl sm:text-5xl uppercase tracking-tight text-[var(--fg)]"
              />
            </div>
            <p className="font-mono text-xs uppercase tracking-wider text-[var(--muted)]">
              {hackathons.length} COMPETITIVE BUILDS SINCE 2025 · RAPID PROTOTYPING
            </p>
          </div>
        </div>

        {/* Notable Highlights Strip */}
        {notableHackathons.length > 0 && (
          <div className="mb-20">
            <div className="pb-3 border-b border-[var(--rule)] mb-6 flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--fg)] font-semibold">
                HIGHLIGHTS &amp; RECOGNITION
              </span>
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--muted)]">
                {notableHackathons.length} ENTRIES
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {notableHackathons.map((item) => (
                <div
                  key={item.id}
                  className="p-6 border border-[var(--rule)] bg-[#141512]/40 flex flex-col justify-between gap-4"
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs uppercase tracking-wider text-[var(--muted)]">
                        {item.date} · {item.organizer}
                      </span>
                      <HackathonChip item={item} />
                    </div>

                    <h3 className="font-display font-semibold text-2xl uppercase tracking-tight text-[var(--fg)]">
                      {item.name}
                    </h3>

                    {item.track && (
                      <span className="font-mono text-xs text-[var(--muted)]">
                        Track: {item.track}
                      </span>
                    )}

                    <p className="text-sm text-[var(--muted)] leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {item.projectUrl && (
                    <div className="pt-4 border-t border-[var(--rule)]">
                      <a
                        href={item.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="Visit"
                        className="font-mono text-xs uppercase tracking-wider text-[var(--fg)] hover:underline inline-flex items-center gap-1.5"
                      >
                        <span>{item.urlLabel || "View Project"}</span>
                        <span>↗</span>
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Complete Hackathons Ledger */}
        <div className="flex flex-col">
          <div className="pb-3 border-b border-[var(--rule)] flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--fg)] font-semibold">
              COMPLETE LEDGER
            </span>
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--muted)]">
              {sortedHackathons.length} TOTAL
            </span>
          </div>

          <div className="flex flex-col border-t border-[var(--rule)]">
            {sortedHackathons.map((item) => (
              <div
                key={item.id}
                className="py-4 px-2 sm:px-4 border-b border-[var(--rule)] transition-colors hover:bg-[var(--rule)]/20 flex flex-col lg:flex-row lg:items-center justify-between gap-3"
              >
                {/* Left: Date + Name + Organizer */}
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
                  <span className="font-mono text-xs uppercase tracking-wider text-[var(--muted)] w-24 shrink-0">
                    {item.date}
                  </span>
                  <span className="font-display font-semibold text-xl uppercase tracking-tight text-[var(--fg)]">
                    {item.name}
                  </span>
                  <span className="text-sm text-[var(--muted)]">
                    · {item.organizer}
                  </span>
                </div>

                {/* Right: Track + Chip + Link */}
                <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-wider shrink-0 flex-wrap">
                  {item.track && (
                    <span className="text-[var(--muted)]">
                      {item.track}
                    </span>
                  )}

                  <HackathonChip item={item} />

                  {item.projectUrl && (
                    <a
                      href={item.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="Visit"
                      className="text-[var(--fg)] hover:underline inline-flex items-center gap-1"
                    >
                      <span>{item.urlLabel || "Project"}</span>
                      <span>↗</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
