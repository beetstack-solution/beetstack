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

  // Particle positions
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

  // Per-particle blink: random phase & speed for each particle
  const blinkData = useMemo(() => {
    const phase = new Float32Array(count);
    const speed = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      phase[i] = Math.random() * Math.PI * 2;
      speed[i] = 0.6 + Math.random() * 1.8; // blink cycles per second
    }
    return { phase, speed };
  }, []);

  // Vertex colors
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

  // Mutable color buffer so we can animate per-particle brightness
  const liveColors = useMemo(() => new Float32Array(colors), [colors]);

  useFrame((_, delta) => {
    if (!pointsRef.current || !mouseRef.current) return;

    clockRef.current += delta;
    const t = clockRef.current;

    // ── Blink: modulate each particle's brightness via color brightness ──
    const geo = pointsRef.current.geometry;
    for (let i = 0; i < count; i++) {
      // Smooth sine blink: value oscillates between 0.25 and 1.0
      const blink = 0.25 + 0.75 * (0.5 + 0.5 * Math.sin(blinkData.phase[i]! + t * blinkData.speed[i]!));
      liveColors[i * 3]     = colors[i * 3]!     * blink;
      liveColors[i * 3 + 1] = colors[i * 3 + 1]! * blink;
      liveColors[i * 3 + 2] = colors[i * 3 + 2]! * blink;
    }
    const colorAttr = geo.getAttribute("color") as THREE.BufferAttribute;
    colorAttr.array = liveColors;
    colorAttr.needsUpdate = true;

    // ── Rotation: lean TOWARD cursor direction ──
    // Positive mouse.x → rotate y toward positive (lean right), etc.
    const targetX =  mouseRef.current.y * 0.35;
    const targetY =  mouseRef.current.x * 0.45;

    if (isMovingRef.current) {
      pointsRef.current.rotation.x = THREE.MathUtils.lerp(pointsRef.current.rotation.x, targetX, 0.08);
      pointsRef.current.rotation.y = THREE.MathUtils.lerp(pointsRef.current.rotation.y, targetY, 0.08);
      finalTarget.current.x = pointsRef.current.rotation.x;
      finalTarget.current.y = pointsRef.current.rotation.y;
    } else {
      // Idle: gentle autonomous drift + slowly settle toward last cursor position
      const driftX = finalTarget.current.x + Math.sin(t * 0.18) * 0.06;
      const driftY = finalTarget.current.y + Math.cos(t * 0.13) * 0.06;
      pointsRef.current.rotation.x = THREE.MathUtils.lerp(pointsRef.current.rotation.x, driftX, 0.015);
      pointsRef.current.rotation.y = THREE.MathUtils.lerp(pointsRef.current.rotation.y, driftY, 0.015);
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
