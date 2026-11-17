import { projects, hackathons, skills, siteStats } from "@/lib/data";
import commitsJson from "@/data/commits.json";
import { SkillGroup, Tier } from "@/lib/types";

/**
 * Returns the count of repositories started in a given year.
 * Checks commits.json repos first (by repository initial commit date),
 * falling back to matching projects.
 */
export function reposStarted(year: string | number): number {
  const yStr = String(year);
  const fromCommits = commitsJson.repos.filter(
    (r) => r.first && r.first.startsWith(yStr)
  ).length;

  if (fromCommits > 0) return fromCommits;

  return projects.filter(
    (p) => p.year === yStr || (p.repoFacts?.first && p.repoFacts.first.startsWith(yStr))
  ).length;
}

/**
 * Returns the total count of completed hackathons.
 */
export function hackathonsCount(): number {
  return hackathons.length;
}

/**
 * Categorizes projects by tier for editorial pen pictures and directory filters.
 */
export function projectsByTier() {
  return {
    editorial: projects.filter((p) => p.tier === "editorial"),
    secondary: projects.filter((p) => p.tier === "secondary"),
    depth: projects.filter((p) => p.tier === "depth"),
    archive: projects.filter((p) => p.tier === "archive"),
    playground: projects.filter((p) => p.tier === "playground"),
    all: projects,
  };
}

/**
 * Maps hackathon placement/stage to a 3-step cup ladder:
 * - 1 = GROUP (participant)
 * - 2 = SEMI (semi-finalist)
 * - 3 = FINAL (finalist / winner)
 */
export function cupSteps(stage?: string): 1 | 2 | 3 {
  if (!stage) return 1;
  const s = stage.toLowerCase();
  if (s.includes("finalist") && !s.includes("semi")) return 3;
  if (s.includes("winner")) return 3;
  if (s.includes("semi")) return 2;
  return 1;
}

export interface SquadSkill {
  name: string;
  apps: number;
  projects?: string[];
  note?: string;
}

export interface SquadGroup {
  squadName: "First team" | "Rotation" | "Academy";
  originalCategory: SkillGroup["category"];
  caption?: string;
  skills: SquadSkill[];
}

/**
 * Maps the 3 existing skill groups into the football squad structure:
 * - "Daily drivers" -> "First team"
 * - "Used in projects" -> "Rotation"
 * - "Coursework & learning" -> "Academy"
 * Calculates APPS from repository counts (projects array length).
 */
export function skillGroupsAsSquad(): SquadGroup[] {
  const squadMap: Record<SkillGroup["category"], "First team" | "Rotation" | "Academy"> = {
    "Daily drivers": "First team",
    "Used in projects": "Rotation",
    "Coursework & learning": "Academy",
  };

  return skills.map((group) => ({
    squadName: squadMap[group.category] || "Rotation",
    originalCategory: group.category,
    caption: group.caption,
    skills: group.items.map((item) => ({
      name: item.name,
      apps: item.projects ? item.projects.length : (item.repos ?? 0),
      projects: item.projects,
      note: item.note,
    })),
  }));
}

/**
 * Returns matchday scoreboard numbers.
 */
export function getScoreboardStats() {
  return {
    repos2026: reposStarted(2026),
    hackathons: hackathonsCount(),
    eventsRun: siteStats.eventsRun,
    largestAudience: siteStats.largestAudience,
  };
}
