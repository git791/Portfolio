"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { getYearlyCommitRows, YearRowData } from "@/lib/commitData";

const H_MAX = 2.4;
const N_MAX = 31;
const X_STEP = 0.22;
const Z_STEP = 1.35;

function YearRow({
  data,
  heightFactorRef,
}: {
  data: YearRowData;
  heightFactorRef: React.MutableRefObject<number>;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const isCurrentYear = data.year === 2026;
  const isLineMuted = data.totalCommits === 0;

  // Build strip and line geometries
  const { stripGeo, lineGeo } = useMemo(() => {
    const pointsCount = 53;
    const positions: number[] = [];
    const linePositions: number[] = [];

    // Base Z position for this row
    const z = (data.yearIndex - 3.5) * Z_STEP;

    // Generate upper and baseline vertices
    const upper: THREE.Vector3[] = [];
    const lower: THREE.Vector3[] = [];

    for (let i = 0; i < pointsCount; i++) {
      const x = (i - 26) * X_STEP;
      const val = data.values[i];
      const h = val > 0 ? H_MAX * Math.sqrt(val / N_MAX) : 0;

      upper.push(new THREE.Vector3(x, h, z));
      lower.push(new THREE.Vector3(x, 0, z));
      linePositions.push(x, h + 0.015, z);
    }

    // Strip triangles connecting upper and lower
    for (let i = 0; i < pointsCount - 1; i++) {
      const u1 = upper[i];
      const u2 = upper[i + 1];
      const l1 = lower[i];
      const l2 = lower[i + 1];

      // Triangle 1: l1, u1, u2
      positions.push(l1.x, l1.y, l1.z);
      positions.push(u1.x, u1.y, u1.z);
      positions.push(u2.x, u2.y, u2.z);

      // Triangle 2: l1, u2, l2
      positions.push(l1.x, l1.y, l1.z);
      positions.push(u2.x, u2.y, u2.z);
      positions.push(l2.x, l2.y, l2.z);
    }

    const sGeo = new THREE.BufferGeometry();
    sGeo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    sGeo.computeVertexNormals();

    const lGeo = new THREE.BufferGeometry();
    lGeo.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));

    return { stripGeo: sGeo, lineGeo: lGeo };
  }, [data]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.scale.y = heightFactorRef.current;
    }
  });

  const lineColor = isCurrentYear ? "#ECE9DF" : isLineMuted ? "#252722" : "#555750";

  return (
    <group ref={groupRef}>
      {/* Filled Occlusion Strip (Ink background color to hide rows behind) */}
      <mesh geometry={stripGeo}>
        <meshBasicMaterial color="#0D0E0B" side={THREE.DoubleSide} depthWrite={true} />
      </mesh>
      {/* Ridge Line */}
      {/* @ts-expect-error R3F primitive line */}
      <line geometry={lineGeo}>
        <lineBasicMaterial color={lineColor} linewidth={1} />
      </line>
    </group>
  );
}

function Scene({
  rows,
  heightFactorRef,
}: {
  rows: YearRowData[];
  heightFactorRef: React.MutableRefObject<number>;
}) {
  const sceneGroupRef = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (!sceneGroupRef.current) return;
    const time = state.clock.getElapsedTime();

    // Subtle idle drift (+/- 1.5 deg rotation)
    const idleY = Math.sin(time * 0.3) * 0.025;
    const idleX = Math.cos(time * 0.25) * 0.015;

    // Pointer influence (damped)
    const targetY = idleY + pointer.current.x * 0.04;
    const targetX = idleX - pointer.current.y * 0.03;

    sceneGroupRef.current.rotation.y = THREE.MathUtils.lerp(
      sceneGroupRef.current.rotation.y,
      targetY,
      0.05
    );
    sceneGroupRef.current.rotation.x = THREE.MathUtils.lerp(
      sceneGroupRef.current.rotation.x,
      targetX,
      0.05
    );
  });

  const onPointerMove = (e: { clientX: number; clientY: number }) => {
    const nx = (e.clientX / window.innerWidth) * 2 - 1;
    const ny = -(e.clientY / window.innerHeight) * 2 + 1;
    pointer.current.x = nx;
    pointer.current.y = ny;
  };

  useEffect(() => {
    window.addEventListener("pointermove", onPointerMove);
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  return (
    <group ref={sceneGroupRef}>
      {rows.map((row) => (
        <YearRow key={row.year} data={row} heightFactorRef={heightFactorRef} />
      ))}
    </group>
  );
}

export default function CommitRidge({
  heightFactorRef,
  containerRef,
}: {
  heightFactorRef: React.MutableRefObject<number>;
  containerRef: React.RefObject<HTMLElement | null>;
}) {
  const [frameloop, setFrameloop] = useState<"always" | "never">("always");
  const rows = useMemo(() => getYearlyCommitRows(), []);

  // Pause rendering when off-screen
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setFrameloop(entry.isIntersecting ? "always" : "never");
        });
      },
      { threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [containerRef]);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none select-none">
      <Canvas
        frameloop={frameloop}
        dpr={[1, 1.5]}
        camera={{ position: [0, 6.2, 12.8], fov: 38 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        aria-hidden="true"
      >
        <Scene rows={rows} heightFactorRef={heightFactorRef} />
      </Canvas>
    </div>
  );
}
