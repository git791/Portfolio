import React from "react";

export type PanelField = "paper" | "cyan" | "magenta" | "yellow" | "none";

export interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  field?: PanelField;
  tilt?: number; // e.g. -0.5 to 1.0 degrees
  shadow?: "none" | "sm" | "base" | "lg";
  children?: React.ReactNode;
}

export function Panel({
  field = "paper",
  tilt,
  shadow = "base",
  className = "",
  style,
  children,
  ...props
}: PanelProps) {
  const bgClasses: Record<PanelField, string> = {
    paper: "bg-[var(--paper)] text-[var(--ink)]",
    cyan: "bg-[var(--cyan)] text-[var(--ink)]",
    magenta: "bg-[var(--magenta)] text-[var(--paper)]",
    yellow: "bg-[var(--yellow)] text-[var(--ink)]",
    none: "",
  };

  const shadowClasses = {
    none: "",
    sm: "shadow-[2px_2px_0px_var(--ink)]",
    base: "shadow-[4px_4px_0px_var(--ink)]",
    lg: "shadow-[6px_6px_0px_var(--ink)]",
  };

  const tiltStyle = tilt ? { transform: `rotate(${tilt}deg)` } : {};

  return (
    <div
      className={`border-[3px] border-[var(--ink)] relative ${bgClasses[field]} ${shadowClasses[shadow]} ${className}`}
      style={{ ...tiltStyle, ...style }}
      {...props}
    >
      {children}
    </div>
  );
}
