"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Icosahedron, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

function SignatureShape() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    // Idle rotation
    meshRef.current.rotation.y += delta * 0.3; // ~18s full rotation
    
    // Gentle vertical bob
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.15;
    
    // Desktop pointer parallax (damping)
    // Map mouse [-1, 1] to max ~8 degrees (0.14 radians)
    const targetRotationX = (state.pointer.y * Math.PI) / 24; 
    const targetRotationZ = -(state.pointer.x * Math.PI) / 24;
    
    meshRef.current.rotation.x += (targetRotationX - meshRef.current.rotation.x) * 0.1;
    meshRef.current.rotation.z += (targetRotationZ - meshRef.current.rotation.z) * 0.1;
  });

  return (
    <Icosahedron ref={meshRef} args={[1, 1]} position={[0, 0, 0]}>
      <meshStandardMaterial 
        color="#B15E37" 
        roughness={0.8}
        metalness={0.1}
        flatShading={true}
      />
    </Icosahedron>
  );
}

export default function Hero3D() {
  // Respect prefers-reduced-motion
  const prefersReducedMotion = typeof window !== "undefined" 
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches 
    : false;

  return (
    <div style={{ width: "100%", height: "100%", minHeight: "300px" }} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 35 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 4, 5]} intensity={0.8} />
        <directionalLight position={[-3, -4, -5]} intensity={0.2} />
        
        {!prefersReducedMotion ? (
          <SignatureShape />
        ) : (
          <Icosahedron args={[1, 1]} position={[0, 0, 0]} rotation={[0.5, 0.5, 0]}>
             <meshStandardMaterial 
              color="#B15E37" 
              roughness={0.8}
              metalness={0.1}
              flatShading={true}
            />
          </Icosahedron>
        )}
        
        <ContactShadows 
          position={[0, -1.4, 0]} 
          opacity={0.4} 
          scale={5} 
          blur={2.5} 
          far={4} 
          color="#B15E37" 
        />
      </Canvas>
    </div>
  );
}
