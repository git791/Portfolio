# Mohammed Ayaan — Engineering Portfolio

Signal-to-structure build ledger and engineering portfolio showcasing 34 repositories, 21 hackathons, and commit history dating back to 2019.

- **URL:** [https://mohammedayaan.me](https://mohammedayaan.me)
- **Design System:** Five-token palette (`--bg: #0D0E0B`, `--fg: #ECE9DF`, `--muted: #8B8A80`, `--rule: #3A3C36`, `--signal: #FFC400`).
- **Typography:** Barlow Condensed, IBM Plex Sans, IBM Plex Sans Devanagari, IBM Plex Mono.

---

## Automated GitHub Data Sync

The portfolio automatically syncs its commit history ledger (`src/data/commits.json`) and project repo facts (`src/data/repo-facts.json`) via a scheduled GitHub Action (`.github/workflows/sync-data.yml`).

### How It Works
- Runs daily at `03:00 UTC`, manually via `workflow_dispatch`, and on pushes to `main`.
- Lists all owned repositories using GitHub's GraphQL API.
- Names of public repositories are recorded; private repositories are counted but their names are masked as `"private"`.
- Matches commits authored by login (`git791`) and unlinked known email addresses.
- Treats existing history as a frozen seed: keeps existing weeks, dedupes commits by SHA, and strictly enforces that commit counts never regress.
- Automatically generates `src/data/repo-facts.json` containing verified commit counts, first commit date, and last commit date for all matching portfolio projects.
- Commits changes with `chore(data): ...` directly to `main`, which automatically triggers a Vercel redeployment.

---

### Setup Instructions

#### 1. Create a Fine-Grained Personal Access Token (PAT)
1. Go to **GitHub Settings** → **Developer Settings** → **Personal access tokens** → **Fine-grained tokens**.
2. Click **Generate new token**.
3. Configure the token:
   - **Token name:** `Portfolio Data Sync`
   - **Resource owner:** `git791`
   - **Repository access:** **All repositories** (or select all public and private repositories you own).
   - **Repository permissions:**
     - `Contents`: **Read-only** (allows querying commit histories).
     - `Metadata`: **Read-only** (mandatory for repository inspection).
4. Click **Generate token** and copy the secret.

#### 2. Configure Repository Secrets
1. In your repository on GitHub, go to **Settings** → **Secrets and variables** → **Actions**.
2. Click **New repository secret**.
3. Name: `GH_PAT`.
4. Value: Paste your fine-grained token.
5. In **Settings** → **Actions** → **General** → **Workflow permissions**, ensure **Read and write permissions** is selected so the workflow can commit updated data back to `main`.

---

### Running Locally

To manually refresh GitHub data on your local machine:

```bash
# Provide your personal access token
GH_TOKEN=your_pat node scripts/sync-github.mjs

# Or test without a token (generates repo-facts from seed data):
node scripts/sync-github.mjs
```

### Running Unit Tests

Unit tests verify week bucketing (Monday ISO UTC), commit deduplication by SHA, author matching, and no-regression safeguards:

```bash
npm run test:sync
# or directly with Node's built-in test runner:
node --test scripts/sync-github.test.mjs
```
