"use client";

import React, { useState } from "react";
import Link from "next/link";
import { skills, projects } from "@/lib/data";
import { Panel } from "@/components/comic/Panel";
import { CaptionBox } from "@/components/comic/CaptionBox";
import { SectionCut } from "@/components/ui/SectionCut";

export default function SkillsPage() {
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);

  // Helper to find project slug by name if known
  const findProjectSlug = (projName: string) => {
    const clean = projName.toLowerCase().replace(/[^a-z0-9]/g, "");
    const found = projects.find(
      (p) =>
        p.title.toLowerCase().replace(/[^a-z0-9]/g, "") === clean ||
        p.slug.toLowerCase().replace(/[^a-z0-9]/g, "") === clean
    );
    return found ? found.slug : null;
  };

  const groupHeaders: Record<string, { label: string; bg: "yellow" | "paper" }> = {
    "Daily drivers": { label: "FIRST TEAM · DAILY DRIVERS", bg: "yellow" },
    "Used in projects": { label: "ROTATION · USED IN PROJECTS", bg: "paper" },
    "Coursework & learning": { label: "ACADEMY · COURSEWORK & FOUNDATIONS", bg: "paper" },
  };

  return (
    <main className="min-h-screen py-16 bg-[var(--paper)] text-[var(--ink)]">
      <SectionCut id="character-sheet" slope="down-right" bg="paper" className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-10">
          {/* Header */}
          <div className="border-b-[3px] border-[var(--ink)] pb-4 flex flex-wrap items-end justify-between gap-4">
            <div>
              <CaptionBox variant="label" bg="yellow" shadow="sm" className="mb-2">
                ISSUE #1 · CHARACTER SHEET
              </CaptionBox>
              <h1 className="font-display text-4xl sm:text-6xl uppercase tracking-tight text-[var(--ink)]">
                STATS & PROFICIENCIES
              </h1>
            </div>
            <span className="font-mono text-xs uppercase font-bold text-[var(--ink-muted)]">
              EVIDENCE-GROUNDED INVENTORIES
            </span>
          </div>

          {/* Top Telemetry Line */}
          <div className="border-2 border-[var(--ink)] bg-[var(--yellow)]/30 p-3 shadow-comic-sm font-mono text-xs font-bold text-[var(--ink)]">
            APPS = repos using the skill (checked against git history, 2026-11-15).
          </div>

          {/* Groups */}
          <div className="space-y-12">
            {skills.map((group) => {
              const meta = groupHeaders[group.category] || {
                label: group.category.toUpperCase(),
                bg: "paper",
              };

              return (
                <div key={group.category} className="space-y-4">
                  {/* Group Header */}
                  <div className="flex flex-wrap items-baseline justify-between gap-2 border-b-2 border-[var(--ink)] pb-2">
                    <CaptionBox variant="label" bg={meta.bg} shadow="sm">
                      {meta.label}
                    </CaptionBox>
                    {group.caption && (
                      <span className="font-mono text-xs text-[var(--ink-muted)]">
                        {group.caption}
                      </span>
                    )}
                  </div>

                  {/* Skills Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {group.items.map((skill) => {
                      const isExpanded = expandedSkill === skill.name;
                      const hasProjects = skill.projects && skill.projects.length > 0;

                      return (
                        <Panel
                          key={skill.name}
                          field="paper"
                          shadow="sm"
                          className="p-4 border-2 border-[var(--ink)] bg-[var(--paper)] flex flex-col justify-between"
                        >
                          <div className="flex items-center justify-between gap-4">
                            <div className="font-display text-lg sm:text-xl uppercase tracking-tight text-[var(--ink)]">
                              {skill.name}
                            </div>
                            <div className="flex items-center gap-2">
                              {skill.repos !== undefined && (
                                <span className="font-mono text-xs font-bold px-2 py-0.5 border border-[var(--ink)] bg-[var(--yellow)] text-[var(--ink)] shadow-comic-sm">
                                  APPS {skill.repos}
                                </span>
                              )}
                              {hasProjects && (
                                <button
                                  onClick={() =>
                                    setExpandedSkill(isExpanded ? null : skill.name)
                                  }
                                  data-cursor="EXPAND"
                                  data-sfx="POP!"
                                  className="font-mono text-[11px] font-bold px-2 py-0.5 border border-[var(--ink)] bg-[var(--paper)] hover:bg-[var(--cyan)] hover:text-[var(--paper)] transition-colors shadow-comic-sm"
                                  aria-expanded={isExpanded}
                                >
                                  {isExpanded ? "[- LESS]" : "[+ APPS]"}
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Expandable Project Links */}
                          {hasProjects && isExpanded && (
                            <div className="mt-3 pt-3 border-t border-[var(--rule)] space-y-2">
                              <div className="font-mono text-[10px] uppercase font-bold text-[var(--ink-muted)]">
                                CONNECTED REPOSITORIES:
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {skill.projects!.map((proj) => {
                                  const slug = findProjectSlug(proj);
                                  return slug ? (
                                    <Link
                                      key={proj}
                                      href={`/projects/${slug}`}
                                      data-cursor="VIEW"
                                      data-sfx="PAGE!"
                                      className="font-mono text-xs font-bold px-2 py-1 border border-[var(--ink)] bg-[var(--yellow)]/30 hover:bg-[var(--yellow)] transition-colors"
                                    >
                                      {proj} ↗
                                    </Link>
                                  ) : (
                                    <span
                                      key={proj}
                                      className="font-mono text-xs font-bold px-2 py-1 border border-[var(--ink)] bg-[var(--paper)] text-[var(--ink)]"
                                    >
                                      {proj}
                                    </span>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </Panel>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </SectionCut>
    </main>
  );
}
