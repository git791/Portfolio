#!/usr/bin/env node

/**
 * scripts/sync-github.mjs
 *
 * Automatically refreshes GitHub commit data and repo facts for the portfolio.
 * - Reads GH_TOKEN and GH_USER (defaults to "git791") from environment.
 * - Queries GitHub GraphQL API for all owned repositories (public and private).
 * - Masks private repository names as "private" to prevent exposing private projects.
 * - Matches commits authored by login (git791) or known unlinked emails.
 * - Treats src/data/commits.json as a frozen seed: keeps existing history, adds newer commits.
 * - Dedupes commits by SHA; guarantees totals never regress.
 * - Outputs src/data/commits.json and src/data/repo-facts.json atomically.
 * - Logs non-portfolio repositories to GitHub Step Summary.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const KNOWN_EMAILS = new Set([
  "m.ayaan.a.ahmed@gmail.com",
  "71168655+git791@users.noreply.github.com",
]);

// Seed baseline cutoff date. Historical commits before this timestamp are already frozen in commits.json.
export const SEED_CUTOFF_ISO = "2026-11-15T00:00:00Z";

/**
 * Week bucketing timezone convention:
 * The seed commits.json uses ISO-8601 UTC Monday-start weeks.
 * For any commit timestamp (e.g. 2026-11-16T14:30:00Z), its UTC date is mapped
 * to the preceding Monday at 00:00:00 UTC (or itself if Monday).
 * Weeks are consecutive and contiguous with 7-day increments: { w: "YYYY-MM-DD", n, top: [...] }.
 */
export function getMondayIso(dateInput) {
  const d = new Date(dateInput);
  if (isNaN(d.getTime())) {
    throw new Error(`Invalid date format: ${dateInput}`);
  }
  // UTC Day: 0 = Sun, 1 = Mon, 2 = Tue, ..., 6 = Sat
  const day = d.getUTCDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;
  const monday = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() + diffToMonday));
  return monday.toISOString().slice(0, 10);
}

/**
 * Ensures contiguous Monday-start weeks between the existing weeks and a target Monday.
 */
export function ensureContiguousWeeks(weeks, upToMonday) {
  if (!weeks || weeks.length === 0) return [];
  const result = weeks.map((w) => ({ ...w, top: [...w.top] }));
  let lastMonday = new Date(result[result.length - 1].w + "T00:00:00Z");
  const targetMonday = new Date(upToMonday + "T00:00:00Z");

  while (lastMonday < targetMonday) {
    lastMonday = new Date(lastMonday.getTime() + 7 * 24 * 60 * 60 * 1000);
    const w = lastMonday.toISOString().slice(0, 10);
    result.push({ w, n: 0, top: [] });
  }

  return result;
}

/**
 * Checks if a commit was authored or committed by target user or known emails.
 */
export function isAuthorMatch(commit, targetUser = "git791") {
  const target = targetUser.toLowerCase();
  const authorLogin = commit.author?.user?.login || commit.author?.login;
  const committerLogin = commit.committer?.user?.login || commit.committer?.login;
  const authorEmail = commit.author?.email || commit.commit?.author?.email;
  const committerEmail = commit.committer?.email || commit.commit?.committer?.email;

  if (authorLogin && authorLogin.toLowerCase() === target) return true;
  if (committerLogin && committerLogin.toLowerCase() === target) return true;
  if (authorEmail && KNOWN_EMAILS.has(authorEmail.toLowerCase())) return true;
  if (committerEmail && KNOWN_EMAILS.has(committerEmail.toLowerCase())) return true;

  return false;
}

/**
 * Extracts portfolio project repo names from src/lib/data.ts.
 */
export function extractProjectRepos(dataTsContent) {
  const matches = [...dataTsContent.matchAll(/githubUrl:\s*["']https:\/\/github\.com\/[^/]+\/([^"'/]+)["']/g)];
  return matches.map((m) => m[1]);
}

/**
 * Validates JSON schema and enforces the strict no-regression rule.
 */
export function validateSchemaAndNoRegression(newData, seedData) {
  if (!newData.generated || !/^\d{4}-\d{2}-\d{2}$/.test(newData.generated)) {
    throw new Error("Validation Error: 'generated' must be in YYYY-MM-DD format");
  }
  if (newData.week_start !== "Monday (ISO)") {
    throw new Error("Validation Error: 'week_start' must be 'Monday (ISO)'");
  }
  if (!newData.totals || typeof newData.totals.all !== "number") {
    throw new Error("Validation Error: 'totals.all' must be a valid number");
  }
  if (!Array.isArray(newData.weeks) || newData.weeks.length === 0) {
    throw new Error("Validation Error: 'weeks' must be a non-empty array");
  }
  if (!Array.isArray(newData.repos) || newData.repos.length === 0) {
    throw new Error("Validation Error: 'repos' must be a non-empty array");
  }

  // Regression check: total commits must never drop
  if (newData.totals.all < seedData.totals.all) {
    throw new Error(
      `Regression Error: Total commits dropped from ${seedData.totals.all} to ${newData.totals.all}`
    );
  }

  // Regression check: yearly totals must never drop
  for (const [year, seedCount] of Object.entries(seedData.totals.byYear || {})) {
    const newCount = newData.totals.byYear?.[year] || 0;
    if (newCount < seedCount) {
      throw new Error(
        `Regression Error: Yearly commits for ${year} dropped from ${seedCount} to ${newCount}`
      );
    }
  }

  // Regression check: week count must never drop
  if (newData.weeks.length < seedData.weeks.length) {
    throw new Error(
      `Regression Error: Total weeks dropped from ${seedData.weeks.length} to ${newData.weeks.length}`
    );
  }

  // Regression check: individual existing week counts must never drop
  for (let i = 0; i < seedData.weeks.length; i++) {
    const seedWeek = seedData.weeks[i];
    const newWeek = newData.weeks[i];
    if (newWeek.w !== seedWeek.w) {
      throw new Error(`Regression Error: Week alignment mismatch at index ${i} (${newWeek.w} vs ${seedWeek.w})`);
    }
    if (newWeek.n < seedWeek.n) {
      throw new Error(
        `Regression Error: Week ${seedWeek.w} commit count dropped from ${seedWeek.n} to ${newWeek.n}`
      );
    }
  }

  return true;
}

/**
 * Builds per-repo facts (commits, first, last) for repos matching project githubUrls.
 */
export function buildRepoFacts(projectRepoNames, reposList) {
  const facts = {};
  const repoMap = new Map();

  for (const repo of reposList) {
    if (repo.name && repo.name !== "private") {
      repoMap.set(repo.name.toLowerCase(), repo);
    }
  }

  for (const rawName of projectRepoNames) {
    const matched = repoMap.get(rawName.toLowerCase());
    if (matched) {
      facts[matched.name] = {
        commits: matched.commits,
        first: matched.first,
        last: matched.last,
      };
    }
  }

  return facts;
}

/**
 * Executes a GitHub GraphQL query with error handling.
 */
async function fetchGraphQL(query, variables, token) {
  let response;
  try {
    response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "portfolio-github-sync",
      },
      body: JSON.stringify({ query, variables }),
    });
  } catch (err) {
    throw new Error(`Network failure connecting to GitHub API: ${err.message}`);
  }

  if (response.status === 401 || response.status === 403) {
    const rateLimitRemaining = response.headers.get("x-ratelimit-remaining");
    if (rateLimitRemaining === "0") {
      throw new Error("GitHub API Error: Rate limit exceeded");
    }
    throw new Error(`GitHub API Authentication Error: HTTP ${response.status}`);
  }

  if (!response.ok) {
    throw new Error(`GitHub API HTTP Error: ${response.status} ${response.statusText}`);
  }

  const json = await response.json();
  if (json.errors && json.errors.length > 0) {
    const firstErr = json.errors[0].message || "GraphQL error";
    throw new Error(`GitHub GraphQL Error: ${firstErr}`);
  }

  return json.data;
}

/**
 * Fetches all non-fork repositories owned by the user.
 */
async function fetchUserRepos(token, username) {
  const query = `
    query($login: String!, $cursor: String) {
      user(login: $login) {
        repositories(
          first: 100
          after: $cursor
          ownerAffiliations: OWNER
          isFork: false
          orderBy: { field: CREATED_AT, direction: ASC }
        ) {
          pageInfo {
            hasNextPage
            endCursor
          }
          nodes {
            name
            isPrivate
            isArchived
            isEmpty
            createdAt
            defaultBranchRef {
              name
            }
          }
        }
      }
    }
  `;

  const repos = [];
  let cursor = null;
  let hasNextPage = true;

  while (hasNextPage) {
    const data = await fetchGraphQL(query, { login: username, cursor }, token);
    const repoConnection = data?.user?.repositories;
    if (!repoConnection) break;

    for (const node of repoConnection.nodes || []) {
      repos.push(node);
    }

    hasNextPage = repoConnection.pageInfo?.hasNextPage;
    cursor = repoConnection.pageInfo?.endCursor;
  }

  return repos;
}

/**
 * Fetches commits on a repo's default branch since a specific timestamp.
 */
async function fetchRepoCommitsSince(token, owner, repoName, sinceIso) {
  const query = `
    query($owner: String!, $name: String!, $cursor: String, $since: GitTimestamp) {
      repository(owner: $owner, name: $name) {
        defaultBranchRef {
          target {
            ... on Commit {
              history(first: 100, after: $cursor, since: $since) {
                pageInfo {
                  hasNextPage
                  endCursor
                }
                nodes {
                  oid
                  authoredDate
                  author {
                    user { login }
                    email
                  }
                  committer {
                    user { login }
                    email
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const commits = [];
  let cursor = null;
  let hasNextPage = true;

  while (hasNextPage) {
    const data = await fetchGraphQL(query, { owner, name: repoName, cursor, since: sinceIso }, token);
    const history = data?.repository?.defaultBranchRef?.target?.history;
    if (!history) break;

    for (const commit of history.nodes || []) {
      commits.push(commit);
    }

    hasNextPage = history.pageInfo?.hasNextPage;
    cursor = history.pageInfo?.endCursor;
  }

  return commits;
}

/**
 * Atomically writes data to a JSON file.
 */
function atomicWriteJson(filePath, data, format = false) {
  const content = format ? JSON.stringify(data, null, 2) + "\n" : JSON.stringify(data);
  const tempPath = `${filePath}.tmp.${Date.now()}`;
  fs.writeFileSync(tempPath, content, "utf8");
  fs.renameSync(tempPath, filePath);
}

/**
 * Main synchronization routine.
 */
export async function syncGitHubData({
  token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN,
  user = process.env.GH_USER || "git791",
  commitsPath = path.resolve("src/data/commits.json"),
  factsPath = path.resolve("src/data/repo-facts.json"),
  shasPath = path.resolve("src/data/commit-shas.json"),
  dataTsPath = path.resolve("src/lib/data.ts"),
} = {}) {
  // Read existing seed data
  if (!fs.existsSync(commitsPath)) {
    throw new Error(`Seed data file not found at: ${commitsPath}`);
  }
  const seedRaw = fs.readFileSync(commitsPath, "utf8");
  const seedData = JSON.parse(seedRaw);

  // Read portfolio project repos from data.ts
  let portfolioRepoNames = [];
  if (fs.existsSync(dataTsPath)) {
    const dataTsContent = fs.readFileSync(dataTsPath, "utf8");
    portfolioRepoNames = extractProjectRepos(dataTsContent);
  }

  // Read persistent commit SHAs cache
  let seenShas = new Set();
  if (fs.existsSync(shasPath)) {
    try {
      const shasArray = JSON.parse(fs.readFileSync(shasPath, "utf8"));
      seenShas = new Set(shasArray);
    } catch {
      seenShas = new Set();
    }
  }

  let dataChanged = false;
  let newCommitsFound = 0;

  // Clone seed data to prepare updated ledger
  const updatedData = {
    ...seedData,
    totals: {
      ...seedData.totals,
      byYear: { ...seedData.totals.byYear },
      reposStartedByYear: { ...seedData.totals.reposStartedByYear },
    },
    weeks: seedData.weeks.map((w) => ({ ...w, top: [...w.top] })),
    repos: seedData.repos.map((r) => ({ ...r })),
  };

  const nonPortfolioRepos = [];

  if (token) {
    console.log(`[sync-github] Fetching repositories for user: ${user}`);
    const remoteRepos = await fetchUserRepos(token, user);
    console.log(`[sync-github] Found ${remoteRepos.length} owned repositories.`);

    const portfolioLower = new Set(portfolioRepoNames.map((n) => n.toLowerCase()));

    // Track weekly commit counts by repo for new commits
    const newWeeklyRepoCounts = new Map(); // weekIso -> Map(repoDisplayName -> count)

    for (const repo of remoteRepos) {
      if (repo.isEmpty || !repo.defaultBranchRef) continue;

      const isPrivate = Boolean(repo.isPrivate);
      const displayName = isPrivate ? "private" : repo.name;

      if (!isPrivate && !portfolioLower.has(repo.name.toLowerCase())) {
        nonPortfolioRepos.push(repo.name);
      }

      // Fetch commits strictly after SEED_CUTOFF_ISO
      const commits = await fetchRepoCommitsSince(token, user, repo.name, SEED_CUTOFF_ISO);

      for (const commit of commits) {
        if (!commit?.oid) continue;

        // Dedupe commit by SHA
        if (seenShas.has(commit.oid)) continue;

        // Verify author match
        if (!isAuthorMatch(commit, user)) continue;

        seenShas.add(commit.oid);
        newCommitsFound++;
        dataChanged = true;

        const dateIso = commit.authoredDate || new Date().toISOString();
        const dateStr = dateIso.slice(0, 10);
        const year = dateStr.slice(0, 4);
        const weekMonday = getMondayIso(dateIso);

        // Update totals
        updatedData.totals.all += 1;
        updatedData.totals.byYear[year] = (updatedData.totals.byYear[year] || 0) + 1;

        // Update repo stats in repos array
        let repoEntry = updatedData.repos.find((r) => r.name.toLowerCase() === displayName.toLowerCase());
        if (repoEntry) {
          repoEntry.commits += 1;
          repoEntry.totalCommits += 1;
          if (dateStr > repoEntry.last) repoEntry.last = dateStr;
        } else {
          repoEntry = {
            name: displayName,
            first: dateStr,
            last: dateStr,
            commits: 1,
            totalCommits: 1,
          };
          updatedData.repos.push(repoEntry);
          updatedData.totals.reposStartedByYear[year] = (updatedData.totals.reposStartedByYear[year] || 0) + 1;
        }

        // Track weekly commit distribution
        if (!newWeeklyRepoCounts.has(weekMonday)) {
          newWeeklyRepoCounts.set(weekMonday, new Map());
        }
        const repoCounts = newWeeklyRepoCounts.get(weekMonday);
        repoCounts.set(displayName, (repoCounts.get(displayName) || 0) + 1);
      }
    }

    // Apply new weekly commits and ensure contiguous weeks up to current week
    const currentMonday = getMondayIso(new Date().toISOString());
    updatedData.weeks = ensureContiguousWeeks(updatedData.weeks, currentMonday);

    const weekIndexMap = new Map();
    updatedData.weeks.forEach((w, idx) => weekIndexMap.set(w.w, idx));

    for (const [weekMonday, repoMap] of newWeeklyRepoCounts.entries()) {
      let idx = weekIndexMap.get(weekMonday);
      if (idx === undefined) {
        updatedData.weeks = ensureContiguousWeeks(updatedData.weeks, weekMonday);
        updatedData.weeks.forEach((w, i) => weekIndexMap.set(w.w, i));
        idx = weekIndexMap.get(weekMonday);
      }

      if (idx !== undefined) {
        const weekObj = updatedData.weeks[idx];
        let addedInWeek = 0;
        for (const count of repoMap.values()) {
          addedInWeek += count;
        }
        weekObj.n += addedInWeek;

        // Recompute top 3 repos for this week
        const sortedRepos = [...repoMap.entries()].sort((a, b) => b[1] - a[1]);
        const topRepos = sortedRepos.slice(0, 3).map((e) => e[0]);
        // Merge with existing top repos preserving unique order
        const mergedTop = Array.from(new Set([...topRepos, ...weekObj.top])).slice(0, 3);
        weekObj.top = mergedTop;
      }
    }
  } else {
    console.log("[sync-github] No GH_TOKEN provided. Generating repo-facts from seed data.");
  }

  // Build per-repo facts for matching portfolio projects
  const repoFacts = buildRepoFacts(portfolioRepoNames, updatedData.repos);

  // Validate schema and verify no regression
  validateSchemaAndNoRegression(updatedData, seedData);

  // Update 'generated' timestamp only if data actually changed
  if (dataChanged) {
    const todayIso = new Date().toISOString().slice(0, 10);
    updatedData.generated = todayIso;
    console.log(`[sync-github] Added ${newCommitsFound} new commit(s). Updating commits.json.`);
    atomicWriteJson(commitsPath, updatedData, false);
    atomicWriteJson(shasPath, Array.from(seenShas), true);
  } else {
    console.log("[sync-github] No new commits detected. commits.json is up to date.");
  }

  // Always output repo-facts.json
  atomicWriteJson(factsPath, repoFacts, true);
  console.log(`[sync-github] Output repo-facts.json with ${Object.keys(repoFacts).length} projects.`);

  // Write non-portfolio repositories to GitHub Step Summary if available
  if (process.env.GITHUB_STEP_SUMMARY && nonPortfolioRepos.length > 0) {
    const summaryMarkdown = [
      "### Repositories not in portfolio (`data.ts`)",
      ...nonPortfolioRepos.map((r) => `- \`${r}\``),
      "",
    ].join("\n");
    try {
      fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, summaryMarkdown, "utf8");
    } catch (err) {
      console.warn("[sync-github] Failed to write to GITHUB_STEP_SUMMARY:", err.message);
    }
  }

  return {
    dataChanged,
    newCommitsFound,
    repoFactsCount: Object.keys(repoFacts).length,
    nonPortfolioRepos,
    updatedData,
  };
}

// Direct CLI invocation
const isMain = process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);
if (isMain) {
  syncGitHubData()
    .then((result) => {
      console.log(`[sync-github] Done. (dataChanged: ${result.dataChanged})`);
      process.exit(0);
    })
    .catch((err) => {
      console.error(`[sync-github] Fatal: ${err.message}`);
      process.exit(1);
    });
}
