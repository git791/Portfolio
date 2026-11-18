"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface PageTurnProps {
  children: React.ReactNode;
}

export default function PageTurn({ children }: PageTurnProps) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const leafRef = useRef<HTMLDivElement>(null);

  const [isDesktop, setIsDesktop] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);

    const checkDesk = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesk();
    window.addEventListener("resize", checkDesk);

    return () => {
      window.removeEventListener("resize", checkDesk);
    };
  }, []);

  useEffect(() => {
    if (!isDesktop || reducedMotion || !triggerRef.current || !leafRef.current) return;

    const ctx = gsap.context(() => {
      // 8 stepped frames (on twos) rotating about the left edge
      gsap.fromTo(
        leafRef.current,
        { rotateY: 0 },
        {
          rotateY: -100,
          ease: "steps(8)",
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "bottom bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, triggerRef);

    return () => ctx.revert();
  }, [isDesktop, reducedMotion]);

  if (!isDesktop || reducedMotion) {
    return <div className="relative w-full">{children}</div>;
  }

  return (
    <div ref={triggerRef} className="relative w-full overflow-hidden" style={{ perspective: "2000px" }}>
      <div
        ref={leafRef}
        style={{
          transformOrigin: "left center",
          transformStyle: "preserve-3d",
        }}
        className="w-full relative z-10"
      >
        <div style={{ backfaceVisibility: "hidden" }} className="w-full">
          {children}
        </div>
        {/* Flat paper back face */}
        <div
          aria-hidden="true"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
          }}
          className="absolute inset-0 bg-[var(--paper)] border-r-[3px] border-[var(--ink)] pointer-events-none"
        />
      </div>
    </div>
  );
}
