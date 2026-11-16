"use client";

import { useEffect, useRef, useState } from "react";

const GLYPHS = "/\\|_0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function Decode({
  text,
  className = "",
  as: Component = "h2",
}: {
  text: string;
  className?: string;
  as?: any;
}) {
  const containerRef = useRef<HTMLElement>(null);
  const [displayText, setDisplayText] = useState(text);
  const [hasDecoded, setHasDecoded] = useState(false);

  useEffect(() => {
    // If reduced motion is requested, render final text immediately
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayText(text);
      setHasDecoded(true);
      return;
    }

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasDecoded) {
            observer.disconnect();
            runDecode();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [text, hasDecoded]);

  const runDecode = () => {
    setHasDecoded(true);
    const duration = 600; // ~600ms total
    const steps = 18;
    const intervalTime = duration / steps;
    const length = text.length;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const resolvedCount = Math.floor((step / steps) * length);

      let scrambled = "";
      for (let i = 0; i < length; i++) {
        if (text[i] === " " || text[i] === "\n") {
          scrambled += text[i];
        } else if (i < resolvedCount) {
          scrambled += text[i];
        } else {
          scrambled += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
      }

      setDisplayText(scrambled);

      if (step >= steps) {
        clearInterval(timer);
        setDisplayText(text);
      }
    }, intervalTime);
  };

  return (
    <Component
      ref={containerRef}
      className={`relative inline-block ${className}`}
      aria-label={text}
    >
      {/* Invisible layer to reserve exact layout dimensions */}
      <span className="invisible select-none pointer-events-none" aria-hidden="true">
        {text}
      </span>
      {/* Visible layer with decoding text */}
      <span className="absolute inset-0 select-none" aria-hidden="true">
        {displayText}
      </span>
    </Component>
  );
}
