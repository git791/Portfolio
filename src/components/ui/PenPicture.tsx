"use client";

import { useState } from "react";
import Image from "next/image";
import PassLink from "./PassLink";
import { Project } from "@/lib/types";
import { personalInfo } from "@/lib/data";

interface PenPictureProps {
  project: Project;
}

export default function PenPicture({ project }: PenPictureProps) {
  const [imgError, setImgError] = useState(false);
  const hasLive = Boolean(project.liveUrl && project.liveUrl.trim().length > 0);
  const hasImage = Boolean(project.image && !imgError);

  return (
    <div className="group relative border-b border-[var(--rule)] py-6 lg:py-8 transition-colors duration-200">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* LEFT: Photo plate or typographic plate (3 cols) */}
        <div className="lg:col-span-3">
          <PassLink
            href={`/projects/${project.slug}`}
            data-cursor="OPEN"
            className="block aspect-[16/10] relative overflow-hidden bg-[#0B0D0C] border border-[var(--rule)]"
          >
            {hasImage ? (
              <Image
                src={project.image!}
                alt={project.title}
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                sizes="(max-width: 1024px) 100vw, 320px"
                onError={() => setImgError(true)}
              />
            ) : (
              /* Typographic plate on flat --night block (Section 2 rule: NEVER render an empty box) */
              <div className="w-full h-full p-4 flex flex-col justify-between surface-night text-[var(--chalk)]">
                <span className="font-mono text-[10px] text-[var(--muted)]">
                  PLATE · {project.year}
                </span>
                <span className="text-display-m font-bold leading-none line-clamp-2">
                  {project.title}
                </span>
                <span className="font-mono text-[9px] text-[var(--red)] uppercase">
                  TYPOGRAPHIC PLATE
                </span>
              </div>
            )}
          </PassLink>
        </div>

        {/* MIDDLE: Title, full wrapping problem line, metadata (6 cols) */}
        <div className="lg:col-span-6 space-y-2">
          <div className="flex flex-wrap items-center gap-3">
            <PassLink
              href={`/projects/${project.slug}`}
              data-cursor="OPEN"
              className="text-display-l text-[var(--night)] hover:text-[var(--red)] transition-colors"
            >
              {project.title}
            </PassLink>
          </div>

          {/* Problem line: full sentence, WRAPS, NEVER truncated with ellipsis (Ground rule 7 & Phase 6) */}
          <p className="text-body text-[var(--night)] leading-relaxed">
            {project.problem || project.description}
          </p>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs uppercase tracking-wider text-[var(--muted)]">
            <span>{project.role}</span>
            <span>·</span>
            <span>{project.year}</span>
            <span>·</span>
            <span className="border border-[var(--rule)] px-1.5 py-0.5 text-[10px]">
              MVP
            </span>
            {hasLive && (
              <span className="font-bold text-[var(--red)]">
                ● LIVE
              </span>
            )}
          </div>
        </div>

        {/* RIGHT: Team Sheet panel (clip-path reveal, 220ms, or in-flow on mobile) (3 cols) */}
        <div className="lg:col-span-3">
          <div className="lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100 transition-opacity duration-200 border border-[var(--rule)] p-3 bg-[var(--chalk)] surface-night lg:surface-night text-xs font-mono space-y-2">
            <div className="flex justify-between items-center border-b border-[var(--rule)] pb-1 text-[var(--chalk)]">
              <span className="text-[10px] text-[var(--muted)]">TEAM SHEET</span>
              <span className="text-[10px] text-[var(--red)] font-semibold">
                {project.team.length > 0 ? `${project.team.length + 1} SQUAD` : "SOLO BUILD"}
              </span>
            </div>

            {project.team.length > 0 && (
              <div className="text-[11px] text-[var(--chalk)]">
                {personalInfo.firstName} (Lead), {project.team.join(", ")}
              </div>
            )}

            <div className="flex flex-wrap gap-1 pt-1">
              {project.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="bg-[#1C201D] text-[var(--chalk)] px-1.5 py-0.5 text-[10px]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {project.repoFacts && (
              <div className="text-[10px] text-[var(--muted)] pt-1 border-t border-[var(--rule)]">
                {project.repoFacts.commits} COMMITS · ~{project.repoFacts.approxLoc} LOC
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
