"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSmoothScroll } from "@/context/SmoothScrollContext";
import PassLink from "@/components/ui/PassLink";

interface NavItem {
  number: string;
  label: string;
  href: string;
  isHash?: boolean;
}

const navItems: NavItem[] = [
  { number: "01", label: "About", href: "/#about", isHash: true },
  { number: "02", label: "Work", href: "/#work", isHash: true },
  { number: "03", label: "Skills", href: "/skills" },
  { number: "04", label: "Fixtures", href: "/hackathons" },
  { number: "05", label: "Honours", href: "/certifications" },
  { number: "06", label: "Contact", href: "/#contact", isHash: true },
];

export default function Shell() {
  const pathname = usePathname();
  const router = useRouter();
  const { lenis } = useSmoothScroll();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [blrTime, setBlrTime] = useState<string>("");

  // Asia/Kolkata clock updating once per minute (no blinking)
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatted = new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(now);
        setBlrTime(`BLR ${formatted}`);
      } catch {
        setBlrTime("BLR --:--");
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleNavClick = (e: React.MouseEvent, item: NavItem) => {
    setMobileMenuOpen(false);

    if (item.isHash) {
      const hash = item.href.replace("/", ""); // "#about"
      if (pathname === "/") {
        e.preventDefault();
        const target = document.querySelector(hash);
        if (target) {
          if (lenis) {
            lenis.scrollTo(target as HTMLElement, { offset: 0, duration: 1.2 });
          } else {
            target.scrollIntoView({ behavior: "smooth" });
          }
        }
      } else {
        // Navigate to home with hash
        router.push(item.href);
      }
    }
  };

  const isCurrentActive = (item: NavItem) => {
    if (pathname === item.href) return true;
    if (item.href === "/#about" && pathname === "/") return true;
    return false;
  };

  return (
    <>
      {/* DESKTOP LEFT RAIL (>=1024px) */}
      <aside
        aria-label="Desktop Navigation Rail"
        className="hidden lg:flex fixed top-0 left-0 h-screen z-40 transition-all duration-300 ease-out group/rail w-[72px] hover:w-[200px] focus-within:w-[200px] surface-night border-r border-[var(--rule)] flex-col justify-between p-4 mix-blend-difference select-none"
      >
        {/* Top Mark */}
        <div className="flex flex-col items-center group-hover/rail:items-start group-focus-within/rail:items-start pt-2">
          <PassLink
            href="/"
            className="font-stencil text-2xl font-black tracking-tight text-[var(--chalk)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current"
            aria-label="Home · AY"
          >
            AY
          </PassLink>
        </div>

        {/* Center Nav Items */}
        <nav aria-label="Main Navigation" className="flex flex-col gap-5 my-auto">
          {navItems.map((item) => {
            const active = isCurrentActive(item);
            return (
              <a
                key={item.number}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                className={`flex items-center gap-3 font-mono text-xs uppercase tracking-wider transition-colors duration-150 py-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-current ${
                  active
                    ? "text-[var(--red)] font-semibold"
                    : "text-[var(--chalk)] hover:text-[var(--red)]"
                }`}
              >
                <span className="text-[11px] opacity-75">{item.number}</span>
                <span className="hidden group-hover/rail:inline group-focus-within/rail:inline whitespace-nowrap">
                  {item.label}
                </span>
              </a>
            );
          })}
        </nav>

        {/* Bottom Clock */}
        <div className="flex flex-col items-center group-hover/rail:items-start group-focus-within/rail:items-start pb-2">
          <span className="font-mono text-[10px] tracking-widest text-[var(--muted)] whitespace-nowrap">
            {blrTime}
          </span>
        </div>
      </aside>

      {/* MOBILE TOP BAR (<1024px) */}
      <header
        aria-label="Mobile Navigation Bar"
        className="lg:hidden fixed top-0 left-0 right-0 h-14 z-40 surface-night border-b border-[var(--rule)] px-4 flex items-center justify-between"
      >
        <PassLink
          href="/"
          className="font-stencil text-xl font-black tracking-tight text-[var(--chalk)]"
          aria-label="Home · AY"
        >
          AY
        </PassLink>

        <div className="flex items-center gap-4">
          <span className="font-mono text-[11px] tracking-wider text-[var(--muted)]">
            {blrTime}
          </span>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            className="font-mono text-xs uppercase tracking-wider border border-[var(--chalk)] px-2.5 py-1 text-[var(--chalk)]"
          >
            {mobileMenuOpen ? "CLOSE" : "INDEX"}
          </button>
        </div>
      </header>

      {/* MOBILE FULL-SCREEN MENU OVERLAY */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Site Index"
          className="lg:hidden fixed inset-0 z-50 surface-night p-6 pt-20 flex flex-col justify-between"
        >
          <div className="flex justify-between items-center pb-6 border-b border-[var(--rule)]">
            <span className="font-mono text-xs text-[var(--muted)] tracking-wider">
              MATCHDAY INDEX
            </span>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="font-mono text-xs uppercase tracking-wider border border-[var(--chalk)] px-3 py-1"
            >
              CLOSE
            </button>
          </div>

          <nav className="flex flex-col gap-6 my-auto">
            {navItems.map((item) => (
              <a
                key={item.number}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                className="flex items-center gap-4 text-display-m text-[var(--chalk)] hover:text-[var(--red)] transition-colors py-1"
              >
                <span className="font-mono text-sm text-[var(--muted)]">
                  {item.number}
                </span>
                <span>{item.label}</span>
              </a>
            ))}
          </nav>

          <div className="pt-6 border-t border-[var(--rule)] flex justify-between items-center text-xs font-mono text-[var(--muted)]">
            <span>BENGALURU · 2026</span>
            <span>{blrTime}</span>
          </div>
        </div>
      )}
    </>
  );
}
