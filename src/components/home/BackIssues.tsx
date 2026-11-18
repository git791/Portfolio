"use client";

import React, { useState } from "react";
import { issuesByYear, type YearIssue, type IssueWeek } from "@/lib/derive";
import { projects } from "@/lib/data";
import { SectionCut } from "@/components/ui/SectionCut";
import { CaptionBox } from "@/components/comic/CaptionBox";

export default function BackIssues() {
  const issues = issuesByYear();
  const [activeTooltip, setActiveTooltip] = useState<{
    text: string;
    x: number;
    y: number;
  } | null>(null);

  // Match repos to projects
  const isKnownProject = (repoName: string) => {
    const clean = repoName.toLowerCase().replace(/[^a-z0-9]/g, "");
    return projects.some((p) => {
      const pSlug = p.slug.toLowerCase().replace(/[^a-z0-9]/g, "");
      const pRepo = p.githubUrl.split("/").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "";
      return clean.includes(pSlug) || clean.includes(pRepo) || pSlug.includes(clean);
    });
  };

  const formatWeekDate = (isoDate: string) => {
    try {
      const [y, m, d] = isoDate.split("-").map(Number);
      const date = new Date(Date.UTC(y, m - 1, d));
      const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
      return `${String(d).padStart(2, "0")} ${monthNames[date.getUTCMonth()]} ${y}`;
    } catch {
      return isoDate;
    }
  };

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLDivElement> | React.FocusEvent<HTMLDivElement>,
    week: IssueWeek
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const formattedDate = formatWeekDate(week.week);
    const topRepo = week.topRepos && week.topRepos.length > 0 ? week.topRepos[0] : "";
    const repoLabel = topRepo && isKnownProject(topRepo) ? topRepo.toUpperCase() : topRepo ? "OTHER REPO" : "";
    const text = `WEEK OF ${formattedDate} · ${week.count} COMMITS${repoLabel ? ` · ${repoLabel}` : ""}`;

    setActiveTooltip({
      text,
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
    });
  };

  const handleMouseLeave = () => {
    setActiveTooltip(null);
  };

  return (
    <SectionCut id="ledger" slope="down-left" bg="paper" className="px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8 select-none">
        {/* Header */}
        <div className="border-b-[3px] border-[var(--ink)] pb-4 flex flex-wrap items-end justify-between gap-4">
          <div>
            <CaptionBox variant="label" bg="yellow" shadow="sm" className="mb-2">
              HISTORICAL RECORD · 2019–2026
            </CaptionBox>
            <h2 className="font-display text-4xl sm:text-5xl uppercase tracking-tight text-[var(--ink)]">
              BACK ISSUES
            </h2>
          </div>
          <div className="font-mono text-xs uppercase text-[var(--ink-muted)] font-bold flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-3 h-3 bg-[var(--cyan)] border border-[var(--ink)]" /> 1–2 COMMITS
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-3 h-3 bg-[var(--magenta)] border border-[var(--ink)]" /> 3+ COMMITS
            </span>
          </div>
        </div>

        {/* Yearly Rows */}
        <div className="space-y-4">
          {issues.map((yearIssue: YearIssue) => (
            <div
              key={yearIssue.year}
              className="border-[2px] border-[var(--ink)] bg-[var(--paper)] p-3 sm:p-4 shadow-comic-sm flex flex-col md:flex-row md:items-center gap-3"
            >
              {/* Year Label */}
              <div className="font-mono text-xs uppercase font-bold tracking-wider text-[var(--ink)] min-w-[120px] flex items-center justify-between md:justify-start gap-2 border-b md:border-b-0 md:border-r border-[var(--rule)] pb-2 md:pb-0 md:pr-3">
                <span>{yearIssue.label}</span>
                <span className="text-[10px] text-[var(--ink-muted)]">
                  ({yearIssue.totalCommits})
                </span>
              </div>

              {/* Weekly commit blocks OR No Issue panel */}
              <div className="flex-1 flex flex-wrap items-center gap-1.5 min-h-[32px]">
                {yearIssue.noIssue ? (
                  <div className="border border-dashed border-[var(--ink-muted)] bg-[var(--paper)] px-3 py-1 font-mono text-xs uppercase text-[var(--ink-muted)]">
                    NO ISSUE THIS YEAR
                  </div>
                ) : (
                  yearIssue.weeks.map((week) => {
                    // Width proportional to commit count: min 8px, max 48px
                    const widthPx = Math.min(48, Math.max(8, week.count * 2.5));
                    const isHigh = week.count >= 3;
                    const bgClass = isHigh ? "bg-[var(--magenta)]" : "bg-[var(--cyan)]";

                    return (
                      <div
                        key={week.week}
                        tabIndex={0}
                        onMouseEnter={(e) => handleMouseEnter(e, week)}
                        onMouseLeave={handleMouseLeave}
                        onFocus={(e) => handleMouseEnter(e, week)}
                        onBlur={handleMouseLeave}
                        style={{
                          width: `${widthPx}px`,
                          transition: "transform 0.08s steps(2)",
                        }}
                        className={`h-6 border border-[var(--ink)] ${bgClass} cursor-pointer hover:scale-125 focus:scale-125 focus:outline-none`}
                        aria-label={`Week of ${week.week}: ${week.count} commits`}
                      />
                    );
                  })
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Accessible Visually Hidden Table for Screen Readers */}
        <table className="sr-only">
          <caption>Commit history by year from 2019 to 2026</caption>
          <thead>
            <tr>
              <th scope="col">Year</th>
              <th scope="col">Total Commits</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {issues.map((i) => (
              <tr key={i.year}>
                <td>{i.year}</td>
                <td>{i.totalCommits}</td>
                <td>{i.noIssue ? "No issue this year" : "Active commits"}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Global floating tooltip */}
        {activeTooltip && (
          <div
            className="fixed pointer-events-none z-[10000] -translate-x-1/2 -translate-y-full"
            style={{
              left: `${activeTooltip.x}px`,
              top: `${activeTooltip.y}px`,
            }}
          >
            <CaptionBox variant="label" bg="yellow" shadow="sm">
              {activeTooltip.text}
            </CaptionBox>
          </div>
        )}
      </div>
    </SectionCut>
  );
}
