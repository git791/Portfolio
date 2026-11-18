"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/lib/data";
import { Panel } from "@/components/comic/Panel";
import { CaptionBox } from "@/components/comic/CaptionBox";
import { Chip } from "@/components/comic/Chip";
import { CreditsBox } from "@/components/comic/CreditsBox";
import { DotField } from "@/components/comic/DotField";
import { SectionCut } from "@/components/ui/SectionCut";

type TabType = "ALL" | "EDITORIAL" | "SYSTEMS" | "PLAYGROUND";

const fieldColors = ["paper", "cyan", "yellow"] as const;

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("ALL");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.tags?.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, []);

  // Filter projects by tab and tag
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      // Tab filter
      if (activeTab === "EDITORIAL" && p.tier !== "editorial") return false;
      if (activeTab === "PLAYGROUND" && p.tier !== "playground") return false;
      if (
        activeTab === "SYSTEMS" &&
        p.tier !== "secondary" &&
        p.tier !== "depth" &&
        p.tier !== "archive"
      ) {
        return false;
      }

      // Tag filter
      if (selectedTag && !p.tags?.includes(selectedTag)) return false;

      return true;
    });
  }, [activeTab, selectedTag]);

  return (
    <main className="min-h-screen py-16 bg-[var(--paper)]">
      <SectionCut id="projects-collection" slope="down-right" bg="paper" className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="border-b-[3px] border-[var(--ink)] pb-4 flex flex-wrap items-end justify-between gap-4">
            <div>
              <CaptionBox variant="label" bg="yellow" shadow="sm" className="mb-2">
                ISSUE #1 · COMPLETE ARCHIVE
              </CaptionBox>
              <h1 className="font-display text-4xl sm:text-6xl uppercase tracking-tight text-[var(--ink)]">
                THE COLLECTION
              </h1>
            </div>
            <div className="font-mono text-xs uppercase font-bold text-[var(--ink-muted)]">
              SHOWING {filteredProjects.length} OF {projects.length} REPOSITORIES
            </div>
          </div>

          {/* Filter Controls: Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="flex flex-wrap gap-2">
              {(["ALL", "EDITORIAL", "SYSTEMS", "PLAYGROUND"] as TabType[]).map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveTab(tab);
                    }}
                    data-cursor="SELECT"
                    data-sfx="POP!"
                    className={`px-4 py-2 font-mono text-xs uppercase font-bold border-2 border-[var(--ink)] transition-transform shadow-comic-sm ${
                      isActive
                        ? "bg-[var(--yellow)] text-[var(--ink)] scale-105"
                        : "bg-[var(--paper)] text-[var(--ink)] hover:bg-[var(--yellow)]/40"
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>

            {/* Tag Filter Reset if active */}
            {selectedTag && (
              <button
                onClick={() => setSelectedTag(null)}
                className="font-mono text-xs font-bold px-3 py-1.5 border border-[var(--ink)] bg-[var(--magenta)] text-[var(--paper)] hover:opacity-90 shadow-comic-sm"
              >
                CLEAR FILTER: {selectedTag.toUpperCase()} ✕
              </button>
            )}
          </div>

          {/* Tag Filter Pills */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {allTags.map((tag) => {
              const isSelected = selectedTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(isSelected ? null : tag)}
                  className={`px-2 py-0.5 font-mono text-[11px] font-bold border transition-colors ${
                    isSelected
                      ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]"
                      : "border-[var(--ink)] bg-[var(--paper)] text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[var(--yellow)]/30"
                  }`}
                >
                  #{tag}
                </button>
              );
            })}
          </div>

          {/* Projects Grid: Compact 6.1 Variant */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            {filteredProjects.map((project, idx) => {
              const field = fieldColors[idx % fieldColors.length];
              const hasImage = Boolean(project.image);

              return (
                <div key={project.slug} className="group relative flex flex-col">
                  <Link
                    href={`/projects/${project.slug}`}
                    data-cursor="OPEN ISSUE"
                    data-sfx="PAGE!"
                    className="block h-full focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--ink)]"
                  >
                    <Panel
                      field={field}
                      shadow="base"
                      className="h-full flex flex-col justify-between p-4 relative overflow-hidden group-hover:shadow-[6px_6px_0px_var(--ink)] transition-all"
                    >
                      {/* Halftone Dot Overlay */}
                      <DotField opacity={0.12} color="var(--ink)" cellSize={8} />

                      {/* Top Meta Chips */}
                      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 mb-3">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <Chip variant="mvp" />
                          {project.liveUrl && <Chip variant="live" />}
                          <span className="font-mono text-[11px] font-bold px-2 py-0.5 border border-[var(--ink)] bg-[var(--paper)] text-[var(--ink)]">
                            {project.year}
                          </span>
                        </div>
                        <span className="font-mono text-[10px] uppercase font-bold text-[var(--ink-muted)] px-1.5 py-0.5 bg-[var(--paper)] border border-[var(--ink)]">
                          {project.tier}
                        </span>
                      </div>

                      {/* Plate: One-Ink Image Plate or Typographic Plate */}
                      <div className="relative z-10 w-full aspect-video border-2 border-[var(--ink)] overflow-hidden bg-[var(--paper)] mb-3 flex items-center justify-center">
                        {hasImage ? (
                          <div className="relative w-full h-full bg-[var(--cyan)]">
                            <Image
                              src={project.image!}
                              alt={project.title}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="object-cover grayscale contrast-125 mix-blend-multiply"
                            />
                            <DotField opacity={0.15} color="var(--ink)" cellSize={6} />
                          </div>
                        ) : (
                          <div className="w-full h-full p-4 flex flex-col justify-between bg-[var(--yellow)]/30 text-[var(--ink)]">
                            <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-muted)] font-bold">
                              TYPOGRAPHIC PLATE · {project.category}
                            </div>
                            <div className="font-display text-xl uppercase tracking-tight text-[var(--ink)] leading-none my-auto">
                              {project.title}
                            </div>
                            <div className="font-mono text-[10px] text-[var(--ink-muted)]">
                              GIT791 // {project.slug.toUpperCase()}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Text in Solid Paper Box */}
                      <div className="relative z-10 bg-[var(--paper)] border-2 border-[var(--ink)] p-3 shadow-comic-sm space-y-2 mt-auto">
                        <h2 className="font-display text-xl uppercase tracking-tight text-[var(--ink)] leading-none">
                          {project.title}
                        </h2>
                        {/* problem line wrapped with NO ellipsis */}
                        <p className="font-[family-name:var(--font-body)] text-xs text-[var(--ink)] leading-relaxed">
                          {project.problem}
                        </p>
                      </div>

                      {/* Credits Box */}
                      <div className="relative z-10 mt-3 pt-1">
                        <CreditsBox
                          project={{ role: project.role, team: project.team }}
                          leadName="Ayaan"
                        />
                      </div>
                    </Panel>
                  </Link>
                </div>
              );
            })}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center p-12 border-2 border-dashed border-[var(--ink)] bg-[var(--yellow)]/20 font-mono text-sm text-[var(--ink)] font-bold">
              NO PROJECTS MATCH THE CURRENT FILTER SELECTION.
            </div>
          )}
        </div>
      </SectionCut>
    </main>
  );
}
