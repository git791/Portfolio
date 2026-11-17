"use client";

import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SurfaceWipeProps {
  children: ReactNode;
  className?: string;
  scrub?: boolean;
  direction?: "bottom-to-top" | "top-to-bottom";
  id?: string;
}

export default function SurfaceWipe({
  children,
  className = "",
  scrub = false,
  direction = "bottom-to-top",
  id,
}: SurfaceWipeProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Under reduced motion: no wipes, plain cuts
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !containerRef.current) {
      return;
    }

    const el = containerRef.current;

    // Initial clip state
    const initialClip = direction === "bottom-to-top"
      ? "inset(100% 0% 0% 0%)"
      : "inset(0% 0% 100% 0%)";

    const finalClip = "inset(0% 0% 0% 0%)";

    gsap.set(el, { clipPath: initialClip });

    let st: ScrollTrigger;

    if (scrub) {
      st = ScrollTrigger.create({
        trigger: el,
        start: "top bottom",
        end: "top top",
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          if (direction === "bottom-to-top") {
            const insetBottom = (1 - p) * 100;
            gsap.set(el, { clipPath: `inset(${insetBottom}% 0% 0% 0%)` });
          } else {
            const insetTop = (1 - p) * 100;
            gsap.set(el, { clipPath: `inset(0% 0% ${insetTop}% 0%)` });
          }
        },
      });
    } else {
      st = ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(el, {
            clipPath: finalClip,
            duration: 0.65,
            ease: "power2.out",
          });
        },
      });
    }

    return () => {
      st?.kill();
    };
  }, [scrub, direction]);

  return (
    <div id={id} ref={containerRef} className={`relative ${className}`}>
      {children}
    </div>
  );
}
