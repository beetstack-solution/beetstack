"use client";

import React from "react";
import { motion } from "framer-motion";
import { Icons } from "@beetstack/icons";

const techStack = [
  { name: "Next.js 16", icon: Icons.ChevronUp, color: "text-primary" },
  { name: "React 19", icon: Icons.Home, color: "text-blue-500" },
  { name: "Monorepo", icon: Icons.Settings, color: "text-purple-500" },
  { name: "TypeScript", icon: Icons.Pencil, color: "text-blue-400" },
  { name: "Tailwind", icon: Icons.Sun, color: "text-sky-400" },
  { name: "Three.js", icon: Icons.Moon, color: "text-slate-400" },
  { name: "Framer Motion", icon: Icons.Heart, color: "text-red-500" },
  { name: "Turborepo", icon: Icons.Settings, color: "text-orange-500" },
  { name: "PNPM", icon: Icons.ChevronRight, color: "text-yellow-500" },
  { name: "ESLint", icon: Icons.Check, color: "text-purple-400" },
];

export function TechStackSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase">Tech Ecosystem</h2>
          <p className="text-muted-foreground text-xl">The foundation of every Beetroot layer.</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 place-items-center">
          {techStack.map((tech, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.1, rotateY: 15 }}
              className="group flex flex-col items-center gap-6 p-8 rounded-3xl bg-primary/[0.03] border border-primary/10 hover:border-primary/50 hover:bg-primary/[0.05] transition-all cursor-crosshair w-full"
            >
              <tech.icon className={`h-12 w-12 ${tech.color} drop-shadow-[0_0_10px_rgba(var(--primary),0.3)] group-hover:drop-shadow-[0_0_20px_rgba(var(--primary),0.8)] transition-all`} />
              <span className="text-sm font-black uppercase tracking-widest text-muted-foreground group-hover:text-foreground">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Background Decorative Rings */}
      <div className="absolute inset-0 flex items-center justify-center -z-10 opacity-5 pointer-events-none">
        <div className="w-[500px] h-[500px] rounded-full border border-primary animate-ping" />
        <div className="absolute w-[800px] h-[800px] rounded-full border border-primary animate-pulse" />
      </div>
    </section>
  );
}
