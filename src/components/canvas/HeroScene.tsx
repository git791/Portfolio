"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function FloatingOrb({
  position,
  scale,
  color,
  speed,
}: {
  position: [number, number, number];
  scale: number;
  color: string;
  speed: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(color),
        transmission: 0.9,
        thickness: 1.5,
        roughness: 0.05,
        metalness: 0,
        ior: 1.5,
        transparent: true,
        opacity: 0.85,
      }),
    [color]
  );

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * speed;
    meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.2;
    meshRef.current.rotation.y = Math.sin(t * 0.2) * 0.3;
    meshRef.current.position.y =
      position[1] + Math.sin(t * 0.5) * 0.15;
  });

  return (
    <Float speed={speed} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 8]} />
        <primitive object={material} attach="material" />
      </mesh>
    </Float>
  );
}

function ParticleField() {
  const count = 120;
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
      sizes[i] = Math.random() * 0.015 + 0.005;
    }

    return { positions, sizes };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y =
      state.clock.elapsedTime * 0.015;
    pointsRef.current.rotation.x =
      state.clock.elapsedTime * 0.008;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.012}
        color="#c8622a"
        transparent
        opacity={0.35}
        sizeAttenuation
      />
    </points>
  );
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const mouseX = state.pointer.x * 0.12;
    const mouseY = state.pointer.y * 0.08;
    groupRef.current.rotation.y +=
      (mouseX - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x +=
      (-mouseY - groupRef.current.rotation.x) * 0.05;
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <pointLight
        position={[-4, 2, 3]}
        intensity={0.8}
        color="#e8a882"
      />
      <pointLight
        position={[4, -2, -3]}
        intensity={0.5}
        color="#c8622a"
      />

      <FloatingOrb
        position={[-2.5, 0.5, -1]}
        scale={1.1}
        color="#d4956b"
        speed={0.6}
      />
      <FloatingOrb
        position={[2.8, -0.3, -2]}
        scale={0.75}
        color="#c8622a"
        speed={0.8}
      />
      <FloatingOrb
        position={[0.5, 1.8, -3]}
        scale={0.5}
        color="#e8d5c4"
        speed={1.0}
      />

      <ParticleField />
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
      }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      dpr={[1, 1.5]}
    >
      <Scene />
    </Canvas>
  );
}