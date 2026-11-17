"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Cursor() {
  const [mounted, setMounted] = useState(false);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cursorLabel, setCursorLabel] = useState<string>("");

  useEffect(() => {
    // Only run on fine pointer (mouse/trackpad) and when reduced motion is not preferred
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!hasFinePointer || prefersReducedMotion) {
      return;
    }

    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    document.documentElement.classList.add("has-custom-cursor");

    let isVisible = false;
    const ring = ringRef.current;
    const dot = dotRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!ring || !dot || !canvas || !ctx) return;

    // Resize canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // GSAP quickTo setters for 0.2s smooth following
    const xQuickToRing = gsap.quickTo(ring, "x", { duration: 0.2, ease: "power2.out" });
    const yQuickToRing = gsap.quickTo(ring, "y", { duration: 0.2, ease: "power2.out" });
    const xQuickToDot = gsap.quickTo(dot, "x", { duration: 0.05, ease: "none" });
    const yQuickToDot = gsap.quickTo(dot, "y", { duration: 0.05, ease: "none" });

    // Dotted trail storage (max 6 points)
    const trail: { x: number; y: number; alpha: number }[] = [];
    let lastX = 0;
    let lastY = 0;
    let animFrame: number;
    let isIdle = true;
    let idleTimeout: NodeJS.Timeout;

    const renderTrail = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (trail.length > 1) {
        ctx.strokeStyle = "rgba(242, 239, 230, 0.7)";
        ctx.lineWidth = 1.5;
        ctx.setLineDash([3, 5]);

        for (let i = 0; i < trail.length - 1; i++) {
          const p1 = trail[i];
          const p2 = trail[i + 1];
          ctx.beginPath();
          ctx.globalAlpha = p1.alpha;
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }

      // Fade out trail points
      for (let i = 0; i < trail.length; i++) {
        trail[i].alpha *= 0.82;
      }
      while (trail.length > 0 && trail[0].alpha < 0.05) {
        trail.shift();
      }

      if (trail.length > 0 || !isIdle) {
        animFrame = requestAnimationFrame(renderTrail);
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      const { clientX: x, clientY: y } = e;

      if (!isVisible) {
        isVisible = true;
        ring.style.opacity = "1";
        dot.style.opacity = "1";
      }

      xQuickToRing(x);
      yQuickToRing(y);
      xQuickToDot(x);
      yQuickToDot(y);

      // Track distance to record fast movement for dotted trail
      const dx = x - lastX;
      const dy = y - lastY;
      const dist = Math.hypot(dx, dy);

      if (dist > 8) {
        trail.push({ x, y, alpha: 0.8 });
        if (trail.length > 6) {
          trail.shift();
        }
      }

      lastX = x;
      lastY = y;

      isIdle = false;
      cancelAnimationFrame(animFrame);
      animFrame = requestAnimationFrame(renderTrail);

      clearTimeout(idleTimeout);
      idleTimeout = setTimeout(() => {
        isIdle = true;
      }, 100);
    };

    // Delegated pointerover for [data-cursor]
    const handlePointerOver = (e: PointerEvent) => {
      const target = (e.target as HTMLElement)?.closest("[data-cursor]") as HTMLElement | null;
      if (target) {
        const label = target.getAttribute("data-cursor") || "";
        setCursorLabel(label.toUpperCase());
      } else {
        setCursorLabel("");
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("pointerover", handlePointerOver, { passive: true });

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerover", handlePointerOver);
      cancelAnimationFrame(animFrame);
      clearTimeout(idleTimeout);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden mix-blend-difference"
    >
      {/* 2D Canvas for dotted trail */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* 22px Tracking-marker style ring */}
      <div
        ref={ringRef}
        style={{ opacity: 0 }}
        className="absolute top-0 left-0 -ml-[11px] -mt-[11px] h-[22px] w-[22px] rounded-full border-[1.5px] border-[var(--chalk)] transition-opacity duration-150 flex items-center"
      >
        {cursorLabel && (
          <span
            ref={labelRef}
            className="absolute left-[28px] whitespace-nowrap font-mono text-[10px] font-bold tracking-[0.08em] uppercase text-[var(--chalk)] bg-[var(--night)] px-1.5 py-0.5 border border-[var(--chalk)]"
          >
            {cursorLabel}
          </span>
        )}
      </div>

      {/* 4px Centre dot */}
      <div
        ref={dotRef}
        style={{ opacity: 0 }}
        className="absolute top-0 left-0 -ml-[2px] -mt-[2px] h-[4px] w-[4px] rounded-full bg-[var(--chalk)] transition-opacity duration-150"
      />
    </div>
  );
}
