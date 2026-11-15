"use client";

import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionReveal from "@/components/ui/SectionReveal";
import { hackathons } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

type Hackathon = (typeof hackathons)[0];

function ProjectLink({ url, label }: { url: string; label: string }) {
  return React.createElement(
    "a",
    {
      href: url,
      target: "_blank",
      rel: "noopener noreferrer",
      style: {
        flexShrink: 0,
        fontFamily: "var(--font-mono)",
        fontSize: "0.7rem",
        letterSpacing: "0.1em",
        textTransform: "uppercase" as const,
        color: "var(--color-accent)",
        borderBottom: "1px solid var(--color-accent)",
        paddingBottom: "2px",
        whiteSpace: "nowrap",
      },
    },
    `${label} ↗`
  );
}

export default function Hackathons() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState<number | null>(null);

  useGSAP(
    () => {
      const rows = gsap.utils.toArray<HTMLElement>(".hackathon-row");
      rows.forEach((row, i) => {
        gsap.fromTo(
          row,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: i * 0.1,
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

  const handleRowEnter = (id: number, el: HTMLElement) => {
    setActiveId(id);
    gsap.to(el, { paddingLeft: "1.5rem", duration: 0.3, ease: "power3.out" });
  };

  const handleRowLeave = (id: number, el: HTMLElement) => {
    setActiveId(null);
    gsap.to(el, { paddingLeft: "0rem", duration: 0.3, ease: "power3.out" });
  };

  return (
    <section
      id="hackathons"
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
              Competitions & Events
            </div>
            <h2
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                color: "var(--color-ink)",
              }}
            >
              Hackathons
            </h2>
          </div>
        </SectionReveal>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr 0.5fr",
              gap: "1rem",
              paddingBottom: "0.75rem",
              borderBottom: "1px solid var(--color-border)",
              marginBottom: "0.5rem",
            }}
            className="hackathon-table-header"
          >
            {["Event", "Organizer", "Date", "Result"].map((col: string) => (
              <span
                key={col}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--color-ink-muted)",
                }}
              >
                {col}
              </span>
            ))}
          </div>

          {hackathons.map((hackathon: Hackathon) => (
            <div key={hackathon.id}>
              <div
                className="hackathon-row"
                style={{ opacity: 0 }}
                onMouseEnter={(e) =>
                  handleRowEnter(hackathon.id, e.currentTarget)
                }
                onMouseLeave={(e) =>
                  handleRowLeave(hackathon.id, e.currentTarget)
                }
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "2fr 1fr 1fr 0.5fr",
                    gap: "1rem",
                    paddingBlock: "1.5rem",
                    borderBottom: "1px solid var(--color-border)",
                    alignItems: "center",
                    cursor: "none",
                  }}
                  className="hackathon-table-header"
                >
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.1rem",
                        color: "var(--color-ink)",
                        fontWeight: 400,
                        marginBottom: "0.25rem",
                      }}
                    >
                      {hackathon.name}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "0.35rem",
                        marginTop: "0.5rem",
                      }}
                    >
                      {hackathon.tags.map((tag: string) => (
                        <span
                          key={tag}
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.6rem",
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            padding: "0.2rem 0.5rem",
                            border: "1px solid var(--color-border)",
                            borderRadius: "var(--radius-sm)",
                            color: "var(--color-ink-muted)",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.9rem",
                      color: "var(--color-ink-muted)",
                    }}
                  >
                    {hackathon.organizer}
                  </span>

                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.8rem",
                      letterSpacing: "0.05em",
                      color: "var(--color-ink-muted)",
                    }}
                  >
                    {hackathon.date}
                  </span>

                  {hackathon.track && (
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.75rem",
                        letterSpacing: "0.05em",
                        color: "var(--color-ink-muted)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {hackathon.track}
                    </span>
                  )}

                  {hackathon.placement ? (
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.65rem",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        padding: "0.2rem 0.5rem",
                        backgroundColor: "var(--color-ink)",
                        color: "var(--color-background)",
                        borderRadius: "var(--radius-sm)",
                        fontWeight: 600,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {hackathon.placement}
                    </span>
                  ) : (hackathon.stage === "semi-finalist" || hackathon.stage === "finalist") ? (
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.65rem",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        padding: "0.2rem 0.5rem",
                        border: "1px solid var(--color-border)",
                        borderRadius: "var(--radius-sm)",
                        color: "var(--color-ink)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {hackathon.stage}
                    </span>
                  ) : null}
                </div>

                <div
                  style={{
                    maxHeight: activeId === hackathon.id ? "200px" : "0px",
                    overflow: "hidden",
                    transition: "max-height 0.4s var(--ease-out-expo)",
                  }}
                >
                  <div
                    style={{
                      paddingBlock: "1.25rem",
                      paddingLeft: "0.5rem",
                      borderBottom: "1px solid var(--color-border)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-end",
                      gap: "2rem",
                    }}
                    className="hackathon-expand"
                  >
                    <p
                      style={{
                        fontSize: "0.9rem",
                        lineHeight: 1.7,
                        color: "var(--color-ink-muted)",
                        maxWidth: "640px",
                        margin: 0,
                      }}
                    >
                      {hackathon.description}
                    </p>
                    {hackathon.projectUrl && (
                      <ProjectLink 
                        url={hackathon.projectUrl} 
                        label={"urlLabel" in hackathon && hackathon.urlLabel ? hackathon.urlLabel as string : "View Project"} 
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hackathon-table-header {
            grid-template-columns: 1fr 1fr !important;
            gap: 0.5rem !important;
          }
          .hackathon-expand {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
        }
      `}</style>
    </section>
  );
}