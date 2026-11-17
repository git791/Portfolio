"use client";

import { useState } from "react";
import Image from "next/image";
import Scoreboard from "./ui/Scoreboard";
import { cutouts } from "@/data/football";

export default function About() {
  const [imgError, setImgError] = useState(false);
  const [kloppError, setKloppError] = useState(false);

  const kloppCutout = cutouts.find((c) => c.key === "klopp");

  return (
    <section id="about" className="surface-night py-20 px-6 lg:px-12 border-b border-[var(--rule)]">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section mono tag */}
        <div className="flex items-center justify-between border-b border-[var(--rule)] pb-4 font-mono text-xs uppercase tracking-wider">
          <span className="text-[var(--chalk)]">01 · ABOUT · THE MANAGER</span>
          <span className="text-[var(--muted)]">BENGALURU · 2019–2026</span>
        </div>

        {/* Two-column layout on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT: Portrait in programme-style frame (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="relative border border-[var(--rule)] bg-[#0B0D0C] p-2 aspect-[4/5] overflow-hidden group">
              {!imgError ? (
                <Image
                  src="/images/profile.jpeg"
                  alt="Mohammed Ayaan Adil Ahmed"
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                  sizes="(max-width: 1024px) 100vw, 400px"
                  onError={() => setImgError(true)}
                />
              ) : (
                /* Fallback if profile.jpeg fails to load */
                <div className="w-full h-full flex flex-col items-center justify-center bg-[var(--chalk)] text-[var(--night)]">
                  <span className="text-display-l font-bold">AY</span>
                  <span className="font-mono text-[10px] uppercase tracking-wider mt-2">
                    MOHAMMED AYAAN
                  </span>
                </div>
              )}
            </div>
            <div className="font-mono text-[11px] text-[var(--muted)] uppercase tracking-wider flex justify-between">
              <span>MOHAMMED AYAAN ADIL AHMED</span>
              <span>B.TECH CSE 2028</span>
            </div>
          </div>

          {/* RIGHT: Text & Klopp cutout side-by-side (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <h2 className="text-display-l text-[var(--chalk)]">
                ENGINEERING FOR UNTOUCHED PROBLEMS
              </h2>

              {/* Enthusiastic student-friendly copy, no em-dashes, looking for internships */}
              <p className="text-body text-[var(--chalk)] leading-relaxed">
                Third-year CSE student in Bengaluru, building since 2019. I make AI agents for
                problems that rarely get software: a shopkeeper dictating in Hindi, a rural
                clinic, or a railway announcement in three languages. I usually lead the team and
                write most of the code; I also run the AWS Student Builder Group, Hack Club, and
                the IEEE student branch. Actively looking for an engineering internship where I can
                dive in, build reliable backend systems, and ship real AI agents with a high-energy team.
              </p>
            </div>

            {/* Klopp cutout tucked in right slot */}
            {kloppCutout && !kloppError && (
              <div className="flex items-center gap-4 border border-[var(--rule)] p-3 bg-[#111412] max-w-md">
                <div className="relative w-16 h-20 shrink-0">
                  <Image
                    src={kloppCutout.src}
                    alt=""
                    fill
                    className="object-contain object-bottom"
                    sizes="80px"
                    onError={() => setKloppError(true)}
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-label text-[var(--red)] font-bold">
                    {kloppCutout.tag}
                  </span>
                  <p className="font-mono text-[11px] text-[var(--muted)]">
                    {kloppCutout.caption}
                  </p>
                </div>
              </div>
            )}

            {/* Scoreboard stats component */}
            <Scoreboard className="mt-4" />
          </div>
        </div>
      </div>
    </section>
  );
}
