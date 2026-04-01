"use client";

import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { DynamicParticles } from "./dynamic-particles";

export function Hero3D() {
  const mouseRef = useRef({ x: 0, y: 0 });
  const isMovingRef = useRef(false);
  const stopTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouseRef.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    isMovingRef.current = true;

    if (stopTimerRef.current) clearTimeout(stopTimerRef.current);
    stopTimerRef.current = setTimeout(() => {
      isMovingRef.current = false;
    }, 200);
  };

  return (
    <div 
      className="relative w-full h-full flex items-center justify-center pointer-events-auto"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { isMovingRef.current = false; }}
    >
      <Canvas
        camera={{ position: [0, 0, 15], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        className="w-full h-full"
        style={{ pointerEvents: "none" }}
        shadows={false}
      >
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} intensity={2} />
        <DynamicParticles mouseRef={mouseRef} isMovingRef={isMovingRef} />
      </Canvas>
    </div>
  );
}
