"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getScoreboardStats } from "@/lib/derive";
import { personalInfo } from "@/lib/data";
import Mosaic2DFallback from "./canvas/Mosaic2DFallback";

gsap.registerPlugin(ScrollTrigger);

// Client-only dynamic load of the 3D Canvas
const MosaicStand = dynamic(() => import("./canvas/MosaicStand"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center font-mono text-xs text-[var(--muted)]">
      STAND READYING...
    </div>
  ),
});

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [pointerPos, setPointerPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [useFallback, setUseFallback] = useState<boolean>(true);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);

  // Compute all numbers dynamically from data
  const stats = getScoreboardStats();

  useEffect(() => {
    // Check environment capabilities
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 1024;

    let hasWebGL = false;
    try {
      const testCanvas = document.createElement("canvas");
      hasWebGL = Boolean(
        window.WebGLRenderingContext &&
          (testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl"))
      );
    } catch {
      hasWebGL = false;
    }

    setIsReducedMotion(prefersReducedMotion);

    // If mobile, reduced motion, or WebGL unavailable: use 2D fallback
    if (isMobile || prefersReducedMotion || !hasWebGL) {
      setUseFallback(true);
    } else {
      setUseFallback(false);
    }

    const handleResize = () => {
      const mobileNow = window.innerWidth < 1024;
      if (mobileNow || prefersReducedMotion || !hasWebGL) {
        setUseFallback(true);
      } else {
        setUseFallback(false);
      }
    };

    // Support query parameters for deterministic test inspection: ?p=0.18 or ?beat=a/b/c or ?fallback=1
    try {
      const params = new URLSearchParams(window.location.search);
      const forceFallback = params.get("fallback");
      const pParam = params.get("p");
      const beatParam = params.get("beat");

      if (forceFallback === "1") {
        setUseFallback(true);
      }

      if (pParam !== null) {
        setScrollProgress(parseFloat(pParam));
      } else if (beatParam === "a") {
        setScrollProgress(0.18);
      } else if (beatParam === "b") {
        setScrollProgress(0.45);
      } else if (beatParam === "c") {
        setScrollProgress(0.72);
      }
    } catch {
      // ignore
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Desktop ScrollTrigger pin across ~250vh (no child inner spacer mismatch)
  useEffect(() => {
    if (isReducedMotion || !containerRef.current) {
      return;
    }

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "+=220%",
      pin: true,
      pinSpacing: true,
      scrub: 0.1,
      onUpdate: (self) => {
        setScrollProgress(self.progress);
      },
    });

    return () => {
      trigger.kill();
    };
  }, [isReducedMotion]);

  // Pointer movement tracking for 3D camera parallax and shader ripple
  const handlePointerMove = (e: React.PointerEvent) => {
    if (useFallback) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setPointerPos({ x, y });
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      onPointerMove={handlePointerMove}
      className="relative surface-night w-full h-screen overflow-hidden flex flex-col justify-between select-none"
    >
      <div
        ref={pinWrapperRef}
        className="relative w-full h-full overflow-hidden flex flex-col justify-between"
      >
        {/* TOP 38% VIEWPORT: TEXT BLOCK (NO CANVAS OVERLAP) */}
        <div className="h-[38vh] w-full px-6 lg:px-12 pt-6 lg:pt-8 flex flex-col justify-between border-b border-[var(--rule)] z-10 surface-night">
          {/* Eyebrow & Status row */}
          <div className="flex items-center justify-between font-mono text-xs uppercase tracking-wider">
            <span className="text-[var(--chalk)]">
              BENGALURU · B.TECH CSE 2028
            </span>
            <div className="flex items-center gap-4">
              <span className="hidden md:inline font-mono text-[11px] text-[var(--muted)]" lang="hi">
                बोल के बेचो · कान खोल
              </span>
              <span className="border border-[var(--chalk)] px-2.5 py-0.5 text-[10px] text-[var(--chalk)] tracking-widest font-semibold">
                OPEN TO INTERNSHIPS
              </span>
            </div>
          </div>

          {/* Heading block */}
          <div className="my-auto">
            <div className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--muted)] mb-1">
              {personalInfo.name}
            </div>
            <h1 className="text-display-xl text-[var(--chalk)] max-w-5xl leading-[0.92]">
              MESSY HUMAN INPUT,<br />WORKING AGENTS.
            </h1>
          </div>

          {/* Subline dynamically computed from data */}
          <div className="pb-3 text-caption text-[var(--muted)] font-serif">
            Building since 2019.{" "}
            <span className="text-[var(--chalk)] font-medium">
              {stats.repos2026} repos started in 2026
            </span>{" "}
            ·{" "}
            <span className="text-[var(--chalk)] font-medium">
              {stats.hackathons} hackathons
            </span>{" "}
            ·{" "}
            <span className="text-[var(--chalk)] font-medium">
              {stats.eventsRun} events run
            </span>
            , largest{" "}
            <span className="text-[var(--chalk)] font-medium">
              {stats.largestAudience}
            </span>
            .
          </div>
        </div>

        {/* BOTTOM 62% VIEWPORT: 3D MOSAIC STAND OR 2D FALLBACK */}
        <div className="h-[62vh] w-full relative surface-night">
          {useFallback ? (
            <Mosaic2DFallback
              beatProgress={scrollProgress}
              reducedMotion={isReducedMotion}
            />
          ) : (
            <MosaicStand
              beatProgress={scrollProgress}
              pointerPos={pointerPos}
            />
          )}

          {/* Scroll cue during idle beat */}
          {scrollProgress < 0.05 && !isReducedMotion && (
            <div className="pointer-events-none absolute bottom-4 right-6 font-mono text-[10px] uppercase tracking-widest text-[var(--muted)]">
              SCROLL TO RESOLVE STAND ↓
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
