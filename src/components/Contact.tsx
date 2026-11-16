"use client";

import { useState } from "react";
import Decode from "@/components/ui/Decode";
import { personalInfo, profiles } from "@/lib/data";

const PROFILE_LABELS: Record<string, string> = {
  github: "GitHub",
  linkedin: "LinkedIn",
  x: "X",
  instagram: "Instagram",
  leetcode: "LeetCode",
  hackerrank: "HackerRank",
  devpost: "Devpost",
  hack2skill: "Hack2skill",
  hackerearth: "HackerEarth",
  devto: "Dev.to",
  medium: "Medium",
};

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Combine social links and profiles
  const allLinks = [
    { key: "github", label: "GitHub", href: personalInfo.social.github },
    { key: "linkedin", label: "LinkedIn", href: personalInfo.social.linkedin },
    { key: "x", label: "X", href: personalInfo.social.x },
    { key: "instagram", label: "Instagram", href: personalInfo.social.instagram },
    ...Object.entries(profiles).map(([key, href]) => ({
      key,
      label: PROFILE_LABELS[key] || key.toUpperCase(),
      href,
    })),
  ].filter((item) => Boolean(item.href));

  return (
    <section id="contact" className="py-24 border-t border-[var(--rule)]">
      <div className="container-main">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--muted)]">
            05 /
          </span>
          <Decode
            text="CONTACT"
            className="font-display font-bold text-3xl sm:text-4xl uppercase tracking-tight text-[var(--fg)]"
          />
        </div>

        {/* Contact Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Email / Direct outreach */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <p className="text-base sm:text-lg text-[var(--fg)] leading-relaxed font-normal">
              Available for backend, cloud infrastructure, and agentic AI roles. Drop a note or reach out directly.
            </p>

            <div className="pt-4 flex flex-col items-start gap-3">
              <button
                type="button"
                onClick={handleCopyEmail}
                data-cursor="Copy"
                className="group inline-flex items-baseline gap-3 text-left font-display font-bold text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight text-[var(--fg)] hover:text-white transition-colors"
              >
                <span>{personalInfo.email}</span>
                <span className="font-mono text-xs text-[var(--muted)] uppercase tracking-wider group-hover:text-[var(--fg)]">
                  [COPY]
                </span>
              </button>

              {copied && (
                <div
                  role="status"
                  aria-live="polite"
                  className="font-mono text-xs uppercase tracking-widest text-[var(--signal)]"
                >
                  Copied to clipboard
                </div>
              )}
            </div>
          </div>

          {/* Online profiles */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--muted)]">
              PROFILES &amp; NETWORKS
            </span>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[var(--rule)]">
              {allLinks.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="Visit"
                  className="group py-2 px-3 border border-[var(--rule)] font-mono text-xs uppercase tracking-wider text-[var(--muted)] hover:text-[var(--fg)] hover:border-[var(--fg)] transition-colors flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <span className="text-[10px] opacity-60 group-hover:opacity-100">↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-24 pt-8 border-t border-[var(--rule)] flex flex-col sm:flex-row items-baseline justify-between gap-4 font-mono text-xs uppercase tracking-wider text-[var(--muted)]">
          <span>{personalInfo.name} · BENGALURU</span>
          <span>SIGNAL TO STRUCTURE · 2026</span>
        </div>
      </div>
    </section>
  );
}
