"use client";

import React from "react";
import { motion } from "framer-motion";

import { DIFFERENCES } from "../data";

function GridItem({ diff, index }: { diff: typeof DIFFERENCES[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      className={`group relative rounded-[2.5rem] overflow-hidden ${diff.bgColor} border border-white/10 p-8 lg:p-12 transition-all duration-700 hover:scale-[1.02] ${diff.span}`}
    >
      <div className="absolute inset-0 z-20 pointer-events-none">
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <rect x="0" y="0" width="100%" height="100%" fill="none" stroke="white" strokeWidth="3" strokeDasharray="100 400" className="animate-border-flow opacity-60" rx="40" />
        </svg>
      </div>

      <div className="absolute inset-0 flex items-center justify-center opacity-[0.06] group-hover:opacity-[0.15] transition-opacity duration-700 pointer-events-none">
        <svg viewBox="0 0 24 24" className="w-2/3 h-2/3 fill-white stroke-white/20 stroke-[0.1] group-hover:scale-110 group-hover:rotate-6 transition-transform duration-1000">
          <path d={diff.iconPath} fillRule="evenodd" clipRule="evenodd" />
        </svg>
      </div>

      <div className="relative z-10 h-full flex flex-col justify-end gap-4">
        <div className="space-y-4 text-white">
          <h3 className="text-3xl font-heading font-medium tracking-tight drop-shadow-sm group-hover:translate-x-2 transition-transform duration-500">{diff.title}</h3>
          <p className="text-lg font-light text-white/70 leading-snug group-hover:text-white transition-colors duration-500">{diff.description}</p>
        </div>
      </div>

      <div className="absolute -bottom-12 -right-12 w-48 h-48 pointer-events-none opacity-[0.05] group-hover:opacity-[0.2] transition-all duration-1000 group-hover:scale-125 group-hover:-rotate-12">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-white">
          <circle cx="50" cy="50" r="50" fill="none" stroke="white" strokeWidth="0.5" opacity="0.3" />
          <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="0.5" fill="none" opacity="0.2" />
        </svg>
      </div>

      <style jsx>{`
        @keyframes borderFlow {
          0% { stroke-dashoffset: 500; }
          100% { stroke-dashoffset: -500; }
        }
        .animate-border-flow {
          animation: borderFlow 5s linear infinite;
        }
      `}</style>
    </motion.div>
  );
}

export function DifferenceSection() {
  return (
    <section id="difference" className="relative py-24 overflow-hidden bg-background">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -right-1/4 w-full h-full bg-brand-red/[0.04] blur-[160px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 -left-1/4 w-full h-full bg-brand-green/[0.03] blur-[160px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 lg:px-24 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col items-center text-center mb-16 space-y-8">
          <h2 className="text-4xl sm:text-6xl lg:text-8xl font-heading font-medium tracking-tighter leading-[0.8] uppercase text-brand-lite-red">
            What Sets <br />
            <span className="text-brand-green">Us Apart</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground/50 max-w-xl font-light">Industrial engineering standards combined with modern aesthetic precision.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 md:auto-rows-[340px]">
          {DIFFERENCES.map((diff, i) => (
            <GridItem key={diff.id} diff={diff} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
