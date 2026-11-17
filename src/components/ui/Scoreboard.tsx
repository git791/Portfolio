"use client";

import { useEffect, useRef, useState } from "react";
import { getScoreboardStats } from "@/lib/derive";

interface StatItem {
  label: string;
  targetValue: number;
  suffix?: string;
}

export default function Scoreboard({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stats = getScoreboardStats();
  const [hasAnimated, setHasAnimated] = useState(false);
  const [displayValues, setDisplayValues] = useState<number[]>([0, 0, 0, 0]);

  const statItems: StatItem[] = [
    { label: "REPOS 2026", targetValue: stats.repos2026 },
    { label: "HACKATHONS", targetValue: stats.hackathons },
    { label: "EVENTS RUN", targetValue: stats.eventsRun },
    { label: "LARGEST AUDIENCE", targetValue: parseInt(stats.largestAudience, 10) || 250, suffix: "+" },
  ];

  useEffect(() => {
    // Under reduced motion: show target values statically
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setDisplayValues(statItems.map((s) => s.targetValue));
      return;
    }

    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const startTime = performance.now();
          const duration = 600; // max 600ms stepped tick
          const steps = 6;

          const tick = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(1, elapsed / duration);
            const stepProgress = Math.floor(progress * steps) / steps;

            setDisplayValues(
              statItems.map((s) => Math.round(s.targetValue * stepProgress))
            );

            if (progress < 1) {
              requestAnimationFrame(tick);
            } else {
              setDisplayValues(statItems.map((s) => s.targetValue));
            }
          };

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <div
      ref={containerRef}
      className={`grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 border border-[var(--rule)] bg-[#0B0D0C] select-none ${className}`}
    >
      {statItems.map((item, idx) => (
        <div key={item.label} className="flex flex-col gap-1">
          <span className="font-mono text-[10px] md:text-[11px] text-[var(--muted-dark)] uppercase tracking-wider">
            {item.label}
          </span>
          <div className="font-dot text-2xl md:text-3xl text-[var(--amber)] tracking-wider">
            {displayValues[idx]}
            {item.suffix || ""}
          </div>
        </div>
      ))}
    </div>
  );
}
