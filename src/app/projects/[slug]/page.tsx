import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { projects } from "@/lib/data";
import { Panel } from "@/components/comic/Panel";
import { CaptionBox } from "@/components/comic/CaptionBox";
import { Chip } from "@/components/comic/Chip";
import { CreditsBox } from "@/components/comic/CreditsBox";
import { DotField } from "@/components/comic/DotField";
import { Balloon } from "@/components/comic/Balloon";

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
    title: `${project.title} | Mohammed Ayaan`,
    description: project.problem || project.description,
  };
}

export default async function ProjectSpreadPage({
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

  const isBizBoost = project.slug === "bizboost-ai";
  const hasImage = Boolean(project.image);
  const repoFacts = project.repoFacts;

  return (
    <main className="min-h-screen py-16 bg-[var(--paper)] text-[var(--ink)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Top Breadcrumb & Issue Nav */}
        <div className="border-b-[3px] border-[var(--ink)] pb-4 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/projects"
            data-cursor="BACK"
            data-sfx="PAGE!"
            className="font-mono text-xs uppercase font-bold px-3 py-1.5 border-2 border-[var(--ink)] bg-[var(--paper)] hover:bg-[var(--yellow)] shadow-comic-sm transition-colors"
          >
            ← THE COLLECTION
          </Link>

          <div className="flex items-center gap-2">
            <CaptionBox variant="label" bg="yellow" shadow="sm">
              SPREAD #{String(index + 1).padStart(2, "0")} · {project.tier.toUpperCase()}
            </CaptionBox>
            <span className="font-mono text-xs font-bold text-[var(--ink-muted)]">
              {project.year}
            </span>
          </div>
        </div>

        {/* Large Splash Panel: Image Plate or Typographic Plate */}
        <div className="relative">
          <Panel
            field="cyan"
            shadow="lg"
            className="w-full aspect-[16/9] sm:aspect-[21/9] p-2 relative overflow-hidden border-[3px]"
          >
            {hasImage ? (
              <div className="relative w-full h-full bg-[var(--cyan)] border-2 border-[var(--ink)] overflow-hidden">
                <Image
                  src={project.image!}
                  alt={project.title}
                  fill
                  priority
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  className="object-cover grayscale contrast-125 mix-blend-multiply"
                />
                <DotField opacity={0.18} color="var(--ink)" cellSize={8} />
              </div>
            ) : (
              <div className="w-full h-full p-6 sm:p-12 border-2 border-[var(--ink)] bg-[var(--yellow)] flex flex-col justify-between relative overflow-hidden">
                <DotField opacity={0.12} color="var(--ink)" cellSize={8} />
                <div className="relative z-10 font-mono text-xs sm:text-sm uppercase tracking-widest font-bold text-[var(--ink-muted)]">
                  TYPOGRAPHIC PLATE · {project.category}
                </div>
                <div className="relative z-10 font-display text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-[var(--ink)] leading-none my-auto">
                  {project.title}
                </div>
                <div className="relative z-10 font-mono text-xs sm:text-sm text-[var(--ink-muted)] font-bold">
                  GIT791 // {project.slug.toUpperCase()}
                </div>
              </div>
            )}
          </Panel>
        </div>

        {/* BizBoost AI Speech Balloon (if BizBoost) */}
        {isBizBoost && (
          <div className="flex flex-wrap items-center gap-4">
            <Balloon tailPosition="bottom-left">
              <span
                lang="hi"
                className="font-[family-name:var(--font-deva)] text-2xl font-bold text-[var(--ink)] block"
              >
                बोल के बेचो
              </span>
            </Balloon>
            <CaptionBox variant="body" shadow="sm" bg="yellow" className="text-sm font-bold py-2 px-4">
              Speak it. Sell it.
            </CaptionBox>
          </div>
        )}

        {/* Title, Chips, and Problem Statement */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Chip variant="mvp" />
            {project.liveUrl && <Chip variant="live" />}
            <span className="font-mono text-xs font-bold px-2 py-0.5 border-2 border-[var(--ink)] bg-[var(--paper)] text-[var(--ink)]">
              {project.role}
            </span>
            <span className="font-mono text-xs font-bold px-2 py-0.5 border-2 border-[var(--ink)] bg-[var(--paper)] text-[var(--ink)]">
              {project.year}
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl uppercase tracking-tight text-[var(--ink)] leading-tight">
            {project.title}
          </h1>

          <div className="border-2 border-[var(--ink)] bg-[var(--paper)] p-4 shadow-comic-sm">
            <div className="font-mono text-[10px] uppercase font-bold text-[var(--ink-muted)] mb-1">
              MISSION / PROBLEM STATEMENT
            </div>
            <p className="font-[family-name:var(--font-body)] text-base sm:text-lg text-[var(--ink)] leading-relaxed">
              {project.problem}
            </p>
          </div>
        </div>

        {/* Credits Box */}
        <div className="max-w-md">
          <CreditsBox
            project={{ role: project.role, team: project.team }}
            leadName="Ayaan"
          />
        </div>

        {/* Overview & Stack Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Overview */}
          {project.description && (
            <div className="lg:col-span-7 space-y-3">
              <CaptionBox variant="label" bg="yellow" shadow="sm">
                PROJECT OVERVIEW
              </CaptionBox>
              <CaptionBox variant="body" bg="paper" shadow="base" className="p-5 text-sm sm:text-base leading-relaxed border-2">
                {project.description}
              </CaptionBox>
            </div>
          )}

          {/* Stack & Links */}
          <div className={`space-y-6 ${project.description ? "lg:col-span-5" : "lg:col-span-12"}`}>
            {project.tags && project.tags.length > 0 && (
              <div className="space-y-3">
                <CaptionBox variant="label" bg="paper" shadow="sm">
                  STACK & TOOLING
                </CaptionBox>
                <div className="border-2 border-[var(--ink)] bg-[var(--paper)] p-4 shadow-comic-sm flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-xs font-bold px-2.5 py-1 border border-[var(--ink)] bg-[var(--yellow)]/30 text-[var(--ink)]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* External Links */}
            <div className="space-y-3">
              <CaptionBox variant="label" bg="paper" shadow="sm">
                ACCESS REPOSITORY
              </CaptionBox>
              <div className="flex flex-wrap gap-3">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="VISIT"
                    data-sfx="ZIP!"
                    className="font-mono text-xs uppercase font-bold px-4 py-2 border-2 border-[var(--ink)] bg-[var(--paper)] hover:bg-[var(--yellow)] shadow-comic-sm transition-colors"
                  >
                    GITHUB REPOSITORY ↗
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="LAUNCH"
                    data-sfx="POP!"
                    className="font-mono text-xs uppercase font-bold px-4 py-2 border-2 border-[var(--ink)] bg-[var(--cyan)] hover:bg-[var(--cyan)]/80 shadow-comic-sm transition-colors"
                  >
                    LIVE APPLICATION ↗
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Repo Facts (renders only if data exists) */}
        {repoFacts && (
          <div className="space-y-3">
            <CaptionBox variant="label" bg="yellow" shadow="sm">
              REPOSITORY TELEMETRY & FACTS
            </CaptionBox>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="border-2 border-[var(--ink)] bg-[var(--paper)] p-3 text-center shadow-comic-sm">
                <div className="font-display text-2xl sm:text-3xl text-[var(--ink)]">
                  {repoFacts.commits}
                </div>
                <div className="font-mono text-[10px] uppercase font-bold text-[var(--ink-muted)] mt-1">
                  COMMITS
                </div>
              </div>

              <div className="border-2 border-[var(--ink)] bg-[var(--paper)] p-3 text-center shadow-comic-sm">
                <div className="font-mono text-xs sm:text-sm font-bold text-[var(--ink)] truncate">
                  {repoFacts.first} → {repoFacts.last}
                </div>
                <div className="font-mono text-[10px] uppercase font-bold text-[var(--ink-muted)] mt-1">
                  TIMELINE
                </div>
              </div>

              <div className="border-2 border-[var(--ink)] bg-[var(--paper)] p-3 text-center shadow-comic-sm">
                <div className="font-display text-2xl sm:text-3xl text-[var(--ink)]">
                  ~{repoFacts.approxLoc}
                </div>
                <div className="font-mono text-[10px] uppercase font-bold text-[var(--ink-muted)] mt-1">
                  LINES OF CODE
                </div>
              </div>

              <div className="border-2 border-[var(--ink)] bg-[var(--paper)] p-3 text-center shadow-comic-sm">
                <div className="font-display text-2xl sm:text-3xl text-[var(--ink)]">
                  {repoFacts.tests}
                </div>
                <div className="font-mono text-[10px] uppercase font-bold text-[var(--ink-muted)] mt-1">
                  AUTOMATED TESTS
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Next / Prev Navigation */}
        <div className="border-t-[3px] border-[var(--ink)] pt-6 flex flex-wrap items-center justify-between gap-4 font-mono text-xs uppercase font-bold">
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.slug}`}
              data-cursor="PREV"
              data-sfx="PAGE!"
              className="px-4 py-2 border-2 border-[var(--ink)] bg-[var(--paper)] hover:bg-[var(--yellow)] shadow-comic-sm transition-colors"
            >
              ← PREV: {prevProject.title}
            </Link>
          ) : (
            <span className="text-[var(--ink-muted)]">FIRST ISSUE IN ARCHIVE</span>
          )}

          {nextProject ? (
            <Link
              href={`/projects/${nextProject.slug}`}
              data-cursor="NEXT"
              data-sfx="PAGE!"
              className="px-4 py-2 border-2 border-[var(--ink)] bg-[var(--paper)] hover:bg-[var(--yellow)] shadow-comic-sm transition-colors"
            >
              NEXT ISSUE: {nextProject.title} →
            </Link>
          ) : (
            <span className="text-[var(--ink-muted)]">LATEST ISSUE IN ARCHIVE</span>
          )}
        </div>
      </div>
    </main>
  );
}
