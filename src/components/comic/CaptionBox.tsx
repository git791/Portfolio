import React from "react";

export interface CaptionBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "body" | "label";
  bg?: "yellow" | "paper";
  shadow?: "none" | "sm" | "base";
  children?: React.ReactNode;
}

export function CaptionBox({
  variant = "body",
  bg = "yellow",
  shadow = "sm",
  className = "",
  children,
  ...props
}: CaptionBoxProps) {
  const bgClass = bg === "yellow" ? "bg-[var(--yellow)] text-[var(--ink)]" : "bg-[var(--paper)] text-[var(--ink)]";
  const shadowClass =
    shadow === "none"
      ? ""
      : shadow === "sm"
      ? "shadow-[2px_2px_0px_var(--ink)]"
      : "shadow-[4px_4px_0px_var(--ink)]";

  const fontClass =
    variant === "label"
      ? "font-mono text-xs uppercase tracking-wider font-bold py-1 px-2.5"
      : "font-[family-name:var(--font-letter)] text-base sm:text-lg leading-snug p-3";

  return (
    <div
      className={`border-[2px] sm:border-[3px] border-[var(--ink)] inline-block ${bgClass} ${fontClass} ${shadowClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
