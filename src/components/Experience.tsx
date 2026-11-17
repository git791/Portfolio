"use client";

import Decode from "@/components/ui/Decode";
import { experience } from "@/lib/data";
import type { Experience as ExperienceType } from "@/lib/types";

const GROUPS: ("Building" | "Leading" | "Earlier")[] = ["Building", "Leading", "Earlier"];

function ExperienceRow({ item }: { item: ExperienceType }) {
  return (
    <details className="group py-3 border-b border-[var(--rule)] transition-colors hover:bg-[var(--rule)]/10">
      <summary className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 cursor-pointer list-none select-none focus-visible:outline-2 focus-visible:outline-[var(--fg)]">
        {/* Left: Role & Org */}
        <div className="flex items-baseline gap-2 sm:gap-3">
          <span className="font-display font-semibold text-base sm:text-lg uppercase tracking-tight text-[var(--fg)] group-hover:text-white">
            {item.role}
          </span>
          <span className="text-[var(--muted)] text-sm">
            · {item.organization}
          </span>
        </div>

        {/* Right: Dates + Location + Type Chip + Indicator */}
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-wider text-[var(--muted)] shrink-0">
          <span>{item.startDate} — {item.endDate}</span>
          <span className="hidden sm:inline">·</span>
          <span className="hidden sm:inline">{item.location}</span>
          <span className="px-1.5 py-0.5 border border-[var(--rule)] text-[10px] text-[var(--muted)] rounded-[var(--radius)]">
            {item.type}
          </span>
          <span className="text-[10px] text-[var(--muted)] group-open:rotate-180 transition-transform inline-block select-none" aria-hidden="true">
            ▼
          </span>
        </div>
      </summary>

      {/* Description inside closed <details> */}
      <div className="pt-3 pb-1 text-sm text-[var(--muted)] leading-relaxed max-w-3xl">
        <p>{item.description}</p>
      </div>
    </details>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="py-24 border-t border-[var(--rule)]">
      <div className="container-main">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--muted)]">
            03 /
          </span>
          <Decode
            text="EXPERIENCE"
            className="font-display font-bold text-3xl sm:text-4xl uppercase tracking-tight text-[var(--fg)]"
          />
        </div>

        {/* Grouped Experience Ledger */}
        <div className="flex flex-col gap-16">
          {GROUPS.map((groupName) => {
            const items = experience.filter((e) => e.group === groupName);
            if (items.length === 0) return null;

            return (
              <div key={groupName} className="flex flex-col">
                <div className="flex items-center gap-4 pb-3 border-b border-[var(--rule)]">
                  <span className="font-mono text-xs uppercase tracking-widest text-[var(--fg)] font-semibold">
                    {groupName}
                  </span>
                  <div className="flex-1 h-[1px] bg-[var(--rule)]" />
                  <span className="font-mono text-xs uppercase tracking-wider text-[var(--muted)]">
                    {items.length} {items.length === 1 ? "ROLE" : "ROLES"}
                  </span>
                </div>

                <div className="flex flex-col">
                  {items.map((item) => (
                    <ExperienceRow key={item.id} item={item} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
