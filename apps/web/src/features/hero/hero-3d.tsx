"use client";

import React, { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { DynamicParticles } from "./dynamic-particles";
import { useScroll, useTransform } from "framer-motion";

export function Hero3D() {
  const { scrollYProgress } = useScroll();
  const scrollScale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);

  const mouseRef = useRef({ x: 0, y: 0 });
  const isMovingRef = useRef(false);
  const stopTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to -1..1, centered on screen
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = (e.clientY / window.innerHeight) * 2 - 1; // no negation: up = negative, down = positive

      // Mark as moving
      isMovingRef.current = true;

      // Reset the stop timer on every move
      if (stopTimerRef.current) clearTimeout(stopTimerRef.current);
      stopTimerRef.current = setTimeout(() => {
        isMovingRef.current = false;
      }, 80); // after 80ms of no movement → idle drift
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (stopTimerRef.current) clearTimeout(stopTimerRef.current);
    };
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        className="w-full h-full"
        style={{ pointerEvents: "none" }}
      >
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} intensity={2} />
        <DynamicParticles mouseRef={mouseRef} isMovingRef={isMovingRef} />
      </Canvas>
    </div>
  );
}
