"use client";

import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PresentationControls, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function BeetrootLayers({ isHovered }: { isHovered: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Create 5 concentric layers
  const layers = useMemo(() => [
    { scale: 0.8, color: "hsl(340, 60%, 25%)", speed: 0.5 },
    { scale: 1.2, color: "hsl(340, 70%, 35%)", speed: 0.4 },
    { scale: 1.6, color: "hsl(340, 80%, 45%)", speed: 0.3 },
    { scale: 2.0, color: "hsl(340, 90%, 55%)", speed: 0.2 },
    { scale: 2.4, color: "hsl(340, 100%, 65%)", speed: 0.1 },
  ], []);

  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Slow rotation
    groupRef.current.rotation.y += 0.005;
    groupRef.current.rotation.z += 0.002;

    // Expand/Contract effect (Antigravity)
    const targetScale = isHovered ? 1.2 : 1.0;
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    
    // Animate individual layers
    groupRef.current.children.forEach((child, i) => {
      if (isHovered) {
        const expansion = (i + 1) * 0.1;
        child.position.y = Math.sin(state.clock.elapsedTime * 2 + i) * 0.1 + expansion;
      } else {
        child.position.y = Math.sin(state.clock.elapsedTime * 2 + i) * 0.1;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {layers.map((layer, i) => (
        <mesh key={i} scale={layer.scale}>
          <torusGeometry args={[1, 0.05, 16, 100]} />
          <MeshDistortMaterial 
            color={new THREE.Color(layer.color)} 
            speed={layer.speed * 2} 
            distort={0.3} 
            radius={1}
          />
        </mesh>
      ))}
      {/* Central core */}
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <MeshDistortMaterial 
          color={new THREE.Color("hsl(340, 100%, 75%)")} 
          speed={2} 
          distort={0.4}
        />
      </mesh>
    </group>
  );
}

export function Hero3D() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative w-full h-[600px] lg:h-[800px] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 cursor-pointer z-10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
      
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        className="w-full h-full"
      >
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={2} />
        <pointLight position={[-10, -10, -10]} color="hsl(340, 100%, 50%)" intensity={1} />
        
        <PresentationControls
          global
          config={{ mass: 2, tension: 500 }}
          snap={{ mass: 4, tension: 1500 }}
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 3, Math.PI / 3]}
          azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
        >
          <Float
            speed={2}
            rotationIntensity={1.5}
            floatIntensity={2}
          >
            <BeetrootLayers isHovered={isHovered} />
          </Float>
        </PresentationControls>
      </Canvas>
    </div>
  );
}
