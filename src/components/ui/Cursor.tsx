"use client";

import { useEffect, useRef, useState } from "react";
import { CaptionBox } from "@/components/comic/CaptionBox";

export default function Cursor() {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(false);
  const [hoverText, setHoverText] = useState<string | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  const cursorRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -100, y: -100 });
  const targetRef = useRef({ x: -100, y: -100 });
  const hasMovedRef = useRef(false);

  useEffect(() => {
    setMounted(true);

    const mqlReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mqlReduced.matches);

    const onMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    mqlReduced.addEventListener("change", onMotionChange);

    // Initial check for fine pointer & hover device
    const mqlPointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let isFinePointer = mqlPointer.matches;

    // 12Hz quantised ticker loop for normal motion (~83.33ms per step)
    let lastTick = 0;
    const tickInterval = 1000 / 12; // ~83.33ms (12fps "on twos")
    let animId: number;

    const renderLoop = (time: number) => {
      if (mqlReduced.matches) {
        // Reduced motion: instant update without 12Hz quantisation
        posRef.current = { ...targetRef.current };
        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`;
        }
      } else {
        if (time - lastTick >= tickInterval) {
          lastTick = time;
          posRef.current = { ...targetRef.current };
          if (cursorRef.current) {
            cursorRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`;
          }
        }
      }
      animId = requestAnimationFrame(renderLoop);
    };
    animId = requestAnimationFrame(renderLoop);

    const onPointerMove = (e: PointerEvent) => {
      // Touch check: if pointer is touch, disable custom cursor immediately
      if (e.pointerType === "touch") {
        setActive(false);
        document.documentElement.classList.remove("has-custom-cursor");
        return;
      }

      if (e.pointerType === "mouse" || isFinePointer) {
        targetRef.current = { x: e.clientX, y: e.clientY };

        if (!hasMovedRef.current) {
          hasMovedRef.current = true;
          setActive(true);
          // Only hide native cursor once first position is received & drawn
          document.documentElement.classList.add("has-custom-cursor");
        }

        // Check hover over [data-cursor]
        const target = e.target as HTMLElement | null;
        const cursorEl = target?.closest("[data-cursor]") as HTMLElement | null;
        if (cursorEl) {
          const text = cursorEl.getAttribute("data-cursor") || "OPEN ISSUE";
          setHoverText(text);
        } else {
          setHoverText(null);
        }
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === "touch") {
        setActive(false);
        document.documentElement.classList.remove("has-custom-cursor");
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      mqlReduced.removeEventListener("change", onMotionChange);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  if (!mounted || !active) return null;

  const isCluster = Boolean(hoverText);

  // 6 hex dots around center (radius ~10px => cluster diameter ~28px)
  const hexPoints = [
    { x: 10, y: 0 },
    { x: 5, y: 8.66 },
    { x: -5, y: 8.66 },
    { x: -10, y: 0 },
    { x: -5, y: -8.66 },
    { x: 5, y: -8.66 },
  ];

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform"
      style={{
        transform: `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`,
      }}
      aria-hidden="true"
    >
      {/* Center 8px ink dot */}
      <div
        className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-[var(--ink)]"
        style={{
          boxShadow: isCluster ? "0 0 0 1px var(--paper)" : "none",
        }}
      />

      {/* 6 surrounding hex dots for the cluster */}
      {hexPoints.map((pt, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-[var(--ink)]"
          style={{
            width: "5px",
            height: "5px",
            top: "-2.5px",
            left: "-2.5px",
            transform: isCluster
              ? `translate(${pt.x}px, ${pt.y}px) scale(1)`
              : "translate(0px, 0px) scale(0)",
            opacity: isCluster ? 1 : 0,
            transition: reducedMotion
              ? "none"
              : "transform 0.12s steps(2), opacity 0.12s steps(2)",
          }}
        />
      ))}

      {/* Yellow caption box label */}
      {isCluster && (
        <div
          className="absolute left-4 -top-3.5 whitespace-nowrap"
          style={{
            transition: reducedMotion ? "none" : "opacity 0.08s steps(2)",
          }}
        >
          <CaptionBox variant="label" shadow="sm">
            {hoverText}
          </CaptionBox>
        </div>
      )}
    </div>
  );
}
