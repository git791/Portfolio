"use client";

import { useMemo, useState } from "react";
import Decode from "@/components/ui/Decode";
import ProjectRow from "@/components/ui/ProjectRow";
import { projects } from "@/lib/data";
import commitsJson from "@/data/commits.json";

type TabType = "ALL" | "EDITORIAL" | "SYSTEMS" | "PLAYGROUND";

export default function Projects() {
  const [activeTab, setActiveTab] = useState<TabType>("ALL");
  const [filterQuery, setFilterQuery] = useState("");

  // Build first-commit date map from commits.json
  const reposFirstDate = useMemo(() => {
    const map: Record<string, string> = {};
    commitsJson.repos.forEach((r) => {
      map[r.name.toLowerCase()] = r.first;
    });
    return map;
  }, []);

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    let list = [...projects];

    // Filter by tab
    if (activeTab === "EDITORIAL") {
      list = list.filter((p) => p.tier === "editorial");
    } else if (activeTab === "SYSTEMS") {
      list = list.filter((p) => p.tier === "depth" || p.tier === "secondary");
    } else if (activeTab === "PLAYGROUND") {
      list = list.filter((p) => p.tier === "playground");
    }

    // Filter by text query (tags, title, problem, category)
    if (filterQuery.trim()) {
      const q = filterQuery.toLowerCase().trim();
      list = list.filter((p) => {
        const matchesTag = p.tags.some((t) => t.toLowerCase().includes(q));
        const matchesTitle = p.title.toLowerCase().includes(q);
        const matchesProblem = p.problem ? p.problem.toLowerCase().includes(q) : false;
        const matchesCategory = p.category.toLowerCase().includes(q);
        return matchesTag || matchesTitle || matchesProblem || matchesCategory;
      });
    }

    // Sort by year desc, then repo first-commit date desc
    list.sort((a, b) => {
      const yearDiff = parseInt(b.year, 10) - parseInt(a.year, 10);
      if (yearDiff !== 0) return yearDiff;

      const repoA = a.githubUrl.split("/").pop()?.toLowerCase() || "";
      const repoB = b.githubUrl.split("/").pop()?.toLowerCase() || "";
      const dateA = a.repoFacts?.first || reposFirstDate[repoA] || `${a.year}-01-01`;
      const dateB = b.repoFacts?.first || reposFirstDate[repoB] || `${b.year}-01-01`;

      return dateB.localeCompare(dateA);
    });

    return list;
  }, [activeTab, filterQuery, reposFirstDate]);

  const tabs: { id: TabType; label: string; count: number }[] = [
    { id: "ALL", label: "ALL", count: projects.length },
    {
      id: "EDITORIAL",
      label: "EDITORIAL",
      count: projects.filter((p) => p.tier === "editorial").length,
    },
    {
      id: "SYSTEMS",
      label: "SYSTEMS",
      count: projects.filter((p) => p.tier === "depth" || p.tier === "secondary").length,
    },
    {
      id: "PLAYGROUND",
      label: "PLAYGROUND",
      count: projects.filter((p) => p.tier === "playground").length,
    },
  ];

  return (
    <section className="py-24 border-t border-[var(--rule)] min-h-screen">
      <div className="container-main">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--muted)]">
                INDEX /
              </span>
              <Decode
                text="PROJECTS"
                className="font-display font-bold text-4xl sm:text-5xl uppercase tracking-tight text-[var(--fg)]"
              />
            </div>
            <p className="font-mono text-xs uppercase tracking-wider text-[var(--muted)]">
              {projects.length} TOTAL BUILDS · SIGNAL TO STRUCTURE
            </p>
          </div>

          {/* Text filter by tag */}
          <div className="w-full md:w-72">
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Filter by tag (e.g. AWS, Python)..."
              aria-label="Filter projects by tag"
              className="w-full bg-transparent border border-[var(--rule)] px-3 py-2 font-mono text-xs text-[var(--fg)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--fg)] transition-colors"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-[var(--rule)]">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`font-mono text-xs uppercase tracking-wider px-3 py-1.5 border transition-colors flex items-center gap-2 shrink-0 ${
                  isActive
                    ? "bg-[var(--fg)] text-[var(--bg)] border-[var(--fg)] font-semibold"
                    : "bg-transparent text-[var(--muted)] border-transparent hover:text-[var(--fg)] hover:border-[var(--rule)]"
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] ${isActive ? "opacity-80" : "opacity-60"}`}>
                  ({tab.count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Projects Ledger */}
        <div className="flex flex-col border-t border-[var(--rule)]">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, idx) => (
              <ProjectRow key={project.id} project={project} index={idx} />
            ))
          ) : (
            <div className="py-16 text-center font-mono text-xs uppercase tracking-wider text-[var(--muted)]">
              No projects match the current filter.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
