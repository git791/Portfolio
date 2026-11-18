import React from "react";

export interface SfxProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: "yellow" | "cyan" | "magenta" | "paper" | "ink";
  size?: "sm" | "base" | "lg" | "xl";
  children: React.ReactNode;
}

export function Sfx({
  color = "yellow",
  size = "base",
  className = "",
  children,
  ...props
}: SfxProps) {
  const colorMap = {
    yellow: "text-[var(--yellow)]",
    cyan: "text-[var(--cyan)]",
    magenta: "text-[var(--magenta)]",
    paper: "text-[var(--paper)]",
    ink: "text-[var(--ink)]",
  };

  const sizeMap = {
    sm: "text-2xl sm:text-3xl",
    base: "text-4xl sm:text-5xl",
    lg: "text-6xl sm:text-7xl",
    xl: "text-8xl sm:text-9xl",
  };

  return (
    <span
      className={`font-[family-name:var(--font-sfx)] uppercase tracking-wider select-none inline-block ${sizeMap[size]} ${colorMap[color]} ${className}`}
      style={{
        WebkitTextStroke: "2.5px var(--ink)",
        paintOrder: "stroke fill",
        filter: "drop-shadow(3px 3px 0px var(--ink))",
      }}
      {...props}
    >
      {children}
    </span>
  );
}
