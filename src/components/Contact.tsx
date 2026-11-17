"use client";

import { useState } from "react";
import Image from "next/image";
import { personalInfo } from "@/lib/data";
import { cutouts } from "@/data/football";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [salahError, setSalahError] = useState(false);
  const salahCutout = cutouts.find((c) => c.key === "salah");

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="surface-red py-24 px-6 lg:px-12 relative overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Large Word FULL TIME directly on red (Display XL, chalk, meets large-text contrast) */}
        <div>
          <span className="font-mono text-xs uppercase tracking-wider text-[var(--chalk)] opacity-80">
            06 · CONTACT · THE FINALE
          </span>
          <h2 className="text-display-xl text-[var(--chalk)] leading-none mt-2">
            FULL TIME
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Chalk ticket stub holding email & social links (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* High-contrast chalk ticket stub (night text on newsprint block) */}
            <div className="surface-newsprint border-2 border-[var(--night)] p-6 lg:p-8 space-y-6 text-[var(--night)]">
              <div className="flex justify-between items-center border-b border-[var(--rule-light)] pb-3">
                <span className="font-mono text-xs uppercase tracking-wider text-[var(--muted-light)]">
                  MATCHDAY TICKET · ADMIT ALL
                </span>
                <span className="font-mono text-xs font-bold text-[var(--red)]">
                  BENGALURU 2026
                </span>
              </div>

              <div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--muted-light)] block mb-1">
                  DIRECT CONTACT (CLICK TO COPY)
                </span>
                <button
                  type="button"
                  onClick={copyEmail}
                  data-cursor="COPY"
                  className="font-mono text-base sm:text-xl font-bold uppercase tracking-wider hover:text-[var(--red)] transition-colors text-left break-all focus-visible:outline-2 focus-visible:outline-current"
                >
                  {personalInfo.email}
                </button>
                {copied && (
                  <span className="block font-mono text-xs text-[var(--red)] font-bold mt-1">
                    ✓ COPIED TO CLIPBOARD
                  </span>
                )}
              </div>

              {/* Profiles links inside ticket stub */}
              <div className="pt-4 border-t border-[var(--rule-light)] flex flex-wrap gap-4 font-mono text-xs uppercase tracking-wider font-semibold">
                <a
                  href={personalInfo.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--red)] transition-colors"
                >
                  GitHub ↗
                </a>
                <a
                  href={personalInfo.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--red)] transition-colors"
                >
                  LinkedIn ↗
                </a>
                <a
                  href={personalInfo.social.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--red)] transition-colors"
                >
                  X ↗
                </a>
              </div>
            </div>

            {/* Night Scoreboard Panel on Red (Amber sits on night, never directly on red) */}
            <div className="surface-night border border-[var(--rule-dark)] p-4 flex items-center justify-between text-[var(--chalk)]">
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--muted-dark)]">
                FINAL SCOREBOARD
              </span>
              <span className="font-dot text-2xl text-[var(--amber)]">
                FT: 90+6' · 35 APPS
              </span>
            </div>
          </div>

          {/* RIGHT: Salah cutout beside ticket stub (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end space-y-4">
            {salahCutout && !salahError && (
              <div className="relative">
                {/* Flat offset night rectangle behind Salah to guarantee kit contrast against solid red */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 translate-x-3 translate-y-3 bg-[#0B0D0C] border border-[#2A2D2A]"
                />

                {/* Cutout container */}
                <div className="relative w-48 h-64 sm:w-56 sm:h-72 border border-[var(--chalk)] bg-[#111412] p-2 flex items-end justify-center">
                  <Image
                    src={salahCutout.src}
                    alt=""
                    fill
                    className="object-contain object-bottom p-2"
                    sizes="220px"
                    onError={() => setSalahError(true)}
                  />
                </div>

                {/* Night caption block below cutout (small text on night block) */}
                <div className="relative mt-2 p-2 surface-night border border-[var(--chalk)] text-[var(--chalk)] font-mono text-center">
                  <span className="text-[10px] text-[var(--red)] font-bold tracking-wider block">
                    {salahCutout.tag}
                  </span>
                  <span className="text-[11px] text-[var(--muted-dark)] block">
                    {salahCutout.caption}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
