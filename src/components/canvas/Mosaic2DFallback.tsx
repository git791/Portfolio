"use client";

import { useMemo } from "react";
import commitsJson from "@/data/commits.json";

interface FallbackProps {
  beatProgress: number; // 0..1
  reducedMotion?: boolean;
}

const FB_COLS = 30;
const FB_ROWS = 16;

export default function Mosaic2DFallback({
  beatProgress,
  reducedMotion = false,
}: FallbackProps) {
  // Determine beat: 0 = Idle, 1 = Name (AYAAN), 2 = Crest / AY, 3 = Commits
  const currentBeat = useMemo(() => {
    if (reducedMotion) return 3; // Statically show Beat C under reduced motion
    if (beatProgress < 0.05) return 0;
    if (beatProgress < 0.30) return 1;
    if (beatProgress < 0.60) return 2;
    if (beatProgress < 0.88) return 3;
    return 0; // Exit dark
  }, [beatProgress, reducedMotion]);

  // Generate grid cells (30 x 16)
  const gridCells = useMemo(() => {
    const cells: { id: number; col: number; row: number; beatValues: number[] }[] = [];

    // Simple pattern generation for 30 x 16:
    // Beat 0: idle scatter
    // Beat 1: "AYAAN" letters
    // Beat 2: "AY" crest block
    // Beat 3: commit terrace (bottom 8 rows)

    // Name letter coordinates in 30 x 16 (centered)
    // A Y A A N
    const nameMap = new Set([
      // A
      "3,5", "4,5", "5,5", "3,6", "5,6", "3,7", "4,7", "5,7", "3,8", "5,8", "3,9", "5,9",
      // Y
      "8,5", "10,5", "8,6", "10,6", "9,7", "9,8", "9,9",
      // A
      "13,5", "14,5", "15,5", "13,6", "15,6", "13,7", "14,7", "15,7", "13,8", "15,8", "13,9", "15,9",
      // A
      "18,5", "19,5", "20,5", "18,6", "20,6", "18,7", "19,7", "20,7", "18,8", "20,8", "18,9", "20,9",
      // N
      "23,5", "26,5", "23,6", "24,6", "26,6", "23,7", "25,7", "26,7", "23,8", "26,8", "23,9", "26,9",
    ]);

    // Crest AY pattern
    const crestMap = new Set([
      // A
      "10,4", "11,4", "12,4", "10,5", "12,5", "10,6", "11,6", "12,6", "10,7", "12,7", "10,8", "12,8",
      // Y
      "15,4", "17,4", "15,5", "17,5", "16,6", "16,7", "16,8",
    ]);

    let id = 0;
    for (let r = 0; r < FB_ROWS; r++) {
      for (let c = 0; c < FB_COLS; c++) {
        // Beat 0: pseudo-random chalk
        const b0 = (c * 7 + r * 13) % 17 === 0 ? 1 : 0;
        // Beat 1: name
        const b1 = nameMap.has(`${c},${r}`) ? 1 : 0;
        // Beat 2: crest
        const b2 = crestMap.has(`${c},${r}`) ? (c >= 13 ? 2 : 1) : 0;
        // Beat 3: commit terrace (bottom 8 rows)
        let b3 = 0;
        if (r >= 8) {
          const yearIdx = r - 8; // 0..7 for 2019..2026
          // Flat 2022-2023 rows stay empty
          if (yearIdx === 3 || yearIdx === 4) {
            b3 = 0;
          } else if (yearIdx === 7) {
            // 2026 active
            b3 = (c % 3 === 0) ? 2 : ((c % 2 === 0) ? 1 : 0);
          } else if (yearIdx === 6 || yearIdx === 2) {
            // 2025, 2021
            b3 = (c % 4 === 0) ? 2 : ((c % 5 === 0) ? 1 : 0);
          } else {
            b3 = (c % 7 === 0) ? 1 : 0;
          }
        }

        cells.push({ id, col: c, row: r, beatValues: [b0, b1, b2, b3] });
        id++;
      }
    }
    return cells;
  }, []);

  const years = [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026];
  const totals = commitsJson.totals.byYear as Record<string, number>;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 select-none">
      {/* Grid container */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${FB_COLS}, minmax(0, 1fr))`,
          gap: "2px",
          width: "100%",
          maxWidth: "680px",
          aspectRatio: "30 / 16",
        }}
        className="p-2 border border-[var(--rule)] bg-[#0B0D0C]"
      >
        {gridCells.map((cell) => {
          const val = cell.beatValues[currentBeat];
          let bg = "bg-[#161917]";
          if (val === 1) bg = "bg-[var(--chalk)]";
          if (val === 2) bg = "bg-[var(--red)]";

          return (
            <div
              key={cell.id}
              className={`w-full h-full transition-colors duration-300 rounded-[1px] ${bg}`}
            />
          );
        })}
      </div>

      {/* Visually hidden commits table for screen readers (Section 5.4) */}
      <table className="sr-only">
        <caption>Annual commit totals from 2019 to 2026</caption>
        <thead>
          <tr>
            <th scope="col">Year</th>
            <th scope="col">Commits</th>
          </tr>
        </thead>
        <tbody>
          {years.map((y) => (
            <tr key={y}>
              <th scope="row">{y}</th>
              <td>{totals[String(y)] || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
