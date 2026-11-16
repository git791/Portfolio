"use client";

import Link from "next/link";
import Decode from "@/components/ui/Decode";
import ProjectRow from "@/components/ui/ProjectRow";
import { projects } from "@/lib/data";

export default function WorkPreview() {
  const editorialProjects = projects.filter((p) => p.tier === "editorial");

  return (
    <section id="work" className="py-24 border-t border-[var(--rule)]">
      <div className="container-main">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--muted)]">
              02 /
            </span>
            <Decode
              text="WORK"
              className="font-display font-bold text-3xl sm:text-4xl uppercase tracking-tight text-[var(--fg)]"
            />
          </div>

          <span className="font-mono text-xs uppercase tracking-wider text-[var(--muted)]">
            6 EDITORIAL SELECTIONS
          </span>
        </div>

        {/* 6 Editorial Rows */}
        <div className="flex flex-col border-t border-[var(--rule)]">
          {editorialProjects.map((project, idx) => (
            <ProjectRow key={project.id} project={project} index={idx} />
          ))}
        </div>

        {/* View All Projects Link */}
        <div className="mt-8 pt-4 flex justify-end">
          <Link
            href="/projects"
            className="font-mono text-xs uppercase tracking-widest text-[var(--fg)] hover:underline inline-flex items-center gap-2"
            data-cursor="Open"
          >
            VIEW ALL {projects.length} PROJECTS →
          </Link>
        </div>
      </div>
    </section>
  );
}
