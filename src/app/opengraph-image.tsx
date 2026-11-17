import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";
import commitsJson from "@/data/commits.json";

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

  // Read owner portrait as base64 Data URL
  let profileBase64 = "";
  try {
    const profilePath = path.join(process.cwd(), "public/images/profile.jpeg");
    const profileBuffer = fs.readFileSync(profilePath);
    profileBase64 = `data:image/jpeg;base64,${profileBuffer.toString("base64")}`;
  } catch {
    // Fallback if missing
  }

  // Mini card-grid motif: 8 rows (years 2019-2026) x 16 cards per row
  const gridRows = years.map((year) => {
    const total = totals[year] || 0;
    const cards = [];
    // Number of active cards out of 16 proportional to commits
    const activeCards = total === 0 ? 0 : Math.min(16, Math.max(1, Math.round(Math.log2(total + 1) * 2.2)));
    for (let c = 0; c < 16; c++) {
      let color = "#161917"; // inactive night card
      if (c < activeCards) {
        color = total >= 20 ? "#D62A1F" : "#F2EFE6"; // red for high, chalk for moderate
      }
      cards.push(color);
    }
    return { year, cards, total };
  });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0B0D0C",
          color: "#F2EFE6",
          padding: "60px 72px",
          fontFamily: "system-ui, sans-serif",
          border: "2px solid #2A2D2A",
        }}
      >
        {/* Top Header Row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 14,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#8B8A80",
            }}
          >
            BENGALURU · B.TECH CSE 2028 · 2019–2026
          </div>
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 12,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              padding: "4px 12px",
              border: "1px solid #2A2D2A",
              color: "#F2EFE6",
              backgroundColor: "#111412",
            }}
          >
            OPEN TO INTERNSHIPS
          </div>
        </div>

        {/* Middle: Name & The H1 Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 16,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#8B8A80",
            }}
          >
            MOHAMMED AYAAN ADIL AHMED
          </div>

          <div
            style={{
              fontSize: 66,
              fontWeight: 900,
              lineHeight: 0.95,
              textTransform: "uppercase",
              letterSpacing: "0.01em",
              color: "#F2EFE6",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>MESSY HUMAN INPUT,</span>
            <span>WORKING AGENTS.</span>
          </div>
        </div>

        {/* Bottom Row: Mini Card-Grid Motif (Left) and Owner Portrait (Right) */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          {/* Mini Card-Grid Motif drawn from yearly commit totals */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div
              style={{
                fontFamily: "monospace",
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#8B8A80",
                marginBottom: 2,
              }}
            >
              YEARLY COMMIT TERRACE (2019–2026) · 334 COMMITS
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {gridRows.map((row) => (
                <div key={row.year} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span
                    style={{
                      fontFamily: "monospace",
                      fontSize: 10,
                      color: "#8B8A80",
                      width: 32,
                    }}
                  >
                    {row.year}
                  </span>
                  <div style={{ display: "flex", gap: 3 }}>
                    {row.cards.map((color, i) => (
                      <div
                        key={i}
                        style={{
                          width: 14,
                          height: 7,
                          backgroundColor: color,
                          borderRadius: 1,
                        }}
                      />
                    ))}
                  </div>
                  <span
                    style={{
                      fontFamily: "monospace",
                      fontSize: 10,
                      color: row.total > 0 ? "#F2EFE6" : "#5E5A4E",
                      marginLeft: 4,
                    }}
                  >
                    {row.total}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Owner portrait small at right in programme frame (NO crest or player images) */}
          {profileBase64 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
                border: "1px solid #2A2D2A",
                padding: 6,
                backgroundColor: "#111412",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={profileBase64}
                alt="Mohammed Ayaan"
                width={130}
                height={155}
                style={{
                  objectFit: "cover",
                  filter: "grayscale(100%)",
                }}
              />
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: 9,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#8B8A80",
                }}
              >
                MOHAMMED AYAAN
              </span>
            </div>
          ) : (
            <div
              style={{
                width: 130,
                height: 155,
                border: "1px solid #2A2D2A",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#F2EFE6",
                color: "#0B0D0C",
                fontFamily: "monospace",
                fontWeight: "bold",
                fontSize: 32,
              }}
            >
              AY
            </div>
          )}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
