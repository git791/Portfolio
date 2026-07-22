"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import SectionReveal from "@/components/ui/SectionReveal";
import { certifications } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

type Cert = (typeof certifications)[0];

const categories = ["Industry", "Competition", "Courses", "Coursera"];

function CredentialLink({ url }: { url: string }) {
  return React.createElement(
    "a",
    {
      href: url,
      target: "_blank",
      rel: "noopener noreferrer",
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: "0.35rem",
        fontFamily: "var(--font-mono)",
        fontSize: "0.7rem",
        letterSpacing: "0.1em",
        textTransform: "uppercase" as const,
        color: "var(--color-accent)",
        borderBottom: "1px solid var(--color-accent)",
        paddingBottom: "2px",
      },
    },
    "View Credential ↗"
  );
}

function CertCard({ cert, index, baseIndex }: { cert: Cert; index: number; baseIndex: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!cardRef.current) return;
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: (index % 3) * 0.12,
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 88%",
          },
        }
      );
    },
    { scope: cardRef }
  );

  return (
    <div
      ref={cardRef}
      style={{ opacity: 0 }}
      onMouseEnter={(e) => {
        gsap.to(e.currentTarget, { y: -4, duration: 0.3, ease: "power2.out" });
      }}
      onMouseLeave={(e) => {
        gsap.to(e.currentTarget, { y: 0, duration: 0.3, ease: "power2.out" });
      }}
    >
      <div
        style={{
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-lg)",
          overflow: "hidden",
          backgroundColor: "var(--color-surface)",
        }}
      >
        <div
          style={{
            position: "relative",
            paddingTop: "52%",
            backgroundColor: "var(--color-background)",
            borderBottom: "1px solid var(--color-border)",
          }}
        >
          {cert.image ? (
            <Image
              src={cert.image}
              alt={cert.title}
              fill
              style={{ objectFit: "contain", padding: "1.5rem" }}
            />
          ) : (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  border: "1.5px solid var(--color-border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-display)",
                  fontSize: "1.5rem",
                  color: "var(--color-ink-muted)",
                }}
              >
                {"✦"}
              </div>
            </div>
          )}
        </div>

        <div style={{ padding: "1.5rem" }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--color-accent)",
              marginBottom: "0.5rem",
            }}
          >
            {cert.issuer}
          </div>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.1rem",
              color: "var(--color-ink)",
              fontWeight: 400,
              lineHeight: 1.3,
              marginBottom: "0.75rem",
            }}
          >
            {cert.title}
          </h3>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: "1rem",
            }}
          >
            {cert.date && (
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  letterSpacing: "0.08em",
                  color: "var(--color-ink-muted)",
                }}
              >
                {cert.date}
              </span>
            )}
            {cert.credentialUrl && (
              <CredentialLink url={cert.credentialUrl} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Certifications() {
  const containerRef = useRef<HTMLElement>(null);

  return (
    <section
      id="certifications"
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
              Credentials
            </div>
            <h2
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                color: "var(--color-ink)",
              }}
            >
              Certifications
            </h2>
          </div>
        </SectionReveal>

        {categories.map((category) => {
          const filtered = certifications.filter(
            (c: Cert) => "category" in c && c.category === category
          );
          if (filtered.length === 0) return null;

          return (
            <div key={category} style={{ marginBottom: "5rem" }}>
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
                    {category}
                  </span>
                  <div
                    style={{
                      flex: 1,
                      height: "1px",
                      backgroundColor: "var(--color-border)",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.7rem",
                      color: "var(--color-ink-muted)",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {filtered.length}
                  </span>
                </div>
              </SectionReveal>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "2rem",
                }}
                className="certs-grid"
              >
                {filtered.map((cert: Cert, i: number) => (
                  <CertCard
                    key={cert.id}
                    cert={cert}
                    index={i}
                    baseIndex={i}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .certs-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}