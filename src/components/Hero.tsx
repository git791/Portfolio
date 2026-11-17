"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import commitsJson from "@/data/commits.json";
import { hackathons, siteStats } from "@/lib/data";
import {
  getYearlyCommitRows,
  getSortedProjectsForTiles,
  peakLabels,
} from "@/lib/commitData";

gsap.registerPlugin(ScrollTrigger);

// Dynamic import for R3F Canvas with ssr: false
const CommitRidge = dynamic(() => import("@/components/canvas/CommitRidge"), {
  ssr: false,
});

function isWebGLAvailable(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

// Static SVG Ridgeline for Fallback (mobile, reduced motion, or WebGL failure)
function StaticSvgRidge({ rows }: { rows: ReturnType<typeof getYearlyCommitRows> }) {
  const width = 800;
  const height = 260;
  const nMax = 31;
  const hMax = 44;

  return (
    <div className="w-full max-w-4xl mx-auto my-8 overflow-hidden select-none" aria-hidden="true">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        {rows.map((row, rIdx) => {
          const baseY = 60 + rIdx * 24;
          const points = row.values.map((v, i) => {
            const x = 30 + (i / 52) * (width - 60);
            const h = v > 0 ? hMax * Math.sqrt(v / nMax) : 0;
            const y = baseY - h;
            return { x, y };
          });

          const polylinePts = points.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
          const polygonPts = `${points[0].x},${baseY} ` + polylinePts + ` ${points[points.length - 1].x},${baseY}`;

          const isCurrentYear = row.year === 2026;
          const strokeColor = isCurrentYear
            ? "#ECE9DF"
            : row.totalCommits === 0
            ? "#3A3C36"
            : "#8B8A80";
          const fillColor = isCurrentYear
            ? "#282A24"
            : row.totalCommits === 0
            ? "#121310"
            : "#1B1D17";

          return (
            <g key={row.year}>
              {/* Visible Occlusion fill */}
              <polygon points={polygonPts} fill={fillColor} />
              {/* Ridge line */}
              <polyline
                points={polylinePts}
                fill="none"
                stroke={strokeColor}
                strokeWidth={isCurrentYear ? "1.5" : "1"}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function ProjectTileItem({ project: p, index: idx }: { project: ReturnType<typeof getSortedProjectsForTiles>[number]; index: number }) {
  const [imgError, setImgError] = useState(false);
  const hasImage = Boolean(p.image && p.image.trim().length > 0) && !imgError;

  return (
    <Link
      href={`/projects/${p.slug}`}
      data-cursor={p.title}
      aria-label={p.title}
      className="group relative aspect-square border border-[var(--rule)] hover:border-[var(--fg)] bg-[#141512] overflow-hidden flex flex-col justify-between p-2 sm:p-2.5 transition-colors focus-visible:outline-2 focus-visible:outline-[var(--fg)]"
    >
      {hasImage ? (
        <>
          {/* Project Image (Grayscale with hover reveal) */}
          <Image
            src={p.image!}
            alt={p.title}
            fill
            className="object-cover filter grayscale contrast-105 group-hover:grayscale-0 transition-all duration-300 opacity-80 group-hover:opacity-100"
            sizes="(max-width: 640px) 25vw, (max-width: 1024px) 16vw, 12vw"
            onError={() => setImgError(true)}
          />
          {/* Dark overlay for contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0E0B]/90 via-transparent to-[#0D0E0B]/40 pointer-events-none" />

          {/* Top Index Badge */}
          <span className="relative z-10 font-mono text-[9px] uppercase tracking-wider text-[var(--fg)] bg-[var(--bg)]/80 px-1 py-0.5 rounded-[var(--radius)] w-fit border border-[var(--rule)]">
            {(idx + 1).toString().padStart(2, "0")}
          </span>

          {/* Bottom Title (Wrapped, No Ellipsis) */}
          <span className="relative z-10 font-display font-bold text-[11px] sm:text-xs uppercase tracking-tight text-[var(--fg)] leading-tight break-words whitespace-normal drop-shadow-sm">
            {p.title}
          </span>
        </>
      ) : (
        <>
          {/* Flat Tile with Large Display Type */}
          <div className="flex items-center justify-between w-full">
            <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-[var(--muted)]">
              {(idx + 1).toString().padStart(2, "0")}
            </span>
            {p.liveUrl && (
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--signal)]" title="Live Deployment" />
            )}
          </div>

          {/* Large Type Title (Wrapped, No Ellipsis) */}
          <span className="font-display font-bold text-xs sm:text-sm lg:text-base uppercase tracking-tight text-[var(--fg)] leading-tight break-words whitespace-normal my-auto">
            {p.title}
          </span>

          <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--muted)] truncate">
            {p.category.split("/")[0]?.trim() || p.year}
          </span>
        </>
      )}
    </Link>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const peakLabelsRef = useRef<HTMLDivElement>(null);

  const [useFallback, setUseFallback] = useState(false);
  const [tickerIndex, setTickerIndex] = useState(0);

  // Height factor ref shared with R3F CommitRidge scene (lerps 1 -> 0 during scrub)
  const heightFactorRef = useRef(1);

  const rows = useMemo(() => getYearlyCommitRows(), []);
  const tileProjects = useMemo(() => getSortedProjectsForTiles(), []);

  // Numbers computed from data
  const reposStarted2026 =
    commitsJson.totals.reposStartedByYear["2026" as keyof typeof commitsJson.totals.reposStartedByYear] || 39;
  const hackathonsCount = hackathons.length;
  const eventsRun = siteStats.eventsRun;
  const largestAudience = siteStats.largestAudience;

  // Detect fallback condition: mobile (< 1024px), reduced motion, or WebGL unavailable
  useEffect(() => {
    const isMobile = window.innerWidth < 1024;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const webglSupported = isWebGLAvailable();

    if (isMobile || prefersReducedMotion || !webglSupported) {
      setUseFallback(true);
    }
  }, []);

  // Decoded Hindi ticker (cycles "बोल के बेचो" and "कान खोल" every 3s)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev === 0 ? 1 : 0));
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  // GSAP ScrollTrigger Scrub (Desktop only with motion allowed)
  useEffect(() => {
    if (useFallback || !containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=100%",
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress;

          // 0 to 0.5 progress: ridge heights lerp to 0
          if (progress <= 0.5) {
            heightFactorRef.current = Math.max(0, 1 - progress * 2);
          } else {
            heightFactorRef.current = 0;
          }

          // Peak labels fade out early (0 to 0.25)
          if (peakLabelsRef.current) {
            const labelOpacity = Math.max(0, 1 - progress * 4);
            peakLabelsRef.current.style.opacity = String(labelOpacity);
          }

          // 0.4 to 1 progress: DOM grid steps in with steps(6)
          if (gridRef.current) {
            if (progress >= 0.4) {
              const gridProgress = (progress - 0.4) / 0.6;
              const steppedProgress = Math.floor(gridProgress * 6) / 6;
              gridRef.current.style.opacity = String(steppedProgress);
              gridRef.current.style.pointerEvents = steppedProgress > 0.5 ? "auto" : "none";
            } else {
              gridRef.current.style.opacity = "0";
              gridRef.current.style.pointerEvents = "none";
            }
          }
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [useFallback]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className={`relative w-full bg-[var(--bg)] text-[var(--fg)] ${
        useFallback ? "min-h-screen py-10 flex flex-col justify-between" : "h-screen overflow-hidden flex flex-col"
      }`}
    >
      {/* Top 40% Viewport: All Text Content (No Canvas Overlap) */}
      <div
        ref={heroSectionRef}
        className="relative z-20 container-main w-full h-[40vh] min-h-[260px] flex flex-col justify-between pt-6 sm:pt-8 pb-3 shrink-0"
      >
        {/* Top Header Block */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-2 sm:mb-3">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[var(--muted)]">
                BENGALURU · B.TECH CSE 2028
              </span>
              {/* Optional Devanagari Ticker */}
              <span
                lang="hi"
                className="font-mono text-[10px] sm:text-xs tracking-wider text-[var(--fg)] border-l border-[var(--rule)] pl-3 transition-none"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {tickerIndex === 0 ? "बोल के बेचो" : "कान खोल"}
              </span>
            </div>

            {/* Availability */}
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-[var(--muted)] border border-[var(--rule)] px-2.5 py-0.5 rounded-[var(--radius)]">
              OPEN TO INTERNSHIPS
            </span>
          </div>

          <p className="font-display font-semibold text-xs sm:text-sm tracking-wider text-[var(--muted)] uppercase mb-1 sm:mb-2">
            MOHAMMED AYAAN ADIL AHMED
          </p>

          <h1 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tight uppercase leading-[0.9] text-[var(--fg)] max-w-4xl">
            MESSY HUMAN INPUT,
            <br />
            WORKING AGENTS.
          </h1>
        </div>

        {/* Bottom Subline: Strictly in the top 40% container */}
        <div className="pt-2 sm:pt-3 border-t border-[var(--rule)] max-w-3xl pointer-events-auto">
          <p className="text-xs sm:text-sm md:text-base text-[var(--muted)] leading-relaxed">
            Building since 2019. {reposStarted2026} repos started in 2026 · {hackathonsCount} hackathons since 2025 ·{" "}
            {eventsRun} events run, largest {largestAudience}.
          </p>
        </div>
      </div>

      {/* Bottom 60% Viewport: 3D Canvas Ridge or Static Fallback */}
      <div className="relative w-full h-[60vh] shrink-0 overflow-hidden">
        {!useFallback ? (
          <>
            <CommitRidge heightFactorRef={heightFactorRef} containerRef={containerRef} />

            {/* Peak labels overlay (tooltips over canvas only, desktop) */}
            <div
              ref={peakLabelsRef}
              className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-200 select-none hidden lg:block"
              aria-hidden="true"
            >
              {peakLabels.map((lbl) => (
                <div
                  key={lbl.id}
                  className="absolute font-mono text-[10px] sm:text-[11px] tracking-wider uppercase text-[var(--muted)] border-b border-[var(--rule)] pb-0.5 bg-[var(--bg)]/80 px-1 backdrop-blur-[2px]"
                  style={{
                    left: `${lbl.xPercent}%`,
                    top: `${lbl.yPercent}%`,
                  }}
                >
                  {lbl.text}
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center pointer-events-auto px-4">
            <StaticSvgRidge rows={rows} />
          </div>
        )}
      </div>

      {/* 34 Project Tiles Grid */}
      {/* On desktop: steps in over canvas as pinned scroll proceeds */}
      {/* On mobile / fallback: rendered directly below the hero */}
      <div
        ref={gridRef}
        className={`${
          useFallback
            ? "relative z-20 container-main mt-12 mb-16 opacity-100"
            : "absolute inset-0 z-30 flex items-center justify-center bg-[var(--bg)] opacity-0 pointer-events-none py-6"
        }`}
      >
        <div className="w-full container-main mx-auto">
          <div className="flex items-center justify-between mb-4 border-b border-[var(--rule)] pb-2">
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--muted)]">
              BUILD LEDGER · {tileProjects.length} REPOSITORIES (OLDEST → NEWEST)
            </span>
            <Link
              href="/projects"
              className="font-mono text-xs uppercase tracking-wider text-[var(--fg)] hover:underline"
              data-cursor="Open"
            >
              FULL LEDGER →
            </Link>
          </div>

          {/* Grid aligned to content column */}
          <div
            className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-7 gap-2 sm:gap-3"
            role="region"
            aria-label={`${tileProjects.length} Project Tiles`}
          >
            {tileProjects.map((p, idx) => (
              <ProjectTileItem key={p.id} project={p} index={idx} />
            ))}
          </div>
        </div>
      </div>

      {/* Screen Reader Commit Summary Table */}
      <div className="sr-only">
        <table>
          <caption>Weekly commit history summary from 2019 to 2026</caption>
          <thead>
            <tr>
              <th scope="col">Year</th>
              <th scope="col">Commits</th>
              <th scope="col">Active Weeks</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.year}>
                <td>{r.year}</td>
                <td>{r.totalCommits}</td>
                <td>{r.values.filter((v) => v > 0).length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
