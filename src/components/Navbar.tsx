"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { personalInfo } from "@/lib/data";
import { useSmoothScroll } from "@/context/SmoothScrollContext";
import { useRouter } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Education", href: "/#education" },
  { label: "Projects", href: "/projects" },
  { label: "Skills", href: "/skills" },
  { label: "Hackathons", href: "/hackathons" },
  { label: "Certifications", href: "/certifications" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { lenis } = useSmoothScroll();
  const router = useRouter();

  useGSAP(
    () => {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, delay: 1.8, ease: "power4.out" }
      );

      ScrollTrigger.create({
        start: "top -80px",
        end: 99999,
        onEnter: () => {
          gsap.to(navRef.current, {
            backgroundColor: "rgba(245, 242, 238, 0.85)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid var(--color-border)",
            duration: 0.4,
            ease: "power2.out",
          });
        },
        onLeaveBack: () => {
          gsap.to(navRef.current, {
            backgroundColor: "transparent",
            backdropFilter: "blur(0px)",
            borderBottom: "1px solid transparent",
            duration: 0.4,
            ease: "power2.out",
          });
        },
      });
    },
    { scope: navRef }
  );

  useGSAP(
    () => {
      if (!menuRef.current) return;

      if (menuOpen) {
        gsap.fromTo(
          menuRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power4.out" }
        );
        gsap.fromTo(
          ".mobile-nav-link",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.07,
            delay: 0.1,
            ease: "power4.out",
          }
        );
      } else {
        gsap.to(menuRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.3,
          ease: "power2.in",
        });
      }
    },
    { dependencies: [menuOpen] }
  );

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    
    if (href.startsWith("/#")) {
      if (window.location.pathname === "/") {
        // We are on home, smooth scroll
        const targetId = href.replace("/", "");
        const target = document.querySelector(targetId);
        if (target && lenis) {
          lenis.scrollTo(target as HTMLElement, { offset: -80, duration: 1.8 });
        }
      } else {
        // Not on home, navigate to home with hash
        router.push(href);
      }
    } else {
      // Normal route
      router.push(href);
    }
  };

  return (
    <header
      ref={navRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: "1.25rem 0",
        transition: "padding 0.3s ease",
      }}
    >
      <div className="container-main">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <button
            onClick={() => handleNavClick("/#hero")}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.25rem",
              color: "var(--color-ink)",
              background: "none",
              border: "none",
              cursor: "none",
              letterSpacing: "-0.02em",
            }}
          >
            {personalInfo.firstName}
          </button>

          <nav
            style={{
              display: "flex",
              gap: "2.5rem",
              alignItems: "center",
            }}
            className="desktop-nav"
          >
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "none",
                  fontSize: "0.875rem",
                  color: "var(--color-ink-muted)",
                  fontFamily: "var(--font-body)",
                  letterSpacing: "0.02em",
                  transition: "color 0.2s ease",
                  padding: "0.25rem 0",
                  position: "relative",
                }}
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, {
                    color: "var(--color-ink)",
                    duration: 0.2,
                  });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, {
                    color: "var(--color-ink-muted)",
                    duration: 0.2,
                  });
                }}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="mobile-menu-btn"
            style={{
              background: "none",
              border: "none",
              cursor: "none",
              display: "none",
              flexDirection: "column",
              gap: "5px",
              padding: "4px",
            }}
          >
            <span
              style={{
                display: "block",
                width: "24px",
                height: "1.5px",
                backgroundColor: "var(--color-ink)",
                transition: "transform 0.3s ease, opacity 0.3s ease",
                transform: menuOpen
                  ? "translateY(6.5px) rotate(45deg)"
                  : "none",
              }}
            />
            <span
              style={{
                display: "block",
                width: "24px",
                height: "1.5px",
                backgroundColor: "var(--color-ink)",
                transition: "opacity 0.3s ease",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: "block",
                width: "24px",
                height: "1.5px",
                backgroundColor: "var(--color-ink)",
                transition: "transform 0.3s ease, opacity 0.3s ease",
                transform: menuOpen
                  ? "translateY(-6.5px) rotate(-45deg)"
                  : "none",
              }}
            />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          ref={menuRef}
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            backgroundColor: "rgba(245, 242, 238, 0.97)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid var(--color-border)",
            padding: "1.5rem 0",
          }}
        >
          <div className="container-main">
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="mobile-nav-link"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "none",
                    fontSize: "1.5rem",
                    fontFamily: "var(--font-display)",
                    color: "var(--color-ink)",
                    textAlign: "left",
                    padding: "0.25rem 0",
                  }}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </header>
  );
}