"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Icons } from "@beetstack/icons";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";

import { TECHS } from "../data";

function BeetrootBadge({ tech, index }: { tech: (typeof TECHS)[number]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const Icon = Icons[tech.iconKey];

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
      <motion.div
        animate={hovered ? { scale: 1.13, rotate: 10 } : { scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 350, damping: 22 }}
        className="relative w-[88px] h-[88px]"
      >
        <svg viewBox="0 0 88 88" className="absolute inset-0 w-full h-full" fill="none">
          <circle cx="44" cy="44" r="42" stroke="#a21c3c" strokeWidth="3.5" />
          <circle cx="44" cy="44" r="33" stroke="#e33765" strokeWidth="2" opacity={hovered ? 0.9 : 0.35} />
          <circle cx="44" cy="44" r="24" stroke="#a21c3c" strokeWidth="1.5" opacity={hovered ? 0.8 : 0.2} />
        </svg>

        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, ${tech.glow} 0%, transparent 68%)`,
            filter: "blur(6px)",
          }}
        />

        <div className="absolute inset-0 flex items-center justify-center p-5">
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

export function TechStackSection() {
  const [showAll, setShowAll] = useState(false);
  
  // Show exactly 8 items initially (~30% of 24) to hide ~70% as requested
  const initialItemsCount = 8;
  const displayedTechs = showAll ? TECHS : TECHS.slice(0, initialItemsCount);

  return (
    <section id="expertise" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-brand-red/[0.05] blur-[130px]" />
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        {([380, 550, 720, 900] as const).map((size, i) => (
          <motion.div
            key={size}
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

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6 gap-x-8 gap-y-12 place-items-center">
          <AnimatePresence mode="popLayout">
            {displayedTechs.map((tech, i) => (
              <BeetrootBadge key={tech.name} tech={tech} index={i} />
            ))}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="flex flex-col items-center justify-center mt-16 space-y-8"
        >
          <div className="flex items-center justify-center gap-4 w-full">
            <div className="h-px flex-1 max-w-[150px] bg-gradient-to-r from-transparent to-brand-red/30" />
            <button
              onClick={() => setShowAll(!showAll)}
              className="group relative px-8 py-3 rounded-full border border-brand-red/20 bg-brand-red/5 hover:bg-brand-red/10 transition-all duration-300"
            >
              <span className="text-[11px] font-heading font-bold uppercase tracking-[0.2em] text-brand-lite-red group-hover:text-brand-red transition-colors flex items-center gap-2">
                {showAll ? "Show Less" : `View All (${TECHS.length})`}
                <Icons.ChevronDown className={`w-3 h-3 transition-transform duration-300 ${showAll ? "rotate-180" : ""}`} />
              </span>
            </button>
            <div className="h-px flex-1 max-w-[150px] bg-gradient-to-l from-transparent to-brand-red/30" />
          </div>
          
          {!showAll && (
            <span className="text-[10px] font-heading font-semibold uppercase tracking-[0.3em] text-brand-red/40 animate-pulse">
              + Discover our full ecosystem
            </span>
          )}
        </motion.div>
      </div>
    </section>
  );
}
