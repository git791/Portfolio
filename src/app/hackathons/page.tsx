import React from "react";
import type { Metadata } from "next";
import { hackathons } from "@/lib/data";
import { partOf3 } from "@/lib/derive";
import { Panel } from "@/components/comic/Panel";
import { CaptionBox } from "@/components/comic/CaptionBox";
import { Chip } from "@/components/comic/Chip";
import { SectionCut } from "@/components/ui/SectionCut";

export const metadata: Metadata = {
  title: "Hackathons & Sprints | Mohammed Ayaan",
  description: "21 hackathons, competitive sprint builds, and crossovers since 2025.",
};

export default function HackathonsPage() {
  // Sort newest first
  const sorted = [...hackathons].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  // Highlights: entries with placement
  const highlights = sorted.filter((h) => Boolean(h.placement));

  return (
    <main className="min-h-screen py-16 bg-[var(--paper)] text-[var(--ink)]">
      <SectionCut id="crossovers" slope="down-right" bg="paper" className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <div className="border-b-[3px] border-[var(--ink)] pb-4 flex flex-wrap items-end justify-between gap-4">
            <div>
              <CaptionBox variant="label" bg="yellow" shadow="sm" className="mb-2">
                ISSUE #1 · CROSSOVERS & COMPETITIONS
              </CaptionBox>
              <h1 className="font-display text-4xl sm:text-6xl uppercase tracking-tight text-[var(--ink)]">
                HACKATHON SPRINTS
              </h1>
            </div>
            <span className="font-mono text-xs uppercase font-bold text-[var(--ink-muted)]">
              {sorted.length} SPRINTS RECORDED SINCE 2025
            </span>
          </div>

          {/* Highlights Strip on Top */}
          {highlights.length > 0 && (
            <div className="space-y-4">
              <CaptionBox variant="label" bg="yellow" shadow="sm">
                HIGHLIGHT CROSSOVERS & PODIUM FINISHES
              </CaptionBox>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {highlights.map((h) => (
                  <Panel
                    key={h.id}
                    field="paper"
                    shadow="base"
                    className="p-4 border-[3px] border-[var(--ink)] bg-[var(--paper)] flex flex-col justify-between space-y-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs font-bold text-[var(--ink-muted)]">
                        {h.date}
                      </span>
                      <span className="font-mono text-xs font-bold px-2 py-0.5 border-2 border-[var(--ink)] bg-[var(--yellow)] text-[var(--ink)] shadow-comic-sm">
                        {h.placement!.toUpperCase()}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-display text-xl uppercase tracking-tight text-[var(--ink)]">
                        {h.name}
                      </h3>
                      <div className="font-mono text-xs text-[var(--ink-muted)] mt-1">
                        {h.organizer}
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-2 border-t border-[var(--rule)]">
                      <Chip variant="part" part={partOf3(h.stage)} />
                      {h.projectUrl && (
                        <a
                          href={h.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-cursor="VISIT"
                          data-sfx="ZIP!"
                          className="font-mono text-xs font-bold underline hover:text-[var(--cyan)]"
                        >
                          {h.urlLabel || "VIEW ENTRY"} ↗
                        </a>
                      )}
                    </div>
                  </Panel>
                ))}
              </div>
            </div>
          )}

          {/* Complete Chronological List: Row = date · competition · organizer · track · PART x OF 3 · placement chip · link */}
          <div className="space-y-4">
            <CaptionBox variant="label" bg="paper" shadow="sm">
              COMPLETE CROSSOVER CHRONOLOGY
            </CaptionBox>

            <div className="space-y-3">
              {sorted.map((h) => (
                <div
                  key={h.id}
                  className="border-2 border-[var(--ink)] bg-[var(--paper)] p-4 shadow-comic-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  {/* Left: Date, Competition, Organizer, Track */}
                  <div className="space-y-1 sm:max-w-xl">
                    <div className="flex flex-wrap items-center gap-2 font-mono text-xs font-bold">
                      <span className="bg-[var(--yellow)]/30 px-2 py-0.5 border border-[var(--ink)] text-[var(--ink)]">
                        {h.date}
                      </span>
                      <span className="text-[var(--ink-muted)]">·</span>
                      <span className="text-[var(--ink-muted)] uppercase">{h.organizer}</span>
                      {h.track && (
                        <>
                          <span className="text-[var(--ink-muted)]">·</span>
                          <span className="text-[var(--ink-muted)] font-normal">
                            TRACK: {h.track}
                          </span>
                        </>
                      )}
                    </div>
                    <div className="font-display text-xl uppercase tracking-tight text-[var(--ink)]">
                      {h.name}
                    </div>
                  </div>

                  {/* Right: Chips & Links */}
                  <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                    <Chip variant="part" part={partOf3(h.stage)} />
                    {h.placement && (
                      <span className="font-mono text-xs font-bold px-2 py-0.5 border-2 border-[var(--ink)] bg-[var(--yellow)] text-[var(--ink)] shadow-comic-sm">
                        {h.placement.toUpperCase()}
                      </span>
                    )}
                    {h.projectUrl && (
                      <a
                        href={h.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="VISIT"
                        data-sfx="ZIP!"
                        className="font-mono text-xs font-bold px-3 py-1 border-2 border-[var(--ink)] bg-[var(--paper)] hover:bg-[var(--cyan)] hover:text-[var(--paper)] transition-colors shadow-comic-sm"
                      >
                        {h.urlLabel || "ENTRY"} ↗
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionCut>
    </main>
  );
}
