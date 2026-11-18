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
  const [frame, setFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);
    if (mql.matches) {
      setIsPlaying(false);
    }
  }, []);

  // Sprite Kind
  const sprite = star.sprite || { frames: 9, frameWidth: 52, frameHeight: 72 };

  // Step through frames at 12fps (83.33ms per frame = classic twos rhythm)
  useEffect(() => {
    if (star.kind !== "sprite" || reducedMotion || (!isPlaying && !isHovered)) return;

    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % sprite.frames);
    }, 1000 / 12);

    return () => clearInterval(interval);
  }, [star.kind, isPlaying, isHovered, reducedMotion, sprite.frames]);

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

  return (
    <figure
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsPlaying((p) => !p)}
      data-cursor={isPlaying ? "PAUSE" : "SPRINT"}
      title="Click or hover to toggle sprint"
      className={`border-2 border-[var(--ink)] bg-[var(--paper)] p-4 shadow-comic-sm select-none cursor-pointer group transition-transform hover:-translate-y-0.5 ${className}`}
    >
      <div className="flex justify-between items-center mb-2 font-mono text-[10px] font-bold text-[var(--ink-muted)]">
        <span>SPRITE VIEWER</span>
        <span
          className={`px-1.5 py-0.5 border border-[var(--ink)] ${
            isPlaying || isHovered
              ? "bg-[var(--yellow)] text-[var(--ink)]"
              : "bg-transparent text-[var(--ink-muted)]"
          }`}
        >
          {isPlaying || isHovered ? "RUNNING · 12 FPS" : "PAUSED"}
        </span>
      </div>

      {/* Frame Viewer with Transparent Background */}
      <div
        className="mx-auto overflow-hidden border-2 border-[var(--ink)] bg-[var(--yellow)]/10 flex items-center justify-center shadow-comic-sm"
        style={{
          width: `${sprite.frameWidth + 16}px`,
          height: `${sprite.frameHeight + 12}px`,
        }}
      >
        <div
          style={{
            width: `${sprite.frameWidth}px`,
            height: `${sprite.frameHeight}px`,
            backgroundImage: `url(${star.src})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: `-${frame * sprite.frameWidth}px 0`,
            imageRendering: "pixelated",
          }}
        />
      </div>

      <figcaption className="mt-3 space-y-1 text-center">
        <div className="font-mono text-xs uppercase font-bold text-[var(--ink)]">
          {star.tag}
        </div>
        <div className="font-[family-name:var(--font-letter)] text-xs text-[var(--ink-muted)] leading-snug">
          {star.caption}
        </div>
      </figcaption>
    </figure>
  );
}
