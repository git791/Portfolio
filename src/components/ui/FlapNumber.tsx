"use client";

import { useEffect, useRef, useState } from "react";

function FlapDigit({
  target,
  delay = 0,
  animate = true,
}: {
  target: string;
  delay?: number;
  animate?: boolean;
}) {
  const digitNum = parseInt(target, 10);
  const isDigit = !isNaN(digitNum);

  if (!isDigit || !animate) {
    return <span className="inline-block">{target}</span>;
  }

  // Create column of digits 0 through target
  const list = Array.from({ length: digitNum + 1 }, (_, i) => i);

  return (
    <span className="inline-block h-[1em] overflow-hidden align-baseline">
      <span
        className="flex flex-col"
        style={{
          transform: `translateY(-${digitNum}em)`,
          transition: `transform ${400 + delay * 80}ms steps(${Math.max(1, digitNum)}, end)`,
        }}
      >
        {list.map((d) => (
          <span key={d} className="h-[1em] flex items-center justify-center">
            {d}
          </span>
        ))}
      </span>
    </span>
  );
}

export default function FlapNumber({
  value,
  className = "",
}: {
  value: string | number;
  className?: string;
}) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [triggered, setTriggered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const strValue = String(value);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReducedMotion(true);
      setTriggered(true);
      return;
    }

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !triggered) {
            observer.disconnect();
            setTriggered(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [triggered]);

  return (
    <span
      ref={containerRef}
      className={`inline-flex font-mono leading-none ${className}`}
      aria-label={strValue}
    >
      {strValue.split("").map((ch, idx) => (
        <FlapDigit
          key={idx}
          target={ch}
          delay={idx}
          animate={triggered && !reducedMotion}
        />
      ))}
    </span>
  );
}
