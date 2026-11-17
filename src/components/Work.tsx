"use client";

import { useState } from "react";
import Image from "next/image";
import PenPicture from "./ui/PenPicture";
import PassLink from "./ui/PassLink";
import { projectsByTier } from "@/lib/derive";
import { cutouts } from "@/data/football";
import { projects } from "@/lib/data";

export default function Work() {
  const [dalglishError, setDalglishError] = useState(false);
  const editorialProjects = projectsByTier().editorial.slice(0, 6);
  const dalglishCutout = cutouts.find((c) => c.key === "dalglish");

  return (
    <section id="work" className="surface-newsprint py-20 px-6 lg:px-12 border-b border-[var(--rule)]">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[var(--rule)] pb-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--muted)]">
              02 · WORK · PEN PICTURES
            </span>
            <h2 className="text-display-l text-[var(--night)]">
              PROGRAMME SELECTIONS
            </h2>
          </div>

          {/* Dalglish cutout side strip: player-manager (does not overlap rows) */}
          {dalglishCutout && !dalglishError && (
            <div className="flex items-center gap-3 border border-[var(--rule)] p-2 bg-[#DDD6C3] max-w-sm">
              <div className="relative w-12 h-14 shrink-0">
                <Image
                  src={dalglishCutout.src}
                  alt=""
                  fill
                  className="object-contain object-bottom"
                  sizes="60px"
                  onError={() => setDalglishError(true)}
                />
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono font-bold uppercase text-[var(--red)] tracking-wider">
                  {dalglishCutout.tag}
                </span>
                <p className="font-mono text-[10px] text-[var(--muted)]">
                  {dalglishCutout.caption}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Six Editorial Pen Picture Rows */}
        <div className="divide-y divide-[var(--rule)]">
          {editorialProjects.map((project) => (
            <PenPicture key={project.slug} project={project} />
          ))}
        </div>

        {/* Link to full projects directory */}
        <div className="pt-4 flex justify-end">
          <PassLink
            href="/projects"
            data-cursor="OPEN"
            className="font-mono text-xs uppercase tracking-wider border border-[var(--night)] px-4 py-2 hover:bg-[var(--night)] hover:text-[var(--chalk)] transition-colors font-semibold"
          >
            VIEW ALL {projects.length} PROJECTS →
          </PassLink>
        </div>
      </div>
    </section>
  );
}
