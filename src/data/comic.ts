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
    key: "spiderman",
    kind: "static",
    src: "/assets/comic/stars/spiderman.png",
    section: "origin",
    tag: "MARVEL // SPIDER-MAN",
    caption: "Friendly neighborhood code review collaborator.",
  },
  {
    key: "runner",
    kind: "sprite",
    src: "/assets/comic/sprites/runner.png",
    section: "work",
    tag: "8-FRAME SPRITE // 12FPS",
    caption: "Stepped pixel runner playing on twos.",
    sprite: { frames: 8, frameWidth: 64, frameHeight: 64 },
  },
];

export const markSrc = "/assets/comic/mark.jpg";
export const fanNote = "Comic-book-style tribute. Not affiliated with or endorsed by any publisher or studio. All trademarks belong to their respective owners.";
