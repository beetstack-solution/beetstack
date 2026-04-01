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
  const clockRef = useRef(0);
  const count = 2500;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const r = 5 + Math.random() * 15;
      pos[i * 3]     = r * Math.cos(theta) * Math.sin(phi);
      pos[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  const blinkData = useMemo(() => {
    const phase = new Float32Array(count);
    const speed = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      phase[i] = Math.random() * Math.PI * 2;
      speed[i] = 0.6 + Math.random() * 1.8;
    }
    return { phase, speed };
  }, []);

  const colors = useMemo(() => {
    const col = new Float32Array(count * 3);
    const palette = [
      new THREE.Color("#4285F4"),
      new THREE.Color("#e33765"),
      new THREE.Color("#FBBC05"),
      new THREE.Color("#a21c3c"),
      new THREE.Color("#91a93e"),
    ];
    for (let i = 0; i < count; i++) {
      const color = palette[Math.floor(Math.random() * palette.length)]!;
      col[i * 3]     = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }
    return col;
  }, []);

  const liveColors = useMemo(() => new Float32Array(colors), [colors]);

  const intensity = useRef(0);
  
  useFrame((state, delta) => {
    if (!pointsRef.current || !mouseRef.current) return;

    // Smoothly transition intensity based on cursor movement
    intensity.current = THREE.MathUtils.lerp(intensity.current, isMovingRef.current ? 1 : 0.35, 0.05);
    
    // Always increment clock for auto-motion
    clockRef.current += delta;
    const t = clockRef.current;
    const geo = pointsRef.current.geometry;

    // Pulse colors based on intensity and blink phases
    for (let i = 0; i < count; i++) {
      const blinkBase = 0.5 + 0.5 * Math.sin(blinkData.phase[i]! + t * blinkData.speed[i]!);
      const blink = (0.3 + 0.7 * blinkBase) * intensity.current;
      liveColors[i * 3]     = colors[i * 3]!     * blink;
      liveColors[i * 3 + 1] = colors[i * 3 + 1]! * blink;
      liveColors[i * 3 + 2] = colors[i * 3 + 2]! * blink;
    }
    
    const colorAttr = geo.getAttribute("color") as THREE.BufferAttribute;
    colorAttr.needsUpdate = true;

    // Calculate rotation targets
    const targetX = mouseRef.current.y * 0.35;
    const targetY = mouseRef.current.x * 0.45;

    // Base auto-rotation
    const autoX = Math.sin(t * 0.15) * 0.2;
    const autoY = t * 0.1;

    if (isMovingRef.current) {
      pointsRef.current.rotation.x = THREE.MathUtils.lerp(pointsRef.current.rotation.x, targetX + autoX, 0.08);
      pointsRef.current.rotation.y = THREE.MathUtils.lerp(pointsRef.current.rotation.y, targetY + autoY, 0.08);
      finalTarget.current.x = pointsRef.current.rotation.x - autoX;
      finalTarget.current.y = pointsRef.current.rotation.y - autoY;
    } else {
      const driftX = finalTarget.current.x + autoX + Math.sin(t * 0.3) * 0.05;
      const driftY = finalTarget.current.y + autoY + Math.cos(t * 0.2) * 0.05;
      pointsRef.current.rotation.x = THREE.MathUtils.lerp(pointsRef.current.rotation.x, driftX, 0.02);
      pointsRef.current.rotation.y = THREE.MathUtils.lerp(pointsRef.current.rotation.y, driftY, 0.02);
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} colors={liveColors} stride={3}>
      <PointMaterial
        transparent
        vertexColors
        size={0.09}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={1}
      />
    </Points>
  );
}
