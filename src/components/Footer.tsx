import { fanNote } from "@/data/football";
import { personalInfo } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="surface-night border-t border-[var(--rule)] py-8 px-6 lg:px-12 text-[var(--chalk)]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1">
          <p className="font-mono text-xs uppercase tracking-wider text-[var(--chalk)]">
            {personalInfo.name} · B.TECH CSE 2028 · BENGALURU
          </p>
          <p className="font-mono text-[11px] text-[var(--muted)]">
            {fanNote}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 font-mono text-xs uppercase tracking-wider">
          <a
            href={personalInfo.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--chalk)] hover:underline focus-visible:underline"
          >
            GitHub
          </a>
          <a
            href={personalInfo.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--chalk)] hover:underline focus-visible:underline"
          >
            LinkedIn
          </a>
          <a
            href={personalInfo.social.x}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--chalk)] hover:underline focus-visible:underline"
          >
            X
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="text-[var(--chalk)] hover:underline focus-visible:underline"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
