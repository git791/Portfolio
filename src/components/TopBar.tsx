"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSmoothScroll } from "@/context/SmoothScrollContext";

const navItems = [
  { num: "01", label: "ABOUT", href: "/#about", hash: "#about" },
  { num: "02", label: "WORK", href: "/projects", hash: null },
  { num: "03", label: "SKILLS", href: "/skills", hash: null },
  { num: "04", label: "HACKATHONS", href: "/hackathons", hash: null },
  { num: "05", label: "CERTS", href: "/certifications", hash: null },
  { num: "06", label: "CONTACT", href: "/#contact", hash: "#contact" },
];

function getBengaluruTime(): string {
  try {
    const formatter = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    return `BLR ${formatter.format(new Date())}`;
  } catch {
    return "BLR --:--";
  }
}

export default function TopBar() {
  const pathname = usePathname();
  const router = useRouter();
  const { lenis } = useSmoothScroll();
  const [isOpen, setIsOpen] = useState(false);
  const [timeStr, setTimeStr] = useState<string>("BLR --:--");

  useEffect(() => {
    setTimeStr(getBengaluruTime());
    const interval = setInterval(() => {
      setTimeStr(getBengaluruTime());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Prevent background scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, hash: string | null) => {
    setIsOpen(false);
    if (hash) {
      if (pathname === "/") {
        e.preventDefault();
        const target = document.querySelector(hash);
        if (target) {
          if (lenis) {
            lenis.scrollTo(target as HTMLElement, { offset: 0 });
          } else {
            target.scrollIntoView({ behavior: "smooth" });
          }
        }
      } else {
        e.preventDefault();
        router.push(href);
      }
    }
  };

  return (
    <>
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 h-14 bg-[var(--bg)] border-b border-[var(--rule)] flex items-center justify-between px-6">
        <Link
          href="/"
          className="font-display font-bold text-lg tracking-tight text-[var(--fg)]"
          aria-label="Home"
        >
          AY
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="font-mono text-xs uppercase tracking-wider text-[var(--fg)] px-3 py-1 border border-[var(--rule)] rounded-[var(--radius)]"
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? "CLOSE" : "INDEX"}
        </button>
      </header>

      {/* Full-screen mobile overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-[var(--bg)] pt-20 px-8 pb-8 flex flex-col justify-between"
          role="dialog"
          aria-modal="true"
        >
          <nav className="flex flex-col gap-6 pt-4">
            {navItems.map((item) => {
              const active = item.hash
                ? pathname === "/"
                : pathname === item.href;

              return (
                <Link
                  key={item.num}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href, item.hash)}
                  className={`flex items-baseline gap-4 font-mono text-lg tracking-wider ${
                    active ? "text-[var(--fg)] font-semibold" : "text-[var(--muted)]"
                  }`}
                >
                  <span className="text-xs text-[var(--muted)]">{item.num}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="font-mono text-xs uppercase tracking-wider text-[var(--muted)] border-t border-[var(--rule)] pt-6">
            <span>{timeStr}</span>
          </div>
        </div>
      )}
    </>
  );
}
