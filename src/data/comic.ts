export interface GuestStar {
  key: string;                    // e.g. "star-1"
  kind: "static" | "sprite";
  src: string;                    // "/assets/comic/stars/xyz.png" or "/assets/comic/sprites/xyz.png"
  section: "hero" | "work" | "origin" | "skills" | "hackathons" | "contact";
  tag: string;                    // Space Mono label
  caption: string;                // owner-written, TODO(owner) until given
  sprite?: { frames: number; frameWidth: number; frameHeight: number };  // played at 12fps
}

export const guestStars: GuestStar[] = [];   // owner fills in when assets exist
export const markSrc = "/assets/comic/mark.svg";          // optional
export const fanNote = "Comic-book-style tribute. Not affiliated with or endorsed by any publisher or studio.";  // TODO(owner): tune the wording to the assets actually used
