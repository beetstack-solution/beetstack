"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Points, PointMaterial } from "@react-three/drei";

interface DynamicParticlesProps {
  mouseRef: React.RefObject<{ x: number; y: number }>;
  isMovingRef: React.RefObject<boolean>;
}

export function DynamicParticles({ mouseRef, isMovingRef }: DynamicParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const finalTarget = useRef({ x: 0, y: 0 });
  
  // Create 2500 particles with random positions and colors
  const count = 2500;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        // Distribute particles in a spherical/radial field
        const phi = Math.acos(-1 + (2 * i) / count);
        const theta = Math.sqrt(count * Math.PI) * phi;
        
        const r = 5 + Math.random() * 15; // Inner radius and variation
        
        pos[i * 3] = r * Math.cos(theta) * Math.sin(phi);
        pos[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
        pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  const colors = useMemo(() => {
    const col = new Float32Array(count * 3);
    const palette = [
      new THREE.Color("#4285F4"), // Blue
      // Beetroot Pink
      new THREE.Color("#E91E63"), // Pink
      new THREE.Color("#FBBC05"), // Orange
      new THREE.Color("#34A853"), // Green
    ];

    for (let i = 0; i < count; i++) {
      const color = palette[Math.floor(Math.random() * palette.length)]!;
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }
    return col;
  }, []);

  useFrame(() => {
    if (!pointsRef.current || !mouseRef.current) return;

    const targetX = mouseRef.current.y * 0.35;
    const targetY = mouseRef.current.x * 0.45;

    if (isMovingRef.current) {
      // Cursor moving: follow instantly
      pointsRef.current.rotation.x = targetX;
      pointsRef.current.rotation.y = targetY;
      finalTarget.current.x = targetX;
      finalTarget.current.y = targetY;
    } else {
      // Cursor stopped: slowly settle to last position
      pointsRef.current.rotation.x = THREE.MathUtils.lerp(
        pointsRef.current.rotation.x, finalTarget.current.x, 0.02
      );
      pointsRef.current.rotation.y = THREE.MathUtils.lerp(
        pointsRef.current.rotation.y, finalTarget.current.y, 0.02
      );
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} colors={colors} stride={3}>
      <PointMaterial
        transparent
        vertexColors
        size={0.08}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}
