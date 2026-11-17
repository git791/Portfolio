"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ComponentProps } from "react";

interface PassLinkProps extends ComponentProps<typeof Link> {
  children: React.ReactNode;
}

export default function PassLink({
  href,
  onClick,
  children,
  ...props
}: PassLinkProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);
    if (e.defaultPrevented) return;

    // Under reduced motion or touch: standard link click
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;

    if (prefersReducedMotion || !hasFinePointer) {
      return;
    }

    // Ignore special clicks (new tab, middle click)
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }

    const hrefStr = href.toString();
    // Don't intercept same-page hash jumps with pass line
    if (hrefStr.startsWith("#")) {
      return;
    }

    e.preventDefault();

    const startX = e.clientX;
    const startY = e.clientY;
    const targetRect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const endX = targetRect.left + targetRect.width / 2;
    const endY = targetRect.top + targetRect.height / 2;

    // Create an overlay SVG for the 260ms pass line animation
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "pointer-events-none fixed inset-0 z-[9999] h-full w-full");
    svg.style.mixBlendMode = "difference";

    const path = document.createElementNS("http://www.w3.org/2000/svg", "line");
    path.setAttribute("x1", String(startX));
    path.setAttribute("y1", String(startY));
    path.setAttribute("x2", String(endX));
    path.setAttribute("y2", String(endY));
    path.setAttribute("stroke", "#F2EFE6");
    path.setAttribute("stroke-width", "1.5");
    path.setAttribute("stroke-dasharray", "4, 4");
    path.style.opacity = "0.75";

    const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    dot.setAttribute("cx", String(startX));
    dot.setAttribute("cy", String(startY));
    dot.setAttribute("r", "3");
    dot.setAttribute("fill", "#F2EFE6");

    svg.appendChild(path);
    svg.appendChild(dot);
    document.body.appendChild(svg);

    const startTime = performance.now();
    const duration = 260; // ms

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(1, elapsed / duration);

      const curX = startX + (endX - startX) * progress;
      const curY = startY + (endY - startY) * progress;

      dot.setAttribute("cx", String(curX));
      dot.setAttribute("cy", String(curY));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        svg.remove();
        router.push(hrefStr);
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
