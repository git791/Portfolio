"use client";

import React, { useId } from "react";

export interface DotFieldProps {
  color?: string;
  cellSize?: number;
  dotRadius?: number;
  angle?: number;
  opacity?: number;
  className?: string;
}

export function DotField({
  color = "var(--ink)",
  cellSize = 8,
  dotRadius = 1.5,
  angle = 45,
  opacity = 0.15,
  className = "",
}: DotFieldProps) {
  const rawId = useId();
  const patternId = `dot-pattern-${rawId.replace(/[^a-zA-Z0-9_-]/g, "")}`;

  return (
    <svg
      aria-hidden="true"
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ opacity }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id={patternId}
          width={cellSize}
          height={cellSize}
          patternUnits="userSpaceOnUse"
          patternTransform={`rotate(${angle})`}
        >
          <circle
            cx={cellSize / 2}
            cy={cellSize / 2}
            r={dotRadius}
            fill={color}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
