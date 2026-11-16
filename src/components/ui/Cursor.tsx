"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(false);
  const [label, setLabel] = useState("");

  useEffect(() => {
    // Only enable if pointer is fine and reduced motion is not preferred
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!hasFinePointer || prefersReducedMotion) {
      return;
    }

    setActive(true);
    document.documentElement.classList.add("has-custom-cursor");

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Start hidden until first pointermove
    gsap.set(cursor, { opacity: 0, xPercent: -50, yPercent: -50 });

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.18, ease: "power2.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.18, ease: "power2.out" });

    let hasMoved = false;

    const onPointerMove = (e: PointerEvent) => {
      if (!hasMoved) {
        hasMoved = true;
        gsap.set(cursor, { opacity: 1 });
      }
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const onPointerOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      const cursorTarget = target?.closest("[data-cursor]") as HTMLElement | null;
      if (cursorTarget) {
        const text = cursorTarget.getAttribute("data-cursor") || "";
        setLabel(text);
      }
    };

    const onPointerOut = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      const cursorTarget = target?.closest("[data-cursor]") as HTMLElement | null;
      if (cursorTarget) {
        // If related target is not inside the same cursorTarget, clear
        const related = e.relatedTarget as HTMLElement | null;
        if (!related || !cursorTarget.contains(related)) {
          setLabel("");
        }
      }
    };

    const onPointerLeave = () => {
      gsap.to(cursor, { opacity: 0, duration: 0.15 });
    };

    const onPointerEnter = () => {
      if (hasMoved) {
        gsap.to(cursor, { opacity: 1, duration: 0.15 });
      }
    };

    window.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerover", onPointerOver);
    document.addEventListener("pointerout", onPointerOut);
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    document.documentElement.addEventListener("pointerenter", onPointerEnter);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerout", onPointerOut);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      document.documentElement.removeEventListener("pointerenter", onPointerEnter);
    };
  }, []);

  if (!active) return null;

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "10px",
        height: "10px",
        backgroundColor: "#ffffff",
        mixBlendMode: "difference",
        pointerEvents: "none",
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
      }}
    >
      {label && (
        <span
          ref={labelRef}
          style={{
            position: "absolute",
            left: "16px",
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            lineHeight: 1,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#ffffff",
            whiteSpace: "nowrap",
            userSelect: "none",
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
}
