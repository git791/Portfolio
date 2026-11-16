"use client";

import { useMemo, useState } from "react";
import Decode from "@/components/ui/Decode";
import { certifications } from "@/lib/data";
import type { Certification } from "@/lib/types";

function getMonogram(issuer: string) {
  const cleaned = issuer.replace(/[^\w\s&]/g, "");
  const words = cleaned.split(/[\s&]+/).filter(Boolean);
  if (words.length === 1) return words[0].slice(0, 3).toUpperCase();
  return words.map((w) => w[0]).join("").slice(0, 3).toUpperCase();
}

function CertRow({ cert }: { cert: Certification }) {
  const monogram = getMonogram(cert.issuer);

  return (
    <div className="py-4 px-2 sm:px-4 border-b border-[var(--rule)] transition-colors hover:bg-[var(--rule)]/20 flex flex-col md:flex-row md:items-center justify-between gap-3">
      {/* Left: Monogram + Title + Issuer */}
      <div className="flex items-start sm:items-center gap-3">
        <div
          aria-hidden="true"
          className="w-9 h-9 border border-[var(--rule)] bg-[#141512]/60 flex items-center justify-center font-mono text-xs text-[var(--muted)] shrink-0 select-none"
        >
          {monogram}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
          <span className="font-display font-semibold text-lg uppercase tracking-tight text-[var(--fg)]">
            {cert.title}
          </span>
          <span className="text-sm text-[var(--muted)]">
            · {cert.issuer}
          </span>
        </div>
      </div>

      {/* Right: Date + Category + Credential Link */}
      <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-wider shrink-0 flex-wrap">
        <span className="text-[var(--muted)]">
          {cert.date}
        </span>

        {cert.category && (
          <span className="px-2 py-0.5 border border-[var(--rule)] text-[var(--muted)]">
            {cert.category}
          </span>
        )}

        {cert.credentialUrl && (
          <a
            href={cert.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="Visit"
            className="text-[var(--fg)] underline hover:text-white transition-colors inline-flex items-center gap-1 font-semibold"
          >
            <span>VIEW</span>
            <span>↗</span>
          </a>
        )}
      </div>
    </div>
  );
}

const CATEGORIES = ["ALL", "Industry", "Competition", "Courses", "Coursera"];

export default function Certifications() {
  const [activeCategory, setActiveCategory] = useState("ALL");

  const highlights = useMemo(
    () => certifications.filter((c) => Boolean(c.highlight)),
    []
  );

  const filteredAll = useMemo(() => {
    if (activeCategory === "ALL") return certifications;
    return certifications.filter((c) => c.category === activeCategory);
  }, [activeCategory]);

  return (
    <section className="py-24 border-t border-[var(--rule)] min-h-screen">
      <div className="container-main">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--muted)]">
                INDEX /
              </span>
              <Decode
                text="CERTIFICATIONS"
                className="font-display font-bold text-4xl sm:text-5xl uppercase tracking-tight text-[var(--fg)]"
              />
            </div>
            <p className="font-mono text-xs uppercase tracking-wider text-[var(--muted)]">
              {certifications.length} VERIFIED CREDENTIALS · INDUSTRY &amp; CURRICULUM
            </p>
          </div>
        </div>

        {/* Highlights Section */}
        <div className="mb-16">
          <div className="pb-3 border-b border-[var(--rule)] flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--fg)] font-semibold">
              FEATURED CREDENTIALS
            </span>
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--muted)]">
              {highlights.length} HIGHLIGHTED
            </span>
          </div>

          <div className="flex flex-col border-t border-[var(--rule)]">
            {highlights.map((cert) => (
              <CertRow key={cert.id} cert={cert} />
            ))}
          </div>
        </div>

        {/* Collapsed <details> List */}
        <details className="group border border-[var(--rule)] p-6 bg-[#141512]/30">
          <summary className="font-mono text-xs uppercase tracking-widest text-[var(--fg)] cursor-pointer flex items-center justify-between select-none">
            <span className="font-semibold">
              ALL {certifications.length} CERTIFICATES
            </span>
            <span className="font-mono text-xs text-[var(--muted)] group-open:rotate-180 transition-transform">
              ▼
            </span>
          </summary>

          <div className="mt-6 pt-6 border-t border-[var(--rule)]">
            {/* Category Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 border-b border-[var(--rule)]">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`font-mono text-xs uppercase tracking-wider px-3 py-1 border transition-colors shrink-0 ${
                    activeCategory === cat
                      ? "bg-[var(--fg)] text-[var(--bg)] border-[var(--fg)] font-semibold"
                      : "bg-transparent text-[var(--muted)] border-transparent hover:text-[var(--fg)] hover:border-[var(--rule)]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Filtered Ledger */}
            <div className="flex flex-col border-t border-[var(--rule)]">
              {filteredAll.map((cert) => (
                <CertRow key={cert.id} cert={cert} />
              ))}
            </div>
          </div>
        </details>
      </div>
    </section>
  );
}
