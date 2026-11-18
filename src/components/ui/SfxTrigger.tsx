"use client";

import { useEffect, useState } from "react";
import { Sfx } from "@/components/comic/Sfx";

interface ActiveSfx {
  id: number;
  text: string;
  x: number;
  y: number;
  frame: number; // 0, 1, 2, 3
}

export default function SfxTrigger() {
  const [activeSfx, setActiveSfx] = useState<ActiveSfx | null>(null);

  useEffect(() => {
    let frameTimer: NodeJS.Timeout;

    const onClick = (e: MouseEvent) => {
      // Respect reduced motion & touch
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }
      // If triggered by touch event (pointerType touch usually has detail 0 or pointerType)
      const target = e.target as HTMLElement | null;
      const sfxEl = target?.closest("[data-sfx]") as HTMLElement | null;
      if (!sfxEl) return;

      const text = sfxEl.getAttribute("data-sfx");
      if (!text) return;

      const newId = Date.now();
      setActiveSfx({
        id: newId,
        text,
        x: e.clientX,
        y: e.clientY,
        frame: 0,
      });

      // 400ms across 4 stepped frames (100ms each)
      let currentFrame = 0;
      clearInterval(frameTimer);
      frameTimer = setInterval(() => {
        currentFrame++;
        if (currentFrame >= 4) {
          clearInterval(frameTimer);
          setActiveSfx(null);
        } else {
          setActiveSfx((prev) => (prev ? { ...prev, frame: currentFrame } : null));
        }
      }, 100);
    };

    window.addEventListener("click", onClick, { capture: true });

    return () => {
      window.removeEventListener("click", onClick, { capture: true });
      clearInterval(frameTimer);
    };
  }, []);

  if (!activeSfx) return null;

  // 4 discrete stepped frame styles (on twos, no smooth interpolation)
  const frameScales = ["scale-75 -rotate-6", "scale-110 rotate-3", "scale-100 -rotate-2", "scale-90 opacity-60"];
  const currentTransform = frameScales[activeSfx.frame] || "scale-100";

  return (
    <div
      className="fixed pointer-events-none z-[10000] select-none"
      style={{
        left: `${activeSfx.x}px`,
        top: `${activeSfx.y}px`,
        transform: "translate(-50%, -50%)",
      }}
      aria-hidden="true"
    >
      <div className={`transition-none transform ${currentTransform}`}>
        <Sfx color="yellow" size="base">
          {activeSfx.text}
        </Sfx>
      </div>
    </div>
  );
}
