export interface Cutout {
  key: "klopp" | "dalglish" | "vandijk" | "gerrard" | "salah";
  src: string;            // "/assets/football/people/klopp.png"
  name: string;           // used in caption label only
  section: "about" | "work" | "skills" | "hackathons" | "contact";
  tag: string;            // mono label, e.g. "THE MANAGER"
  caption: string;        // one-liner
}

export const cutouts: Cutout[] = [
  {
    key: "klopp",
    src: "/assets/football/people/klopp.png",
    name: "Klopp",
    section: "about",
    tag: "THE MANAGER",
    caption: "Leading with energy and building a winning culture from day one.",
  },
  {
    key: "dalglish",
    src: "/assets/football/people/dalglish.png",
    name: "Dalglish",
    section: "work",
    tag: "PLAYER-MANAGER",
    caption: "Leading the team while still writing the code.",
  },
  {
    key: "vandijk",
    src: "/assets/football/people/vandijk.png",
    name: "Van Dijk",
    section: "skills",
    tag: "THE DEFENCE",
    caption: "Solid backend foundations and calm under pressure.",
  },
  {
    key: "gerrard",
    src: "/assets/football/people/gerrard.png",
    name: "Gerrard",
    section: "hackathons",
    tag: "CUP RUN CAPTAIN",
    caption: "Leading from the front through intense sprint deadlines.",
  },
  {
    key: "salah",
    src: "/assets/football/people/salah.png",
    name: "Salah",
    section: "contact",
    tag: "NUMBER 11",
    caption: "Finishing the build and delivering the final result.",
  },
];

export const fanNote = "Unofficial fan tribute. Not affiliated with or endorsed by Liverpool FC.";
export const crestSrc = "/assets/football/crest.png";
