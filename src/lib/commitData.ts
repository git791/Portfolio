import commitsJson from "@/data/commits.json";
import { projects } from "@/lib/data";

export interface YearRowData {
  year: number;
  yearIndex: number;
  totalCommits: number;
  values: number[]; // 53 smoothed points
  rawValues: number[]; // 53 raw points
}

// Process commits.json into 8 yearly rows (2019 to 2026)
export function getYearlyCommitRows(): YearRowData[] {
  const years = [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026];
  const rawByYear: Record<number, number[]> = {};

  years.forEach((y) => {
    rawByYear[y] = new Array(53).fill(0);
  });

  commitsJson.weeks.forEach((w) => {
    const year = parseInt(w.w.split("-")[0], 10);
    if (rawByYear[year]) {
      const parts = w.w.split("-").map(Number);
      const d = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2]));
      // Week of year calculation
      const dayNum = d.getUTCDay() || 7;
      d.setUTCDate(d.getUTCDate() + 4 - dayNum);
      const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
      const weekNo = Math.min(
        52,
        Math.max(0, Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7) - 1)
      );
      rawByYear[year][weekNo] = w.n;
    }
  });

  return years.map((year, yearIndex) => {
    const raw = rawByYear[year];
    const smoothed = new Array(53).fill(0);

    // Flat years stay completely flat (2022, 2023)
    const hasAnyCommits = raw.some((n) => n > 0);
    if (hasAnyCommits) {
      for (let i = 0; i < 53; i++) {
        const prev = i > 0 ? raw[i - 1] : raw[i];
        const curr = raw[i];
        const next = i < 52 ? raw[i + 1] : raw[i];
        smoothed[i] = (prev + curr + next) / 3;
      }
    }

    return {
      year,
      yearIndex,
      totalCommits: raw.reduce((a, b) => a + b, 0),
      values: smoothed,
      rawValues: raw,
    };
  });
}

// Sort the 35 projects by repos[].first
export function getSortedProjectsForTiles() {
  const reposByName: Record<string, string> = {};
  commitsJson.repos.forEach((r) => {
    reposByName[r.name.toLowerCase()] = r.first;
  });

  return [...projects].sort((a, b) => {
    const repoA = a.githubUrl.split("/").pop()?.toLowerCase() || "";
    const repoB = b.githubUrl.split("/").pop()?.toLowerCase() || "";

    const dateA = reposByName[repoA] || (a.slug === "t-rex-runner" ? "2024-01-01" : a.year + "-01-01");
    const dateB = reposByName[repoB] || (b.slug === "t-rex-runner" ? "2024-01-01" : b.year + "-01-01");

    return dateA.localeCompare(dateB);
  });
}

export const peakLabels = [
  {
    id: "2019-spike",
    text: "AUG 2019 · FIRST COMMITS (p5.js)",
    year: 2019,
    weekIndex: 34,
    xPercent: 66,
    yPercent: 78,
  },
  {
    id: "2026-footy",
    text: "JUN 2026 · Footy Mind",
    year: 2026,
    weekIndex: 25,
    xPercent: 49,
    yPercent: 32,
  },
  {
    id: "2026-access",
    text: "JUL 2026 · Access-Agent",
    year: 2026,
    weekIndex: 28,
    xPercent: 55,
    yPercent: 20,
  },
  {
    id: "2026-ordivanta",
    text: "OCT 2026 · Ordivanta",
    year: 2026,
    weekIndex: 42,
    xPercent: 80,
    yPercent: 36,
  },
];
