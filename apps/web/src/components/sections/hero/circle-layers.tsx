"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { MeshDistortMaterial } from "@react-three/drei";

interface CircleLayersProps {
  mouseRef: React.RefObject<{ x: number; y: number }>;
  isMovingRef: React.RefObject<boolean>;
}

function GlowingRing({ radius, t, i, mouseRef }: { radius: number, t: number, i: number, mouseRef: React.RefObject<{ x: number, y: number }> }) {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    // Slow organic rotation + mouse inertia
    const mouseX = mouseRef.current?.x ?? 0;
    const mouseY = mouseRef.current?.y ?? 0;

    const autoX = Math.sin(t * (0.05 + i * 0.02)) * 0.2 + (mouseY * 0.15);
    const autoY = (t * (0.03 + i * 0.01)) + (mouseX * 0.2);
    const autoZ = Math.cos(t * 0.04) * 0.1;
    
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, autoX, 0.05);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, autoY, 0.05);
    meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, autoZ, 0.05);
    
    // Breathing scale
    const s = 1 + Math.sin(t * 0.2 + i * 0.5) * 0.03;
    meshRef.current.scale.set(s, s, s);
  });

  const colors = ["#e33765", "#a21c3c", "#91a93e"];
  const color = colors[i % colors.length]!;

  return (
    <group ref={meshRef}>
      {/* Outer Ring */}
      <mesh>
        <ringGeometry args={[radius - 0.08, radius, 128]} />
        <meshBasicMaterial color={color} transparent opacity={0.35} side={THREE.DoubleSide} />
      </mesh>
      {/* Inner Decorative Ring */}
      <mesh position={[0, 0, 0.05]}>
        <ringGeometry args={[radius - 0.4, radius - 0.35, 128]} />
        <meshBasicMaterial color={color} transparent opacity={0.15} side={THREE.DoubleSide} />
      </mesh>
      {/* Center Glow */}
      <mesh>
        <ringGeometry args={[0, radius, 128]} />
        <meshBasicMaterial color={color} transparent opacity={0.02} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

export function CircleLayers({ mouseRef, isMovingRef }: CircleLayersProps) {
  const groupRef = useRef<THREE.Group>(null);
  const clockRef = useRef(0);
  const layers = [3, 6, 9, 12, 15];

  useFrame((state, delta) => {
    if (!groupRef.current || !mouseRef.current) return;
    clockRef.current += delta;
  });

  return (
    <group ref={groupRef}>
      {layers.map((r, i) => (
        <GlowingRing key={i} radius={r} t={clockRef.current} i={i} mouseRef={mouseRef} />
      ))}
    </group>
  );
}
