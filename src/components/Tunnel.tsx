"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

export default function Tunnel() {
  const [show, setShow] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const stubRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip if reduced motion is preferred
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      return;
    }

    // Skip if already seen in this session
    try {
      const seen = sessionStorage.getItem("mosaic_tunnel_seen");
      if (seen) {
        return;
      }
    } catch {
      // ignore storage access error
    }

    setShow(true);
  }, []);

  useEffect(() => {
    if (!show || !containerRef.current) return;

    const container = containerRef.current;
    const stub = stubRef.current;

    // Run opening vertical wipe (max 900ms total)
    const tl = gsap.timeline({
      onComplete: () => {
        try {
          sessionStorage.setItem("mosaic_tunnel_seen", "1");
        } catch {
          // ignore
        }
        setShow(false);
      },
    });

    // Hold stub briefly (300ms), then wipe open vertically (550ms)
    tl.to(stub, {
      opacity: 0.9,
      duration: 0.3,
      ease: "power1.inOut",
    })
      .to(
        container,
        {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 0.55,
          ease: "power2.inOut",
        },
        "+=0.05"
      );

    return () => {
      tl.kill();
    };
  }, [show]);

  if (!show) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
      className="fixed inset-0 z-[100] flex items-center justify-center surface-night pointer-events-none select-none"
    >
      {/* Ticket stub */}
      <div
        ref={stubRef}
        className="border border-[var(--chalk)] px-6 py-4 surface-night text-[var(--chalk)] text-center shadow-none"
      >
        <span className="font-mono text-xs md:text-sm uppercase tracking-[0.14em] font-semibold">
          ADMIT ONE · AYAAN · 2026
        </span>
      </div>
    </div>
  );
}
