"use client";

import { useState } from "react";
import Image from "next/image";
import PassLink from "@/components/ui/PassLink";
import { skillGroupsAsSquad } from "@/lib/derive";
import { cutouts } from "@/data/football";

export default function SkillsPage() {
  const [vanDijkError, setVanDijkError] = useState(false);
  const squad = skillGroupsAsSquad();
  const vanDijkCutout = cutouts.find((c) => c.key === "vandijk");

  return (
    <div className="surface-newsprint min-h-screen py-16 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header with Van Dijk Cutout */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[var(--rule-light)] pb-6">
          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--muted-light)]">
              03 · SQUAD SHEET · TECHNICAL STACK
            </span>
            <h1 className="text-display-xl text-[var(--night)]">
              THE SQUAD LIST
            </h1>
            {/* Required top line */}
            <p className="font-mono text-xs text-[var(--muted-light)] uppercase tracking-wider">
              APPS = repos using the skill (checked against git history, 2026-11-15).
            </p>
          </div>

          {/* Van Dijk cutout beside header: The Defence */}
          {vanDijkCutout && !vanDijkError && (
            <div className="flex items-center gap-3 border border-[var(--rule-light)] p-2 bg-[#DDD6C3] max-w-sm">
              <div className="relative w-12 h-14 shrink-0">
                <Image
                  src={vanDijkCutout.src}
                  alt=""
                  fill
                  className="object-contain object-bottom"
                  sizes="60px"
                  onError={() => setVanDijkError(true)}
                />
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono font-bold uppercase text-[var(--red)] tracking-wider">
                  {vanDijkCutout.tag}
                </span>
                <p className="font-mono text-[10px] text-[var(--muted-light)]">
                  {vanDijkCutout.caption}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Three Squad Groups: First team / Rotation / Academy */}
        <div className="space-y-12">
          {squad.map((group) => (
            <div key={group.squadName} className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-[var(--rule-light)] pb-2 gap-2">
                <h2 className="text-display-m text-[var(--night)] uppercase">
                  {group.squadName}
                </h2>
                <span className="font-mono text-xs uppercase text-[var(--muted-light)]">
                  {group.originalCategory} ({group.skills.length} SKILLS)
                </span>
              </div>

              {group.caption && (
                <p className="font-serif text-sm text-[var(--muted-light)] italic">
                  {group.caption}
                </p>
              )}

              {/* Skills Table / List */}
              <div className="divide-y divide-[var(--rule-light)] border-t border-b border-[var(--rule-light)]">
                {group.skills.map((skill) => (
                  <details
                    key={skill.name}
                    className="group py-3 font-mono text-xs cursor-pointer select-none"
                  >
                    <summary className="flex items-center justify-between list-none hover:text-[var(--red)] transition-colors">
                      <span className="font-bold text-[var(--night)] text-sm">
                        {skill.name}
                      </span>
                      <div className="flex items-center gap-4">
                        {/* Only the APPS number shown; second builds number completely removed */}
                        <span className="text-[var(--red)] font-semibold">
                          APPS {skill.apps}
                        </span>
                        {skill.projects && skill.projects.length > 0 && (
                          <span className="text-[var(--muted-light)] group-open:rotate-180 transition-transform">
                            ↓
                          </span>
                        )}
                      </div>
                    </summary>

                    {/* Expandable project links & note */}
                    {((skill.projects && skill.projects.length > 0) || skill.note) && (
                      <div className="pt-3 pb-1 space-y-2">
                        {skill.note && (
                          <p className="font-serif text-xs text-[var(--muted-light)]">
                            {skill.note}
                          </p>
                        )}
                        {skill.projects && skill.projects.length > 0 && (
                          <div className="flex flex-wrap gap-2 pt-1">
                            <span className="text-[10px] text-[var(--muted-light)] uppercase">
                              Active in:
                            </span>
                            {skill.projects.map((slug) => (
                              <PassLink
                                key={slug}
                                href={`/projects/${slug}`}
                                data-cursor="OPEN"
                                className="border border-[var(--rule-light)] px-2 py-0.5 bg-[#E0D9C5] text-[var(--night)] hover:border-[var(--night)] text-[10px] uppercase font-semibold"
                              >
                                {slug}
                              </PassLink>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
