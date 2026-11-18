import React from "react";

export interface SectionCutProps extends React.HTMLAttributes<HTMLElement> {
  as?: "section" | "div";
  slope?: "down-right" | "down-left";
  cutHeight?: number; // px slope height (default 40px, ~3 degrees on desktop)
  bg?: "paper" | "yellow" | "cyan" | "magenta" | "none";
  borderTop?: boolean;
  children?: React.ReactNode;
}

export function SectionCut({
  as: Component = "section",
  slope = "down-right",
  cutHeight = 40,
  bg = "paper",
  borderTop = true,
  className = "",
  style,
  children,
  ...props
}: SectionCutProps) {
  const bgClasses = {
    paper: "bg-[var(--paper)] text-[var(--ink)]",
    yellow: "bg-[var(--yellow)] text-[var(--ink)]",
    cyan: "bg-[var(--cyan)] text-[var(--ink)]",
    magenta: "bg-[var(--magenta)] text-[var(--paper)]",
    none: "",
  };

  const clipPath =
    slope === "down-right"
      ? `polygon(0 ${cutHeight}px, 100% 0, 100% 100%, 0 100%)`
      : `polygon(0 0, 100% ${cutHeight}px, 100% 100%, 0 100%)`;

  return (
    <Component
      className={`relative w-full ${bgClasses[bg]} ${className}`}
      style={{
        clipPath,
        paddingTop: `${cutHeight + 32}px`,
        paddingBottom: "4rem",
        ...style,
      }}
      {...props}
    >
      {/* Visual comic ink rule along the slope */}
      {borderTop && (
        <svg
          className="absolute top-0 left-0 w-full pointer-events-none overflow-visible z-20"
          style={{ height: `${cutHeight}px` }}
          aria-hidden="true"
          preserveAspectRatio="none"
          viewBox={`0 0 100 ${cutHeight}`}
        >
          <line
            x1="0"
            y1={slope === "down-right" ? cutHeight : 0}
            x2="100"
            y2={slope === "down-right" ? 0 : cutHeight}
            vectorEffect="non-scaling-stroke"
            stroke="var(--ink)"
            strokeWidth="3"
          />
        </svg>
      )}
      <div className="relative z-10">{children}</div>
    </Component>
  );
}
