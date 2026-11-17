"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  COLS,
  ROWS,
  COMMIT_ROWS,
  COMMIT_COLS,
  COMMIT_COL_OFFSET,
  YEARS,
  CommitWeekInfo,
  buildMosaicDataTexture,
} from "./mosaicData";

interface MosaicSceneProps {
  beatProgress: number; // 0..1 across the 300vh scroll
  pointerPos: { x: number; y: number };
  onHoverCommit?: (info: CommitWeekInfo | null, screenPos: { x: number; y: number } | null) => void;
}

const vertexShader = `
uniform float uBeatProgress; // 0..1
uniform sampler2D uStateTexture;
uniform vec3 uCardNight;
uniform vec3 uCardChalk;
uniform vec3 uCardRed;
uniform vec2 uPointer;
uniform float uTime;

attribute float aCol;
attribute float aRow;
attribute float aDelay;

varying vec3 vColor;

vec3 getStateColor(float val) {
  if (val > 1.5) return uCardRed;
  if (val > 0.5) return uCardChalk;
  return uCardNight;
}

void main() {
  // Texture coordinate for this card
  vec2 uvCoord = vec2((aCol + 0.5) / 120.0, (aRow + 0.5) / 40.0);
  vec4 states = texture2D(uStateTexture, uvCoord);
  float sIdle = states.r;
  float sName = states.g;
  float sCrest = states.b;
  float sCommits = states.a;

  // Determine which beat transition we are in
  // p: 0.00-0.05 Idle
  //    0.05-0.30 Beat A (Idle -> Name)
  //    0.30-0.60 Beat B (Name -> Crest)
  //    0.60-0.88 Beat C (Crest -> Commits)
  //    0.88-1.00 Exit (cards tilt down)
  
  float p = uBeatProgress;
  float fromVal = sIdle;
  float toVal = sIdle;
  float transitionP = 0.0;

  if (p < 0.05) {
    fromVal = sIdle;
    toVal = sIdle;
    transitionP = 0.0;
  } else if (p < 0.30) {
    // Beat A: Idle -> Name
    fromVal = sIdle;
    toVal = sName;
    float normP = (p - 0.05) / 0.25;
    transitionP = clamp((normP * 1.5) - aDelay * 0.5, 0.0, 1.0);
  } else if (p < 0.60) {
    // Beat B: Name -> Crest
    fromVal = sName;
    toVal = sCrest;
    float normP = (p - 0.30) / 0.30;
    transitionP = clamp((normP * 1.5) - aDelay * 0.5, 0.0, 1.0);
  } else if (p < 0.88) {
    // Beat C: Crest -> Commits
    fromVal = sCrest;
    toVal = sCommits;
    float normP = (p - 0.60) / 0.28;
    transitionP = clamp((normP * 1.5) - aDelay * 0.5, 0.0, 1.0);
  } else {
    // Exit phase: fade to dark
    fromVal = sCommits;
    toVal = 0.0; // dark
    float normP = (p - 0.88) / 0.12;
    transitionP = clamp(normP * 1.4 - (aRow / 40.0) * 0.4, 0.0, 1.0);
  }

  // Card flip angle (0 to PI)
  float angle = 3.14159265 * smoothstep(0.0, 1.0, transitionP);

  // Rotate local position about vertical axis (Y)
  vec3 localPos = position;
  float cosA = cos(angle);
  float sinA = sin(angle);
  float rotX = localPos.x * cosA + localPos.z * sinA;
  float rotZ = -localPos.x * sinA + localPos.z * cosA;
  vec3 rotatedPos = vec3(rotX, localPos.y, rotZ);

  // Determine face color: front shows fromVal, back shows toVal
  if (angle < 1.5707963) {
    vColor = getStateColor(fromVal);
  } else {
    vColor = getStateColor(toVal);
  }

  // Pointer ripple (small local lift when close)
  vec4 worldPos = instanceMatrix * vec4(rotatedPos, 1.0);
  vec2 screenDist = worldPos.xy - uPointer * 5.0;
  float d = length(screenDist);
  if (d < 2.5) {
    float lift = (1.0 - d / 2.5) * 0.08;
    worldPos.y += lift;
  }

  // Exit tilt
  if (p >= 0.88) {
    float exitProgress = (p - 0.88) / 0.12;
    worldPos.y -= exitProgress * 0.5;
  }

  gl_Position = projectionMatrix * viewMatrix * worldPos;
}
`;

const fragmentShader = `
precision mediump float;
varying vec3 vColor;

void main() {
  gl_FragColor = vec4(vColor, 1.0);
}
`;

function StandMesh({
  beatProgress,
  pointerPos,
  onHoverCommit,
}: MosaicSceneProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const [dataTexture, setDataTexture] = useState<THREE.DataTexture | null>(null);
  const [commitGrid, setCommitGrid] = useState<CommitWeekInfo[][] | null>(null);
  const { camera, raycaster, gl } = useThree();

  // Load DataTexture on client
  useEffect(() => {
    let active = true;
    buildMosaicDataTexture().then((res) => {
      if (active) {
        setDataTexture(res.texture);
        setCommitGrid(res.commitGrid);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  // Card geometry: thin quad
  const cardGeo = useMemo(() => new THREE.PlaneGeometry(0.18, 0.13), []);

  // Custom shader material (1 draw call)
  const shaderMat = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      side: THREE.DoubleSide,
      uniforms: {
        uBeatProgress: { value: 0 },
        uStateTexture: { value: null },
        uPointer: { value: new THREE.Vector2(0, 0) },
        uTime: { value: 0 },
        uCardNight: { value: new THREE.Color("#161917") },
        uCardChalk: { value: new THREE.Color("#F2EFE6") },
        uCardRed: { value: new THREE.Color("#D62A1F") },
      },
    });
  }, []);

  // Compute curved terrace instanced matrices and attributes
  const { instanceCount, aCols, aRows, aDelays, cardPositions } = useMemo(() => {
    const count = COLS * ROWS; // 4,800
    const aCols = new Float32Array(count);
    const aRows = new Float32Array(count);
    const aDelays = new Float32Array(count);
    const cardPositions: THREE.Vector3[] = new Array(count);

    const radiusBase = 16.5;
    const arcSpan = (116 * Math.PI) / 180; // +/-58 degrees
    const rowRake = 0.16; // height step
    const rowDepth = 0.12; // radius step

    let idx = 0;
    for (let r = 0; r < ROWS; r++) {
      const radius = radiusBase + r * rowDepth;
      const y = r * rowRake - 2.8;

      for (let c = 0; c < COLS; c++) {
        const theta = -arcSpan / 2 + (c / (COLS - 1)) * arcSpan;
        const x = radius * Math.sin(theta);
        const z = -radius * Math.cos(theta) + radiusBase;

        const pos = new THREE.Vector3(x, y, z);
        cardPositions[idx] = pos;

        aCols[idx] = c;
        aRows[idx] = r;

        // Wave delay based on distance from center
        const distFromCenter = Math.hypot((c - COLS / 2) / (COLS / 2), (r - ROWS / 2) / (ROWS / 2));
        aDelays[idx] = distFromCenter;

        idx++;
      }
    }

    return { instanceCount: count, aCols, aRows, aDelays, cardPositions };
  }, []);

  // Populate InstancedMesh transform matrices once
  useEffect(() => {
    if (!meshRef.current) return;
    const mesh = meshRef.current;
    const dummy = new THREE.Object3D();
    const focusPoint = new THREE.Vector3(0, 1.0, 14.0);

    for (let i = 0; i < instanceCount; i++) {
      const pos = cardPositions[i];
      dummy.position.copy(pos);
      // Face toward the focus point in front of stand
      dummy.lookAt(focusPoint.x, dummy.position.y * 0.4 + focusPoint.y, focusPoint.z);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;
  }, [instanceCount, cardPositions]);

  // Pass uniforms and handle frame updates
  useFrame((state, delta) => {
    if (!shaderMat) return;
    shaderMat.uniforms.uBeatProgress.value = beatProgress;
    shaderMat.uniforms.uTime.value += delta;
    if (dataTexture) {
      shaderMat.uniforms.uStateTexture.value = dataTexture;
    }

    // Camera slow parallax with pointer (max +/- 1.8 degrees)
    const targetCamX = pointerPos.x * 0.4;
    const targetCamY = 0.5 - pointerPos.y * 0.2;
    camera.position.x += (targetCamX - camera.position.x) * 0.05;
    camera.position.y += (targetCamY - camera.position.y) * 0.05;
    camera.lookAt(0, 0.4, -6.0);

    // Commit terrace hover check during Beat C (progress 0.60..0.88)
    if (onHoverCommit && commitGrid && beatProgress >= 0.58 && beatProgress <= 0.88) {
      const mouse = new THREE.Vector2(pointerPos.x, -pointerPos.y);
      raycaster.setFromCamera(mouse, camera);

      // Check commit terrace cards (rows 0..7, cols 33..85)
      let foundInfo: CommitWeekInfo | null = null;
      let screenPos: { x: number; y: number } | null = null;
      let minRayDist = 0.25;

      for (let r = 0; r < COMMIT_ROWS; r++) {
        for (let c = 0; c < COMMIT_COLS; c++) {
          const cardIdx = r * COLS + (c + COMMIT_COL_OFFSET);
          const pos = cardPositions[cardIdx];
          const dist = raycaster.ray.distanceToPoint(pos);

          if (dist < minRayDist) {
            minRayDist = dist;
            foundInfo = commitGrid[r][c];

            // Project 3D pos to 2D screen coordinate
            const projected = pos.clone().project(camera);
            const halfW = gl.domElement.clientWidth / 2;
            const halfH = gl.domElement.clientHeight / 2;
            screenPos = {
              x: projected.x * halfW + halfW,
              y: -projected.y * halfH + halfH,
            };
          }
        }
      }

      onHoverCommit(foundInfo, screenPos);
    } else if (onHoverCommit) {
      onHoverCommit(null, null);
    }
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[cardGeo, shaderMat, instanceCount]}
      frustumCulled={false}
    >
      <instancedBufferAttribute
        attach="geometry-attributes-aCol"
        args={[aCols, 1]}
      />
      <instancedBufferAttribute
        attach="geometry-attributes-aRow"
        args={[aRows, 1]}
      />
      <instancedBufferAttribute
        attach="geometry-attributes-aDelay"
        args={[aDelays, 1]}
      />
    </instancedMesh>
  );
}

export default function MosaicStand({
  beatProgress,
  pointerPos,
}: {
  beatProgress: number;
  pointerPos: { x: number; y: number };
}) {
  const [hoveredCommit, setHoveredCommit] = useState<CommitWeekInfo | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  return (
    <div className="relative w-full h-full select-none">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0.4, 4.2], fov: 42, near: 0.1, far: 50 }}
        aria-hidden="true"
        className="w-full h-full"
      >
        <StandMesh
          beatProgress={beatProgress}
          pointerPos={pointerPos}
          onHoverCommit={(info, pos) => {
            setHoveredCommit(info);
            setTooltipPos(pos);
          }}
        />
      </Canvas>

      {/* DOM Tooltip for commit cards */}
      {hoveredCommit && tooltipPos && (
        <div
          style={{
            left: `${tooltipPos.x}px`,
            top: `${Math.max(10, tooltipPos.y - 48)}px`,
          }}
          className="pointer-events-none absolute -translate-x-1/2 z-30 surface-night border border-[var(--chalk)] px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-[var(--chalk)] whitespace-nowrap"
        >
          <span>
            {hoveredCommit.dateStr} · {hoveredCommit.commits} COMMITS · {hoveredCommit.topRepo}
          </span>
        </div>
      )}

      {/* Year labels for commit terrace (DOM text, positioned left of band during Beat C) */}
      {beatProgress >= 0.58 && beatProgress <= 0.88 && (
        <div className="pointer-events-none absolute left-4 lg:left-12 bottom-8 z-20 flex flex-col-reverse gap-1 font-mono text-[11px] text-[var(--muted)] uppercase">
          {YEARS.map((y) => (
            <span key={y} className="tracking-widest">
              {y}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
