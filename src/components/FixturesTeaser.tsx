"use client";

import Image from "next/image";
import PassLink from "./ui/PassLink";
import Cutout from "./ui/Cutout";
import { hackathons } from "@/lib/data";
import { cupSteps } from "@/lib/derive";
import { cutouts } from "@/data/football";

export default function FixturesTeaser() {
  const latestFixtures = hackathons.slice(0, 4);
  const gerrardCutout = cutouts.find((c) => c.key === "gerrard");

  return (
    <section id="fixtures" className="surface-turf py-20 px-6 lg:px-12 border-b border-[var(--rule)]">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header with Gerrard cutout side strip */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[var(--rule)] pb-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--muted)]">
              04 · FIXTURES · THE PITCH
            </span>
            <h2 className="text-display-l text-[var(--chalk)]">
              CUP RUNS & SPRINTS
            </h2>
          </div>

          {/* Gerrard cutout stepped reveal in 4 steps with 12px scroll parallax */}
          {gerrardCutout && (
            <Cutout
              src={gerrardCutout.src}
              tag={gerrardCutout.tag}
              caption={gerrardCutout.caption}
              width={64}
              height={76}
              theme="turf"
              containerClassName="max-w-sm"
            />
          )}
        </div>

        {/* Four Fixture Rows */}
        <div className="divide-y divide-[var(--rule)]">
          {latestFixtures.map((h) => {
            const steps = cupSteps(h.stage);
            return (
              <div
                key={h.id}
                className="py-5 flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-xs"
              >
                <div className="flex items-center gap-4">
                  <span className="text-[var(--muted)] w-24 shrink-0">
                    {h.date}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-[var(--chalk)] uppercase">
                      {h.name}
                    </span>
                    <span className="text-[11px] text-[var(--muted)]">
                      {h.organizer} {h.track ? `· ${h.track}` : ""}
                    </span>
                  </div>
                </div>

                {/* Cup Ladder & Placement Chip */}
                <div className="flex items-center gap-4 self-start md:self-auto">
                  {/* 3-step cup ladder: GROUP / SEMI / FINAL */}
                  <div className="flex items-center gap-1 border border-[var(--rule)] px-2 py-1 bg-[#14482E]">
                    <span
                      className={`text-[10px] uppercase px-1 ${
                        steps >= 1 ? "text-[var(--chalk)] font-bold" : "text-[#285A3F]"
                      }`}
                    >
                      GRP
                    </span>
                    <span className="text-[10px] text-[#285A3F]">/</span>
                    <span
                      className={`text-[10px] uppercase px-1 ${
                        steps >= 2 ? "text-[var(--chalk)] font-bold" : "text-[#285A3F]"
                      }`}
                    >
                      SEM
                    </span>
                    <span className="text-[10px] text-[#285A3F]">/</span>
                    <span
                      className={`text-[10px] uppercase px-1 ${
                        steps >= 3 ? "text-[var(--chalk)] font-bold" : "text-[#285A3F]"
                      }`}
                    >
                      FIN
                    </span>
                  </div>

                  {/* Red placement chip if exists */}
                  {h.placement && (
                    <span className="bg-[var(--red)] text-[var(--chalk)] font-bold px-2 py-0.5 text-[10px] uppercase tracking-wider">
                      {h.placement.toUpperCase()}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Link to full fixtures */}
        <div className="pt-4 flex justify-end">
          <PassLink
            href="/hackathons"
            data-cursor="OPEN"
            className="font-mono text-xs uppercase tracking-wider border border-[var(--chalk)] px-4 py-2 hover:bg-[var(--chalk)] hover:text-[var(--turf)] transition-colors font-semibold"
          >
            VIEW ALL {hackathons.length} FIXTURES →
          </PassLink>
        </div>
      </div>
    </section>
  );
}
