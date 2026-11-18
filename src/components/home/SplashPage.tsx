"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/lib/data";
import { Panel } from "@/components/comic/Panel";
import { CaptionBox } from "@/components/comic/CaptionBox";
import { Balloon } from "@/components/comic/Balloon";
import { CreditsBox } from "@/components/comic/CreditsBox";
import { DotField } from "@/components/comic/DotField";
import { Chip } from "@/components/comic/Chip";

export default function SplashPage() {
  const editorialProjects = projects.filter((p) => p.tier === "editorial").slice(0, 6);
  const containerRef = useRef<HTMLDivElement>(null);

  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);
    const onMotion = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener("change", onMotion);

    const checkDesk = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesk();
    window.addEventListener("resize", checkDesk);

    return () => {
      mql.removeEventListener("change", onMotion);
      window.removeEventListener("resize", checkDesk);
    };
  }, []);

  // Pointer parallax: up to +/- 3 degrees, quantised to twos (12Hz)
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || !isDesktop || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;

    // Quantise to steps of 1 degree (max +/- 3deg)
    const rotY = Math.round(nx * 3);
    const rotX = Math.round(-ny * 3);
    setTilt({ x: rotX, y: rotY });
  };

  const handlePointerLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Color assignments for field panels
  const fieldColors: Array<"yellow" | "cyan" | "magenta" | "paper"> = [
    "yellow",
    "cyan",
    "paper",
    "cyan",
    "paper",
    "yellow",
  ];

  const zDepths = [40, 24, 16, 28, 12, 20];

  return (
    <section
      id="work"
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative w-full py-16 px-4 sm:px-6 lg:px-8 bg-[var(--paper)] select-none"
    >
      <div className="max-w-7xl mx-auto mb-8 flex flex-wrap items-end justify-between gap-4 border-b-[3px] border-[var(--ink)] pb-4">
        <div>
          <CaptionBox variant="label" bg="yellow" shadow="sm" className="mb-2">
            BEAT B · THE SPLASH PAGE
          </CaptionBox>
          <h2 className="font-display text-4xl sm:text-5xl uppercase tracking-tight text-[var(--ink)]">
            THE EDITORIAL SIX
          </h2>
        </div>
        <div className="font-mono text-xs uppercase text-[var(--ink-muted)] font-bold">
          DEPTH STACK · 6 KEY AGENTS & SYSTEMS
        </div>
      </div>

      {/* 3D Comic Page Container */}
      <div
        className="w-full max-w-7xl mx-auto"
        style={{
          perspective: isDesktop && !reducedMotion ? "1400px" : "none",
        }}
      >
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6"
          style={{
            transform:
              isDesktop && !reducedMotion
                ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
                : "none",
            transformStyle: "preserve-3d",
            transition: reducedMotion ? "none" : "transform 0.16s steps(2)",
          }}
        >
          {editorialProjects.map((project, idx) => {
            const isBizBoost = project.slug === "bizboost-ai";
            const field = fieldColors[idx % fieldColors.length];
            const baseZ = zDepths[idx % zDepths.length];

            // Grid area layout:
            // BizBoost is large (col-span-12 lg:col-span-8)
            // KaanKhol medium (col-span-12 lg:col-span-4)
            // VaneLoop medium (col-span-12 lg:col-span-6)
            // AccessAgent medium (col-span-12 lg:col-span-6)
            // Footy Mind small (col-span-12 lg:col-span-6)
            // Ordivanta small (col-span-12 lg:col-span-6)
            const colSpan =
              idx === 0
                ? "lg:col-span-8"
                : idx === 1
                ? "lg:col-span-4"
                : "lg:col-span-6";

            return (
              <div
                key={project.slug}
                className={`${colSpan} group relative`}
                style={{
                  transform:
                    isDesktop && !reducedMotion ? `translateZ(${baseZ}px)` : "none",
                  transformStyle: "preserve-3d",
                  transition: reducedMotion
                    ? "none"
                    : "transform 0.16s steps(2), box-shadow 0.16s steps(2)",
                }}
              >
                <Link
                  href={`/projects/${project.slug}`}
                  data-cursor="OPEN ISSUE"
                  data-sfx="PAGE!"
                  className="block h-full focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--ink)]"
                >
                  <Panel
                    field={field}
                    shadow="base"
                    className="h-full flex flex-col justify-between p-5 relative overflow-hidden group-hover:translate-z-6 group-hover:shadow-[6px_6px_0px_var(--ink)] transition-transform"
                  >
                    {/* Background Halftone Dot Overlay */}
                    <DotField opacity={0.12} color="var(--ink)" cellSize={8} />

                    {/* Top Row: Chips & Meta */}
                    <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 mb-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <Chip variant="mvp" />
                        {project.liveUrl && <Chip variant="live" />}
                        <span className="font-mono text-xs font-bold px-2 py-0.5 border border-[var(--ink)] bg-[var(--paper)] text-[var(--ink)]">
                          {project.year}
                        </span>
                      </div>
                      <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--ink-muted)] font-bold">
                        PANEL 0{idx + 1}
                      </span>
                    </div>

                    {/* BizBoost AI Speech Balloon & Caption */}
                    {isBizBoost && (
                      <div className="relative z-10 mb-4 flex flex-wrap items-start gap-3">
                        <Balloon tailPosition="bottom-left">
                          <span
                            lang="hi"
                            className="font-[family-name:var(--font-deva)] text-lg sm:text-xl font-bold text-[var(--ink)] block"
                          >
                            बोल के बेचो
                          </span>
                        </Balloon>
                        <CaptionBox variant="body" shadow="sm" className="text-xs sm:text-sm py-1.5 px-3">
                          Speak it. Sell it.
                        </CaptionBox>
                      </div>
                    )}

                    {/* Image Plate OR Typographic Plate (Never empty box) */}
                    <div className="relative z-10 mb-5 border-2 border-[var(--ink)] overflow-hidden bg-[var(--paper)] shadow-comic-sm">
                      {project.image ? (
                        <div className="relative aspect-[16/9] w-full bg-[var(--paper)]">
                          <Image
                            src={project.image}
                            alt={`${project.title} screenshot illustration plate`}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover grayscale contrast-125 mix-blend-multiply opacity-90"
                          />
                        </div>
                      ) : (
                        <div className="aspect-[16/7] w-full p-4 flex flex-col justify-between bg-[var(--paper)] relative">
                          <DotField opacity={0.1} color="var(--ink)" cellSize={6} />
                          <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--ink-muted)] font-bold">
                            TYPOGRAPHIC PLATE · {project.category}
                          </div>
                          <div className="font-display text-2xl sm:text-3xl uppercase tracking-tight text-[var(--ink)] leading-none my-auto">
                            {project.title}
                          </div>
                          <div className="font-mono text-[11px] text-[var(--ink-muted)]">
                            GIT791 // {project.slug.toUpperCase()}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Content Block (Always inside solid paper block for contrast) */}
                    <div className="relative z-10 bg-[var(--paper)] border-2 border-[var(--ink)] p-4 shadow-comic-sm space-y-2 mt-auto">
                      <h3 className="font-display text-2xl sm:text-3xl uppercase tracking-tight text-[var(--ink)] leading-none">
                        {project.title}
                      </h3>

                      {/* Full problem line wrapped (never truncated) */}
                      <p className="font-[family-name:var(--font-body)] text-xs sm:text-sm text-[var(--ink)] leading-relaxed">
                        {project.problem}
                      </p>
                    </div>

                    {/* Credits Box: Always visible on mobile, elevated on desktop */}
                    <div className="relative z-10 mt-3 pt-2">
                      <CreditsBox
                        project={{ role: project.role, team: project.team }}
                        leadName="Ayaan"
                      />
                    </div>
                  </Panel>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
