import React from "react";

export type ChipVariant = "mvp" | "live" | "part" | "placement" | "outline";

export interface ChipProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "part"> {
  variant?: ChipVariant;
  part?: 1 | 2 | 3 | number;
  children?: React.ReactNode;
}

export function Chip({
  variant = "outline",
  part = 1,
  className = "",
  children,
  ...props
}: ChipProps) {
  if (variant === "live") {
    return (
      <span
        className={`inline-flex items-center px-2 py-0.5 font-mono text-xs font-bold uppercase tracking-wider bg-[var(--yellow)] text-[var(--ink)] border-[2px] border-[var(--ink)] shadow-[2px_2px_0px_var(--ink)] ${className}`}
        {...props}
      >
        {children || "LIVE"}
      </span>
    );
  }

  if (variant === "mvp") {
    return (
      <span
        className={`inline-flex items-center px-2 py-0.5 font-mono text-xs font-bold uppercase tracking-wider bg-[var(--paper)] text-[var(--ink)] border-[2px] border-[var(--ink)] ${className}`}
        {...props}
      >
        {children || "MVP"}
      </span>
    );
  }

  if (variant === "part") {
    return (
      <span
        className={`inline-flex items-center px-2 py-0.5 font-mono text-xs font-bold uppercase tracking-wider bg-[var(--paper)] text-[var(--ink)] border-[2px] border-[var(--ink)] ${className}`}
        {...props}
      >
        {children || `PART ${part} OF 3`}
      </span>
    );
  }

  if (variant === "placement") {
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 font-mono text-xs font-bold uppercase tracking-wider bg-[var(--yellow)] text-[var(--ink)] border-[2px] border-[var(--ink)] shadow-[2px_2px_0px_var(--ink)] ${className}`}
        {...props}
      >
        {children}
      </span>
    );
  }

  // Default outline
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 font-mono text-xs uppercase tracking-wider bg-[var(--paper)] text-[var(--ink)] border border-[var(--ink)] ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
