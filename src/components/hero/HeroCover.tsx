"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { issueLabel, statsRow } from "@/lib/derive";
import { CaptionBox } from "@/components/comic/CaptionBox";
import { Panel } from "@/components/comic/Panel";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HalftonePortrait = dynamic(
  () => import("@/components/canvas/HalftonePortrait"),
  { ssr: false }
);

export interface HeroCoverProps {
  initialProgress?: number;
  forceFallback?: boolean;
}

export default function HeroCover({
  initialProgress,
  forceFallback = false,
}: HeroCoverProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);

  const [progress, setProgress] = useState(initialProgress ?? 0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [fallbackMode, setFallbackMode] = useState(forceFallback);

  const label = issueLabel();
  const stats = statsRow();

  // Check viewport, reduced motion, URL params (?progress=..., ?fallback=1)
  useEffect(() => {
    // Check URL query parameters for manual testing / screenshot capture
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.has("fallback") || forceFallback) {
        setFallbackMode(true);
      }
      if (params.has("progress")) {
        const p = parseFloat(params.get("progress") || "0");
        if (!isNaN(p)) {
          setProgress(Math.max(0, Math.min(1, p)));
        }
      }
    }

    const checkDesktop = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);
      // Auto-fallback on mobile (<1024px)
      if (!desktop) {
        setFallbackMode(true);
      }
    };

    const mqlReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mqlReduced.matches);
    if (mqlReduced.matches) {
      setFallbackMode(true);
      setProgress(1.0);
    }

    checkDesktop();
    window.addEventListener("resize", checkDesktop);

    return () => {
      window.removeEventListener("resize", checkDesktop);
    };
  }, [forceFallback]);

  // Desktop ScrollTrigger pin and scrub across 250vh
  useEffect(() => {
    if (!isDesktop || reducedMotion || typeof window === "undefined") return;

    // If explicit progress was set via query param, honor it
    const params = new URLSearchParams(window.location.search);
    if (params.has("progress")) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=250%",
        pin: pinWrapperRef.current,
        scrub: 0.1,
        onUpdate: (self) => {
          // Quantise progress to 1/30 steps (on twos)
          const raw = self.progress;
          const quantised = Math.round(raw * 30) / 30;
          setProgress(quantised);
        },
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [isDesktop, reducedMotion]);

  const unreg = 1.0 - progress;

  // Offsets for Title Plates (ink layer stays readable, max 5px offset)
  const inkOffset = Math.round(4 * unreg);
  const cyanOffsetX = Math.round(-18 * unreg);
  const cyanOffsetY = Math.round(14 * unreg);
  const magentaOffsetX = Math.round(16 * unreg);
  const magentaOffsetY = Math.round(-16 * unreg);
  const yellowOffsetX = Math.round(-10 * unreg);
  const yellowOffsetY = Math.round(-18 * unreg);

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${isDesktop && !reducedMotion ? "h-[350vh]" : "min-h-screen"}`}
    >
      <div
        ref={pinWrapperRef}
        className="w-full min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-[var(--paper)]"
      >
        <div className="w-full max-w-7xl mx-auto border-[4px] border-[var(--ink)] bg-[var(--paper)] p-6 sm:p-8 lg:p-10 shadow-comic-lg relative">
          {/* Top-Left: Issue Label & Eyebrow */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b-[3px] border-[var(--ink)] pb-4 mb-6">
            <div className="flex flex-wrap items-center gap-3">
              <CaptionBox variant="label" bg="yellow" shadow="sm">
                {label}
              </CaptionBox>
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--ink)] font-bold">
                BENGALURU · B.TECH CSE 2028
              </span>
            </div>

            <span className="font-mono text-xs uppercase font-bold px-3 py-1 border-2 border-[var(--ink)] bg-[var(--paper)] text-[var(--ink)]">
              OPEN TO INTERNSHIPS
            </span>
          </div>

          {/* Main Grid: Left Column (Title & Subline) + Right Column (Halftone Portrait) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: 7 cols */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
              <div className="font-mono text-xs uppercase tracking-widest font-bold text-[var(--ink-muted)]">
                MOHAMMED AYAAN ADIL AHMED
              </div>

              {/* Title Plates (Registering H1) */}
              <div className="relative select-none py-2">
                {/* Cyan Layer */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 font-display text-4xl sm:text-6xl xl:text-7xl uppercase tracking-tight leading-[0.95] text-[var(--cyan)] mix-blend-multiply pointer-events-none"
                  style={{
                    transform: `translate(${cyanOffsetX}px, ${cyanOffsetY}px)`,
                  }}
                >
                  MESSY HUMAN INPUT, WORKING AGENTS.
                </div>

                {/* Magenta Layer */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 font-display text-4xl sm:text-6xl xl:text-7xl uppercase tracking-tight leading-[0.95] text-[var(--magenta)] mix-blend-multiply pointer-events-none"
                  style={{
                    transform: `translate(${magentaOffsetX}px, ${magentaOffsetY}px)`,
                  }}
                >
                  MESSY HUMAN INPUT, WORKING AGENTS.
                </div>

                {/* Yellow Layer */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 font-display text-4xl sm:text-6xl xl:text-7xl uppercase tracking-tight leading-[0.95] text-[var(--yellow)] mix-blend-multiply pointer-events-none"
                  style={{
                    transform: `translate(${yellowOffsetX}px, ${yellowOffsetY}px)`,
                  }}
                >
                  MESSY HUMAN INPUT, WORKING AGENTS.
                </div>

                {/* Real Ink Text Layer (Always readable, offset <= 5px) */}
                <h1
                  className="relative font-display text-4xl sm:text-6xl xl:text-7xl uppercase tracking-tight leading-[0.95] text-[var(--ink)] mix-blend-multiply"
                  style={{
                    transform: `translate(${inkOffset}px, ${inkOffset}px)`,
                  }}
                >
                  MESSY HUMAN INPUT, WORKING AGENTS.
                </h1>
              </div>

              {/* Subline in a Caption Box (All numbers derived from data) */}
              <div className="pt-2">
                <CaptionBox
                  variant="body"
                  bg="yellow"
                  shadow="base"
                  className="w-full text-sm sm:text-base leading-relaxed"
                >
                  Building since 2019. {stats.reposStarted2026} repos started in 2026 · {stats.hackathonsCount} hackathons · {stats.eventsRun} events run, largest {stats.largestAudience}.
                </CaptionBox>
              </div>
            </div>

            {/* Right Column: 5 cols (Halftone Portrait Panel) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <Panel
                field="paper"
                shadow="lg"
                tilt={0.5}
                className="w-full max-w-sm aspect-[4/5] p-2 bg-[var(--paper)]"
              >
                <div className="w-full h-full border-2 border-[var(--ink)] overflow-hidden bg-[var(--paper)]">
                  <HalftonePortrait
                    progress={progress}
                    forceFallback={fallbackMode}
                    className="w-full h-full"
                  />
                </div>
              </Panel>
            </div>
          </div>

          {/* Bottom Bar: Registration indicator & instructions */}
          <div className="mt-8 pt-4 border-t-2 border-[var(--rule)] flex flex-wrap items-center justify-between text-xs font-mono text-[var(--ink-muted)]">
            <div className="flex items-center gap-2">
              <span className="font-bold">PRINT REGISTRATION:</span>
              <div className="w-32 h-2.5 border border-[var(--ink)] bg-[var(--paper)] overflow-hidden">
                <div
                  className="h-full bg-[var(--yellow)] border-r border-[var(--ink)]"
                  style={{ width: `${Math.round(progress * 100)}%` }}
                />
              </div>
              <span className="font-bold text-[var(--ink)]">{Math.round(progress * 100)}%</span>
            </div>

            <div className="hidden sm:block">
              {progress >= 1 ? "✓ PLATES IN REGISTER" : "SCROLL TO REGISTER PLATES"}
            </div>
          </div>

          {/* Accessible Visually Hidden Data Table for Screen Readers */}
          <table className="sr-only">
            <caption>Cover telemetry, background, and career summary</caption>
            <tbody>
              <tr>
                <th scope="row">Developer</th>
                <td>Mohammed Ayaan Adil Ahmed</td>
              </tr>
              <tr>
                <th scope="row">Degree & Year</th>
                <td>B.Tech Computer Science and Engineering, Alliance University (2024–2028)</td>
              </tr>
              <tr>
                <th scope="row">Location</th>
                <td>Bengaluru, India</td>
              </tr>
              <tr>
                <th scope="row">Status</th>
                <td>Open to Software Engineering & Cloud Internships</td>
              </tr>
              <tr>
                <th scope="row">Repositories Started in 2026</th>
                <td>{stats.reposStarted2026}</td>
              </tr>
              <tr>
                <th scope="row">Editorial Sprints</th>
                <td>6 Sprints</td>
              </tr>
              <tr>
                <th scope="row">Commit Weeks Since 2019</th>
                <td>62 Weeks Recorded</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
