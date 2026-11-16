"use client";

import { useState } from "react";
import Decode from "@/components/ui/Decode";
import { experience } from "@/lib/data";
import type { Experience as ExperienceType } from "@/lib/types";

const GROUPS: ("Building" | "Leading" | "Earlier")[] = ["Building", "Leading", "Earlier"];

function ExperienceRow({ item }: { item: ExperienceType }) {
  const [expanded, setExpanded] = useState(false);

  // Split description into first sentence and remainder
  const match = item.description.match(/^([^\.]*\.)(\s+.*)?$/);
  const firstSentence = match ? match[1] : item.description;
  const rest = match && match[2] ? match[2].trim() : "";

  return (
    <div className="py-4 border-b border-[var(--rule)] flex flex-col gap-2">
      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2">
        {/* Left: Role & Org */}
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
          <span className="font-display font-semibold text-lg uppercase tracking-tight text-[var(--fg)]">
            {item.role}
          </span>
          <span className="text-[var(--muted)] text-sm">
            · {item.organization}
          </span>
        </div>

        {/* Right: Dates + Location + Type Chip */}
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-wider text-[var(--muted)] shrink-0">
          <span>{item.location}</span>
          <span>·</span>
          <span>
            {item.startDate} — {item.endDate}
          </span>
          <span className="px-2 py-0.5 border border-[var(--rule)] text-[var(--muted)] rounded-[var(--radius)]">
            {item.type}
          </span>
        </div>
      </div>

      {/* Description (first sentence, expandable if longer) */}
      <div className="text-sm text-[var(--muted)] leading-relaxed max-w-3xl">
        <p>
          {firstSentence}
          {rest && !expanded && (
            <button
              onClick={() => setExpanded(true)}
              className="ml-2 font-mono text-xs uppercase tracking-wider text-[var(--fg)] hover:underline"
            >
              [+]
            </button>
          )}
          {rest && expanded && (
            <>
              {" "}
              {rest}
              <button
                onClick={() => setExpanded(false)}
                className="ml-2 font-mono text-xs uppercase tracking-wider text-[var(--fg)] hover:underline"
              >
                [-]
              </button>
            </>
          )}
        </p>
      </div>
    </div>
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
