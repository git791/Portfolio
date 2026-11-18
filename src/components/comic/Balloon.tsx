import React from "react";

export interface BalloonProps extends React.HTMLAttributes<HTMLDivElement> {
  tailPosition?: "bottom-left" | "bottom-right" | "top-left" | "top-right";
  children?: React.ReactNode;
}

export function Balloon({
  tailPosition = "bottom-left",
  className = "",
  children,
  ...props
}: BalloonProps) {
  // Tail SVG rendering based on position
  const isBottom = tailPosition.startsWith("bottom");
  const isRight = tailPosition.endsWith("right");

  return (
    <div className={`relative inline-flex flex-col ${className}`} {...props}>
      {!isBottom && (
        <div className={`relative h-4 w-6 ${isRight ? "self-end mr-4" : "self-start ml-4"} -mb-[3px] z-10`}>
          <svg
            viewBox="0 0 24 16"
            className="w-full h-full overflow-visible"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d={isRight ? "M4 16 L20 0 L24 16 Z" : "M0 16 L4 0 L20 16 Z"}
              fill="var(--paper)"
              stroke="var(--ink)"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            {/* Mask line to blend with container interior */}
            <path
              d={isRight ? "M4 16 L24 16" : "M0 16 L20 16"}
              stroke="var(--paper)"
              strokeWidth="4"
            />
          </svg>
        </div>
      )}

      {/* Balloon Body */}
      <div className="border-[3px] border-[var(--ink)] bg-[var(--paper)] text-[var(--ink)] p-3 sm:p-4 rounded-xl shadow-[3px_3px_0px_var(--ink)] font-[family-name:var(--font-letter)] relative z-0">
        {children}
      </div>

      {isBottom && (
        <div className={`relative h-4 w-6 ${isRight ? "self-end mr-4" : "self-start ml-4"} -mt-[3px] z-10`}>
          <svg
            viewBox="0 0 24 16"
            className="w-full h-full overflow-visible"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d={isRight ? "M4 0 L20 16 L24 0 Z" : "M0 0 L4 16 L20 0 Z"}
              fill="var(--paper)"
              stroke="var(--ink)"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            {/* Mask line to blend with container interior */}
            <path
              d={isRight ? "M4 0 L24 0" : "M0 0 L20 0"}
              stroke="var(--paper)"
              strokeWidth="4"
            />
          </svg>
        </div>
      )}
    </div>
  );
}
