export interface GuestStar {
  key: string;                    // e.g. "star-1"
  kind: "static" | "sprite";
  src: string;                    // "/assets/comic/stars/xyz.png" or "/assets/comic/sprites/xyz.png"
  section: "hero" | "work" | "origin" | "skills" | "hackathons" | "contact";
  tag: string;                    // Space Mono label
  caption: string;                // owner-written
  sprite?: { frames: number; frameWidth: number; frameHeight: number };  // played at 12fps
}

export const guestStars: GuestStar[] = [
  {
    key: "spiderman-runner",
    kind: "sprite",
    src: "/assets/comic/sprites/spiderman-run.png",
    section: "hackathons",
    tag: "SPIDER-MAN // 9-FRAME SPRINT",
    caption: "Stepped pixel run cycle playing on twos at 12fps.",
    sprite: { frames: 9, frameWidth: 55, frameHeight: 75 },
  },
];

export const markSrc = "/assets/comic/mark.jpg";
export const fanNote = "Comic-book-style tribute. Not affiliated with or endorsed by any publisher or studio. All trademarks belong to their respective owners.";
