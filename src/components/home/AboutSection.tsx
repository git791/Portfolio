"use client";

import React, { useState } from "react";
import Image from "next/image";
import { experience, education } from "@/lib/data";
import { statsRow } from "@/lib/derive";
import { Panel } from "@/components/comic/Panel";
import { CaptionBox } from "@/components/comic/CaptionBox";
import { SectionCut } from "@/components/ui/SectionCut";

export default function AboutSection() {
  const [imageError, setImageError] = useState(false);
  const stats = statsRow();

  // Group experience roles into Building / Leading / Earlier
  const buildingRoles = experience.filter((e) => e.group === "Building");
  const leadingRoles = experience.filter((e) => e.group === "Leading");
  const earlierRoles = experience.filter((e) => e.group === "Earlier");

  const eduLine =
    education && education.length > 0
      ? `${education[0].degree.toUpperCase()} · ${education[0].institution.toUpperCase()} · ${education[0].startYear}–${education[0].endYear}`
      : "B.TECH CSE · ALLIANCE UNIVERSITY · 2024–2028";

  return (
    <SectionCut id="about" slope="down-right" bg="paper" className="px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="border-b-[3px] border-[var(--ink)] pb-4 flex flex-wrap items-end justify-between gap-4">
          <div>
            <CaptionBox variant="label" bg="yellow" shadow="sm" className="mb-2">
              ISSUE #1 · ORIGIN STORY
            </CaptionBox>
            <h2 className="font-display text-4xl sm:text-5xl uppercase tracking-tight text-[var(--ink)]">
              WHO IS AYAAN?
            </h2>
          </div>
          <span className="font-mono text-xs uppercase text-[var(--ink-muted)] font-bold">
            DOSSIER & ORIGIN STRIP
          </span>
        </div>

        {/* Top Grid: Portrait + Exact Bio Text */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Framed full-colour portrait */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <Panel field="paper" shadow="lg" tilt={-0.5} className="w-full max-w-sm p-3 bg-[var(--paper)]">
              <div className="relative aspect-[3/4] w-full border-2 border-[var(--ink)] bg-[var(--paper)] overflow-hidden">
                {!imageError ? (
                  <Image
                    src="/images/profile.jpeg"
                    alt="Portrait of Mohammed Ayaan Adil Ahmed"
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-full h-full bg-[var(--yellow)] flex items-center justify-center font-display text-6xl text-[var(--ink)]">
                    AY
                  </div>
                )}
              </div>
              <div className="mt-3 text-center font-mono text-[11px] uppercase tracking-wider font-bold text-[var(--ink)] border-t border-[var(--rule)] pt-2">
                MOHAMMED AYAAN ADIL AHMED · B.TECH CSE 2028
              </div>
            </Panel>
          </div>

          {/* Right: Exact About Text in Large Caption Box */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <CaptionBox variant="body" bg="paper" shadow="base" className="p-6 text-base sm:text-lg leading-relaxed text-[var(--ink)] border-[3px]">
              <p className="mb-4">
                CSE student in Bengaluru, building since 2019. I build autonomous AI agents and cloud systems for challenges that rarely get software: a shopkeeper dictating in Hindi, a rural clinic triage, a railway announcement in three languages.
              </p>
              <p className="mb-4">
                I lead engineering teams, architect distributed systems, and write the core code. I also run the AWS Student Builder Group, Hack Club, and the IEEE student branch.
              </p>
              <p className="text-sm font-mono text-[var(--ink)] bg-[var(--yellow)]/30 p-2.5 border-2 border-[var(--ink)] font-bold">
                Actively seeking engineering internships across backend systems, cloud infrastructure, and agentic AI. Eager to dive into high-impact codebases, solve complex engineering bottlenecks, and ship fast.
              </p>
            </CaptionBox>

            {/* Four Stat Boxes from statsRow() */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="border-[2px] border-[var(--ink)] bg-[var(--yellow)] p-3 text-center shadow-comic-sm">
                <div className="font-display text-3xl sm:text-4xl text-[var(--ink)]">{stats.reposStarted2026}</div>
                <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider font-bold text-[var(--ink)] mt-1">
                  REPOS STARTED (2026)
                </div>
              </div>

              <div className="border-[2px] border-[var(--ink)] bg-[var(--paper)] p-3 text-center shadow-comic-sm">
                <div className="font-display text-3xl sm:text-4xl text-[var(--ink)]">{stats.hackathonsCount}</div>
                <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider font-bold text-[var(--ink)] mt-1">
                  HACKATHONS
                </div>
              </div>

              <div className="border-[2px] border-[var(--ink)] bg-[var(--cyan)] p-3 text-center shadow-comic-sm">
                <div className="font-display text-3xl sm:text-4xl text-[var(--ink)]">{stats.eventsRun}</div>
                <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider font-bold text-[var(--ink)] mt-1">
                  EVENTS RUN
                </div>
              </div>

              <div className="border-[2px] border-[var(--ink)] bg-[var(--paper)] p-3 text-center shadow-comic-sm">
                <div className="font-display text-3xl sm:text-4xl text-[var(--ink)]">{stats.largestAudience}</div>
                <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider font-bold text-[var(--ink)] mt-1">
                  LARGEST AUDIENCE
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Origin Strip: Career Roles & Education */}
        <div className="border-[3px] border-[var(--ink)] bg-[var(--paper)] p-6 shadow-comic space-y-6">
          <div className="flex items-center justify-between border-b-2 border-[var(--ink)] pb-3">
            <h3 className="font-display text-2xl uppercase tracking-wide text-[var(--ink)]">
              THE ORIGIN STRIP (CHRONOLOGY)
            </h3>
            <span className="font-mono text-xs uppercase font-bold text-[var(--ink-muted)]">
              CAREER TIMELINE
            </span>
          </div>

          {/* Education Line */}
          <div className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider px-3 py-2 bg-[var(--yellow)] border border-[var(--ink)] inline-block shadow-comic-sm">
            {eduLine}
          </div>

          {/* Groups: Building, Leading, Earlier */}
          <div className="space-y-6">
            {/* Building Roles */}
            {buildingRoles.length > 0 && (
              <div className="space-y-2">
                <div className="font-mono text-xs uppercase tracking-widest font-bold text-[var(--magenta)]">
                  // BUILDING
                </div>
                {buildingRoles.map((role) => (
                  <details
                    key={role.id}
                    className="group border border-[var(--ink)] bg-[var(--paper)] p-2.5 cursor-pointer font-mono text-xs"
                  >
                    <summary className="font-bold flex flex-wrap items-center justify-between gap-2 list-none select-none">
                      <span>
                        {role.startDate}–{role.endDate} · {role.role.toUpperCase()} · {role.organization.toUpperCase()} · {role.type.toUpperCase()}
                      </span>
                      <span className="text-[10px] text-[var(--ink-muted)] group-open:hidden">[+ DETAILS]</span>
                      <span className="text-[10px] text-[var(--ink-muted)] hidden group-open:inline">[- LESS]</span>
                    </summary>
                    <p className="mt-2 pt-2 border-t border-[var(--rule)] text-[var(--ink-muted)] font-[family-name:var(--font-body)] text-xs sm:text-sm leading-relaxed">
                      {role.description}
                    </p>
                  </details>
                ))}
              </div>
            )}

            {/* Leading Roles */}
            {leadingRoles.length > 0 && (
              <div className="space-y-2">
                <div className="font-mono text-xs uppercase tracking-widest font-bold text-[var(--cyan)]">
                  // LEADING
                </div>
                {leadingRoles.map((role) => (
                  <details
                    key={role.id}
                    className="group border border-[var(--ink)] bg-[var(--paper)] p-2.5 cursor-pointer font-mono text-xs"
                  >
                    <summary className="font-bold flex flex-wrap items-center justify-between gap-2 list-none select-none">
                      <span>
                        {role.startDate}–{role.endDate} · {role.role.toUpperCase()} · {role.organization.toUpperCase()} · {role.type.toUpperCase()}
                      </span>
                      <span className="text-[10px] text-[var(--ink-muted)] group-open:hidden">[+ DETAILS]</span>
                      <span className="text-[10px] text-[var(--ink-muted)] hidden group-open:inline">[- LESS]</span>
                    </summary>
                    <p className="mt-2 pt-2 border-t border-[var(--rule)] text-[var(--ink-muted)] font-[family-name:var(--font-body)] text-xs sm:text-sm leading-relaxed">
                      {role.description}
                    </p>
                  </details>
                ))}
              </div>
            )}

            {/* Earlier Roles */}
            {earlierRoles.length > 0 && (
              <div className="space-y-2">
                <div className="font-mono text-xs uppercase tracking-widest font-bold text-[var(--ink-muted)]">
                  // EARLIER
                </div>
                {earlierRoles.map((role) => (
                  <details
                    key={role.id}
                    className="group border border-[var(--ink)] bg-[var(--paper)] p-2.5 cursor-pointer font-mono text-xs"
                  >
                    <summary className="font-bold flex flex-wrap items-center justify-between gap-2 list-none select-none">
                      <span>
                        {role.startDate}–{role.endDate} · {role.role.toUpperCase()} · {role.organization.toUpperCase()} · {role.type.toUpperCase()}
                      </span>
                      <span className="text-[10px] text-[var(--ink-muted)] group-open:hidden">[+ DETAILS]</span>
                      <span className="text-[10px] text-[var(--ink-muted)] hidden group-open:inline">[- LESS]</span>
                    </summary>
                    <p className="mt-2 pt-2 border-t border-[var(--rule)] text-[var(--ink-muted)] font-[family-name:var(--font-body)] text-xs sm:text-sm leading-relaxed">
                      {role.description}
                    </p>
                  </details>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </SectionCut>
  );
}
