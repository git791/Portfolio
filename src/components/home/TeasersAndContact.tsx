"use client";

import React, { useState } from "react";
import Link from "next/link";
import { skills, hackathons, personalInfo } from "@/lib/data";
import { partOf3 } from "@/lib/derive";
import { guestStars } from "@/data/comic";
import { Panel } from "@/components/comic/Panel";
import { CaptionBox } from "@/components/comic/CaptionBox";
import { Chip } from "@/components/comic/Chip";
import { SectionCut } from "@/components/ui/SectionCut";

export default function TeasersAndContact() {
  const [copied, setCopied] = useState(false);

  // Six top Daily drivers from skills
  const topSkills = skills[0]?.items?.slice(0, 6) || [];

  // Latest 4 hackathons
  const latestHackathons = hackathons.slice(0, 4);

  const email = personalInfo.email;
  const social = personalInfo.social;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="space-y-16">
      {/* 1. Skills Teaser (Character Sheet Teaser) */}
      <SectionCut id="skills-teaser" slope="down-right" bg="paper" className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6 select-none">
          <div className="border-b-[3px] border-[var(--ink)] pb-4 flex flex-wrap items-end justify-between gap-4">
            <div>
              <CaptionBox variant="label" bg="yellow" shadow="sm" className="mb-2">
                STATS & PROFICIENCIES
              </CaptionBox>
              <h2 className="font-display text-4xl sm:text-5xl uppercase tracking-tight text-[var(--ink)]">
                CHARACTER SHEET
              </h2>
            </div>
            <Link
              href="/skills"
              data-cursor="OPEN"
              className="font-mono text-xs uppercase font-bold text-[var(--ink)] hover:text-[var(--cyan)] underline decoration-2 underline-offset-4"
            >
              FULL ROSTER (26 SKILLS) →
            </Link>
          </div>

          <p className="font-mono text-xs text-[var(--ink-muted)]">
            APPS = repos using the skill (checked against git history, 2026-11-15).
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {topSkills.map((skill) => (
              <div
                key={skill.name}
                className="border-[2px] border-[var(--ink)] bg-[var(--paper)] p-3 shadow-comic-sm flex items-center justify-between"
              >
                <span className="font-display text-xl uppercase text-[var(--ink)]">
                  {skill.name}
                </span>
                <span className="font-mono text-xs uppercase font-bold px-2 py-0.5 border border-[var(--ink)] bg-[var(--yellow)] text-[var(--ink)]">
                  APPS {skill.repos ?? 0}
                </span>
              </div>
            ))}
          </div>
        </div>
      </SectionCut>

      {/* 2. Crossovers Teaser (Hackathons Teaser) */}
      <SectionCut id="crossovers-teaser" slope="down-left" bg="cyan" className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6 select-none">
          <div className="border-b-[3px] border-[var(--ink)] pb-4 flex flex-wrap items-end justify-between gap-4">
            <div>
              <CaptionBox variant="label" bg="yellow" shadow="sm" className="mb-2">
                COMPETITIVE SPRINTS
              </CaptionBox>
              <h2 className="font-display text-4xl sm:text-5xl uppercase tracking-tight text-[var(--ink)]">
                CROSSOVER EVENTS
              </h2>
            </div>
            <Link
              href="/hackathons"
              data-cursor="OPEN"
              className="font-mono text-xs uppercase font-bold text-[var(--ink)] hover:text-[var(--yellow)] underline decoration-2 underline-offset-4"
            >
              VIEW ALL 21 CROSSOVERS →
            </Link>
          </div>

          <div className="space-y-3">
            {latestHackathons.map((h) => (
              <div
                key={h.id}
                className="border-[2px] border-[var(--ink)] bg-[var(--paper)] p-4 shadow-comic-sm flex flex-col md:flex-row md:items-center justify-between gap-3 text-[var(--ink)]"
              >
                <div className="space-y-1">
                  <div className="font-mono text-[11px] text-[var(--ink-muted)]">
                    {h.date.toUpperCase()} · {h.organizer.toUpperCase()}
                  </div>
                  <div className="font-display text-xl uppercase tracking-wide">
                    {h.name}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <Chip variant="part" part={partOf3(h.stage)} />
                  {h.placement && <Chip variant="placement">{h.placement.toUpperCase()}</Chip>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionCut>

      {/* 3. Contact ("To be continued...") */}
      <SectionCut id="contact" slope="down-right" bg="yellow" className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8 select-none text-[var(--ink)]">
          {/* Large Title in Display */}
          <div className="text-center">
            <h2 className="font-display text-5xl sm:text-7xl xl:text-8xl uppercase tracking-tight text-[var(--ink)]">
              TO BE CONTINUED...
            </h2>
            <div className="font-mono text-xs uppercase tracking-widest text-[var(--ink)] font-bold mt-2">
              SEND DISPATCHES · THE LETTERS PAGE
            </div>
          </div>

          {/* Letters-Page Style Block (Paper Panel) */}
          <Panel field="paper" shadow="lg" className="p-6 sm:p-10 space-y-6">
            <div className="space-y-2 border-b-2 border-[var(--rule)] pb-4">
              <h3 className="font-display text-2xl uppercase tracking-wide">
                DISPATCH TO THE EDITOR
              </h3>
              <p className="font-[family-name:var(--font-body)] text-sm sm:text-base text-[var(--ink)] leading-relaxed">
                Open to software engineering internships and agentic AI / cloud infrastructure builds. Reach out directly for collaboration.
              </p>
            </div>

            {/* Email click-to-copy */}
            <div>
              <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--ink-muted)] font-bold mb-2">
                DIRECT INK / INBOX
              </div>
              <button
                type="button"
                onClick={handleCopyEmail}
                data-cursor="COPY"
                data-sfx="COPIED!"
                className="w-full text-left p-3 border-2 border-[var(--ink)] bg-[var(--yellow)]/30 hover:bg-[var(--yellow)] transition-colors flex items-center justify-between font-mono text-xs sm:text-sm font-bold shadow-comic-sm focus:outline-none focus:ring-2 focus:ring-[var(--ink)]"
              >
                <span>{email}</span>
                <span className="text-[11px] bg-[var(--paper)] px-2 py-0.5 border border-[var(--ink)]">
                  {copied ? "COPIED TO CLIPBOARD!" : "CLICK TO COPY"}
                </span>
              </button>
            </div>

            {/* Profile links from personalInfo.social (No pulsing dots) */}
            <div className="pt-2">
              <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--ink-muted)] font-bold mb-3">
                EXTERNAL FEEDS & REPOSITORIES
              </div>
              <div className="flex flex-wrap gap-2 font-mono text-xs uppercase font-bold">
                {Object.entries(social).map(([key, url]) => (
                  <a
                    key={key}
                    href={String(url)}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="VISIT"
                    data-sfx="ZIP!"
                    className="px-3 py-1.5 border-2 border-[var(--ink)] bg-[var(--paper)] hover:bg-[var(--cyan)] hover:text-[var(--paper)] transition-colors shadow-comic-sm"
                  >
                    {key} ↗
                  </a>
                ))}
              </div>
            </div>
          </Panel>

          {/* Guest stars check: if empty, renders nothing */}
          {guestStars.length > 0 && (
            <div className="text-center font-mono text-xs text-[var(--ink-muted)]">
              {guestStars.length} Guest Star Artworks Loaded
            </div>
          )}
        </div>
      </SectionCut>
    </div>
  );
}
