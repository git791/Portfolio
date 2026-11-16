"use client";

import Decode from "@/components/ui/Decode";
import FlapNumber from "@/components/ui/FlapNumber";
import commitsJson from "@/data/commits.json";
import { hackathons, siteStats } from "@/lib/data";

export default function About() {
  const reposStarted2026 =
    commitsJson.totals.reposStartedByYear["2026" as keyof typeof commitsJson.totals.reposStartedByYear] || 39;
  const hackathonsCount = hackathons.length;
  const eventsRun = siteStats.eventsRun;
  const largestAudience = siteStats.largestAudience;

  return (
    <section id="about" className="py-24 border-t border-[var(--rule)]">
      <div className="container-main">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-[var(--muted)]">
            01 /
          </span>
          <Decode
            text="ABOUT"
            className="font-display font-bold text-3xl sm:text-4xl uppercase tracking-tight text-[var(--fg)]"
          />
        </div>

        {/* Narrative & Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Narrative (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <p className="text-base sm:text-lg text-[var(--fg)] leading-relaxed font-normal">
              I'm a third-year CSE student at Alliance University in Bengaluru, and I've been building since 2019: first p5.js games, now AI agents for problems that rarely get software, like a shopkeeper dictating in Hindi, a rural clinic without a specialist, or a railway announcement in three languages. Most of it ships under hackathon deadlines on AWS, Google Cloud, and Cloudflare; I usually lead the team and write most of the code, and I work on backend at STARDY AI. I also run the communities I wanted: the AWS Student Builder Group, Hack Club, and the IEEE student branch. I'm looking for an internship in backend, cloud, or agentic AI work.{" "}
              <span className="text-[var(--muted)] text-sm font-mono">// TODO(owner): confirm internship focus.</span>
            </p>

            {/* Compact Education Line */}
            <div className="pt-6 border-t border-[var(--rule)] flex flex-col gap-1 font-mono text-xs uppercase tracking-wider">
              <span className="text-[var(--fg)] font-medium">
                B.TECH CSE · ALLIANCE UNIVERSITY · 2024–2028
              </span>
              <span className="text-[var(--muted)]">
                Presidency PU College 2022–24 · Iqra International School 2016–22
              </span>
            </div>
          </div>

          {/* Right Stats (5 cols) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-6 p-6 border border-[var(--rule)] bg-[#141512]/40">
            <div className="flex flex-col gap-1">
              <div className="font-display text-4xl sm:text-5xl font-bold text-[var(--fg)]">
                <FlapNumber value={reposStarted2026} />
              </div>
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--muted)]">
                Repos started in 2026
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <div className="font-display text-4xl sm:text-5xl font-bold text-[var(--fg)]">
                <FlapNumber value={hackathonsCount} />
              </div>
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--muted)]">
                Hackathons since 2025
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <div className="font-display text-4xl sm:text-5xl font-bold text-[var(--fg)]">
                <FlapNumber value={eventsRun} />
              </div>
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--muted)]">
                Events run
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <div className="font-display text-4xl sm:text-5xl font-bold text-[var(--fg)]">
                <FlapNumber value={largestAudience} />
              </div>
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--muted)]">
                Largest audience
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
