"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionReveal from "@/components/ui/SectionReveal";
import { personalInfo } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  const imageLineRef = useRef<HTMLDivElement>(null);
  const numberRefs = useRef<HTMLSpanElement[]>([]);

  const stats = [
    { value: 30, suffix: "+", label: "Projects Completed" },
  ];

  useGSAP(
    () => {
      gsap.fromTo(
        imageLineRef.current,
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          duration: 1.4,
          ease: "power4.out",
          scrollTrigger: {
            trigger: imageLineRef.current,
            start: "top 80%",
          },
        }
      );

      numberRefs.current.forEach((el: HTMLSpanElement, i: number) => {
        if (!el) return;
        const target = stats[i].value;
        const counter = { val: 0 };
        gsap.to(counter, {
          val: target,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
          onUpdate: () => {
            el.textContent = Math.round(counter.val).toString();
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="about"
      ref={containerRef}
      className="section-padding"
      style={{ borderTop: "1px solid var(--color-border)" }}
    >
      <div className="container-main">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "6rem",
            alignItems: "start",
          }}
          className="about-grid"
        >
          <div>
            <SectionReveal>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  marginBottom: "2rem",
                }}
              >
                <div
                  ref={imageLineRef}
                  style={{
                    width: "1px",
                    height: "48px",
                    backgroundColor: "var(--color-accent)",
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--color-accent)",
                  }}
                >
                  About Me
                </span>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <h2
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  marginBottom: "2rem",
                  color: "var(--color-ink)",
                }}
              >
                Designing with
                <br />
                <em style={{ fontStyle: "italic", color: "var(--color-accent)" }}>
                  intention
                </em>
              </h2>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <p
                style={{
                  fontSize: "1.05rem",
                  lineHeight: 1.8,
                  color: "var(--color-ink-muted)",
                  marginBottom: "3rem",
                }}
              >
                {personalInfo.about}
              </p>
            </SectionReveal>

            <SectionReveal delay={0.3}>
              <div style={{ display: "flex", gap: "3rem" }}>
                {stats.map((stat, i) => (
                  <div key={stat.label}>
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "2.5rem",
                        color: "var(--color-ink)",
                        lineHeight: 1,
                        marginBottom: "0.4rem",
                      }}
                    >
                      <span
                        ref={(el) => {
                          if (el) numberRefs.current[i] = el;
                        }}
                      >
                        0
                      </span>
                      {stat.suffix}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.7rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "var(--color-ink-muted)",
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </SectionReveal>
          </div>

          <SectionReveal direction="left" delay={0.2}>
            <div
              style={{
                position: "relative",
                paddingTop: "120%",
                backgroundColor: "var(--color-surface)",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
              }}
            >
              {/* <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: "1rem",
                  color: "var(--color-ink-muted)",
                }}
              >
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    border: "1.5px dashed var(--color-border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.5rem",
                  }}
                >
                  {"↑"}
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.7rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  Your Photo Here
                </span>
              </div> */}
              <div style={{ position: "absolute", inset: 0 }}>
                <Image
                  src="/images/profile.jpeg"
                  alt={personalInfo.name}
                  fill
                  style={{
                    objectFit: "cover",
                    objectPosition: "center 25%",
                  }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </SectionReveal>
        </div>

        <SectionReveal delay={0.1}>
          <div
            style={{
              marginTop: "5rem",
              paddingTop: "3rem",
              borderTop: "1px solid var(--color-border)",
              display: "flex",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--color-ink-muted)",
                whiteSpace: "nowrap",
              }}
            >
              Based in
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
                fontFamily: "var(--font-display)",
                fontSize: "1.1rem",
                color: "var(--color-ink)",
              }}
            >
              {personalInfo.location}
            </span>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}