"use client";

import { useState } from "react";
import Link from "next/link";
import Decode from "@/components/ui/Decode";
import { skills, projects } from "@/lib/data";
import type { SkillItem } from "@/lib/types";

function getProjectTitle(slug: string) {
  const p = projects.find((proj) => proj.slug === slug);
  return p ? p.title : slug;
}

function SkillRow({ item }: { item: SkillItem }) {
  const [expanded, setExpanded] = useState(false);
  const hasProjects = Boolean(item.projects && item.projects.length > 0);

  return (
    <div className="py-3 px-2 sm:px-4 border-b border-[var(--rule)] transition-colors hover:bg-[var(--rule)]/20">
      <div
        className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
          hasProjects ? "cursor-pointer" : ""
        }`}
        onClick={() => hasProjects && setExpanded(!expanded)}
        onKeyDown={(e) => {
          if (hasProjects && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            setExpanded(!expanded);
          }
        }}
        tabIndex={hasProjects ? 0 : undefined}
        role={hasProjects ? "button" : undefined}
        aria-expanded={hasProjects ? expanded : undefined}
      >
        <div className="flex flex-wrap items-baseline gap-2 sm:gap-3">
          <span className="font-display font-medium text-lg uppercase tracking-tight text-[var(--fg)]">
            {item.name}
          </span>
          {item.note && (
            <span className="font-mono text-xs text-[var(--muted)]">
              — {item.note}
            </span>
          )}
        </div>

        <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-wider shrink-0">
          {item.repos !== undefined ? (
            <span className="px-2 py-0.5 border border-[var(--rule)] text-[var(--fg)] bg-[#141512]/60">
              x {item.repos}
            </span>
          ) : null}

          {hasProjects && (
            <span className="text-[var(--muted)] text-[10px]">
              {expanded ? "▲ HIDE" : `▼ ${item.projects!.length} BUILDS`}
            </span>
          )}
        </div>
      </div>

      {/* Expanded Linked Projects */}
      {hasProjects && expanded && (
        <div className="mt-3 pt-3 border-t border-[var(--rule)] flex flex-wrap gap-2">
          {item.projects!.map((slug) => (
            <Link
              key={slug}
              href={`/projects/${slug}`}
              data-cursor="Open"
              className="font-mono text-xs px-2.5 py-1 border border-[var(--rule)] text-[var(--muted)] hover:text-[var(--fg)] hover:border-[var(--fg)] transition-colors inline-flex items-center gap-1.5"
            >
              <span>{getProjectTitle(slug)}</span>
              <span className="text-[10px]">↗</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Skills() {
  const totalSkills = skills.reduce((acc, g) => acc + g.items.length, 0);

  return (
    <section className="py-24 border-t border-[var(--rule)] min-h-screen">
      <div className="container-main">
        {/* Verification Note */}
        <div className="mb-4">
          <p className="font-mono text-xs text-[var(--muted)] uppercase tracking-wider">
            Counts = repos using the skill (verified against git history, 2026-11-15).
          </p>
        </div>

        {/* Header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--muted)]">
            INDEX /
          </span>
          <Decode
            text="SKILLS"
            className="font-display font-bold text-4xl sm:text-5xl uppercase tracking-tight text-[var(--fg)]"
          />
        </div>

        {/* 3 Skill Groups */}
        <div className="flex flex-col gap-16">
          {skills.map((group) => (
            <div key={group.category} className="flex flex-col">
              {/* Category Header */}
              <div className="flex flex-col gap-1 pb-3 border-b border-[var(--rule)]">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-widest text-[var(--fg)] font-semibold">
                    {group.category}
                  </span>
                  <span className="font-mono text-xs uppercase tracking-wider text-[var(--muted)]">
                    {group.items.length} ENTRIES
                  </span>
                </div>
                {group.caption && (
                  <p className="font-mono text-xs text-[var(--muted)]">
                    {group.caption}
                  </p>
                )}
              </div>

              {/* Items Ledger */}
              <div className="flex flex-col">
                {group.items.map((item) => (
                  <SkillRow key={item.name} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
