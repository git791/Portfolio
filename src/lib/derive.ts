import commitsJson from "@/data/commits.json";
import { hackathons, siteStats } from "@/lib/data";
import type { Project, Hackathon } from "@/lib/types";

/**
 * Returns the cover issue label: "ISSUE #1 · {year}"
 * where {year} is taken from commits.json generated date.
 */
export function issueLabel(): string {
  const generatedYear = commitsJson.generated.split("-")[0] || "2026";
  return `ISSUE #1 · ${generatedYear}`;
}

/**
 * Maps hackathon stage to "PART X OF 3" round number.
 * participant -> 1
 * semi-finalist -> 2
 * finalist -> 3
 */
export function partOf3(stage: Hackathon["stage"] | string): 1 | 2 | 3 {
  switch (stage) {
    case "finalist":
      return 3;
    case "semi-finalist":
      return 2;
    case "participant":
    default:
      return 1;
  }
}

export type ProjectCredits =
  | { contributor: true; lead?: never; with?: never }
  | { contributor?: false; lead: string; with: string[] };

/**
 * Extracts credits for a project.
 * Lead -> { lead: "Ayaan", with: string[] }
 * Contributor -> { contributor: true }
 */
export function creditsFor(project: Pick<Project, "role" | "team">): ProjectCredits {
  if (project.role.toLowerCase() === "contributor") {
    return { contributor: true };
  }
  return {
    lead: "Ayaan",
    with: project.team || [],
  };
}

export interface IssueWeek {
  week: string; // ISO date string (YYYY-MM-DD)
  count: number;
  topRepos: string[];
}

export interface YearIssue {
  year: number;
  label: string; // "ISSUE {year}"
  totalCommits: number;
  noIssue: boolean; // true for years with 0 commits (2020, 2022, 2023)
  weeks: IssueWeek[]; // weeks with commits (count > 0)
  allWeeks: IssueWeek[]; // all 52/53 recorded weeks for that year
}

/**
 * Returns commit history organized as "back issues" by year (2019-2026).
 * Flagged with noIssue: true for years with 0 commits.
 */
export function issuesByYear(): YearIssue[] {
  const years = [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026];
  const weeksByYear: Record<number, IssueWeek[]> = {};

  years.forEach((y) => {
    weeksByYear[y] = [];
  });

  commitsJson.weeks.forEach((w) => {
    const y = parseInt(w.w.split("-")[0], 10);
    if (weeksByYear[y]) {
      weeksByYear[y].push({
        week: w.w,
        count: w.n,
        topRepos: w.top || [],
      });
    }
  });

  const totalsByYear = commitsJson.totals.byYear as Record<string, number>;

  return years.map((year) => {
    const allWeeks = weeksByYear[year] || [];
    const activeWeeks = allWeeks.filter((w) => w.count > 0);
    const total = totalsByYear[String(year)] ?? activeWeeks.reduce((acc, w) => acc + w.count, 0);
    const noIssue = total === 0;

    return {
      year,
      label: `ISSUE ${year}`,
      totalCommits: total,
      noIssue,
      weeks: activeWeeks,
      allWeeks,
    };
  });
}

export interface StatsRowData {
  reposStarted2026: number;
  hackathonsCount: number;
  eventsRun: number;
  largestAudience: string;
}

/**
 * Computes stat box values from data layer.
 * Reuses siteStats and commits.json totals.
 */
export function statsRow(): StatsRowData {
  const reposStarted2026 =
    commitsJson.totals.reposStartedByYear["2026"] ?? 39;
  const hackathonsCount = hackathons.length;
  const { eventsRun, largestAudience } = siteStats;

  return {
    reposStarted2026,
    hackathonsCount,
    eventsRun,
    largestAudience,
  };
}
