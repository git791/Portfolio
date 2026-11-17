"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { certifications } from "@/lib/data";

export default function CertificationsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  // Five highlights
  const highlights = useMemo(() => {
    const featured = certifications.filter((c) => c.highlight);
    if (featured.length >= 5) return featured.slice(0, 5);
    return certifications.slice(0, 5);
  }, []);

  // Remaining certifications
  const remaining = useMemo(() => {
    const highlightIds = new Set(highlights.map((h) => h.id));
    return certifications.filter((c) => !highlightIds.has(c.id));
  }, [highlights]);

  // Categories for remaining items
  const categories = useMemo(() => {
    const set = new Set<string>();
    remaining.forEach((c) => set.add(c.category));
    return ["ALL", ...Array.from(set).sort()];
  }, [remaining]);

  // Filtered remaining
  const filteredRemaining = useMemo(() => {
    if (selectedCategory === "ALL") return remaining;
    return remaining.filter((c) => c.category === selectedCategory);
  }, [selectedCategory, remaining]);

  return (
    <div className="surface-newsprint min-h-screen py-16 px-6 lg:px-12">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="border-b border-[var(--rule-light)] pb-6 space-y-2">
          <span className="font-mono text-xs uppercase tracking-wider text-[var(--muted-light)]">
            05 · HONOURS & CREDENTIALS
          </span>
          <h1 className="text-display-xl text-[var(--night)]">
            HONOURS
          </h1>
          <p className="font-mono text-xs text-[var(--muted-light)] uppercase tracking-wider">
            {certifications.length} INDUSTRY & CURRICULUM CERTIFICATIONS (ORACLE, AWS, GOOGLE, DEEPLEARNING.AI)
          </p>
        </div>

        {/* Five Highlights as Rows */}
        <div className="space-y-4">
          <span className="font-mono text-xs uppercase tracking-wider font-bold text-[var(--red)]">
            HIGHLIGHT HONOURS (TOP 5)
          </span>

          <div className="divide-y divide-[var(--rule-light)] border-t border-b border-[var(--rule-light)]">
            {highlights.map((cert) => (
              <div
                key={cert.id}
                className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs"
              >
                <div className="flex items-center gap-4">
                  {/* Small plate: certificate image if available, else issuer monogram */}
                  <div className="w-12 h-12 shrink-0 border border-[var(--rule-light)] bg-[#E0D9C5] flex items-center justify-center overflow-hidden">
                    {cert.image ? (
                      <Image
                        src={cert.image}
                        alt=""
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    ) : (
                      <span className="font-bold text-xs text-[var(--night)]">
                        {cert.issuer.slice(0, 3).toUpperCase()}
                      </span>
                    )}
                  </div>

                  <div>
                    <span className="text-sm font-bold text-[var(--night)] uppercase block">
                      {cert.title}
                    </span>
                    <span className="text-[11px] text-[var(--muted-light)]">
                      {cert.issuer} · {cert.date} · {cert.category}
                    </span>
                  </div>
                </div>

                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-[var(--night)] px-3 py-1 text-[var(--night)] hover:bg-[var(--night)] hover:text-[var(--chalk)] transition-colors self-start sm:self-auto font-semibold uppercase text-[11px]"
                  >
                    VERIFY ↗
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Remaining Honours in closed <details> with category tabs */}
        <details className="group border border-[var(--rule-light)] p-6 bg-[#E0D9C5] select-none">
          <summary className="font-mono text-xs uppercase tracking-wider font-bold text-[var(--night)] flex items-center justify-between cursor-pointer list-none hover:text-[var(--red)]">
            <span>VIEW ALL REMAINING HONOURS ({remaining.length} MORE)</span>
            <span className="group-open:rotate-180 transition-transform">↓</span>
          </summary>

          <div className="pt-6 space-y-6">
            {/* Category tabs */}
            <div className="flex flex-wrap gap-2 border-b border-[var(--rule-light)] pb-4 font-mono text-[11px]">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 border transition-colors ${
                    selectedCategory === cat
                      ? "bg-[var(--night)] text-[var(--chalk)] border-[var(--night)] font-semibold"
                      : "border-[var(--rule-light)] text-[var(--night)] hover:border-[var(--night)]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Filtered remaining list */}
            <div className="divide-y divide-[var(--rule-light)] border-t border-b border-[var(--rule-light)]">
              {filteredRemaining.map((cert) => (
                <div
                  key={cert.id}
                  className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs"
                >
                  <div>
                    <span className="font-bold text-[var(--night)] block">
                      {cert.title}
                    </span>
                    <span className="text-[11px] text-[var(--muted-light)]">
                      {cert.issuer} · {cert.date}
                    </span>
                  </div>

                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-[var(--rule-light)] px-2.5 py-0.5 text-[10px] text-[var(--night)] hover:border-[var(--night)] self-start sm:self-auto uppercase"
                    >
                      VERIFY ↗
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </details>
      </div>
    </div>
  );
}
