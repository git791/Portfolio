import PassLink from "./ui/PassLink";
import { skillGroupsAsSquad } from "@/lib/derive";

export default function SkillsTeaser() {
  const squad = skillGroupsAsSquad();
  const firstTeam = squad.find((s) => s.squadName === "First team");
  const topSkills = firstTeam ? firstTeam.skills.slice(0, 6) : [];

  return (
    <section id="skills" className="surface-newsprint py-16 px-6 lg:px-12 border-b border-[var(--rule)]">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[var(--rule)] pb-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--muted)]">
              03 · SQUAD · FIRST TEAM
            </span>
            <h2 className="text-display-m text-[var(--night)]">
              DAILY DRIVERS
            </h2>
          </div>

          <PassLink
            href="/skills"
            data-cursor="OPEN"
            className="font-mono text-xs uppercase tracking-wider border border-[var(--night)] px-3 py-1.5 hover:bg-[var(--night)] hover:text-[var(--chalk)] transition-colors self-start md:self-auto font-semibold"
          >
            VIEW SQUAD LIST →
          </PassLink>
        </div>

        {/* Compact row of mono items: skill name + APPS {n} */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {topSkills.map((skill) => (
            <div
              key={skill.name}
              className="border border-[var(--rule)] p-3 bg-[#E0D9C5] flex flex-col justify-between aspect-[3/2]"
            >
              <span className="font-mono text-xs font-bold text-[var(--night)] uppercase">
                {skill.name}
              </span>
              <span className="font-mono text-[11px] text-[var(--red)] font-semibold">
                APPS {skill.apps}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
