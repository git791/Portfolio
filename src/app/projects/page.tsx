"use client";

import { useState, useMemo } from "react";
import PenPicture from "@/components/ui/PenPicture";
import { projects } from "@/lib/data";

type Tab = "ALL" | "EDITORIAL" | "SYSTEMS" | "PLAYGROUND";

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("ALL");
  const [selectedTag, setSelectedTag] = useState<string>("ALL");

  // Extract all unique tags
  const allTags = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return ["ALL", ...Array.from(set).sort()];
  }, []);

  // Filter projects by tab and tag
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      // Tab filter
      let matchesTab = true;
      if (activeTab === "EDITORIAL") matchesTab = p.tier === "editorial";
      else if (activeTab === "SYSTEMS") matchesTab = p.tier === "secondary" || p.tier === "depth" || p.tier === "archive";
      else if (activeTab === "PLAYGROUND") matchesTab = p.tier === "playground";

      // Tag filter
      let matchesTag = true;
      if (selectedTag !== "ALL") {
        matchesTag = p.tags.includes(selectedTag);
      }

      return matchesTab && matchesTag;
    });
  }, [activeTab, selectedTag]);

  return (
    <div className="surface-newsprint min-h-screen py-16 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Page Header */}
        <div className="border-b border-[var(--rule-light)] pb-6 space-y-2">
          <span className="font-mono text-xs uppercase tracking-wider text-[var(--muted-light)]">
            MATCHDAY PROGRAMME · COMPLETE LEDGER
          </span>
          <h1 className="text-display-xl text-[var(--night)]">
            PROJECTS & BUILDS
          </h1>
          <p className="font-mono text-xs text-[var(--muted-light)] uppercase tracking-wider">
            {projects.length} TOTAL BUILDS · REPOSITORIES BACK TO 2019
          </p>
        </div>

        {/* Programme Tabs & Tag Filter */}
        <div className="space-y-4">
          {/* Main Tabs */}
          <div className="flex flex-wrap gap-2 font-mono text-xs uppercase tracking-wider border-b border-[var(--rule-light)] pb-4">
            {(["ALL", "EDITORIAL", "SYSTEMS", "PLAYGROUND"] as Tab[]).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => {
                  setActiveTab(tab);
                  setSelectedTag("ALL");
                }}
                className={`px-4 py-1.5 border transition-colors ${
                  activeTab === tab
                    ? "bg-[var(--night)] text-[var(--chalk)] border-[var(--night)] font-bold"
                    : "border-[var(--rule-light)] text-[var(--night)] hover:border-[var(--night)]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Quick Tag Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="font-mono text-[10px] text-[var(--muted-light)] uppercase mr-2">
              FILTER TAG:
            </span>
            {allTags.slice(0, 10).map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(tag)}
                className={`font-mono text-[10px] uppercase px-2 py-0.5 border transition-colors ${
                  selectedTag === tag
                    ? "bg-[var(--red)] text-[var(--chalk)] border-[var(--red)] font-semibold"
                    : "border-[var(--rule-light)] text-[var(--muted-light)] hover:text-[var(--night)]"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Projects PenPicture List */}
        <div className="divide-y divide-[var(--rule-light)] border-t border-b border-[var(--rule-light)]">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <PenPicture key={project.slug} project={project} />
            ))
          ) : (
            <div className="py-12 text-center font-mono text-xs text-[var(--muted-light)]">
              NO PROJECTS MATCH THE SELECTED FILTER.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
