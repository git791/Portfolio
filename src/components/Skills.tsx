"use client";

import { useRef } from "react";
import React from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionReveal from "@/components/ui/SectionReveal";
import { skills, profiles } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

type SkillGroup = (typeof skills)[0];

export default function Skills() {
  const containerRef = useRef<HTMLElement>(null);
  const skillItemRefs = useRef<HTMLDivElement[]>([]);

  useGSAP(
    () => {
      skillItemRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.85 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
            },
            delay: (i % 8) * 0.06,
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="skills"
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
              What I Work With
            </div>
            <h2
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                color: "var(--color-ink)",
              }}
            >
              Skills
            </h2>
          </div>
        </SectionReveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "4rem",
          }}
          className="skills-grid"
        >
          {skills.map((group: SkillGroup, groupIndex: number) => {
            const baseIndex = skills
              .slice(0, groupIndex)
              .reduce((acc, g) => acc + g.items.length, 0);

            return (
              <div key={group.category}>
                <SectionReveal delay={0.1}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      marginBottom: "1.75rem",
                    }}
                  >
                    <div
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        backgroundColor: "var(--color-accent)",
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.75rem",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "var(--color-ink-muted)",
                      }}
                    >
                      {group.category}
                    </span>
                  </div>
                </SectionReveal>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.5rem",
                  }}
                >
                  {group.items.map((skill, itemIndex: number) => {
                    const currentIndex = baseIndex + itemIndex;
                    return (
                      <div
                        key={skill.name}
                        ref={(el) => {
                          if (el) skillItemRefs.current[currentIndex] = el;
                        }}
                        style={{ opacity: 0 }}
                        onMouseEnter={(e) => {
                          gsap.to(e.currentTarget, {
                            backgroundColor: "var(--color-ink)",
                            color: "var(--color-background)",
                            borderColor: "var(--color-ink)",
                            duration: 0.2,
                            ease: "power2.out",
                          });
                        }}
                        onMouseLeave={(e) => {
                          gsap.to(e.currentTarget, {
                            backgroundColor: "transparent",
                            color: "var(--color-ink-muted)",
                            borderColor: "var(--color-border)",
                            duration: 0.2,
                            ease: "power2.out",
                          });
                        }}
                      >
                        <span
                          style={{
                            display: "block",
                            fontFamily: "var(--font-body)",
                            fontSize: "0.875rem",
                            color: "var(--color-ink-muted)",
                            padding: "0.5rem 1rem",
                            border: "1px solid var(--color-border)",
                            borderRadius: "var(--radius-sm)",
                            userSelect: "none",
                          }}
                        >
                          {skill.name}{skill.repos ? ` x${skill.repos}` : ""}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <SectionReveal delay={0.2}>
          <div
            style={{
              marginTop: "5rem",
              padding: "2.5rem",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-lg)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "2rem",
            }}
            className="skills-footer"
          >
            <div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.5rem",
                  color: "var(--color-ink)",
                  marginBottom: "0.4rem",
                }}
              >
                Always learning.
              </div>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "var(--color-ink-muted)",
                  margin: 0,
                }}
              >
                Currently deep-diving into AWS architecture, exploring Azure,
                and actively building for hackathons while seeking internship
                opportunities.
              </p>
            </div>
            <div
              style={{
                flexShrink: 0,
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                border: "1.5px solid var(--color-border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.25rem",
              }}
            >
              {"↗"}
            </div>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <div
            style={{
              marginTop: "3rem",
              paddingTop: "2rem",
              borderTop: "1px solid var(--color-border)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--color-ink-muted)",
                marginBottom: "1rem",
              }}
            >
              Find Me On
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
              {Object.entries(profiles).map(([platform, url]) =>
                url ? (
                  React.createElement(
                    "a",
                    {
                      key: platform,
                      href: url,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      style: {
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.75rem",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase" as const,
                        padding: "0.5rem 1rem",
                        border: "1px solid var(--color-border)",
                        borderRadius: "var(--radius-sm)",
                        color: "var(--color-ink-muted)",
                      },
                      onMouseEnter: (e: MouseEvent) => {
                        gsap.to(e.currentTarget as HTMLElement, {
                          color: "var(--color-ink)",
                          borderColor: "var(--color-ink)",
                          duration: 0.2,
                        });
                      },
                      onMouseLeave: (e: MouseEvent) => {
                        gsap.to(e.currentTarget as HTMLElement, {
                          color: "var(--color-ink-muted)",
                          borderColor: "var(--color-border)",
                          duration: 0.2,
                        });
                      },
                    },
                    `${platform} ↗`
                  )
                ) : null
              )}
            </div>
          </div>
        </SectionReveal>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .skills-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
          .skills-footer {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
        }
      `}</style>
    </section>
  );
}