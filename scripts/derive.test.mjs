import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

// Load commits.json
const commitsJson = JSON.parse(fs.readFileSync(new URL("../src/data/commits.json", import.meta.url), "utf8"));

// We test the exact derive implementations
function issueLabel() {
  const generatedYear = commitsJson.generated.split("-")[0] || "2026";
  return `ISSUE #1 · ${generatedYear}`;
}

function partOf3(stage) {
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

function creditsFor(project) {
  if (project.role.toLowerCase() === "contributor") {
    return { contributor: true };
  }
  return {
    lead: "Ayaan",
    with: project.team || [],
  };
}

function issuesByYear() {
  const years = [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026];
  const weeksByYear = {};
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

  const totalsByYear = commitsJson.totals.byYear;

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

test("issueLabel returns ISSUE #1 with year from commits.json generated date", () => {
  const label = issueLabel();
  assert.equal(label, "ISSUE #1 · 2026");
});

test("partOf3 maps stages to 1, 2, or 3", () => {
  assert.equal(partOf3("participant"), 1);
  assert.equal(partOf3("semi-finalist"), 2);
  assert.equal(partOf3("finalist"), 3);
  assert.equal(partOf3("unknown-stage"), 1);
});

test("creditsFor correctly shapes lead and contributor roles", () => {
  const leadProject = { role: "Lead", team: ["Dev A", "Dev B"] };
  assert.deepEqual(creditsFor(leadProject), {
    lead: "Ayaan",
    with: ["Dev A", "Dev B"],
  });

  const contributorProject = { role: "Contributor", team: ["Lead Person"] };
  assert.deepEqual(creditsFor(contributorProject), {
    contributor: true,
  });
});

test("issuesByYear returns 8 years and correctly flags zero-commit years (2020, 2022, 2023) as noIssue: true", () => {
  const issues = issuesByYear();
  assert.equal(issues.length, 8);

  const byYear = Object.fromEntries(issues.map((i) => [i.year, i]));

  // Verify years that MUST have noIssue: true
  assert.equal(byYear[2020].noIssue, true, "2020 must be flagged noIssue");
  assert.equal(byYear[2020].totalCommits, 0, "2020 commits must be 0");
  assert.equal(byYear[2022].noIssue, true, "2022 must be flagged noIssue");
  assert.equal(byYear[2022].totalCommits, 0, "2022 commits must be 0");
  assert.equal(byYear[2023].noIssue, true, "2023 must be flagged noIssue");
  assert.equal(byYear[2023].totalCommits, 0, "2023 commits must be 0");

  // Verify years that MUST have noIssue: false
  assert.equal(byYear[2019].noIssue, false);
  assert.equal(byYear[2019].totalCommits, 15);
  assert.equal(byYear[2021].noIssue, false);
  assert.equal(byYear[2021].totalCommits, 28);
  assert.equal(byYear[2024].noIssue, false);
  assert.equal(byYear[2024].totalCommits, 1);
  assert.equal(byYear[2025].noIssue, false);
  assert.equal(byYear[2025].totalCommits, 29);
  assert.equal(byYear[2026].noIssue, false);
  assert.equal(byYear[2026].totalCommits, 261);
});
