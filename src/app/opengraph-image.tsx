import { ImageResponse } from "next/og";
import commitsJson from "@/data/commits.json";
import { projects } from "@/lib/data";

export const runtime = "nodejs";

export const alt = "Mohammed Ayaan — Agentic AI & Cloud Builder, Bengaluru";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  const years = ["2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026"];
  const totals = commitsJson.totals.byYear as Record<string, number>;
  const maxVal = Math.max(...Object.values(totals), 1);

  // Compute SVG polyline points for the yearly commit profile
  const width = 480;
  const height = 90;
  const step = width / (years.length - 1);
  const points = years
    .map((y, i) => {
      const val = totals[y] || 0;
      const x = Math.round(i * step);
      const yPos = Math.round(height - (Math.sqrt(val / maxVal) * (height - 10) + 5));
      return `${x},${yPos}`;
    })
    .join(" ");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0D0E0B",
          color: "#ECE9DF",
          padding: "64px 72px",
          fontFamily: "system-ui, sans-serif",
          border: "2px solid #3A3C36",
        }}
      >
        {/* Top Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 14,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#8B8A80",
            }}
          >
            BENGALURU · B.TECH CSE 2028
          </div>
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 13,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              padding: "4px 12px",
              border: "1px solid #3A3C36",
              color: "#8B8A80",
            }}
          >
            SIGNAL TO STRUCTURE
          </div>
        </div>

        {/* Center Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              fontSize: 22,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#8B8A80",
              fontWeight: 500,
            }}
          >
            MOHAMMED AYAAN ADIL AHMED
          </div>

          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              lineHeight: 1.02,
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
              color: "#ECE9DF",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ display: "flex" }}>MESSY HUMAN INPUT,</div>
            <div style={{ display: "flex", color: "#FFC400" }}>WORKING AGENTS.</div>
          </div>
        </div>

        {/* Bottom Footer with Ridgeline Motif */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid #3A3C36",
            paddingTop: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              fontFamily: "monospace",
              fontSize: 13,
              textTransform: "uppercase",
              color: "#8B8A80",
              letterSpacing: "0.1em",
            }}
          >
            <div style={{ display: "flex" }}>
              {`${projects.length} BUILDS · 21 HACKATHONS · COMMITS BACK TO 2019`}
            </div>
            <div style={{ display: "flex", color: "#ECE9DF" }}>mohammedayaan.me</div>
          </div>

          {/* SVG Ridgeline Motif */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
            <svg width={width} height={height} style={{ overflow: "visible" }}>
              <polyline
                fill="none"
                stroke="#FFC400"
                strokeWidth="2.5"
                points={points}
              />
              <line
                x1="0"
                y1={height}
                x2={width}
                y2={height}
                stroke="#3A3C36"
                strokeWidth="1"
              />
            </svg>
            <div
              style={{
                fontFamily: "monospace",
                fontSize: 10,
                color: "#8B8A80",
                letterSpacing: "0.15em",
              }}
            >
              2019 — 2026 COMMIT PROFILE
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
