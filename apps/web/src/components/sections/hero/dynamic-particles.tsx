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
  const clockRef = useRef(0);
  const ringInfluence = useRef(0);
  const count = 6000;

  // Global background distribution
  const basePos = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 45; // Wide spread
      pos[i * 3 + 1] = (Math.random() - 0.5) * 35;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return pos;
  }, []);

  // Multi-layered beetroot ring distribution
  const ringData = useMemo(() => {
    const angles = new Float32Array(count);
    const radii = new Float32Array(count);
    const layers = 5;
    for (let i = 0; i < count; i++) {
      const layer = i % layers;
      angles[i] = Math.random() * Math.PI * 2;
      radii[i] = (layer + 1) * 1.6 + (Math.random() - 0.5) * 0.3;
    }
    return { angles, radii };
  }, []);

  // Per-particle staggered delay for organic collapse
  const staggerData = useMemo(() => {
    const data = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      data[i] = Math.random();
    }
    return data;
  }, []);

  const livePos = useMemo(() => new Float32Array(basePos), [basePos]);

  const colors = useMemo(() => {
    const col = new Float32Array(count * 3);
    const palette = [
      new THREE.Color("#e33765"), // Brand Lite Red
      new THREE.Color("#a21c3c"), // Brand Red
    ];
    for (let i = 0; i < count; i++) {
      const c = palette[Math.floor(Math.random() * palette.length)]!;
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
    }
    return col;
  }, []);

  const mousePos = useRef({ x: 0, y: 0 });
  const mouseVel = useRef({ x: 0, y: 0 });

  const stationaryClock = useRef(0);

  const targetRotation = useRef({ x: 0.6, y: 0.8 });
  const wasMoving = useRef(false);

  useFrame((state, delta) => {
    if (!pointsRef.current || !mouseRef.current) return;
    clockRef.current += delta;
    const t = clockRef.current;

    // Calculate mouse velocity and smoothed position
    const { width, height } = state.viewport;
    const curMx = (mouseRef.current.x * width) / 2;
    const curMy = (-mouseRef.current.y * height) / 2;

    mouseVel.current.x = THREE.MathUtils.lerp(mouseVel.current.x, (curMx - mousePos.current.x), 0.1);
    mouseVel.current.y = THREE.MathUtils.lerp(mouseVel.current.y, (curMy - mousePos.current.y), 0.1);
    mousePos.current.x = THREE.MathUtils.lerp(mousePos.current.x, curMx, 0.1);
    mousePos.current.y = THREE.MathUtils.lerp(mousePos.current.y, curMy, 0.1);

    const isMoving = !!isMovingRef.current;
    const targetInfluence = isMoving ? 0 : 1;

    // Randomize angle on every stop
    if (wasMoving.current && !isMoving) {
      targetRotation.current.x = 0.3 + Math.random() * 0.6;
      targetRotation.current.y = (Math.random() - 0.5) * 1.0;
    }
    wasMoving.current = isMoving;

    if (!isMoving) {
      stationaryClock.current += delta;
    } else {
      stationaryClock.current = 0;
    }

    // Further slowed stationary creation (0.025), fast collapse (0.12)
    ringInfluence.current = THREE.MathUtils.lerp(ringInfluence.current, targetInfluence, isMoving ? 0.12 : 0.025);

    const geo = pointsRef.current.geometry;
    const posAttr = geo.getAttribute("position") as THREE.BufferAttribute;
    const globalInfluence = ringInfluence.current;

    for (let i = 0; i < count; i++) {
      const ix = i * 3, iy = i * 3 + 1, iz = i * 3 + 2;

      const stagger = staggerData[i]!;
      let pInfluence;

      if (stagger < 0.9) {
        // Super fast initial 90%
        pInfluence = THREE.MathUtils.clamp((globalInfluence - stagger * 0.3) / 0.7, 0, 1);
      } else {
        // Last 10% still take time but faster now (30s)
        const slowProgress = THREE.MathUtils.clamp(stationaryClock.current / 30, 0, 1);
        pInfluence = globalInfluence > 0.9 ? slowProgress : 0;
      }

      // Smooth Trailing
      const lag = 0.05 + stagger * 0.4;
      const mx = mousePos.current.x - mouseVel.current.x * lag * 40;
      const my = mousePos.current.y - mouseVel.current.y * lag * 40;

      const spinAngle = t * 0.08 + i * 0.01;
      const dx_base = basePos[ix]!;
      const dy_base = basePos[iy]!;
      const rotX = dx_base * Math.cos(spinAngle) - dy_base * Math.sin(spinAngle);
      const rotY = dx_base * Math.sin(spinAngle) + dy_base * Math.cos(spinAngle);

      const driftX = rotX + Math.sin(t * 0.18 + i) * 1.5;
      const driftY = rotY + Math.cos(t * 0.15 + i) * 1.2;
      const driftZ = basePos[iz]! + Math.sin(t * 0.2 + i) * 0.8;

      const dx = mx - driftX;
      const dy = my - driftY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const fieldRadius = 18;
      const magneticForce = Math.max(0, 1 - dist / fieldRadius);

      const attractX = driftX + dx * magneticForce * 0.9;
      const attractY = driftY + dy * magneticForce * 0.9;

      const ringX = mousePos.current.x + Math.cos(ringData.angles[i]! + t * 0.2) * ringData.radii[i]!;
      const ringY = mousePos.current.y + Math.sin(ringData.angles[i]! + t * 0.2) * ringData.radii[i]!;

      livePos[ix] = THREE.MathUtils.lerp(attractX, ringX, pInfluence);
      livePos[iy] = THREE.MathUtils.lerp(attractY, ringY, pInfluence);
      livePos[iz] = THREE.MathUtils.lerp(driftZ, 0, pInfluence);
    }

    posAttr.needsUpdate = true;

    // Dynamic perspective tilt
    pointsRef.current.rotation.x = THREE.MathUtils.lerp(pointsRef.current.rotation.x, targetRotation.current.x, 0.08);
    pointsRef.current.rotation.y = THREE.MathUtils.lerp(pointsRef.current.rotation.y, targetRotation.current.y, 0.08);
  });

  return (
    <Points ref={pointsRef} positions={livePos} colors={colors} stride={3}>
      <PointMaterial transparent vertexColors size={0.08} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
    </Points>
  );
}
