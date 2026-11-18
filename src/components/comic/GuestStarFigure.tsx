"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { GuestStar } from "@/data/comic";

export interface GuestStarFigureProps {
  star: GuestStar;
  className?: string;
}

export function GuestStarFigure({ star, className = "" }: GuestStarFigureProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);
  }, []);

  // Play once when scrolled into view
  useEffect(() => {
    if (reducedMotion || star.kind !== "sprite" || hasPlayedOnce || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasPlayedOnce) {
            setIsPlaying(true);
            setHasPlayedOnce(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [reducedMotion, star.kind, hasPlayedOnce]);

  const handleMouseEnter = () => {
    if (reducedMotion || star.kind !== "sprite") return;
    // Replay once on hover
    setIsPlaying(false);
    requestAnimationFrame(() => {
      setIsPlaying(true);
    });
  };

  const handleAnimationEnd = () => {
    setIsPlaying(false);
  };

  if (star.kind === "static") {
    return (
      <figure
        ref={containerRef}
        className={`border-2 border-[var(--ink)] bg-[var(--paper)] p-3 shadow-comic-sm ${className}`}
      >
        <div className="relative aspect-square w-full border border-[var(--ink)] bg-[var(--yellow)]/20 overflow-hidden">
          <Image
            src={star.src}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 300px"
            className="object-contain"
          />
        </div>
        <figcaption className="mt-2 space-y-1">
          <div className="font-mono text-[10px] uppercase font-bold text-[var(--ink-muted)]">
            {star.tag}
          </div>
          <div className="font-[family-name:var(--font-letter)] text-xs text-[var(--ink)] leading-snug">
            {star.caption}
          </div>
        </figcaption>
      </figure>
    );
  }

  // Sprite Kind
  const sprite = star.sprite || { frames: 8, frameWidth: 64, frameHeight: 64 };
  const durationSec = sprite.frames / 12; // 12fps on twos

  return (
    <figure
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      className={`border-2 border-[var(--ink)] bg-[var(--paper)] p-3 shadow-comic-sm select-none ${className}`}
    >
      <div
        className="mx-auto overflow-hidden border border-[var(--ink)] bg-[var(--cyan)]/20 flex items-center justify-center"
        style={{
          width: `${sprite.frameWidth}px`,
          height: `${sprite.frameHeight}px`,
        }}
      >
        <div
          onAnimationEnd={handleAnimationEnd}
          style={{
            width: `${sprite.frameWidth * sprite.frames}px`,
            height: `${sprite.frameHeight}px`,
            backgroundImage: `url(${star.src})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "0 0",
            animation:
              isPlaying && !reducedMotion
                ? `spriteStep ${durationSec}s steps(${sprite.frames - 1}) 1 forwards`
                : "none",
          }}
        />
      </div>

      <figcaption className="mt-2 space-y-1 text-center">
        <div className="font-mono text-[10px] uppercase font-bold text-[var(--ink-muted)]">
          {star.tag}
        </div>
        <div className="font-[family-name:var(--font-letter)] text-xs text-[var(--ink)] leading-snug">
          {star.caption}
        </div>
      </figcaption>

      <style jsx>{`
        @keyframes spriteStep {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-${sprite.frameWidth * (sprite.frames - 1)}px);
          }
        }
      `}</style>
    </figure>
  );
}
