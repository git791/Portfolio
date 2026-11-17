"use client";

import { useState } from "react";
import Image from "next/image";
import { hackathons } from "@/lib/data";
import { cupSteps } from "@/lib/derive";
import { cutouts } from "@/data/football";

export default function HackathonsPage() {
  const [gerrardError, setGerrardError] = useState(false);
  const gerrardCutout = cutouts.find((c) => c.key === "gerrard");

  return (
    <div className="surface-turf min-h-screen py-16 px-6 lg:px-12 relative overflow-hidden">
      {/* Background static SVG pitch lines (6% opacity, zero contrast obstruction) */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.06] select-none stroke-[var(--chalk)]"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <rect x="5%" y="4%" width="90%" height="92%" strokeWidth="2" />
        <line x1="5%" y1="50%" x2="95%" y2="50%" strokeWidth="2" />
        <circle cx="50%" cy="50%" r="120" strokeWidth="2" />
      </svg>

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        {/* Header with Gerrard cutout */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[var(--rule-turf)] pb-6">
          <div className="space-y-2">
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--muted-turf)]">
              04 · FIXTURES & RESULTS · COMPETITIVE SPRINTS
            </span>
            <h1 className="text-display-xl text-[var(--chalk)]">
              ALL FIXTURES
            </h1>
            <p className="font-mono text-xs text-[var(--muted-turf)] uppercase tracking-wider">
              {hackathons.length} COMPETITIVE HACKATHONS · 2025–2026
            </p>
          </div>

          {/* Gerrard cutout beside top */}
          {gerrardCutout && !gerrardError && (
            <div className="flex items-center gap-3 border border-[var(--rule-turf)] p-2 bg-[#14482E] max-w-sm">
              <div className="relative w-12 h-14 shrink-0">
                <Image
                  src={gerrardCutout.src}
                  alt=""
                  fill
                  className="object-contain object-bottom"
                  sizes="60px"
                  onError={() => setGerrardError(true)}
                />
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono font-bold uppercase text-[var(--chalk)] tracking-wider">
                  {gerrardCutout.tag}
                </span>
                <p className="font-mono text-[10px] text-[var(--muted-turf)]">
                  {gerrardCutout.caption}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Full List Newest First */}
        <div className="divide-y divide-[var(--rule-turf)] border-t border-b border-[var(--rule-turf)]">
          {hackathons.map((h) => {
            const steps = cupSteps(h.stage);
            return (
              <div
                key={h.id}
                className="py-5 flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-xs"
              >
                {/* Date & Competition Info */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                  <span className="text-[var(--muted-turf)] w-24 shrink-0">
                    {h.date}
                  </span>
                  <div className="space-y-0.5">
                    <span className="text-base font-bold text-[var(--chalk)] uppercase block">
                      {h.name}
                    </span>
                    <div className="text-[11px] text-[var(--muted-turf)] flex flex-wrap gap-2">
                      <span>{h.organizer}</span>
                      {h.track && (
                        <>
                          <span>·</span>
                          <span className="text-[var(--chalk)] font-medium">Track: {h.track}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Cup Ladder, Placement Chip & External Link */}
                <div className="flex flex-wrap items-center gap-4 self-start md:self-auto">
                  {/* 3-step cup ladder: GROUP / SEMI / FINAL */}
                  <div className="flex items-center gap-1 border border-[var(--rule-turf)] px-2.5 py-1 bg-[#14482E]">
                    <span
                      className={`text-[10px] uppercase px-1 ${
                        steps >= 1 ? "text-[var(--chalk)] font-bold" : "text-[#285A3F]"
                      }`}
                    >
                      GROUP
                    </span>
                    <span className="text-[10px] text-[#285A3F]">/</span>
                    <span
                      className={`text-[10px] uppercase px-1 ${
                        steps >= 2 ? "text-[var(--chalk)] font-bold" : "text-[#285A3F]"
                      }`}
                    >
                      SEMI
                    </span>
                    <span className="text-[10px] text-[#285A3F]">/</span>
                    <span
                      className={`text-[10px] uppercase px-1 ${
                        steps >= 3 ? "text-[var(--chalk)] font-bold" : "text-[#285A3F]"
                      }`}
                    >
                      FINAL
                    </span>
                  </div>

                  {/* Red placement chip ONLY where placement exists */}
                  {h.placement && (
                    <span className="bg-[var(--red)] text-[var(--chalk)] font-bold px-2 py-0.5 text-[10px] uppercase tracking-wider">
                      {h.placement.toUpperCase()}
                    </span>
                  )}

                  {/* External Project URL or Devpost */}
                  {h.projectUrl && (
                    <a
                      href={h.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-[var(--chalk)] px-2.5 py-1 text-[var(--chalk)] hover:bg-[var(--chalk)] hover:text-[var(--turf)] transition-colors text-[11px] font-semibold"
                    >
                      {h.urlLabel ? h.urlLabel.toUpperCase() : "PROJECT ↗"}
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
