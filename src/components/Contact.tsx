"use client";

import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionReveal from "@/components/ui/SectionReveal";
import { personalInfo } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

const GithubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const LinkedinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const TwitterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

const DevToIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="5" width="20" height="14" rx="2" ry="2"></rect>
    <path d="M6 9v6"></path>
    <path d="M9 9h2.5a2.5 2.5 0 0 1 2.5 2.5v0a2.5 2.5 0 0 1-2.5 2.5H9z"></path>
    <path d="M15 9l2 6 2-6"></path>
  </svg>
);

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const DefaultIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);

function SocialLink({ href, label, icon }: { href: string; label: string; icon?: React.ReactNode }) {
  return React.createElement(
    "a",
    {
      href,
      target: "_blank",
      rel: "noopener noreferrer",
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        fontFamily: "var(--font-mono)",
        fontSize: "0.75rem",
        letterSpacing: "0.1em",
        textTransform: "uppercase" as const,
        color: "var(--color-ink-muted)",
        padding: "0.75rem 1.25rem",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-sm)",
        transition: "all 0.2s ease",
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
    icon ? icon : <DefaultIcon />,
    label
  );
}

function EmailLink({ email }: { email: string }) {
  return React.createElement(
    "a",
    {
      href: `mailto:${email}`,
      style: {
        fontFamily: "var(--font-display)",
        fontSize: "clamp(2rem, 4vw, 3.5rem)",
        color: "var(--color-ink)",
        letterSpacing: "-0.02em",
        lineHeight: 1,
        borderBottom: "2px solid var(--color-accent)",
        paddingBottom: "0.25rem",
        transition: "color 0.2s ease",
      },
      onMouseEnter: (e: MouseEvent) => {
        gsap.to(e.currentTarget as HTMLElement, {
          color: "var(--color-accent)",
          duration: 0.2,
        });
      },
      onMouseLeave: (e: MouseEvent) => {
        gsap.to(e.currentTarget as HTMLElement, {
          color: "var(--color-ink)",
          duration: 0.2,
        });
      },
    },
    email
  );
}

export default function Contact() {
  const containerRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  useGSAP(
    () => {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 1.4,
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

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
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
              marginBottom: "0.75rem",
            }}
          >
            Get In Touch
          </div>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <h2
            style={{
              fontSize: "clamp(3rem, 7vw, 6rem)",
              color: "var(--color-ink)",
              lineHeight: 1,
              marginBottom: "2rem",
            }}
          >
            Let&apos;s work
            <br />
            <em style={{ color: "var(--color-accent)", fontStyle: "italic" }}>
              together.
            </em>
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <div
            ref={lineRef}
            style={{
              width: "100%",
              height: "1px",
              backgroundColor: "var(--color-border)",
              marginBottom: "3rem",
            }}
          />
        </SectionReveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "start",
          }}
          className="contact-grid"
        >
          <SectionReveal delay={0.1}>
            <div>
              <p
                style={{
                  fontSize: "1.05rem",
                  lineHeight: 1.8,
                  color: "var(--color-ink-muted)",
                  maxWidth: "480px",
                  marginBottom: "2.5rem",
                }}
              >
                I&apos;m currently open to internship opportunities, freelance
                projects, and collaborations. If you have something in mind,
                I&apos;d love to hear from you.
              </p>

              <div style={{ marginBottom: "1rem" }}>
                <EmailLink email={personalInfo.email} />
              </div>

              <button
                onClick={handleCopyEmail}
                style={{
                  marginTop: "1rem",
                  background: "none",
                  border: "none",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: copied
                    ? "var(--color-accent)"
                    : "var(--color-ink-muted)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  transition: "color 0.2s ease",
                  padding: 0,
                }}
              >
                {copied ? "✓ Copied!" : "Copy email address"}
              </button>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.2} direction="left">
            <div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--color-ink-muted)",
                  marginBottom: "1.25rem",
                }}
              >
                Find me online
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                {personalInfo.social.github && (
                  <SocialLink
                    href={personalInfo.social.github}
                    label="GitHub"
                    icon={<GithubIcon />}
                  />
                )}
                {personalInfo.social.linkedin && (
                  <SocialLink
                    href={personalInfo.social.linkedin}
                    label="LinkedIn"
                    icon={<LinkedinIcon />}
                  />
                )}
                {"devto" in personalInfo.social &&
                  personalInfo.social.devto && (
                    <SocialLink
                      href={personalInfo.social.devto as string}
                      label="Dev.to"
                      icon={<DevToIcon />}
                    />
                  )}
                {"instagram" in personalInfo.social &&
                  personalInfo.social.instagram && (
                    <SocialLink
                      href={personalInfo.social.instagram as string}
                      label="Instagram"
                      icon={<InstagramIcon />}
                    />
                  )}
                {"x" in personalInfo.social &&
                  personalInfo.social.x && (
                    <SocialLink
                      href={personalInfo.social.x as string}
                      label="X"
                      icon={<TwitterIcon />}
                    />
                  )}
                {"medium" in personalInfo.social &&
                  personalInfo.social.medium && (
                    <SocialLink
                      href={personalInfo.social.medium as string}
                      label="Medium"
                    />
                  )}
                {"dribbble" in personalInfo.social &&
                  personalInfo.social.dribbble && (
                    <SocialLink
                      href={personalInfo.social.dribbble as string}
                      label="Dribbble"
                    />
                  )}
              </div>

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
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--color-ink-muted)",
                    marginBottom: "0.5rem",
                  }}
                >
                  Current Status
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                  }}
                >
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: "var(--color-accent)",
                      animation: "pulse 2s ease-in-out infinite",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.95rem",
                      color: "var(--color-ink)",
                    }}
                  >
                    {personalInfo.availability}
                  </span>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>

        <SectionReveal delay={0.1}>
          <div
            style={{
              marginTop: "6rem",
              paddingTop: "2rem",
              borderTop: "1px solid var(--color-border)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "2rem",
            }}
            className="contact-footer"
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.1rem",
                color: "var(--color-ink)",
              }}
            >
              {personalInfo.name}
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--color-ink-muted)",
              }}
            >
              © {new Date().getFullYear()} — All rights reserved
            </span>
          </div>
        </SectionReveal>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
          .contact-footer {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 0.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}