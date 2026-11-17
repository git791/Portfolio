import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  getMondayIso,
  ensureContiguousWeeks,
  isAuthorMatch,
  validateSchemaAndNoRegression,
  buildRepoFacts,
  extractProjectRepos,
} from "./sync-github.mjs";

describe("Week Bucketing and Timezone Convention", () => {
  it("maps Mondays to themselves in UTC", () => {
    assert.equal(getMondayIso("2019-08-26T12:00:00Z"), "2019-08-26");
    assert.equal(getMondayIso("2026-11-09T00:00:00Z"), "2026-11-09");
    assert.equal(getMondayIso("2026-11-16T15:30:00Z"), "2026-11-16");
  });

  it("maps mid-week days to the preceding Monday in UTC", () => {
    assert.equal(getMondayIso("2019-08-28T10:00:00Z"), "2019-08-26"); // Wednesday
    assert.equal(getMondayIso("2019-08-31T23:59:59Z"), "2019-08-26"); // Saturday
    assert.equal(getMondayIso("2026-11-14T20:00:00Z"), "2026-11-09"); // Saturday
  });

  it("maps Sundays to the Monday 6 days prior (ISO week)", () => {
    assert.equal(getMondayIso("2019-09-01T23:59:59Z"), "2019-08-26"); // Sunday
    assert.equal(getMondayIso("2026-11-15T23:59:59Z"), "2026-11-09"); // Sunday
  });

  it("ensures contiguous weeks with exact 7-day increments", () => {
    const startWeeks = [
      { w: "2026-11-02", n: 9, top: ["Ordivanta"] },
      { w: "2026-11-09", n: 4, top: ["Ordivanta", "Portfolio"] },
    ];
    const contiguous = ensureContiguousWeeks(startWeeks, "2026-11-23");
    assert.equal(contiguous.length, 4);
    assert.equal(contiguous[0].w, "2026-11-02");
    assert.equal(contiguous[1].w, "2026-11-09");
    assert.equal(contiguous[2].w, "2026-11-16");
    assert.equal(contiguous[2].n, 0);
    assert.equal(contiguous[3].w, "2026-11-23");
    assert.equal(contiguous[3].n, 0);
  });
});

describe("Author Matching and Known Emails", () => {
  it("matches commits authored by git791 login", () => {
    const commit = {
      author: { user: { login: "git791" }, email: "other@example.com" },
    };
    assert.equal(isAuthorMatch(commit, "git791"), true);
  });

  it("matches commits with primary known email", () => {
    const commit = {
      author: { email: "m.ayaan.a.ahmed@gmail.com" },
    };
    assert.equal(isAuthorMatch(commit, "git791"), true);
  });

  it("matches commits with GitHub noreply email", () => {
    const commit = {
      author: { email: "71168655+git791@users.noreply.github.com" },
    };
    assert.equal(isAuthorMatch(commit, "git791"), true);
  });

  it("matches commits through committer if author is unlinked", () => {
    const commit = {
      author: { email: "unknown@company.com" },
      committer: { user: { login: "git791" } },
    };
    assert.equal(isAuthorMatch(commit, "git791"), true);
  });

  it("rejects commits from other authors", () => {
    const commit = {
      author: { user: { login: "octocat" }, email: "octocat@github.com" },
      committer: { user: { login: "octocat" }, email: "octocat@github.com" },
    };
    assert.equal(isAuthorMatch(commit, "git791"), false);
  });
});

describe("No-Regression Rule and Schema Validation", () => {
  const validSeed = {
    generated: "2026-11-15",
    week_start: "Monday (ISO)",
    totals: {
      byYear: { "2019": 15, "2025": 29, "2026": 261 },
      all: 334,
      reposStartedByYear: { "2019": 3, "2026": 39 },
    },
    weeks: [
      { w: "2019-08-26", n: 15, top: ["Car-"] },
      { w: "2026-11-09", n: 4, top: ["Ordivanta"] },
    ],
    repos: [{ name: "Ordivanta", first: "2026-10-23", last: "2026-11-14", commits: 21, totalCommits: 21 }],
  };

  it("passes validation when data is unchanged or increased", () => {
    const updated = JSON.parse(JSON.stringify(validSeed));
    updated.totals.all += 1;
    updated.totals.byYear["2026"] += 1;
    updated.weeks[1].n += 1;
    assert.equal(validateSchemaAndNoRegression(updated, validSeed), true);
  });

  it("throws error if totals.all drops", () => {
    const regressed = JSON.parse(JSON.stringify(validSeed));
    regressed.totals.all = 330;
    assert.throws(
      () => validateSchemaAndNoRegression(regressed, validSeed),
      /Regression Error: Total commits dropped/
    );
  });

  it("throws error if any yearly count drops", () => {
    const regressed = JSON.parse(JSON.stringify(validSeed));
    regressed.totals.byYear["2026"] = 250;
    assert.throws(
      () => validateSchemaAndNoRegression(regressed, validSeed),
      /Regression Error: Yearly commits for 2026 dropped/
    );
  });

  it("throws error if any individual week count drops", () => {
    const regressed = JSON.parse(JSON.stringify(validSeed));
    regressed.weeks[1].n = 2; // Was 4
    assert.throws(
      () => validateSchemaAndNoRegression(regressed, validSeed),
      /Regression Error: Week 2026-11-09 commit count dropped/
    );
  });

  it("throws error if week count shrinks", () => {
    const regressed = JSON.parse(JSON.stringify(validSeed));
    regressed.weeks.pop();
    assert.throws(
      () => validateSchemaAndNoRegression(regressed, validSeed),
      /Regression Error: Total weeks dropped/
    );
  });
});

describe("Per-Repo Facts Extraction", () => {
  it("extracts facts for matched public repos only", () => {
    const projectRepos = ["Footy-Mind", "BizBoost-AI", "UnmatchedRepo"];
    const reposList = [
      { name: "Footy-Mind", commits: 20, first: "2026-06-22", last: "2026-06-26", totalCommits: 20 },
      { name: "BizBoost-AI", commits: 7, first: "2026-03-05", last: "2026-03-15", totalCommits: 8 },
      { name: "private", commits: 5, first: "2026-01-01", last: "2026-01-10", totalCommits: 5 },
    ];

    const facts = buildRepoFacts(projectRepos, reposList);

    assert.equal(Object.keys(facts).length, 2);
    assert.deepEqual(facts["Footy-Mind"], {
      commits: 20,
      first: "2026-06-22",
      last: "2026-06-26",
    });
    assert.deepEqual(facts["BizBoost-AI"], {
      commits: 7,
      first: "2026-03-05",
      last: "2026-03-15",
    });
    assert.equal(facts["private"], undefined);
    assert.equal(facts["UnmatchedRepo"], undefined);
  });

  it("extracts project repo names from data.ts content using regex", () => {
    const mockDataTs = `
      export const projects = [
        { title: "BizBoost AI", githubUrl: "https://github.com/git791/BizBoost-AI" },
        { title: "Calm Aid", githubUrl: "https://github.com/git791/Calm-Aid" },
      ];
    `;
    const extracted = extractProjectRepos(mockDataTs);
    assert.deepEqual(extracted, ["BizBoost-AI", "Calm-Aid"]);
  });
});
