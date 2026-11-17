import * as THREE from "three";
import commitsJson from "@/data/commits.json";
import { crestSrc } from "@/data/football";
import { projects } from "@/lib/data";

export const COLS = 120;
export const ROWS = 40;
export const COMMIT_ROWS = 8; // 2019..2026
export const COMMIT_COLS = 53; // 53 weeks
export const COMMIT_COL_OFFSET = Math.floor((COLS - COMMIT_COLS) / 2); // 33
export const YEARS = [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026];

export interface CommitWeekInfo {
  year: number;
  weekIndex: number;
  commits: number;
  dateStr: string;
  topRepo: string;
}

// Build 8 x 53 weekly commit lookup map
export function buildCommitWeekMap(): CommitWeekInfo[][] {
  const grid: CommitWeekInfo[][] = [];

  const rawByYear: Record<number, { n: number; top: string[]; w: string }[]> = {};
  YEARS.forEach((y) => {
    rawByYear[y] = new Array(53).fill(null).map((_, i) => ({
      n: 0,
      top: [],
      w: `${y}-W${String(i + 1).padStart(2, "0")}`,
    }));
  });

  commitsJson.weeks.forEach((w) => {
    const parts = w.w.split("-").map(Number);
    const year = parts[0];
    if (rawByYear[year]) {
      const d = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2]));
      const dayNum = d.getUTCDay() || 7;
      d.setUTCDate(d.getUTCDate() + 4 - dayNum);
      const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
      const weekNo = Math.min(
        52,
        Math.max(0, Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7) - 1)
      );
      rawByYear[year][weekNo] = {
        n: w.n,
        top: w.top || [],
        w: w.w,
      };
    }
  });

  // Known project repository names for formatting
  const projectRepoNames = new Set(
    projects.map((p) => p.githubUrl.split("/").pop()?.toLowerCase() || "")
  );

  YEARS.forEach((year, yIdx) => {
    grid[yIdx] = [];
    for (let wIdx = 0; wIdx < 53; wIdx++) {
      const entry = rawByYear[year][wIdx];
      const count = entry ? entry.n : 0;
      let topName = "other repo";
      if (entry && entry.top && entry.top.length > 0) {
        const candidate = entry.top[0];
        if (projectRepoNames.has(candidate.toLowerCase())) {
          topName = candidate.toUpperCase();
        } else {
          topName = "other repo";
        }
      }

      grid[yIdx][wIdx] = {
        year,
        weekIndex: wIdx,
        commits: count,
        dateStr: entry ? entry.w : `${year}`,
        topRepo: topName,
      };
    }
  });

  return grid;
}

// Generate the 120 x 40 x 4 DataTexture containing beat states
export async function buildMosaicDataTexture(): Promise<{
  texture: THREE.DataTexture;
  commitGrid: CommitWeekInfo[][];
}> {
  const size = COLS * ROWS;
  const data = new Uint8Array(4 * size);

  // 1. Beat 0: Idle stand (mostly 0 night, ~6% pseudo-random chalk cards)
  const idleState = new Uint8Array(size);
  let seed = 1337;
  function random() {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  }
  for (let i = 0; i < size; i++) {
    idleState[i] = random() < 0.06 ? 1 : 0;
  }

  // 2. Beat 1: Name "AYAAN" rendered via offscreen canvas
  const nameState = new Uint8Array(size);
  try {
    const canvas = document.createElement("canvas");
    canvas.width = COLS;
    canvas.height = ROWS;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, COLS, ROWS);
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 22px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("AYAAN", COLS / 2, ROWS / 2 + 1);
      const imgData = ctx.getImageData(0, 0, COLS, ROWS);
      for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
          const idx = (y * COLS + x) * 4;
          const brightness = imgData.data[idx];
          // Flip y for texture coordinates if needed
          const cellIdx = y * COLS + x;
          nameState[cellIdx] = brightness > 120 ? 1 : 0;
        }
      }
    }
  } catch {
    // fallback if canvas fails
  }

  // 3. Beat 2: Crest from crestSrc or fallback "AY"
  const crestState = new Uint8Array(size);
  let crestLoaded = false;
  if (typeof window !== "undefined") {
    try {
      const img = new Image();
      img.src = crestSrc;
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject();
        // 400ms timeout
        setTimeout(reject, 400);
      });

      const canvas = document.createElement("canvas");
      canvas.width = COLS;
      canvas.height = ROWS;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, COLS, ROWS);
        // Draw crest centered in 32 x 32 box
        const sizeBox = 30;
        ctx.drawImage(img, (COLS - sizeBox) / 2, (ROWS - sizeBox) / 2, sizeBox, sizeBox);
        const imgData = ctx.getImageData(0, 0, COLS, ROWS);
        for (let y = 0; y < ROWS; y++) {
          for (let x = 0; x < COLS; x++) {
            const idx = (y * COLS + x) * 4;
            const r = imgData.data[idx];
            const g = imgData.data[idx + 1];
            const b = imgData.data[idx + 2];
            const a = imgData.data[idx + 3];
            const cellIdx = y * COLS + x;
            if (a > 60) {
              if (r > 150 && g < 100 && b < 100) {
                crestState[cellIdx] = 2; // red
              } else {
                crestState[cellIdx] = 1; // chalk
              }
            } else {
              crestState[cellIdx] = 0;
            }
          }
        }
        crestLoaded = true;
      }
    } catch {
      // Crest file missing or failed load -> fallback initials "AY"
    }
  }

  if (!crestLoaded) {
    try {
      const canvas = document.createElement("canvas");
      canvas.width = COLS;
      canvas.height = ROWS;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, COLS, ROWS);
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold 26px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("AY", COLS / 2, ROWS / 2 + 1);
        const imgData = ctx.getImageData(0, 0, COLS, ROWS);
        for (let y = 0; y < ROWS; y++) {
          for (let x = 0; x < COLS; x++) {
            const idx = (y * COLS + x) * 4;
            const brightness = imgData.data[idx];
            const cellIdx = y * COLS + x;
            if (brightness > 128) {
              // Red center with chalk edges
              const distFromCenter = Math.abs(x - COLS / 2);
              crestState[cellIdx] = distFromCenter < 12 ? 2 : 1;
            } else {
              crestState[cellIdx] = 0;
            }
          }
        }
      }
    } catch {
      // fallback
    }
  }

  // 4. Beat 3: Commit terrace (rows 0..7, cols 33..85)
  const commitGrid = buildCommitWeekMap();
  const commitState = new Uint8Array(size);
  for (let r = 0; r < COMMIT_ROWS; r++) {
    for (let c = 0; c < COMMIT_COLS; c++) {
      const info = commitGrid[r][c];
      const cellIdx = r * COLS + (c + COMMIT_COL_OFFSET);
      if (info.commits === 0) {
        commitState[cellIdx] = 0; // night
      } else if (info.commits <= 2) {
        commitState[cellIdx] = 1; // chalk
      } else {
        commitState[cellIdx] = 2; // red (3+ commits)
      }
    }
  }

  // Pack channels: R = idle, G = name, B = crest, A = commits
  for (let i = 0; i < size; i++) {
    const offset = i * 4;
    data[offset] = idleState[i];
    data[offset + 1] = nameState[i];
    data[offset + 2] = crestState[i];
    data[offset + 3] = commitState[i];
  }

  const texture = new THREE.DataTexture(
    data,
    COLS,
    ROWS,
    THREE.RGBAFormat,
    THREE.UnsignedByteType
  );
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  texture.needsUpdate = true;

  return { texture, commitGrid };
}
