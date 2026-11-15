"use client";

import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import SectionReveal from "@/components/ui/SectionReveal";
import { projects } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

type Project = (typeof projects)[0];

function GithubLink({ url }: { url: string }) {
  return React.createElement(
    "a",
    {
      href: url,
      target: "_blank",
      rel: "noopener noreferrer",
      style: {
        padding: "0.5rem 1rem",
        backgroundColor: "rgba(245,242,238,0.95)",
        borderRadius: "var(--radius-sm)",
        fontFamily: "var(--font-mono)",
        fontSize: "0.7rem",
        letterSpacing: "0.08em",
        textTransform: "uppercase" as const,
        color: "var(--color-ink)",
      },
    },
    "GitHub"
  );
}

function LiveLink({ url }: { url: string }) {
  return React.createElement(
    "a",
    {
      href: url,
      target: "_blank",
      rel: "noopener noreferrer",
      style: {
        padding: "0.5rem 1rem",
        backgroundColor: "var(--color-accent)",
        borderRadius: "var(--radius-sm)",
        fontFamily: "var(--font-mono)",
        fontSize: "0.7rem",
        letterSpacing: "0.08em",
        textTransform: "uppercase" as const,
        color: "#fff",
      },
    },
    "Live ↗"
  );
}

function FigmaLink({ url }: { url: string }) {
  return React.createElement(
    "a",
    {
      href: url,
      target: "_blank",
      rel: "noopener noreferrer",
      style: {
        padding: "0.5rem 1rem",
        backgroundColor: "rgba(245,242,238,0.95)",
        borderRadius: "var(--radius-sm)",
        fontFamily: "var(--font-mono)",
        fontSize: "0.7rem",
        letterSpacing: "0.08em",
        textTransform: "uppercase" as const,
        color: "var(--color-ink)",
      },
    },
    "Figma ↗"
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  useGSAP(
    () => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
          },
          delay: (index % 3) * 0.15,
        }
      );
    },
    { scope: cardRef }
  );

  const handleMouseEnter = () => {
    setHovered(true);
    gsap.to(imageRef.current, {
      scale: 1.05,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    gsap.to(imageRef.current, {
      scale: 1,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ opacity: 0 }}
    >
      <div
        style={{
          overflow: "hidden",
          borderRadius: "var(--radius-lg)",
          backgroundColor: "var(--color-surface)",
          marginBottom: "1.25rem",
          position: "relative",
          paddingTop: "62%",
        }}
      >
        <div ref={imageRef} style={{ position: "absolute", inset: 0 }}>
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              style={{ objectFit: "cover" }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                  "linear-gradient(135deg, var(--color-surface) 0%, var(--color-border) 100%)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--color-ink-muted)",
                }}
              >
                {project.category}
              </span>
            </div>
          )}
        </div>

        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "var(--color-ink)",
            opacity: hovered ? 0.35 : 0,
            transition: "opacity 0.4s ease",
            borderRadius: "var(--radius-lg)",
            zIndex: 1,
          }}
        />

        <div
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            display: "flex",
            gap: "0.5rem",
            zIndex: 2,
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(-8px)",
            transition: "opacity 0.3s ease, transform 0.3s ease",
          }}
        >
          {"figmaUrl" in project && project.figmaUrl && (
            <FigmaLink url={project.figmaUrl as string} />
          )}
          {"githubUrl" in project && project.githubUrl && (
            <GithubLink url={project.githubUrl as string} />
          )}
          {project.liveUrl && (
            <LiveLink url={project.liveUrl} />
          )}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "0.5rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.25rem",
              color: "var(--color-ink)",
              fontWeight: 400,
            }}
          >
            {project.title}
          </h3>
          {project.stage === "mvp" && (
            <span
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
              MVP
            </span>
          )}
        </div>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            color: "var(--color-ink-muted)",
            letterSpacing: "0.08em",
          }}
        >
          {project.year}
        </span>
      </div>

      <p
        style={{
          fontSize: "0.9rem",
          color: "var(--color-ink-muted)",
          lineHeight: 1.6,
          marginBottom: "1rem",
        }}
      >
        {project.description}
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
        {project.tags.map((tag: string) => (
          <span
            key={tag}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              padding: "0.3rem 0.7rem",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--color-border)",
              color: "var(--color-ink-muted)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  const featured = projects.filter((p: Project) => p.tier === "editorial");
  const others = projects.filter(
    (p: Project) => p.tier !== "editorial" && p.tier !== "playground"
  );
  const prototypes = projects.filter(
    (p: Project) => p.tier === "playground"
  );

  return (
    <section
      id="projects"
      className="section-padding"
      style={{ borderTop: "1px solid var(--color-border)" }}
    >
      <div className="container-main">
        <SectionReveal>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginBottom: "4rem",
            }}
          >
            <div>
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
                Selected Work
              </div>
              <h2
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  color: "var(--color-ink)",
                }}
              >
                Projects
              </h2>
            </div>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                color: "var(--color-ink-muted)",
                letterSpacing: "0.08em",
              }}
            >
              {projects.length} total
            </span>
          </div>
        </SectionReveal>

        {/* Featured Projects */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "2.5rem",
            marginBottom: "5rem",
          }}
          className="projects-grid"
        >
          {featured.map((project: Project, i: number) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* Other Projects */}
        {others.length > 0 && (
          <>
            <SectionReveal>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1.5rem",
                  marginBottom: "2rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--color-ink-muted)",
                    whiteSpace: "nowrap",
                  }}
                >
                  Other Projects
                </span>
                <div
                  style={{
                    flex: 1,
                    height: "1px",
                    backgroundColor: "var(--color-border)",
                  }}
                />
              </div>
            </SectionReveal>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "2rem",
                marginBottom: "5rem",
              }}
              className="projects-grid"
            >
              {others.map((project: Project, i: number) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
          </>
        )}

        {/* Prototype Stage */}
        {prototypes.length > 0 && (
          <>
            <SectionReveal>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1.5rem",
                  marginBottom: "2rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--color-ink-muted)",
                    whiteSpace: "nowrap",
                  }}
                >
                  Prototype Stage
                </span>
                <div
                  style={{
                    flex: 1,
                    height: "1px",
                    backgroundColor: "var(--color-border)",
                  }}
                />
              </div>
            </SectionReveal>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "2rem",
              }}
              className="projects-grid"
            >
              {prototypes.map((project: Project, i: number) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}