import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";

export const runtime = "nodejs";

export const alt = "Mohammed Ayaan: agentic AI & cloud builder, Bengaluru";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OGImage() {
  let profileBase64 = "";
  try {
    const profilePath = path.join(process.cwd(), "public/images/profile.jpeg");
    if (fs.existsSync(profilePath)) {
      const buffer = fs.readFileSync(profilePath);
      profileBase64 = `data:image/jpeg;base64,${buffer.toString("base64")}`;
    }
  } catch {}

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#FBF9F2", // Paper
          color: "#111210", // Ink
          padding: "48px 56px",
          fontFamily: "system-ui, sans-serif",
          border: "8px solid #111210",
        }}
      >
        {/* Top Header Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "4px solid #111210",
            paddingBottom: "16px",
          }}
        >
          <div
            style={{
              backgroundColor: "#FFD600",
              color: "#111210",
              padding: "6px 14px",
              fontFamily: "monospace",
              fontWeight: "bold",
              fontSize: 16,
              border: "3px solid #111210",
              boxShadow: "3px 3px 0px #111210",
            }}
          >
            ISSUE #1 · 2026
          </div>

          <div
            style={{
              fontFamily: "monospace",
              fontSize: 15,
              fontWeight: "bold",
              color: "#4A4D46",
              letterSpacing: "0.1em",
            }}
          >
            BENGALURU · B.TECH CSE 2028 · OPEN TO INTERNSHIPS
          </div>
        </div>

        {/* Center Content: Title Plates & Portrait */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "40px",
          }}
        >
          {/* Left: Offset-plate Title H1 */}
          <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
            {/* Plates container */}
            <div style={{ display: "flex", position: "relative", width: "700px", height: "180px" }}>
              {/* Cyan Plate */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  position: "absolute",
                  left: "-4px",
                  top: "-4px",
                  fontSize: "64px",
                  fontWeight: "900",
                  color: "#00E5FF",
                  lineHeight: 1,
                  textTransform: "uppercase",
                }}
              >
                <span>MOHAMMED AYAAN</span>
                <span>ADIL AHMED</span>
              </div>

              {/* Magenta Plate */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  position: "absolute",
                  left: "4px",
                  top: "4px",
                  fontSize: "64px",
                  fontWeight: "900",
                  color: "#FF2A85",
                  lineHeight: 1,
                  textTransform: "uppercase",
                }}
              >
                <span>MOHAMMED AYAAN</span>
                <span>ADIL AHMED</span>
              </div>

              {/* Yellow Plate */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  position: "absolute",
                  left: "-2px",
                  top: "4px",
                  fontSize: "64px",
                  fontWeight: "900",
                  color: "#FFD600",
                  lineHeight: 1,
                  textTransform: "uppercase",
                }}
              >
                <span>MOHAMMED AYAAN</span>
                <span>ADIL AHMED</span>
              </div>

              {/* Real Ink H1 */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  position: "absolute",
                  left: "0px",
                  top: "0px",
                  fontSize: "64px",
                  fontWeight: "900",
                  color: "#111210",
                  lineHeight: 1,
                  textTransform: "uppercase",
                }}
              >
                <span>MOHAMMED AYAAN</span>
                <span>ADIL AHMED</span>
              </div>
            </div>

            {/* Subline */}
            <div
              style={{
                display: "flex",
                marginTop: "20px",
                fontFamily: "monospace",
                fontSize: 18,
                fontWeight: "bold",
                color: "#111210",
                backgroundColor: "#FFD600",
                padding: "8px 16px",
                border: "3px solid #111210",
                boxShadow: "3px 3px 0px #111210",
                maxWidth: "680px",
              }}
            >
              AGENTIC AI · CLOUD ARCHITECTURE · DISTRIBUTED BACKEND
            </div>
          </div>

          {/* Right: Owner's portrait small in a panel */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundColor: "#FBF9F2",
              border: "4px solid #111210",
              boxShadow: "6px 6px 0px #111210",
              padding: "10px",
            }}
          >
            {profileBase64 ? (
              <img
                src={profileBase64}
                alt=""
                style={{
                  width: "180px",
                  height: "220px",
                  objectFit: "cover",
                  border: "2px solid #111210",
                }}
              />
            ) : (
              <div
                style={{
                  width: "180px",
                  height: "220px",
                  backgroundColor: "#FFD600",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 48,
                  fontWeight: "bold",
                }}
              >
                AY
              </div>
            )}
            <div
              style={{
                fontFamily: "monospace",
                fontSize: 10,
                fontWeight: "bold",
                marginTop: "8px",
                color: "#111210",
              }}
            >
              MOHAMMED AYAAN
            </div>
          </div>
        </div>

        {/* Footer Subline */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "3px solid #111210",
            paddingTop: "12px",
            fontFamily: "monospace",
            fontSize: 14,
            fontWeight: "bold",
            color: "#4A4D46",
          }}
        >
          <span>MESSY HUMAN INPUT, WORKING SOFTWARE OUT.</span>
          <span>mohammedayaan.me</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
