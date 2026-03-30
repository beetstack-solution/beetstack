"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Icons } from "@beetstack/icons";
import Image from "next/image";

// ─── Tech stack config — iconKey is resolved at render time (avoids stale cache) ─
type IconKey = keyof typeof Icons;

const TECHS: { name: string; category: string; iconKey: IconKey; color: string; glow: string }[] = [
  { name: "Next.js", category: "Framework", iconKey: "Nextjs", color: "#DC382D", glow: "rgba(255,255,255,0.12)" },
  { name: "React", category: "UI Library", iconKey: "React", color: "#61DAFB", glow: "rgba(97,218,251,0.18)" },
  { name: "TypeScript", category: "Language", iconKey: "TypeScript", color: "#3178C6", glow: "rgba(49,120,198,0.22)" },
  { name: "Tailwind CSS", category: "Styling", iconKey: "Tailwind", color: "#38BDF8", glow: "rgba(56,189,248,0.18)" },
  { name: "Three.js", category: "3D / WebGL", iconKey: "ThreeJs", color: "#DC382D", glow: "rgba(255,255,255,0.10)" },
  { name: "Framer", category: "Animations", iconKey: "Framer", color: "#BB4BE8", glow: "rgba(187,75,232,0.18)" },
  { name: "Turborepo", category: "Monorepo", iconKey: "Turborepo", color: "#EF4444", glow: "rgba(239,68,68,0.18)" },
  { name: "Node.js", category: "Runtime", iconKey: "Nodejs", color: "#83CD29", glow: "rgba(131,205,41,0.18)" },
  { name: "PostgreSQL", category: "Database", iconKey: "Postgres", color: "#336791", glow: "rgba(51,103,145,0.22)" },
  { name: "Docker", category: "DevOps", iconKey: "Docker", color: "#2396ED", glow: "rgba(35,150,237,0.18)" },
  { name: "Prisma", category: "ORM", iconKey: "Prisma", color: "#a78bfa", glow: "rgba(167,139,250,0.18)" },
  { name: "Cloudflare", category: "Edge / CDN", iconKey: "Cloudflare", color: "#F38020", glow: "rgba(243,128,32,0.18)" },
  { name: "GraphQL", category: "API", iconKey: "GraphQL", color: "#E535AB", glow: "rgba(229,53,171,0.18)" },
  { name: "Redis", category: "Cache", iconKey: "Redis", color: "#DC382D", glow: "rgba(220,56,45,0.18)" },
  { name: "Vercel", category: "Deployment", iconKey: "Vercel", color: "#DC382D", glow: "rgba(255,255,255,0.10)" },
  { name: "NestJS", category: "Backend", iconKey: "NestJs", color: "#E0234E", glow: "rgba(224,35,78,0.18)" },
  { name: "MongoDB", category: "Database", iconKey: "MongoDB", color: "#47A248", glow: "rgba(71,162,72,0.18)" },
  { name: "Kubernetes", category: "Orchestration", iconKey: "Kubernetes", color: "#326CE5", glow: "rgba(50,108,229,0.18)" },
  { name: "Vite", category: "Build Tool", iconKey: "Vite", color: "#646CFF", glow: "rgba(100,108,255,0.18)" },
  { name: "pnpm", category: "Package Mgr", iconKey: "Pnpm", color: "#F69220", glow: "rgba(246,146,32,0.18)" },
  { name: "Git", category: "Version Ctrl", iconKey: "Git", color: "#F05032", glow: "rgba(240,80,50,0.18)" },
  { name: "ESLint", category: "Linting", iconKey: "ESLint", color: "#4B32C3", glow: "rgba(75,50,195,0.18)" },
  { name: "GCP", category: "Cloud", iconKey: "GoogleCloud", color: "#4285F4", glow: "rgba(66,133,244,0.18)" },
  { name: "OpenAI", category: "AI / LLM", iconKey: "OpenAI", color: "#DC382D", glow: "rgba(255,255,255,0.14)" },
];

// ─── Beetroot Ring Badge ───────────────────────────────────────────────────────
function BeetrootBadge({ tech, index }: { tech: (typeof TECHS)[number]; index: number }) {
  const [hovered, setHovered] = useState(false);
  // Resolve at render time — avoids stale module cache issues
  const Icon = (Icons as any)[tech.iconKey];

  return (
    <motion.div
      initial={{ opacity: 0, y: 36, scale: 0.82 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ delay: index * 0.06, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center gap-3 cursor-pointer select-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Image src={`/images/leef.png`} alt="Leef" width={50} height={50} className="-mb-2" />
      {/* Beetroot ring badge */}
      <motion.div
        animate={hovered ? { scale: 1.13, rotate: 10 } : { scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 350, damping: 22 }}
        className="relative"
        style={{ width: 88, height: 88 }}
      >
        {/* SVG concentric rings — brand palette */}
        <svg viewBox="0 0 88 88" className="absolute inset-0 w-full h-full" fill="none">
          {/* Outer ring — brand-red */}
          <circle cx="44" cy="44" r="42" stroke="#a21c3c" strokeWidth="3.5" />
          {/* Middle ring — brand-lite-red */}
          <circle cx="44" cy="44" r="33" stroke="#e33765" strokeWidth="2" opacity={hovered ? 0.9 : 0.35} />
          {/* Inner accent ring */}
          <circle cx="44" cy="44" r="24" stroke="#a21c3c" strokeWidth="1.5" opacity={hovered ? 0.8 : 0.2} />
        </svg>

        {/* Per-tech color glow */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, ${tech.glow} 0%, transparent 68%)`,
            filter: "blur(6px)",
          }}
        />

        {/* The icon */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ padding: 20 }}>
          <motion.div
            animate={hovered ? { scale: 1.18 } : { scale: 1 }}
            transition={{ type: "spring", stiffness: 350, damping: 22 }}
            className="w-full h-full flex items-center justify-center"
          >
            <Icon
              className="w-full h-full"
              style={{ color: tech.color, filter: hovered ? `drop-shadow(0 0 8px ${tech.glow})` : "none" }}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Name + category label */}
      <div className="text-center leading-none">
        <motion.p
          animate={{ color: hovered ? "#e33765" : "inherit" }}
          className="text-[11px] font-heading font-semibold uppercase tracking-widest text-foreground/75 transition-colors duration-200"
        >
          {tech.name}
        </motion.p>
        <p className="text-[9px] font-heading uppercase tracking-widest text-muted-foreground/45 mt-1">
          {tech.category}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function TechStackSection() {
  return (
    <section id="expertise" className="relative py-24 overflow-hidden">
      {/* Ambient beetroot glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-brand-red/[0.05] blur-[130px]" />
      </div>

      {/* Decorative rotating rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        {([380, 550, 720, 900] as const).map((size, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-brand-red"
            style={{ width: size, height: size }}
            animate={{ rotate: i % 2 === 0 ? 360 : -360, opacity: [0.04, 0.09, 0.04] }}
            transition={{
              rotate: { duration: 45 + i * 12, repeat: Infinity, ease: "linear" },
              opacity: { duration: 5, repeat: Infinity, repeatType: "reverse" },
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 space-y-3"
        >
          <p className="text-[11px] font-heading font-semibold uppercase tracking-[0.28em] text-brand-lite-red">
            Our Stack
          </p>
          <h2 className="text-5xl md:text-7xl font-heading font-medium tracking-tight">
            Tech Ecosystem
          </h2>
          <p className="text-muted-foreground text-sm max-w-sm mx-auto">
            Every ring of the Beetroot — a precision-chosen technology.
          </p>
        </motion.div>

        {/* Badge grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6 gap-x-8 gap-y-10 place-items-center">
          {TECHS.map((tech, i) => (
            <BeetrootBadge key={tech.name} tech={tech} index={i} />
          ))}
        </div>

        {/* Footer label */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex items-center justify-center gap-4 mt-16"
        >
          <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-transparent to-brand-red/30" />
          <span className="text-[10px] font-heading font-semibold uppercase tracking-[0.3em] text-brand-red/40">
            And many more
          </span>
          <div className="h-px flex-1 max-w-[100px] bg-gradient-to-l from-transparent to-brand-red/30" />
        </motion.div>
      </div>
    </section>
  );
}
