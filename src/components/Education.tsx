"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionReveal from "@/components/ui/SectionReveal";
import { education } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

type Education = (typeof education)[0];

export default function Education() {
  const containerRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          duration: 1.8,
          ease: "power4.out",
          scrollTrigger: {
            trigger: lineRef.current,
            start: "top 80%",
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      id="education"
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
              Academic Background
            </div>
            <h2
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                color: "var(--color-ink)",
              }}
            >
              Education
            </h2>
          </div>
        </SectionReveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 3fr",
            gap: "4rem",
          }}
          className="education-grid"
        >
          <div style={{ position: "relative" }}>
            <div
              ref={lineRef}
              style={{
                position: "sticky",
                top: "120px",
                width: "1px",
                height: "240px",
                backgroundColor: "var(--color-border)",
                marginLeft: "auto",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "var(--color-accent)",
                }}
              />
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
            {education.map((item: Education, i: number) => (
              <SectionReveal key={item.id} delay={i * 0.1}>
                <div
                  style={{
                    paddingBottom: "4rem",
                    borderBottom:
                      i < education.length - 1
                        ? "1px solid var(--color-border)"
                        : "none",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "1rem",
                      gap: "1rem",
                    }}
                    className="education-header"
                  >
                    <div>
                      <h3
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
                          color: "var(--color-ink)",
                          fontWeight: 400,
                          marginBottom: "0.4rem",
                        }}
                      >
                        {item.degree}
                      </h3>
                      <div
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "1rem",
                          color: "var(--color-accent)",
                          marginBottom: "0.25rem",
                        }}
                      >
                        {item.institution}
                      </div>
                      {item.location && (
                        <div
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.75rem",
                            letterSpacing: "0.08em",
                            color: "var(--color-ink-muted)",
                          }}
                        >
                          {item.location}
                        </div>
                      )}
                    </div>

                    <div
                      style={{
                        flexShrink: 0,
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.75rem",
                        letterSpacing: "0.08em",
                        color: "var(--color-ink-muted)",
                        textAlign: "right",
                        padding: "0.4rem 0.8rem",
                        border: "1px solid var(--color-border)",
                        borderRadius: "var(--radius-sm)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.startYear} — {item.endYear}
                    </div>
                  </div>

                  {item.description && (
                    <p
                      style={{
                        fontSize: "0.95rem",
                        lineHeight: 1.75,
                        color: "var(--color-ink-muted)",
                        maxWidth: "640px",
                      }}
                    >
                      {item.description}
                    </p>
                  )}
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .education-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .education-header {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
        }
      `}</style>
    </section>
  );
}