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

export default function Rail() {
  const pathname = usePathname();
  const router = useRouter();
  const { lenis } = useSmoothScroll();
  const [timeStr, setTimeStr] = useState<string>("BLR --:--");
  const [isHovered, setIsHovered] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    setTimeStr(getBengaluruTime());
    const interval = setInterval(() => {
      setTimeStr(getBengaluruTime());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Track active section on home page
  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );

    const sections = ["about", "contact"].map((id) => document.getElementById(id)).filter(Boolean);
    sections.forEach((sec) => observer.observe(sec!));

    return () => observer.disconnect();
  }, [pathname]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, hash: string | null) => {
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

  const isItemActive = (item: typeof navItems[0]) => {
    if (item.hash) {
      return pathname === "/" && activeSection === item.hash.replace("#", "");
    }
    if (item.href === "/projects") {
      return pathname.startsWith("/projects");
    }
    return pathname === item.href;
  };

  return (
    <aside
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="hidden lg:flex fixed top-0 left-0 bottom-0 z-40 flex-col justify-between border-r border-[var(--rule)] bg-[var(--bg)] transition-[width] duration-200 ease-linear overflow-hidden"
      style={{
        width: isHovered ? "200px" : "var(--rail-w)",
      }}
      aria-label="Sidebar Navigation"
    >
      {/* Top: Mark AY */}
      <div className="h-16 flex items-center px-6">
        <Link
          href="/"
          className="font-display font-bold text-xl tracking-tight text-[var(--fg)] hover:opacity-80"
          data-cursor="Home"
          aria-label="Home"
        >
          AY
        </Link>
      </div>

      {/* Middle: Index List */}
      <nav className="flex flex-col py-4">
        {navItems.map((item) => {
          const active = isItemActive(item);
          return (
            <Link
              key={item.num}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href, item.hash)}
              className={`relative flex items-center h-9 px-6 font-mono text-[11px] tracking-wider transition-colors duration-150 ${
                active ? "text-[var(--fg)] font-medium" : "text-[var(--muted)] hover:text-[var(--fg)]"
              }`}
              data-cursor={item.label}
            >
              {/* Active left 1px marker */}
              {active && (
                <span
                  className="absolute left-0 top-0 bottom-0 w-[1px] bg-[var(--fg)]"
                  aria-hidden="true"
                />
              )}
              <span className="w-6 shrink-0">{item.num}</span>
              <span
                className={`ml-2 whitespace-nowrap transition-opacity duration-150 ${
                  isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom: Bengaluru Time (no blinking colon) */}
      <div className="p-6 font-mono text-[10px] uppercase tracking-wider text-[var(--muted)] whitespace-nowrap">
        {isHovered ? (
          <span>{timeStr}</span>
        ) : (
          <span>{timeStr.replace("BLR ", "")}</span>
        )}
      </div>
    </aside>
  );
}
