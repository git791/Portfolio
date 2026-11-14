"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionReveal from "@/components/ui/SectionReveal";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function ArchiveLinks() {
  const containerRef = useRef<HTMLElement>(null);
  
  const links = [
    { title: "Projects", path: "/projects" },
    { title: "Skills", path: "/skills" },
    { title: "Hackathons", path: "/hackathons" },
    { title: "Certifications", path: "/certifications" }
  ];

  return (
    <section
      ref={containerRef}
      className="section-padding"
      style={{ borderTop: "1px solid var(--color-border)" }}
    >
      <div className="container-main">
        <SectionReveal>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--color-accent)",
              marginBottom: "1.5rem",
            }}
          >
            Explore More
          </div>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              marginBottom: "3rem",
              color: "var(--color-ink)",
            }}
          >
            View Full <em style={{ fontStyle: "italic", color: "var(--color-accent)" }}>Portfolio</em> & <em style={{ fontStyle: "italic", color: "var(--color-accent)" }}>Skills</em>
          </h2>
        </SectionReveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem" }}>
          {links.map((link, index) => (
            <SectionReveal key={link.title} delay={0.1 * (index + 2)}>
              <Link href={link.path} style={{ textDecoration: "none" }}>
                <div
                  style={{
                    padding: "2rem",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-md)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    transition: "all 0.3s ease",
                    cursor: "none",
                  }}
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, {
                      borderColor: "var(--color-ink)",
                      backgroundColor: "var(--color-surface)",
                      duration: 0.3,
                    });
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, {
                      borderColor: "var(--color-border)",
                      backgroundColor: "transparent",
                      duration: 0.3,
                    });
                  }}
                >
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "var(--color-ink)" }}>
                    {link.title}
                  </span>
                  <span style={{ fontSize: "1.2rem", color: "var(--color-accent)" }}>→</span>
                </div>
              </Link>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
