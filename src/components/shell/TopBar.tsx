"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useSmoothScroll } from "@/context/SmoothScrollContext";
import { markSrc } from "@/data/comic";

export default function TopBar() {
  const pathname = usePathname();
  const router = useRouter();
  const { lenis } = useSmoothScroll();

  const [timeStr, setTimeStr] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState<string>("");

  // Bengaluru clock in Asia/Kolkata timezone (HH:MM, no blinking colon)
  useEffect(() => {
    setActiveHash(window.location.hash);
    const handleHash = () => setActiveHash(window.location.hash);
    window.addEventListener("hashchange", handleHash);

    const updateTime = () => {
      try {
        const formatter = new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
        setTimeStr(formatter.format(new Date()));
      } catch {
        setTimeStr("12:00");
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 10000); // Check every 10s for accuracy
    return () => {
      window.removeEventListener("hashchange", handleHash);
      clearInterval(interval);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, hashId?: string) => {
    if (hashId) {
      e.preventDefault();
      setActiveHash(`#${hashId}`);
      setMobileMenuOpen(false);
      if (pathname === "/") {
        if (lenis) {
          lenis.scrollTo(`#${hashId}`);
        } else {
          const el = document.getElementById(hashId);
          el?.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        router.push(`/#${hashId}`);
      }
      return;
    }
    setMobileMenuOpen(false);
  };

  const navItems = [
    { label: "ABOUT", href: "/#about", hash: "about" },
    { label: "WORK", href: pathname === "/" ? "/#work" : "/projects", hash: pathname === "/" ? "work" : undefined },
    { label: "SKILLS", href: "/skills" },
    { label: "CROSSOVERS", href: "/hackathons" },
    { label: "COLLECTED", href: "/certifications" },
    { label: "CONTACT", href: "/#contact", hash: "contact" },
  ];

  return (
    <>
      <header className="sticky top-0 left-0 right-0 z-40 bg-[var(--paper)] border-b-[3px] border-[var(--ink)] select-none">
        <div className="max-w-7xl mx-auto px-4 h-12 flex items-center justify-between">
          {/* Left: Franchise Mark + ISSUE #1 */}
          <Link
            href="/"
            className="flex items-center gap-2.5 font-display text-lg uppercase tracking-wider text-[var(--ink)] hover:text-[var(--cyan)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--ink)]"
            data-cursor="COVER"
          >
            {markSrc && (
              <div className="relative h-7 w-12 overflow-hidden border border-[var(--ink)] shadow-[1px_1px_0px_var(--ink)] bg-[var(--paper)]">
                <Image
                  src={markSrc}
                  alt="Franchise Mark"
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <span>ISSUE #1</span>
          </Link>

          {/* Desktop Center: Comic Tabs */}
          <nav className="hidden md:flex items-center gap-1 font-mono text-xs uppercase tracking-wider">
            {navItems.map((item) => {
              const isCurrent =
                item.href === pathname ||
                (Boolean(item.hash) && pathname === "/" && activeHash === `#${item.hash}`);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href, item.hash)}
                  data-cursor="OPEN"
                  className={`px-3 py-1 border-b-2 font-bold transition-colors ${
                    isCurrent
                      ? "border-[var(--ink)] bg-[var(--yellow)] text-[var(--ink)] shadow-[2px_2px_0px_var(--ink)]"
                      : "border-transparent text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[var(--rule)]/30"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right: Bengaluru Clock & Mobile Contents button */}
          <div className="flex items-center gap-3">
            <div
              className="font-mono text-xs font-bold text-[var(--ink)] tracking-wider px-2 py-0.5 border border-[var(--ink)] bg-[var(--paper)]"
              title="Bengaluru Time (Asia/Kolkata)"
            >
              <span className="text-[10px] text-[var(--ink-muted)] mr-1">BLR</span>
              <span>{timeStr || "--:--"}</span>
            </div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden font-mono text-xs uppercase font-bold px-2 py-0.5 border-2 border-[var(--ink)] bg-[var(--yellow)] text-[var(--ink)] shadow-[2px_2px_0px_var(--ink)]"
              aria-label="Open Table of Contents"
            >
              CONTENTS
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Contents Dialog */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[var(--paper)] p-6 flex flex-col justify-between overflow-y-auto"
        >
          <div className="flex justify-between items-center border-b-4 border-[var(--ink)] pb-4">
            <span className="font-display text-2xl uppercase">TABLE OF CONTENTS</span>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="font-mono text-sm uppercase font-bold px-3 py-1 border-2 border-[var(--ink)] bg-[var(--yellow)] text-[var(--ink)] shadow-comic-sm"
            >
              [CLOSE]
            </button>
          </div>

          <div className="my-auto py-8 space-y-4">
            {navItems.map((item, idx) => (
              <div key={item.label} className="border-b border-[var(--rule)] pb-2">
                <Link
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href, item.hash)}
                  className="font-display text-2xl sm:text-3xl uppercase tracking-wide flex items-center justify-between text-[var(--ink)] hover:text-[var(--cyan)]"
                >
                  <span>{item.label}</span>
                  <span className="font-mono text-xs text-[var(--ink-muted)]">ENTRY 0{idx + 1}</span>
                </Link>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t-2 border-[var(--ink)] text-center font-mono text-xs text-[var(--ink-muted)]">
            MOHAMMED AYAAN · BENGALURU · ISSUE #1
          </div>
        </div>
      )}
    </>
  );
}
