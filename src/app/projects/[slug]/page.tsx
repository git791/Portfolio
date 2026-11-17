import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import PassLink from "@/components/ui/PassLink";
import { projects, personalInfo } from "@/lib/data";

export function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  return {
    title: `${project.title} | Programme Spread`,
    description: project.problem || project.description,
  };
}

export default async function ProjectCasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);

  if (index === -1) {
    notFound();
  }

  const project = projects[index];
  const prevProject = index > 0 ? projects[index - 1] : null;
  const nextProject = index < projects.length - 1 ? projects[index + 1] : null;

  const hasLive = Boolean(project.liveUrl && project.liveUrl.trim().length > 0);
  const hasImage = Boolean(project.image && project.image.trim().length > 0);

  return (
    <div className="surface-newsprint min-h-screen py-16 px-6 lg:px-12">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Navigation Breadcrumb */}
        <div>
          <PassLink
            href="/projects"
            data-cursor="OPEN"
            className="font-mono text-xs uppercase tracking-widest text-[var(--muted-light)] hover:text-[var(--night)] inline-flex items-center gap-2 transition-colors"
          >
            <span>←</span>
            <span>MATCHDAY PROGRAMME / ALL PROJECTS</span>
          </PassLink>
        </div>

        {/* Header & Chips Row */}
        <div className="space-y-4 border-b border-[var(--rule-light)] pb-8">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-wider">
            <span
              className={`px-2 py-0.5 border ${
                hasLive
                  ? "bg-[var(--red)] text-[var(--chalk)] border-[var(--red)] font-bold"
                  : "border-[var(--rule-light)] text-[var(--night)]"
              }`}
            >
              {hasLive ? "● LIVE" : "MVP"}
            </span>

            <span className="px-2 py-0.5 border border-[var(--rule-light)] text-[var(--muted-light)]">
              {project.year}
            </span>

            <span className="px-2 py-0.5 border border-[var(--rule-light)] text-[var(--muted-light)]">
              {project.role.toUpperCase()}
            </span>

            <span className="px-2 py-0.5 border border-[var(--rule-light)] text-[var(--muted-light)]">
              {project.category}
            </span>
          </div>

          <h1 className="text-display-xl text-[var(--night)] leading-none">
            {project.title}
          </h1>

          {/* Problem Line (full sentence, wraps) */}
          {project.problem && (
            <div className="border-l-2 border-[var(--red)] pl-4 py-1">
              <p className="text-body text-[var(--night)] font-medium">
                {project.problem}
              </p>
            </div>
          )}
        </div>

        {/* Plate: Image or Typographic Plate */}
        <div className="relative aspect-[16/9] w-full overflow-hidden border border-[var(--rule-light)] bg-[#0B0D0C]">
          {hasImage ? (
            <Image
              src={project.image!}
              alt={project.title}
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-300"
              sizes="(max-width: 1024px) 100vw, 896px"
              priority
            />
          ) : (
            <div className="w-full h-full p-8 flex flex-col justify-between surface-night text-[var(--chalk)]">
              <div className="font-mono text-xs text-[var(--muted-dark)] uppercase tracking-wider">
                PROGRAMME PEN-PICTURE PLATE · {project.year}
              </div>
              <div className="text-display-l uppercase text-[var(--chalk)]">
                {project.title}
              </div>
              <div className="font-mono text-[11px] text-[var(--red)] uppercase tracking-wider">
                TYPOGRAPHIC SPECIMEN PLATE
              </div>
            </div>
          )}
        </div>

        {/* Content Sections */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pt-4">
          {/* Main Column: Overview & Stack */}
          <div className="md:col-span-8 space-y-8">
            <div className="space-y-3">
              <h2 className="font-mono text-xs uppercase tracking-wider text-[var(--muted-light)]">
                OVERVIEW
              </h2>
              <p className="text-body text-[var(--night)] leading-relaxed">
                {project.description}
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="font-mono text-xs uppercase tracking-wider text-[var(--muted-light)]">
                STACK & ENGINE
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-xs uppercase border border-[var(--rule-light)] px-2.5 py-1 bg-[#E0D9C5] text-[var(--night)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Side Column: Team Sheet & Repo Facts */}
          <div className="md:col-span-4 space-y-6">
            {/* Team Sheet */}
            <div className="border border-[var(--rule-light)] p-4 bg-[#E0D9C5] space-y-3">
              <div className="flex justify-between items-center border-b border-[var(--rule-light)] pb-2 font-mono text-xs">
                <span className="text-[var(--muted-light)]">TEAM SHEET</span>
                <span className="text-[var(--red)] font-bold">
                  {project.team.length > 0 ? `${project.team.length + 1} ON SHEET` : "SOLO"}
                </span>
              </div>
              <div className="font-mono text-xs space-y-1 text-[var(--night)]">
                <div>
                  <span className="text-[var(--muted-light)]">Lead:</span> {personalInfo.firstName}
                </div>
                {project.team.length > 0 && (
                  <div>
                    <span className="text-[var(--muted-light)]">Squad:</span> {project.team.join(", ")}
                  </div>
                )}
              </div>
            </div>

            {/* Repo Facts */}
            {project.repoFacts && (
              <div className="border border-[var(--rule-light)] p-4 bg-[#E0D9C5] space-y-3">
                <div className="border-b border-[var(--rule-light)] pb-2 font-mono text-xs text-[var(--muted-light)]">
                  REPO FACTS
                </div>
                <div className="font-mono text-xs space-y-1.5 text-[var(--night)]">
                  <div className="flex justify-between">
                    <span className="text-[var(--muted-light)]">Commits:</span>
                    <span className="font-bold">{project.repoFacts.commits}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--muted-light)]">Approx LOC:</span>
                    <span>~{project.repoFacts.approxLoc}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--muted-light)]">Active:</span>
                    <span>{project.repoFacts.first} to {project.repoFacts.last}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Links */}
            <div className="space-y-2">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="VISIT"
                className="block text-center font-mono text-xs uppercase tracking-wider border border-[var(--night)] p-2.5 bg-[var(--night)] text-[var(--chalk)] hover:bg-transparent hover:text-[var(--night)] transition-colors font-semibold"
              >
                GITHUB REPOSITORY ↗
              </a>
              {hasLive && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="VISIT"
                  className="block text-center font-mono text-xs uppercase tracking-wider border border-[var(--red)] p-2.5 bg-[var(--red)] text-[var(--chalk)] hover:bg-transparent hover:text-[var(--red)] transition-colors font-bold"
                >
                  LIVE DEMO ON BOARD ↗
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Previous / Next Project Spread Navigation */}
        <div className="pt-12 border-t border-[var(--rule-light)] flex flex-col sm:flex-row justify-between items-center gap-4 font-mono text-xs">
          {prevProject ? (
            <PassLink
              href={`/projects/${prevProject.slug}`}
              data-cursor="OPEN"
              className="text-[var(--night)] hover:text-[var(--red)] transition-colors uppercase tracking-wider"
            >
              ← {prevProject.title}
            </PassLink>
          ) : (
            <span className="text-[var(--muted-light)]">FIRST SPREAD</span>
          )}

          <PassLink
            href="/projects"
            className="text-[var(--muted-light)] hover:text-[var(--night)] uppercase tracking-widest text-[11px]"
          >
            PROGRAMME INDEX
          </PassLink>

          {nextProject ? (
            <PassLink
              href={`/projects/${nextProject.slug}`}
              data-cursor="OPEN"
              className="text-[var(--night)] hover:text-[var(--red)] transition-colors uppercase tracking-wider text-right"
            >
              {nextProject.title} →
            </PassLink>
          ) : (
            <span className="text-[var(--muted-light)]">LAST SPREAD</span>
          )}
        </div>
      </div>
    </div>
  );
}
