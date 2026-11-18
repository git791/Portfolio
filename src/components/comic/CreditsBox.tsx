import React from "react";
import type { Project } from "@/lib/types";

export interface CreditsBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  project?: Pick<Project, "role" | "team">;
  leadName?: string;
  role?: "Lead" | "Contributor" | string;
  team?: string[];
  border?: boolean;
}

export function CreditsBox({
  project,
  leadName = "Ayaan",
  role: explicitRole,
  team: explicitTeam,
  border = true,
  className = "",
  ...props
}: CreditsBoxProps) {
  const role = project ? project.role : explicitRole || "Lead";
  const team = project ? project.team : explicitTeam || [];

  const isContributor = role.toLowerCase() === "contributor";

  return (
    <div
      className={`font-mono text-xs uppercase tracking-wider bg-[var(--paper)] text-[var(--ink)] p-2 ${
        border ? "border-[2px] border-[var(--ink)] shadow-[2px_2px_0px_var(--ink)]" : ""
      } ${className}`}
      {...props}
    >
      {isContributor ? (
        <div className="font-bold">ROLE: CONTRIBUTOR</div>
      ) : (
        <>
          <div className="font-bold">LEAD: {leadName}</div>
          {team.length > 0 && (
            <div className="text-[var(--ink-muted)] text-[11px] mt-0.5">
              WITH: {team.join(", ")}
            </div>
          )}
        </>
      )}
    </div>
  );
}
