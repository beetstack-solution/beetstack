"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const milestones = [
  { year: "2022", title: "Inception", description: "The Beetstack architecture is born from a desire for monorepo-first enterprise solutions." },
  { year: "2023", title: "Architectural Shift", description: "Successfully migrated 12+ legacy systems to our layered Beetroot-inspired ecosystem." },
  { year: "2024", title: "Scale Up", description: "Reached 10M+ end-users through our high-performance infrastructure layers." },
  { year: "2025", title: "3D Frontier", description: "Integrating immersive React-Three-Fiber experiences into corporate interfaces." },
  { year: "2026", title: "Beetstack Official", description: "The definitive standard for monorepo IT solutions." },
];

export function ExperienceSection() {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1.2]);

  return (
    <section className="py-24 relative overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-6 grid gap-24 lg:grid-cols-2 items-center">
        <motion.div
           initial={{ opacity: 0, x: -100 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1, ease: "easeOut" as const }}
           className="space-y-8"
        >
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-none">
            Deep Roots, <br />
            <span className="text-primary italic">Global Reach</span>
          </h2>
          <p className="text-muted-foreground text-xl max-w-lg leading-relaxed">
            Our journey is a testament to the <span className="text-foreground font-bold italic underline decoration-primary/50 underline-offset-8">Antigravity</span> growth 
            potential of a truly modular codebase. We build for the next decade, not just the next sprint.
          </p>
        </motion.div>

        <div className="relative space-y-16 py-12">
          {/* Vertical Progress Line */}
          <motion.div 
            style={{ scaleY: scrollYProgress, originY: 0 }}
            className="absolute left-[3.3rem] top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary/50 to-transparent rounded-full shadow-[0_0_20px_rgba(var(--primary),0.5)]"
          />
          
          {milestones.map((ms, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.2, duration: 0.8, ease: "easeOut" as const }}
              className="flex items-start gap-12 group"
            >
              <div className="relative z-10 w-28 h-28 shrink-0 rounded-[2rem] bg-primary/10 border-4 border-background flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-500 shadow-xl group-hover:shadow-primary/20 cursor-none">
                <span className="text-xl font-black text-primary group-hover:text-primary-foreground">
                  {ms.year}
                </span>
              </div>
              
              <div className="space-y-2 pt-2">
                <h3 className="text-2xl font-black tracking-tight group-hover:text-primary transition-colors cursor-default select-none">
                  {ms.title}
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed max-w-md group-hover:text-foreground transition-colors">
                  {ms.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Background Layer Gradient */}
      <div className="absolute bottom-0 left-0 w-2/3 h-1/2 bg-gradient-to-tr from-primary/5 to-transparent -z-10 blur-[150px] opacity-30 pointer-events-none" />
    </section>
  );
}
