"use client";

import Image from "next/image";
import PenPicture from "./ui/PenPicture";
import PassLink from "./ui/PassLink";
import Cutout from "./ui/Cutout";
import { projectsByTier } from "@/lib/derive";
import { cutouts } from "@/data/football";
import { projects } from "@/lib/data";

export default function Work() {
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

          {/* Dalglish cutout stepped reveal in 4 steps with 12px scroll parallax */}
          {dalglishCutout && (
            <Cutout
              src={dalglishCutout.src}
              tag={dalglishCutout.tag}
              caption={dalglishCutout.caption}
              width={64}
              height={76}
              theme="newsprint"
              containerClassName="max-w-sm"
            />
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
