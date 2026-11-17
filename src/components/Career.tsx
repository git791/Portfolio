import { experience, education } from "@/lib/data";

export default function Career() {
  const groups = ["Building", "Leading", "Earlier"] as const;

  return (
    <section id="career" className="surface-newsprint py-20 px-6 lg:px-12 border-b border-[var(--rule)]">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="border-b border-[var(--rule)] pb-4">
          <span className="font-mono text-xs uppercase tracking-wider text-[var(--muted)]">
            05 · CAREER · MATCH HISTORY
          </span>
          <h2 className="text-display-l text-[var(--night)]">
            ROLES & CAPTAINCY
          </h2>
        </div>

        {/* Roles grouped by Building, Leading, Earlier */}
        <div className="space-y-10">
          {groups.map((grp) => {
            const grpRoles = experience.filter((e) => e.group === grp);
            if (grpRoles.length === 0) return null;

            return (
              <div key={grp} className="space-y-4">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--red)]">
                  {grp.toUpperCase()}
                </span>

                <div className="divide-y divide-[var(--rule)] border-t border-b border-[var(--rule)]">
                  {grpRoles.map((role) => (
                    <details
                      key={role.id}
                      className="group py-3 font-mono text-xs cursor-pointer select-none"
                    >
                      {/* One line summary: dates · role · organization · type */}
                      <summary className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 list-none hover:text-[var(--red)] transition-colors">
                        <div className="flex items-center gap-3">
                          <span className="text-[var(--muted)] w-28 shrink-0">
                            {role.startDate} – {role.endDate}
                          </span>
                          <span className="font-bold text-[var(--night)]">
                            {role.role}
                          </span>
                          <span className="text-[var(--muted)]">
                            · {role.organization}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 self-end sm:self-auto">
                          <span className="border border-[var(--rule)] px-1.5 py-0.5 text-[10px] text-[var(--muted)] uppercase">
                            {role.type}
                          </span>
                          <span className="text-[var(--muted)] group-open:rotate-180 transition-transform">
                            ↓
                          </span>
                        </div>
                      </summary>

                      {/* Description inside details (closed by default, excluded from base copy count) */}
                      <p className="font-serif text-sm text-[var(--night)] pt-3 pb-1 pl-0 sm:pl-31 leading-relaxed">
                        {role.description}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Education as one-liner (Section 1) */}
        <div className="pt-6 border-t border-[var(--rule)] flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-xs uppercase text-[var(--muted)]">
          <span className="text-[var(--night)] font-bold">ACADEMY</span>
          <span>B.TECH CSE · ALLIANCE UNIVERSITY · 2024–2028</span>
        </div>
      </div>
    </section>
  );
}
