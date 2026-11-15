export type Tier = "editorial" | "secondary" | "depth" | "archive" | "playground";

export interface RepoFacts {
  commits: number;
  first: string;
  last: string;
  approxLoc?: number;
  tests?: number;
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  category: string;          // domain label shown in the ledger
  year: string;
  description: string;       // keep existing text
  problem: string;           // one line, <= 110 chars
  tags: string[];
  image?: string;            // optional, many are WIP: UI must work without it
  liveUrl?: string;          // empty for now
  githubUrl: string;
  tier: Tier;
  stage: "mvp";              // replaces the old "working" | "prototype" status
  role: "Lead" | "Contributor";
  team: string[];            // other people, names only
  repoFacts?: RepoFacts;
}

export interface Hackathon {
  id: number;
  name: string;
  organizer: string;
  date: string;
  stage: "participant" | "semi-finalist" | "finalist";
  placement?: string;        // only real placements, e.g. "3rd place"
  track?: string;            // track entered, shown as plain meta text, never as a chip
  description: string;
  tags: string[];
  projectUrl?: string;
  urlLabel?: string;
  figmaUrl?: string;
}

export interface SkillItem {
  name: string;
  repos?: number;
  projects?: string[];
  note?: string;
}

export interface SkillGroup {
  category: "Daily drivers" | "Used in projects" | "Coursework & learning";
  caption?: string;
  items: SkillItem[];
}

export interface Experience {
  id: number;
  role: string;
  organization: string;
  type: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  group: "Building" | "Leading" | "Earlier";
}

export interface Education {
  id: number;
  degree: string;
  institution: string;
  location: string;
  startYear: string;
  endYear: string;
  description: string;
}

export interface Certification {
  id: number;
  title: string;
  issuer: string;
  date: string;
  credentialUrl: string;
  image?: string;
  category: string;
  highlight?: boolean;
}
