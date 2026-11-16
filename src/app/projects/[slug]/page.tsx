import { notFound } from "next/navigation";
import Link from "next/link";
import { projects } from "@/lib/data";
import type { Metadata } from "next";

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
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen px-6 py-24 max-w-4xl mx-auto">
      <Link
        href="/projects"
        className="font-mono text-xs uppercase tracking-wider text-[var(--muted)] hover:text-[var(--fg)] inline-block mb-8"
        data-cursor="Back"
      >
        ← Back to Projects
      </Link>

      <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-xs uppercase tracking-wider px-2 py-0.5 border border-[var(--rule)] text-[var(--muted)]">
          {project.stage.toUpperCase()}
        </span>
        <span className="font-mono text-xs uppercase tracking-wider text-[var(--muted)]">
          {project.year}
        </span>
        <span className="font-mono text-xs uppercase tracking-wider text-[var(--muted)]">
          {project.role}
        </span>
      </div>

      <h1 className="font-display text-4xl sm:text-6xl uppercase tracking-tight text-[var(--fg)] mb-4">
        {project.title}
      </h1>

      <p className="font-mono text-sm text-[var(--muted)] mb-8">
        {project.problem}
      </p>

      <div className="border-t border-[var(--rule)] pt-8">
        <p className="text-[var(--fg)] leading-relaxed">
          {project.description}
        </p>
      </div>
    </main>
  );
}
