"use client";

import Link from "next/link";
import Decode from "@/components/ui/Decode";
import { projects, skills, hackathons, certifications } from "@/lib/data";

export default function IndexLedger() {
  const totalSkills = skills.reduce((acc, g) => acc + g.items.length, 0);

  const sections = [
    { num: "01", label: "PROJECTS", count: projects.length, href: "/projects" },
    { num: "02", label: "SKILLS", count: totalSkills, href: "/skills" },
    { num: "03", label: "HACKATHONS", count: hackathons.length, href: "/hackathons" },
    { num: "04", label: "CERTIFICATIONS", count: certifications.length, href: "/certifications" },
  ];

  return (
    <section id="index-ledger" className="py-24 border-t border-[var(--rule)]">
      <div className="container-main">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--muted)]">
            04 /
          </span>
          <Decode
            text="INDEX LEDGER"
            className="font-display font-bold text-3xl sm:text-4xl uppercase tracking-tight text-[var(--fg)]"
          />
        </div>

        {/* 4 Index Rows */}
        <div className="flex flex-col border-t border-[var(--rule)]">
          {sections.map((sec) => (
            <Link
              key={sec.label}
              href={sec.href}
              data-cursor="Open"
              className="group flex items-center justify-between py-6 px-2 sm:px-4 border-b border-[var(--rule)] transition-colors hover:bg-[var(--rule)]/20 focus-visible:outline-2 focus-visible:outline-[var(--fg)]"
            >
              <div className="flex items-baseline gap-4 sm:gap-8">
                <span className="font-mono text-xs uppercase tracking-wider text-[var(--muted)]">
                  {sec.num}
                </span>
                <span className="font-display font-semibold text-2xl sm:text-3xl uppercase tracking-tight text-[var(--fg)] group-hover:text-white">
                  {sec.label}
                </span>
              </div>

              <div className="flex items-center gap-4 sm:gap-8">
                <span className="font-mono text-sm uppercase tracking-wider text-[var(--muted)]">
                  {sec.count} RECORDS
                </span>
                <span className="font-mono text-lg text-[var(--muted)] group-hover:text-[var(--fg)] transition-transform duration-150 group-hover:translate-x-1">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
