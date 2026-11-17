"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CutoutProps {
  src: string;
  tag: string;
  caption: string;
  alt?: string;
  containerClassName?: string;
  imageClassName?: string;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  theme?: "night" | "newsprint" | "turf" | "red";
  orientation?: "row" | "column";
}

export default function Cutout({
  src,
  tag,
  caption,
  alt = "",
  containerClassName = "",
  imageClassName = "",
  width = 120,
  height = 160,
  sizes = "(max-width: 768px) 120px, 160px",
  priority = false,
  theme = "night",
  orientation = "row",
}: CutoutProps) {
  const [imgError, setImgError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Missing cutouts render nothing
    if (imgError || !containerRef.current || !imgWrapRef.current) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;

    // Under reduced motion or touch: static, no clip-path animation, no parallax
    if (prefersReducedMotion || !hasFinePointer) {
      containerRef.current.style.clipPath = "none";
      imgWrapRef.current.style.transform = "none";
      return;
    }

    const container = containerRef.current;
    const imgWrap = imgWrapRef.current;

    // Check if container is already in viewport
    const rect = container.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.88) {
      container.style.clipPath = "none";
    } else {
      gsap.set(container, { clipPath: "inset(100% 0% 0% 0%)" });

      // Cutout step-in: clip-path reveal from bottom in 4 hard steps (steps(4)), once per section, 400ms
      ScrollTrigger.create({
        trigger: container,
        start: "top 88%",
        once: true,
        onEnter: () => {
          gsap.to(container, {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.4,
            ease: "steps(4)",
            onComplete: () => {
              container.style.clipPath = "none";
            },
          });
        },
      });
    }

    // Parallax translateY of at most 12px tied to scroll (scrubbed, no bounce, no fade, no scale)
    const parallaxTrigger = gsap.fromTo(
      imgWrap,
      { y: 12 },
      {
        y: -12,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    return () => {
      parallaxTrigger.scrollTrigger?.kill();
      parallaxTrigger.kill();
    };
  }, [imgError]);

  if (imgError) {
    return null;
  }

  // Theme-specific color classes
  const themeStyles = {
    night: {
      bg: "bg-[#111412]",
      border: "border-[var(--rule)]",
      tag: "text-[var(--red)]",
      caption: "text-[var(--muted)]",
    },
    newsprint: {
      bg: "bg-[#DDD6C3]",
      border: "border-[var(--rule)]",
      tag: "text-[var(--red)]",
      caption: "text-[var(--muted)]",
    },
    turf: {
      bg: "bg-[#14482E]",
      border: "border-[var(--rule)]",
      tag: "text-[var(--chalk)]",
      caption: "text-[var(--muted-turf)]",
    },
    red: {
      bg: "bg-[#111412]",
      border: "border-[var(--chalk)]",
      tag: "text-[var(--red)]",
      caption: "text-[var(--muted-dark)]",
    },
  }[theme];

  return (
    <div
      ref={containerRef}
      className={`relative border ${themeStyles.border} ${themeStyles.bg} p-2 select-none ${containerClassName}`}
    >
      <div
        className={`flex ${
          orientation === "column" ? "flex-col items-center text-center gap-2" : "items-center gap-3"
        }`}
      >
        {/* Parallax Image Wrapper */}
        <div
          ref={imgWrapRef}
          style={{ width: `${width}px`, height: `${height}px` }}
          className={`relative shrink-0 overflow-hidden ${imageClassName}`}
        >
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            className="object-contain object-bottom"
            sizes={sizes}
            onError={() => setImgError(true)}
          />
        </div>

        {/* Caption text */}
        <div className="space-y-0.5">
          <span className={`text-[10px] font-mono font-bold uppercase tracking-wider block ${themeStyles.tag}`}>
            {tag}
          </span>
          <p className={`font-mono text-[10px] leading-tight ${themeStyles.caption}`}>
            {caption}
          </p>
        </div>
      </div>
    </div>
  );
}
