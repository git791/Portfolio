"use client";

import { useEffect, useRef } from "react";

export default function Noise() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const patternSize = 256;
    const patternScaleX = 1;
    const patternScaleY = 1;
    const patternRefreshInterval = 2;
    const patternAlpha = 18;

    let frame = 0;

    const patternCanvas = document.createElement("canvas");
    patternCanvas.width = patternSize;
    patternCanvas.height = patternSize;
    const patternCtx = patternCanvas.getContext("2d");
    if (!patternCtx) return;

    const patternData = patternCtx.createImageData(patternSize, patternSize);
    const patternPixelDataLength = patternSize * patternSize * 4;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function updatePattern() {
      for (let i = 0; i < patternPixelDataLength; i += 4) {
        const value = (Math.random() * 255) | 0;
        patternData.data[i] = value;
        patternData.data[i + 1] = value;
        patternData.data[i + 2] = value;
        patternData.data[i + 3] = patternAlpha;
      }
      patternCtx!.putImageData(patternData, 0, 0);
    }

    function drawPattern() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const pattern = ctx.createPattern(patternCanvas, "repeat");
      if (!pattern) return;
      ctx.save();
      ctx.scale(patternScaleX, patternScaleY);
      ctx.fillStyle = pattern;
      ctx.fillRect(0, 0, canvas.width / patternScaleX, canvas.height / patternScaleY);
      ctx.restore();
    }

    function loop() {
      if (frame % patternRefreshInterval === 0) {
        updatePattern();
        drawPattern();
      }
      frame++;
      animationId = requestAnimationFrame(loop);
    }

    resize();
    loop();

    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 9999,
        opacity: 0.035,
        mixBlendMode: "multiply",
      }}
    />
  );
}