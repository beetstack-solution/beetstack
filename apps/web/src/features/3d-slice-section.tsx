"use client";

import React, { useRef, useState, useCallback } from "react";
import { Canvas, useFrame, ThreeEvent } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import {
  motion,
  AnimatePresence,
  useScroll,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";
import * as THREE from "three";

// ─── Services ─────────────────────────────────────────────────────────────────
const SERVICES = [
  { id: 0, tag: "AI / ML",        title: "AI & Automation",     description: "LLM integrations, intelligent pipelines and workflow automation that multiply your output." },
  { id: 1, tag: "Security",       title: "Security & IAM",       description: "Zero-trust architectures, identity management and end-to-end encryption for critical systems." },
  { id: 2, tag: "Cloud & DevOps", title: "Cloud Infrastructure", description: "Multi-cloud ecosystems engineered for 99.9% uptime, auto-scaling and cost intelligence." },
  { id: 3, tag: "Architecture",   title: "Enterprise Software",  description: "Monorepo-first platforms that unify your corporate stack from microservices to full-stack." },
  { id: 4, tag: "Engineering",    title: "Product Engineering",  description: "Full-cycle product delivery — design systems, QA and iterative, data-driven launch." },
  { id: 5, tag: "Design",         title: "UI / UX Design",       description: "Premium accessible interfaces with micro-animations and design tokens at scale." },
];

const ROW1_ITEMS = ["Layers Of Solutions"];

// ─── Ring definitions ─────────────────────────────────────────────────────────
const RINGS = [
  { inner: 0.000, outer: 0.095, color: "#9b1030" },
  { inner: 0.095, outer: 0.185, color: "#e33765" },
  { inner: 0.185, outer: 0.285, color: "#a21c3c" },
  { inner: 0.285, outer: 0.375, color: "#e33765" },
  { inner: 0.375, outer: 0.475, color: "#a21c3c" },
  { inner: 0.475, outer: 0.565, color: "#e33765" },
  { inner: 0.565, outer: 0.665, color: "#a21c3c" },
  { inner: 0.665, outer: 0.755, color: "#e33765" },
  { inner: 0.755, outer: 0.845, color: "#a21c3c" },
] as const;

const HOVER_COLOR  = "#ff003c"; // brighter hover highlight
const SLICE_HEIGHT = 0.18;
const RADIUS_SCALE = 3.5;

function ringToService(i: number) {
  return Math.min(Math.floor((i / RINGS.length) * SERVICES.length), SERVICES.length - 1);
}

// ─── Ring Band — flat meshBasicMaterial (no lighting) ─────────────────────────
interface RingBandProps {
  inner: number; outer: number; color: string;
  serviceIndex: number; isHovered: boolean;
  onPointerEnter: (idx: number, e: ThreeEvent<PointerEvent>) => void;
  onPointerLeave: () => void;
  onPointerMove: (e: ThreeEvent<PointerEvent>) => void;
}

function RingBand({ inner, outer, color, serviceIndex, isHovered, onPointerEnter, onPointerLeave, onPointerMove }: RingBandProps) {
  const iR = inner * RADIUS_SCALE;
  const oR = outer * RADIUS_SCALE;
  const h  = SLICE_HEIGHT;
  const S  = 128;
  const c  = isHovered ? HOVER_COLOR : color;
  const stop = (fn: (e: ThreeEvent<PointerEvent>) => void) => (e: ThreeEvent<PointerEvent>) => { e.stopPropagation(); fn(e); };

  return (
    <group
      onPointerEnter={stop((e) => onPointerEnter(serviceIndex, e))}
      onPointerLeave={stop(() => onPointerLeave())}
      onPointerMove={stop((e) => onPointerMove(e))}
    >
      {/* Top face */}
      <mesh position={[0, h / 2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[iR, oR, S]} />
        <meshBasicMaterial color={c} side={THREE.FrontSide} />
      </mesh>
      {/* Bottom face */}
      <mesh position={[0, -h / 2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[iR, oR, S]} />
        <meshBasicMaterial color={c} side={THREE.FrontSide} />
      </mesh>
      {/* Outer wall */}
      <mesh>
        <cylinderGeometry args={[oR, oR, h, S, 1, true]} />
        <meshBasicMaterial color={c} side={THREE.FrontSide} />
      </mesh>
      {/* Inner wall */}
      {iR > 0.02 && (
        <mesh>
          <cylinderGeometry args={[iR, iR, h, S, 1, true]} />
          <meshBasicMaterial color={c} side={THREE.BackSide} />
        </mesh>
      )}
    </group>
  );
}

// ─── Beetroot Slice ────────────────────────────────────────────────────────────
interface SliceProps {
  hoveredRing: number | null;
  onPointerEnter: (idx: number, e: ThreeEvent<PointerEvent>) => void;
  onPointerLeave: () => void;
  onPointerMove: (e: ThreeEvent<PointerEvent>) => void;
  isInteracting: React.MutableRefObject<boolean>;
  scrollSpeedRef: React.MutableRefObject<number>;
}

function BeetrootSlice({ hoveredRing, onPointerEnter, onPointerLeave, onPointerMove, isInteracting, scrollSpeedRef }: SliceProps) {
  const groupRef  = useRef<THREE.Group>(null);
  const elapsed   = useRef(0);
  // Track accumulated Y rotation independently so it truly never stops
  const yRotRef   = useRef(0);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    elapsed.current += delta;
    const t = elapsed.current;

    // ── Continuous Y spin — NEVER stops ──────────────────────────────────────
    const scrollBoost = Math.min(Math.abs(scrollSpeedRef.current) * 0.0003, 0.5);
    // Multi-period speed modulation: two overlapping sine waves → irregular organic feel
    const speedMod = 1
      + Math.sin(t * 0.7)  * 0.40   // primary variation (±40% on ~9s cycle)
      + Math.sin(t * 1.9)  * 0.15;  // secondary flutter
    const ySpeed = (0.055 + scrollBoost) * Math.max(speedMod, 0.3);
    yRotRef.current += ySpeed * delta;
    groupRef.current.rotation.x = yRotRef.current;

    // ── X tilt — 120° base + oscillation (±14°) ──────────────────────────────
    // 120° = 2.094 rad — tilts the slice dramatically so rings face the viewer
    const BASE_Y = (90 * Math.PI) / 180; // 2.094 rad
    groupRef.current.rotation.y = BASE_Y + Math.sin(t * 0.5) * 0.24;

    // ── Z precession — gyroscope-like wobble (±5°) ────────────────────────────
    groupRef.current.rotation.z =
      Math.sin(t * 0.35) * 0.09
      + Math.sin(t * 1.1) * 0.03; // secondary high-freq flutter

    // ── Y float — dual sine for irregular bobbing ─────────────────────────────
    groupRef.current.position.y =
      Math.sin(t * 0.45) * 0.10
      + Math.sin(t * 1.2) * 0.03;

    // ── Scale breathing — gentle pulse (±4%) ─────────────────────────────────
    const s = 1 + Math.sin(t * 0.6) * 0.04;
    groupRef.current.scale.set(s, s, s);
  });

  return (
    <group ref={groupRef}>
      {RINGS.map((r, i) => (
        <RingBand key={i}
          inner={r.inner} outer={r.outer} color={r.color}
          serviceIndex={ringToService(i)} isHovered={hoveredRing === i}
          onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave} onPointerMove={onPointerMove}
        />
      ))}
    </group>
  );
}

// ─── Scene — no point lights, just minimal ambient for flat look ───────────────
function Scene({ onHover, scrollSpeedRef }: { onHover: (idx: number | null, x: number, y: number) => void; scrollSpeedRef: React.MutableRefObject<number> }) {
  const [hoveredRing, setHoveredRing] = useState<number | null>(null);
  const isInteracting = useRef(false);

  const handleEnter = useCallback((idx: number, e: ThreeEvent<PointerEvent>) => {
    setHoveredRing(idx);
    onHover(ringToService(idx), e.nativeEvent.clientX, e.nativeEvent.clientY);
  }, [onHover]);
  const handleLeave = useCallback(() => { setHoveredRing(null); onHover(null, 0, 0); }, [onHover]);
  const handleMove  = useCallback((e: ThreeEvent<PointerEvent>) => {
    if (hoveredRing !== null) onHover(ringToService(hoveredRing), e.nativeEvent.clientX, e.nativeEvent.clientY);
  }, [hoveredRing, onHover]);

  return (
    <>
      {/* meshBasicMaterial ignores all lights — but keep one ambient so hover glow can work */}
      <ambientLight intensity={0} />

      <OrbitControls
        enableZoom={false} enablePan={false}
        maxPolarAngle={Math.PI * 0.70} minPolarAngle={Math.PI * 0.15}
        dampingFactor={0.05} enableDamping rotateSpeed={0.45}
        onStart={() => { isInteracting.current = true; }}
        onEnd={()   => { isInteracting.current = false; }}
      />
      <BeetrootSlice
        hoveredRing={hoveredRing}
        onPointerEnter={handleEnter} onPointerLeave={handleLeave} onPointerMove={handleMove}
        isInteracting={isInteracting} scrollSpeedRef={scrollSpeedRef}
      />
    </>
  );
}

// ─── Velocity Marquee ─────────────────────────────────────────────────────────
//  scrollDirRef: 1 = scrolling down (or was last scrolling down)
//               -1 = scrolling up
//  rowSign:  +1 → follows scroll direction (Row1)
//            -1 → opposes scroll direction (Row2)
//
//  Scroll DOWN:  Row1 → RIGHT,  Row2 → LEFT
//  Scroll UP:    Row1 → LEFT,   Row2 → RIGHT
//  Always moving — AUTO drift in whatever the current direction is.
//
function VelocityMarquee({
  items,
  rowSign,
  scrollDirRef,
  scrollRawRef,
  outlined = false,   // when true: transparent fill + brand-red stroke
}: {
  items: string[];
  rowSign: 1 | -1;
  scrollDirRef: React.MutableRefObject<number>;
  scrollRawRef: React.MutableRefObject<number>;
  outlined?: boolean;
}) {
  const innerRef = useRef<HTMLDivElement>(null);
  const posRef   = useRef<number>(0);

  useAnimationFrame((_, delta) => {
    if (!innerRef.current) return;

    const W   = innerRef.current.scrollWidth / 4;
    const dt  = delta / 1000;
    const dir = scrollDirRef.current;
    const v   = Math.abs(scrollRawRef.current);

    const AUTO  = 45;
    const boost = Math.min(v * 0.35, 600);
    const speed = rowSign * dir * (AUTO + boost);

    posRef.current += speed * dt;

    if (posRef.current <= -W) posRef.current += W;
    if (posRef.current >=  0) posRef.current -= W;

    innerRef.current.style.transform = `translateX(${posRef.current}px)`;
  });

  const quad = [...items, ...items, ...items, ...items];

  // Outlined style: transparent fill + brand-red border via -webkit-text-stroke
  const outlinedTextStyle: React.CSSProperties = outlined
    ? { color: "transparent", WebkitTextStroke: "2.5px var(--brand-lite-red)" }
    : {};

  const outlinedDotStyle: React.CSSProperties = outlined
    ? { color: "transparent", WebkitTextStroke: "1px var(--brand-red)", opacity: 0.5 }
    : { opacity: 0.4 };

  return (
    <div
      className="overflow-hidden w-full pointer-events-none"
      style={{ maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)" }}
    >
      <div ref={innerRef} className="inline-flex items-center" style={{ whiteSpace: "nowrap", gap: "3.5rem" }}>
        {quad.map((item, i) =>
          item === "·" ? (
            <span key={i} className="text-brand-red select-none" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", ...outlinedDotStyle }}>·</span>
          ) : (
            <span
              key={i}
              className="font-heading font-medium uppercase select-none text-brand-lite-red"
              style={{ fontSize: "clamp(15rem, 5vw, 4.5rem)", letterSpacing: "-0.02em", lineHeight: 1, ...outlinedTextStyle }}
            >
              {item}
            </span>
          )
        )}
      </div>
    </div>
  );
}

// ─── Service Tooltip ──────────────────────────────────────────────────────────
function ServiceTooltip({ service, x, y }: { service: (typeof SERVICES)[0] | null; x: number; y: number }) {
  return (
    <AnimatePresence>
      {service && (
        <motion.div
          key={service.id}
          initial={{ opacity: 0, scale: 0.88, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.88, y: 8 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="pointer-events-none fixed z-[999]"
          style={{ left: x + 22, top: y - 20 }}
        >
          <div className="relative rounded-2xl border border-brand-lite-red/30 bg-background/92 backdrop-blur-2xl shadow-2xl shadow-brand-lite-red/15 px-5 py-4 max-w-[260px]">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-lite-red/8 via-transparent to-brand-red/4 pointer-events-none" />
            <span className="inline-block text-[10px] font-heading font-bold uppercase tracking-widest text-brand-lite-red mb-2 px-2.5 py-0.5 rounded-full bg-brand-lite-red/10 border border-brand-lite-red/20">
              {service.tag}
            </span>
            <h3 className="text-sm font-heading font-bold text-foreground mb-1.5 leading-tight">{service.title}</h3>
            <p className="text-[11px] text-muted-foreground leading-relaxed">{service.description}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export function SliceSection() {
  const [hovered, setHovered] = useState<{ index: number; x: number; y: number } | null>(null);

  const { scrollY }   = useScroll();
  const rawVel        = useVelocity(scrollY);

  // scrollDirRef: +1 = scrolling DOWN (Row1 right, Row2 left)
  //               -1 = scrolling UP   (Row1 left,  Row2 right)
  // Only flips when velocity crosses ±30 threshold to avoid flicker.
  const scrollDirRef  = useRef<number>(1);
  const scrollRawRef  = useRef<number>(0); // raw velocity magnitude for speed boost
  const scrollSpeedRef = useRef<number>(0); // for 3D slice spin

  useAnimationFrame(() => {
    const v = rawVel.get();
    scrollRawRef.current  = v;
    scrollSpeedRef.current = v;
    if (v > 30)  scrollDirRef.current =  1; // down
    if (v < -30) scrollDirRef.current = -1; // up
  });

  const handleHover = useCallback((index: number | null, x: number, y: number) => {
    setHovered(index === null ? null : { index, x, y });
  }, []);
  const activeService = hovered !== null ? (SERVICES[hovered.index] ?? null) : null;

  return (
    <section id="expertise" className="relative overflow-hidden h-full">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  rounded-full bg-brand-red/[0.06] blur-[110px]" />
      </div>

      {/* Stacked container */}
      <div className="relative w-full" style={{ height: "clamp(480px, 60vw, 640px)" }}>
        <div className="absolute left-0 right-0 z-0" style={{ top: "30%" }}>
          <VelocityMarquee
            items={ROW1_ITEMS}
            rowSign={-1}
            scrollDirRef={scrollDirRef}
            scrollRawRef={scrollRawRef}
          />
        </div>
        <div className="absolute left-0 right-0 z-20" style={{ top: "30%" }}>
          <VelocityMarquee
            items={ROW1_ITEMS}
            rowSign={-1}
            scrollDirRef={scrollDirRef}
            scrollRawRef={scrollRawRef}
            outlined
          />
        </div>

        {/* 3D Canvas — on top */}
        <div className="absolute inset-0 z-10" style={{ cursor: hovered ? "none" : "grab" }}>
          <Canvas
            camera={{ position: [0, 1.2, 10], fov: 44 }}
            gl={{ antialias: true, alpha: true }}
            style={{ background: "transparent", width: "100%", height: "100%" }}
          >
            <Scene onHover={handleHover} scrollSpeedRef={scrollSpeedRef} />
          </Canvas>
        </div>
      </div>

      <ServiceTooltip service={activeService} x={hovered?.x ?? 0} y={hovered?.y ?? 0} />
    </section>
  );
}
