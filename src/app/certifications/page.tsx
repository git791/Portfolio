"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { certifications } from "@/lib/data";
import { Panel } from "@/components/comic/Panel";
import { CaptionBox } from "@/components/comic/CaptionBox";
import { DotField } from "@/components/comic/DotField";
import { SectionCut } from "@/components/ui/SectionCut";

function getIssuerMonogram(issuer: string): string {
  const clean = issuer.trim().toUpperCase();
  if (clean.includes("AMAZON") || clean.includes("AWS")) return "AWS";
  if (clean.includes("ORACLE")) return "ORCL";
  if (clean.includes("GOOGLE")) return "GCP";
  if (clean.includes("DEEPLEARNING")) return "DL.AI";
  if (clean.includes("META")) return "META";
  if (clean.includes("HACKERRANK")) return "HR";
  if (clean.includes("MICROSOFT")) return "MSFT";
  if (clean.includes("IBM")) return "IBM";
  
  // Abbreviate words
  const words = clean.split(/\s+/).filter(Boolean);
  if (words.length > 1) {
    return words.slice(0, 3).map((w) => w[0]).join("");
  }
  return clean.slice(0, 4);
}

export default function CertificationsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  // Top 5 highlights
  const highlights = useMemo(
    () => certifications.filter((c) => c.highlight).slice(0, 5),
    []
  );

  // Remaining certifications
  const remaining = useMemo(
    () => certifications.filter((c) => !highlights.some((h) => h.id === c.id)),
    [highlights]
  );

  // Unique categories from remaining
  const categories = useMemo(() => {
    const set = new Set<string>();
    remaining.forEach((c) => {
      if (c.category) set.add(c.category);
    });
    return ["ALL", ...Array.from(set).sort()];
  }, [remaining]);

  // Filtered remaining
  const filteredRemaining = useMemo(() => {
    if (selectedCategory === "ALL") return remaining;
    return remaining.filter((c) => c.category === selectedCategory);
  }, [remaining, selectedCategory]);

  return (
    <main className="min-h-screen py-16 bg-[var(--paper)] text-[var(--ink)]">
      <SectionCut id="collected-editions" slope="down-right" bg="paper" className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <div className="border-b-[3px] border-[var(--ink)] pb-4 flex flex-wrap items-end justify-between gap-4">
            <div>
              <CaptionBox variant="label" bg="yellow" shadow="sm" className="mb-2">
                ISSUE #1 · COLLECTED EDITIONS
              </CaptionBox>
              <h1 className="font-display text-4xl sm:text-6xl uppercase tracking-tight text-[var(--ink)]">
                ACCREDITATIONS & CERTS
              </h1>
            </div>
            <span className="font-mono text-xs uppercase font-bold text-[var(--ink-muted)]">
              {certifications.length} TOTAL VERIFIED CREDENTIALS
            </span>
          </div>

          {/* Highlights: 5 Panels */}
          <div className="space-y-4">
            <CaptionBox variant="label" bg="yellow" shadow="sm">
              FIVE KEY HIGHLIGHT EDITIONS
            </CaptionBox>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {highlights.map((cert) => {
                const monogram = getIssuerMonogram(cert.issuer);

                return (
                  <Panel
                    key={cert.id}
                    field="paper"
                    shadow="base"
                    className="p-5 border-[3px] border-[var(--ink)] bg-[var(--paper)] flex flex-col justify-between space-y-4 relative overflow-hidden"
                  >
                    <DotField opacity={0.1} color="var(--ink)" cellSize={8} />

                    {/* Small Plate: Image or Issuer Monogram */}
                    <div className="relative z-10 w-full aspect-[2/1] border-2 border-[var(--ink)] bg-[var(--yellow)]/30 flex items-center justify-center overflow-hidden">
                      {cert.image ? (
                        <div className="relative w-full h-full bg-[var(--yellow)]">
                          <Image
                            src={cert.image}
                            alt={cert.title}
                            fill
                            className="object-cover grayscale contrast-125 mix-blend-multiply"
                          />
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center p-3 text-center">
                          <span className="font-mono text-3xl sm:text-4xl font-bold tracking-widest text-[var(--ink)]">
                            {monogram}
                          </span>
                          <span className="font-mono text-[10px] uppercase font-bold text-[var(--ink-muted)] mt-1">
                            {cert.issuer}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="relative z-10 space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono font-bold text-[var(--ink-muted)]">
                        <span>{cert.issuer.toUpperCase()}</span>
                        <span>{cert.date}</span>
                      </div>
                      <h3 className="font-display text-xl uppercase tracking-tight text-[var(--ink)] leading-snug">
                        {cert.title}
                      </h3>
                    </div>

                    {/* Link */}
                    <div className="relative z-10 pt-2 border-t border-[var(--rule)]">
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="VERIFY"
                        data-sfx="ZIP!"
                        className="font-mono text-xs font-bold text-[var(--ink)] hover:text-[var(--cyan)] underline inline-flex items-center gap-1"
                      >
                        VERIFY CREDENTIAL ↗
                      </a>
                    </div>
                  </Panel>
                );
              })}
            </div>
          </div>

          {/* Closed <details> for the rest with category tabs */}
          <details className="group border-[3px] border-[var(--ink)] bg-[var(--paper)] shadow-comic">
            <summary className="p-5 font-mono text-sm sm:text-base font-bold uppercase cursor-pointer select-none bg-[var(--yellow)]/30 hover:bg-[var(--yellow)] flex items-center justify-between transition-colors list-none">
              <span className="flex items-center gap-3">
                <span className="group-open:hidden">[+]</span>
                <span className="hidden group-open:inline">[-]</span>
                COMPLETE ARCHIVE ({remaining.length} MORE CREDENTIALS)
              </span>
              <span className="text-xs font-mono text-[var(--ink-muted)]">
                CLICK TO TOGGLE
              </span>
            </summary>

            <div className="p-6 space-y-6 border-t-2 border-[var(--ink)]">
              {/* Category Tabs */}
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => {
                  const isActive = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      data-cursor="SELECT"
                      data-sfx="POP!"
                      className={`px-3 py-1 font-mono text-xs uppercase font-bold border-2 border-[var(--ink)] transition-colors ${
                        isActive
                          ? "bg-[var(--ink)] text-[var(--paper)]"
                          : "bg-[var(--paper)] text-[var(--ink)] hover:bg-[var(--yellow)]/40"
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>

              {/* Grid of remaining certifications */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredRemaining.map((cert) => {
                  const monogram = getIssuerMonogram(cert.issuer);

                  return (
                    <div
                      key={cert.id}
                      className="border-2 border-[var(--ink)] bg-[var(--paper)] p-4 shadow-comic-sm flex flex-col justify-between space-y-3"
                    >
                      <div className="flex items-center justify-between gap-2 border-b border-[var(--rule)] pb-2">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 border border-[var(--ink)] bg-[var(--yellow)]/40 text-[var(--ink)]">
                          {monogram}
                        </span>
                        <span className="font-mono text-xs text-[var(--ink-muted)] font-bold">
                          {cert.date}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <h4 className="font-display text-base uppercase tracking-tight text-[var(--ink)] leading-snug">
                          {cert.title}
                        </h4>
                        <div className="font-mono text-xs text-[var(--ink-muted)]">
                          {cert.issuer}
                        </div>
                      </div>

                      <div className="pt-2">
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-cursor="VERIFY"
                          data-sfx="ZIP!"
                          className="font-mono text-xs font-bold text-[var(--ink)] hover:underline inline-flex items-center gap-1"
                        >
                          VERIFY ↗
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </details>
        </div>
      </SectionCut>
    </main>
  );
}
