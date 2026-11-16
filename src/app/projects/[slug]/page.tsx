import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { projects } from "@/lib/data";

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
    <main className="min-h-screen py-24 border-t border-[var(--rule)]">
      <div className="container-main max-w-4xl mx-auto">
        {/* Navigation Breadcrumb */}
        <div className="mb-12">
          <Link
            href="/projects"
            className="font-mono text-xs uppercase tracking-widest text-[var(--muted)] hover:text-[var(--fg)] inline-flex items-center gap-2 transition-colors"
            data-cursor="Open"
          >
            <span>←</span>
            <span>ALL PROJECTS LEDGER</span>
          </Link>
        </div>

        {/* Chips Row */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span
            className={`font-mono text-xs uppercase tracking-wider px-2 py-0.5 border ${
              hasLive
                ? "bg-[var(--signal)] text-[var(--bg)] border-[var(--signal)] font-semibold"
                : "border-[var(--rule)] text-[var(--muted)]"
            }`}
          >
            {hasLive ? "LIVE" : project.stage.toUpperCase()}
          </span>

          <span className="font-mono text-xs uppercase tracking-wider px-2 py-0.5 border border-[var(--rule)] text-[var(--muted)]">
            {project.year}
          </span>

          <span className="font-mono text-xs uppercase tracking-wider px-2 py-0.5 border border-[var(--rule)] text-[var(--muted)]">
            {project.role}
          </span>

          <span className="font-mono text-xs uppercase tracking-wider px-2 py-0.5 border border-[var(--rule)] text-[var(--muted)]">
            {project.category}
          </span>

          <span className="font-mono text-xs uppercase tracking-wider px-2 py-0.5 border border-[var(--rule)] text-[var(--muted)]">
            TIER: {project.tier.toUpperCase()}
          </span>
        </div>

        {/* Title */}
        <h1 className="font-display font-bold text-4xl sm:text-6xl uppercase tracking-tight text-[var(--fg)] mb-6">
          {project.title}
        </h1>

        {/* Problem Statement */}
        {project.problem && (
          <div className="border-l-2 border-[var(--rule)] pl-4 py-1 mb-12">
            <p className="font-mono text-sm sm:text-base text-[var(--fg)] leading-relaxed">
              {project.problem}
            </p>
          </div>
        )}

        {/* Optional Image (Only if present, never placeholder) */}
        {hasImage && (
          <div className="mb-12 border border-[var(--rule)] overflow-hidden bg-[#141512]/60">
            <Image
              src={project.image}
              alt={project.title}
              width={1200}
              height={675}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        )}

        {/* Overview Section */}
        {project.description && (
          <div className="py-8 border-t border-[var(--rule)]">
            <h2 className="font-mono text-xs uppercase tracking-widest text-[var(--muted)] mb-4">
              OVERVIEW
            </h2>
            <p className="text-base sm:text-lg text-[var(--fg)] leading-relaxed max-w-3xl">
              {project.description}
            </p>
          </div>
        )}

        {/* Stack Section */}
        {project.tags && project.tags.length > 0 && (
          <div className="py-8 border-t border-[var(--rule)]">
            <h2 className="font-mono text-xs uppercase tracking-widest text-[var(--muted)] mb-4">
              STACK
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-xs px-2.5 py-1 border border-[var(--rule)] text-[var(--muted)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Team and Role Section */}
        {(project.role || (project.team && project.team.length > 0)) && (
          <div className="py-8 border-t border-[var(--rule)]">
            <h2 className="font-mono text-xs uppercase tracking-widest text-[var(--muted)] mb-4">
              TEAM &amp; ROLE
            </h2>
            <div className="flex flex-col gap-2 font-mono text-xs uppercase tracking-wider text-[var(--fg)]">
              <div>
                <span className="text-[var(--muted)]">Role: </span>
                <span>{project.role}</span>
              </div>
              {project.team && project.team.length > 0 && (
                <div>
                  <span className="text-[var(--muted)]">Collaborators: </span>
                  <span>{project.team.join(", ")}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Repo Facts Section (Only if verified data exists) */}
        {project.repoFacts && (
          <div className="py-8 border-t border-[var(--rule)]">
            <h2 className="font-mono text-xs uppercase tracking-widest text-[var(--muted)] mb-4">
              REPO FACTS (VERIFIED GIT HISTORY)
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 p-4 border border-[var(--rule)] bg-[#141512]/40 font-mono text-xs">
              <div>
                <span className="text-[var(--muted)] block mb-1">COMMITS</span>
                <span className="text-[var(--fg)] text-lg font-bold">
                  {project.repoFacts.commits}
                </span>
              </div>
              <div>
                <span className="text-[var(--muted)] block mb-1">FIRST COMMIT</span>
                <span className="text-[var(--fg)]">{project.repoFacts.first}</span>
              </div>
              <div>
                <span className="text-[var(--muted)] block mb-1">LAST COMMIT</span>
                <span className="text-[var(--fg)]">{project.repoFacts.last}</span>
              </div>
              <div>
                <span className="text-[var(--muted)] block mb-1">~LOC</span>
                <span className="text-[var(--fg)] text-lg font-bold">
                  {project.repoFacts.approxLoc.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-[var(--muted)] block mb-1">TESTS</span>
                <span className="text-[var(--fg)] text-lg font-bold">
                  {project.repoFacts.tests}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Links Section */}
        <div className="py-8 border-t border-[var(--rule)]">
          <h2 className="font-mono text-xs uppercase tracking-widest text-[var(--muted)] mb-4">
            LINKS
          </h2>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="Visit"
              className="font-mono text-xs uppercase tracking-wider px-4 py-2 border border-[var(--rule)] text-[var(--fg)] hover:border-[var(--fg)] transition-colors inline-flex items-center gap-2"
            >
              <span>Source Code (GitHub)</span>
              <span>↗</span>
            </a>

            {hasLive && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="Visit"
                className="font-mono text-xs uppercase tracking-wider px-4 py-2 bg-[var(--signal)] text-[var(--bg)] font-semibold hover:opacity-90 transition-opacity inline-flex items-center gap-2"
              >
                <span>Live Demo</span>
                <span>↗</span>
              </a>
            )}
          </div>
        </div>

        {/* Previous / Next Project Navigation */}
        <div className="mt-12 pt-8 border-t border-[var(--rule)] flex items-center justify-between font-mono text-xs uppercase tracking-wider">
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.slug}`}
              data-cursor="Open"
              className="group flex flex-col items-start gap-1 text-[var(--muted)] hover:text-[var(--fg)] transition-colors"
            >
              <span className="text-[10px] text-[var(--muted)]">← PREVIOUS</span>
              <span className="font-display text-sm sm:text-base text-[var(--fg)] group-hover:underline">
                {prevProject.title}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {nextProject ? (
            <Link
              href={`/projects/${nextProject.slug}`}
              data-cursor="Open"
              className="group flex flex-col items-end gap-1 text-[var(--muted)] hover:text-[var(--fg)] transition-colors"
            >
              <span className="text-[10px] text-[var(--muted)]">NEXT →</span>
              <span className="font-display text-sm sm:text-base text-[var(--fg)] group-hover:underline">
                {nextProject.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </main>
  );
}
