"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { guestStars, markSrc, fanNote } from "@/data/comic";

export default function Footer() {
  const pathname = usePathname();

  // Route order to tiny page number
  const pageMap: Record<string, string> = {
    "/": "PAGE 01",
    "/projects": "PAGE 02",
    "/skills": "PAGE 03",
    "/hackathons": "PAGE 04",
    "/certifications": "PAGE 05",
    "/experience": "PAGE 06",
  };

  const pageNum = pageMap[pathname] || (pathname.startsWith("/projects/") ? "CASE SPREAD" : "PAGE 01");

  // Render fanNote ONLY if any franchise asset exists
  const hasFranchiseAsset = guestStars.length > 0 || Boolean(markSrc);

  return (
    <footer className="border-t-[3px] border-[var(--ink)] bg-[var(--paper)] text-[var(--ink)] py-8 px-4 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs uppercase tracking-wider">
        {/* Left: Metadata & Links */}
        <div className="flex flex-wrap items-center gap-4 text-[var(--ink-muted)]">
          <Link href="/" className="hover:text-[var(--ink)] font-bold">
            ISSUE #1
          </Link>
          <span>·</span>
          <Link href="/projects" className="hover:text-[var(--ink)]">
            COLLECTION
          </Link>
          <span>·</span>
          <Link href="/skills" className="hover:text-[var(--ink)]">
            CHARACTER SHEET
          </Link>
          <span>·</span>
          <Link href="/hackathons" className="hover:text-[var(--ink)]">
            CROSSOVERS
          </Link>
          <span>·</span>
          <Link href="/certifications" className="hover:text-[var(--ink)]">
            COLLECTED
          </Link>
        </div>

        {/* Right: Tiny Page Number */}
        <div className="flex items-center gap-4">
          <div className="border border-[var(--ink)] px-2 py-0.5 bg-[var(--yellow)] font-bold text-[var(--ink)] shadow-[2px_2px_0px_var(--ink)] text-[11px]">
            {pageNum}
          </div>
          <span className="text-[var(--ink-muted)] text-[11px]">
            © {new Date().getFullYear()} MOHAMMED AYAAN
          </span>
        </div>
      </div>

      {/* Fan note: ONLY when franchise asset is present */}
      {hasFranchiseAsset && (
        <div className="max-w-7xl mx-auto mt-4 pt-3 border-t border-[var(--rule)] text-center font-mono text-[10px] text-[var(--ink-muted)]">
          {fanNote}
        </div>
      )}
    </footer>
  );
}
