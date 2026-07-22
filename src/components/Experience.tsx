"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionReveal from "@/components/ui/SectionReveal";
import { experience } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

type Experience = (typeof experience)[0];

const typeColors: Record<string, string> = {
  "Full-time": "var(--color-accent)",
  "Part-time": "var(--color-ink-muted)",
  "Internship": "var(--color-ink)",
};

export default function Experience() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const rows = gsap.utils.toArray<HTMLElement>(".experience-row");
      rows.forEach((row, i) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: i * 0.08,
            scrollTrigger: {
              trigger: row,
              start: "top 88%",
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="experience"
      ref={containerRef}
      className="section-padding"
      style={{ borderTop: "1px solid var(--color-border)" }}
    >
      <div className="container-main">
        <SectionReveal>
          <div style={{ marginBottom: "4rem" }}>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--color-accent)",
                marginBottom: "0.75rem",
              }}
            >
              Roles & Responsibilities
            </div>
            <h2
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                color: "var(--color-ink)",
              }}
            >
              Experience
            </h2>
          </div>
        </SectionReveal>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {experience.map((item: Experience, i: number) => (
            <div
              key={item.id}
              className="experience-row"
              style={{
                opacity: 0,
                display: "grid",
                gridTemplateColumns: "1fr 3fr",
                gap: "3rem",
                paddingBlock: "2.5rem",
                borderBottom: "1px solid var(--color-border)",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.7rem",
                    letterSpacing: "0.08em",
                    color: "var(--color-ink-muted)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {item.startDate} — {item.endDate}
                </div>
                <div
                  style={{
                    display: "inline-block",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    padding: "0.2rem 0.6rem",
                    border: `1px solid ${typeColors[item.type] || "var(--color-border)"}`,
                    borderRadius: "var(--radius-sm)",
                    color: typeColors[item.type] || "var(--color-ink-muted)",
                  }}
                >
                  {item.type}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.7rem",
                    letterSpacing: "0.06em",
                    color: "var(--color-ink-muted)",
                    marginTop: "0.5rem",
                  }}
                >
                  {item.location}
                </div>
              </div>

              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.3rem",
                    color: "var(--color-ink)",
                    fontWeight: 400,
                    marginBottom: "0.35rem",
                  }}
                >
                  {item.role}
                </h3>
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.95rem",
                    color: "var(--color-accent)",
                    marginBottom: "0.75rem",
                  }}
                >
                  {item.organization}
                </div>
                {item.description && (
                  <p
                    style={{
                      fontSize: "0.9rem",
                      lineHeight: 1.75,
                      color: "var(--color-ink-muted)",
                      maxWidth: "600px",
                    }}
                  >
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .experience-row {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
        }
      `}</style>
    </section>
  );
}