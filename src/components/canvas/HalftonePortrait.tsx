"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useThree } from "@react-three/fiber";

interface HalftoneQuadProps {
  progress: number;
  pointerOffset: { x: number; y: number };
  texture: THREE.Texture;
}

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  uniform sampler2D uTex;
  uniform vec2 uRes;
  uniform float uCell;
  uniform vec4 uAngles;     // C, M, Y, K screen angles (radians)
  uniform vec4 uOffsetsX;   // C, M, Y, K X offsets (px)
  uniform vec4 uOffsetsY;   // C, M, Y, K Y offsets (px)
  uniform float uProgress;  // 0.0 to 1.0
  uniform vec2 uPointerOffset;
  uniform float uTexAspect; // image aspect ratio

  varying vec2 vUv;

  const vec3 uPaper   = vec3(0.9529, 0.9176, 0.8275); // #F3EAD3
  const vec3 uCyan    = vec3(0.0, 0.6392, 0.8667);     // #00A3DD
  const vec3 uMagenta = vec3(0.8980, 0.0, 0.4902);    // #E5007D
  const vec3 uYellow  = vec3(1.0, 0.8196, 0.0);        // #FFD100
  const vec3 uInk     = vec3(0.0784, 0.0667, 0.0588);   // #14110F

  // Cover-fit coordinate mapping focused on the owner's portrait
  vec2 coverUv(vec2 uv, float screenAspect, float imageAspect) {
    vec2 sUv = uv;
    float zoom = 1.35;
    vec2 center = vec2(0.36, 0.50); // Center on owner's head/torso

    if (screenAspect > imageAspect) {
      float scale = screenAspect / imageAspect;
      sUv.y = (sUv.y - 0.5) * scale + 0.5;
    } else {
      float scale = imageAspect / screenAspect;
      sUv.x = (sUv.x - 0.5) * scale + 0.5;
    }

    sUv = (sUv - center) / zoom + center;
    return sUv;
  }

  vec4 rgbToCmyk(vec3 rgb) {
    float k = 1.0 - max(rgb.r, max(rgb.g, rgb.b));
    float invK = 1.0 - k;
    float c = (invK > 0.001) ? (1.0 - rgb.r - k) / invK : 0.0;
    float m = (invK > 0.001) ? (1.0 - rgb.g - k) / invK : 0.0;
    float y = (invK > 0.001) ? (1.0 - rgb.b - k) / invK : 0.0;
    return clamp(vec4(c, m, y, k), 0.0, 1.0);
  }

  float getPlateValue(int plateIdx, vec2 pixelCoord, float angle, vec2 offset) {
    // Physical plate translation:
    // When the plate is misaligned by offset, the plate pixel and texture sample shift together
    vec2 p = pixelCoord - offset;

    float cosA = cos(angle);
    float sinA = sin(angle);
    mat2 rot = mat2(cosA, sinA, -sinA, cosA);
    mat2 invRot = mat2(cosA, -sinA, sinA, cosA);

    vec2 rotP = rot * p;
    vec2 cellCenterRot = (floor(rotP / uCell) + 0.5) * uCell;
    vec2 sampleCoord = invRot * cellCenterRot;

    vec2 sampleUv = sampleCoord / uRes;
    sampleUv.y = 1.0 - sampleUv.y;
    float screenAspect = uRes.x / uRes.y;
    sampleUv = coverUv(sampleUv, screenAspect, uTexAspect);

    if (sampleUv.x < 0.0 || sampleUv.x > 1.0 || sampleUv.y < 0.0 || sampleUv.y > 1.0) {
      return 0.0;
    }

    vec4 tex = texture2D(uTex, sampleUv);
    vec3 boosted = clamp((tex.rgb - 0.06) * 1.3, 0.0, 1.0);
    vec4 cmyk = rgbToCmyk(boosted);

    float inkAmount = 0.0;
    if (plateIdx == 0) inkAmount = cmyk.r;
    else if (plateIdx == 1) inkAmount = cmyk.g;
    else if (plateIdx == 2) inkAmount = cmyk.b;
    else inkAmount = cmyk.a;

    float dotRadius = sqrt(inkAmount) * (uCell * 0.56);
    float dist = length(rotP - cellCenterRot);
    float delta = fwidth(dist);
    return 1.0 - smoothstep(dotRadius - delta, dotRadius + delta, dist);
  }

  void main() {
    vec2 pixelCoord = vUv * uRes;
    pixelCoord.y = uRes.y - pixelCoord.y;

    float unregister = 1.0 - uProgress;
    vec2 offC = vec2(uOffsetsX.x, uOffsetsY.x) * unregister + uPointerOffset;
    vec2 offM = vec2(uOffsetsX.y, uOffsetsY.y) * unregister + uPointerOffset;
    vec2 offY = vec2(uOffsetsX.z, uOffsetsY.z) * unregister + uPointerOffset;
    vec2 offK = vec2(uOffsetsX.w, uOffsetsY.w) * unregister + uPointerOffset * 0.5;

    float covC = getPlateValue(0, pixelCoord, uAngles.x, offC);
    float covM = getPlateValue(1, pixelCoord, uAngles.y, offM);
    float covY = getPlateValue(2, pixelCoord, uAngles.z, offY);
    float covK = getPlateValue(3, pixelCoord, uAngles.w, offK);

    vec3 color = uPaper;
    color *= (1.0 - covC * (1.0 - uCyan));
    color *= (1.0 - covM * (1.0 - uMagenta));
    color *= (1.0 - covY * (1.0 - uYellow));
    color *= (1.0 - covK * (1.0 - uInk));

    gl_FragColor = vec4(color, 1.0);
  }
`;

function HalftoneQuad({ progress, pointerOffset, texture }: HalftoneQuadProps) {
  const { size, invalidate } = useThree();
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(() => {
    const texAspect =
      texture.image && texture.image.width && texture.image.height
        ? texture.image.width / texture.image.height
        : 1.0;

    return {
      uTex: { value: texture },
      uRes: { value: new THREE.Vector2(size.width, size.height) },
      uCell: { value: Math.max(5.5, Math.min(7.5, size.width / 60)) },
      uAngles: {
        value: new THREE.Vector4(
          (15.0 * Math.PI) / 180.0,
          (75.0 * Math.PI) / 180.0,
          0.0,
          (45.0 * Math.PI) / 180.0
        ),
      },
      uOffsetsX: { value: new THREE.Vector4(-26.0, 22.0, -14.0, 5.0) },
      uOffsetsY: { value: new THREE.Vector4(20.0, -22.0, -24.0, 5.0) },
      uProgress: { value: progress },
      uPointerOffset: { value: new THREE.Vector2(pointerOffset.x, pointerOffset.y) },
      uTexAspect: { value: texAspect },
    };
  }, [texture, size.width, size.height, progress, pointerOffset]);

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uProgress.value = progress;
      materialRef.current.uniforms.uPointerOffset.value.set(pointerOffset.x, pointerOffset.y);
      materialRef.current.uniforms.uRes.value.set(size.width, size.height);
      invalidate();
    }
  }, [progress, pointerOffset, size.width, size.height, invalidate]);

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}

export interface HalftonePortraitProps {
  progress?: number;
  className?: string;
  forceFallback?: boolean;
}

export default function HalftonePortrait({
  progress = 1.0,
  className = "",
  forceFallback = false,
}: HalftonePortraitProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);
  const [pointerOffset, setPointerOffset] = useState({ x: 0, y: 0 });

  // Load portrait texture
  useEffect(() => {
    if (forceFallback) return;

    const loader = new THREE.TextureLoader();
    loader.load(
      "/images/profile.jpeg",
      (tex) => {
        tex.minFilter = THREE.LinearFilter;
        tex.magFilter = THREE.LinearFilter;
        setTexture(tex);
      },
      undefined,
      () => {
        setLoadFailed(true);
      }
    );
  }, [forceFallback]);

  // Pointer drift: max 3px damped
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    const dx = Math.round(nx * 3);
    const dy = Math.round(ny * 3);
    setPointerOffset({ x: dx, y: dy });
  };

  const handlePointerLeave = () => {
    setPointerOffset({ x: 0, y: 0 });
  };

  // Fallback rendering
  if (forceFallback || loadFailed) {
    const unreg = 1.0 - progress;
    return (
      <div
        ref={containerRef}
        role="img"
        aria-label="Portrait of Mohammed Ayaan Adil Ahmed"
        className={`relative w-full h-full overflow-hidden bg-[var(--paper)] ${className}`}
      >
        {/* CSS Fallback: Cyan, Magenta, Yellow, Ink layers */}
        <div
          className="absolute inset-0 bg-cover bg-center mix-blend-multiply opacity-80"
          style={{
            backgroundImage: "url('/images/profile.jpeg')",
            backgroundPosition: "36% 45%",
            backgroundSize: "135%",
            filter: "grayscale(100%) drop-shadow(0 0 0 #00A3DD)",
            transform: `translate(${Math.round(-24 * unreg)}px, ${Math.round(20 * unreg)}px)`,
          }}
        />
        <div
          className="absolute inset-0 bg-cover bg-center mix-blend-multiply opacity-80"
          style={{
            backgroundImage: "url('/images/profile.jpeg')",
            backgroundPosition: "36% 45%",
            backgroundSize: "135%",
            filter: "grayscale(100%) drop-shadow(0 0 0 #E5007D)",
            transform: `translate(${Math.round(22 * unreg)}px, ${Math.round(-22 * unreg)}px)`,
          }}
        />
        <div
          className="absolute inset-0 bg-cover bg-center mix-blend-multiply opacity-80"
          style={{
            backgroundImage: "url('/images/profile.jpeg')",
            backgroundPosition: "36% 45%",
            backgroundSize: "135%",
            filter: "grayscale(100%) drop-shadow(0 0 0 #FFD100)",
            transform: `translate(${Math.round(-14 * unreg)}px, ${Math.round(-24 * unreg)}px)`,
          }}
        />
        <div
          className="absolute inset-0 bg-cover bg-center mix-blend-multiply opacity-90"
          style={{
            backgroundImage: "url('/images/profile.jpeg')",
            backgroundPosition: "36% 45%",
            backgroundSize: "135%",
            filter: "grayscale(100%) contrast(140%)",
            transform: `translate(${Math.round(5 * unreg)}px, ${Math.round(5 * unreg)}px)`,
          }}
        />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label="Portrait of Mohammed Ayaan Adil Ahmed"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`relative w-full h-full overflow-hidden select-none ${className}`}
    >
      {texture ? (
        <Canvas
          orthographic
          camera={{ position: [0, 0, 1], zoom: 1 }}
          dpr={[1, 1.5]}
          frameloop="demand"
          gl={{ antialias: false, alpha: false, preserveDrawingBuffer: true }}
          className="w-full h-full"
        >
          <HalftoneQuad
            progress={progress}
            pointerOffset={pointerOffset}
            texture={texture}
          />
        </Canvas>
      ) : (
        <div className="w-full h-full bg-[var(--paper)] flex items-center justify-center font-mono text-xs text-[var(--ink-muted)]">
          LOADING PLATES...
        </div>
      )}
    </div>
  );
}
