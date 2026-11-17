"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import type { Project } from "@/lib/types";

export default function ProjectRow({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const rowRef = useRef<HTMLAnchorElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [canHover, setCanHover] = useState(false);

  const indexStr = (index + 1).toString().padStart(2, "0");
  const hasLive = Boolean(project.liveUrl && project.liveUrl.trim().length > 0);
  const hasImage = Boolean(project.image && project.image.trim().length > 0);
  const hasRepoFacts = Boolean(project.repoFacts);
  const hasHoverContent = hasImage || hasRepoFacts;

  useEffect(() => {
    // Only enable hover panel on fine pointer devices without reduced motion
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (finePointer && !reducedMotion) {
      setCanHover(true);
    }
  }, []);

  useEffect(() => {
    if (!canHover || !hasHoverContent) return;

    const row = rowRef.current;
    const panel = panelRef.current;
    if (!row || !panel) return;

    const xTo = gsap.quickTo(panel, "x", { duration: 0.22, ease: "power2.out" });
    const yTo = gsap.quickTo(panel, "y", { duration: 0.22, ease: "power2.out" });

    const onPointerMove = (e: PointerEvent) => {
      // Offset panel slightly from cursor so it doesn't block pointer
      xTo(e.clientX + 20);
      yTo(e.clientY - 60);
    };

    row.addEventListener("pointermove", onPointerMove);
    return () => row.removeEventListener("pointermove", onPointerMove);
  }, [canHover, hasHoverContent]);

  const handlePointerEnter = (e: React.PointerEvent) => {
    if (!canHover || !hasHoverContent) return;
    setIsHovered(true);

    const panel = panelRef.current;
    if (panel) {
      gsap.set(panel, {
        x: e.clientX + 20,
        y: e.clientY - 60,
        clipPath: "inset(20% 0% 20% 0%)",
        opacity: 0,
      });
      gsap.to(panel, {
        clipPath: "inset(0% 0% 0% 0%)",
        opacity: 1,
        duration: 0.22,
        ease: "power2.out",
      });
    }
  };

  const handlePointerLeave = () => {
    if (!canHover || !hasHoverContent) return;
    setIsHovered(false);

    const panel = panelRef.current;
    if (panel) {
      gsap.to(panel, {
        clipPath: "inset(15% 0% 15% 0%)",
        opacity: 0,
        duration: 0.15,
        ease: "power2.in",
      });
    }
  };

  return (
    <>
      <Link
        ref={rowRef}
        href={`/projects/${project.slug}`}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        className="group relative flex flex-col md:flex-row md:items-center justify-between py-4 px-2 sm:px-4 border-b border-[var(--rule)] transition-colors hover:bg-[var(--rule)]/20 focus-visible:outline-2 focus-visible:outline-[var(--fg)]"
        data-cursor="Open"
        aria-label={`${project.title} - ${project.category}`}
      >
        {/* Left: Index + Title + Problem */}
        <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 min-w-0 flex-1 pr-4">
          <div className="flex items-baseline gap-3 shrink-0">
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--muted)] w-6 shrink-0">
              {indexStr}
            </span>

            <span className="font-display font-semibold text-lg sm:text-xl tracking-tight uppercase text-[var(--fg)] group-hover:text-white shrink-0">
              {project.title}
            </span>
          </div>

          <span className="text-xs sm:text-sm text-[var(--muted)] font-normal leading-relaxed break-words whitespace-normal">
            {project.problem}
          </span>
        </div>

        {/* Right: Domain + Role + Year + Chip */}
        <div className="flex items-center gap-3 sm:gap-6 shrink-0 mt-2 md:mt-0 font-mono text-[11px] uppercase tracking-wider text-[var(--muted)]">
          <span className="hidden lg:inline-block max-w-[160px] truncate text-right">
            {project.category}
          </span>

          <span className="hidden sm:inline-block w-16 text-right">
            {project.role}
          </span>

          <span className="w-10 text-right">{project.year}</span>

          {/* Status Chip */}
          <span
            className={`px-2 py-0.5 text-[10px] tracking-widest uppercase font-mono ${
              hasLive
                ? "bg-[var(--signal)] text-[var(--bg)] font-bold"
                : "border border-[var(--rule)] text-[var(--muted)]"
            }`}
          >
            {hasLive ? "LIVE" : "MVP"}
          </span>
        </div>
      </Link>

      {/* Floating Cursor-Following Panel */}
      {canHover && hasHoverContent && (
        <div
          ref={panelRef}
          className="fixed top-0 left-0 z-50 pointer-events-none w-[280px] bg-[#141512] border border-[var(--rule)] p-3 shadow-2xl opacity-0 overflow-hidden"
          style={{ willChange: "transform, clip-path, opacity" }}
          aria-hidden="true"
        >
          {hasImage ? (
            <div className="relative aspect-video w-full overflow-hidden bg-[var(--bg)]">
              <Image
                src={project.image!}
                alt={project.title}
                fill
                sizes="280px"
                className="object-cover"
              />
            </div>
          ) : (
            project.repoFacts && (
              <div className="flex flex-col gap-1.5 font-mono text-[11px] uppercase tracking-wider text-[var(--muted)] p-1">
                <span className="text-[var(--fg)] font-semibold border-b border-[var(--rule)] pb-1 mb-1">
                  REPO FACTS
                </span>
                <div className="flex justify-between">
                  <span>Commits:</span>
                  <span className="text-[var(--fg)]">{project.repoFacts.commits}</span>
                </div>
                <div className="flex justify-between">
                  <span>Span:</span>
                  <span className="text-[var(--fg)]">
                    {project.repoFacts.first} → {project.repoFacts.last}
                  </span>
                </div>
                {project.repoFacts.approxLoc !== undefined && (
                  <div className="flex justify-between">
                    <span>Est. LOC:</span>
                    <span className="text-[var(--fg)]">~{project.repoFacts.approxLoc.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Tests:</span>
                  <span className="text-[var(--fg)]">
                    {project.repoFacts.tests > 0 ? project.repoFacts.tests : "None"}
                  </span>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </>
  );
}
