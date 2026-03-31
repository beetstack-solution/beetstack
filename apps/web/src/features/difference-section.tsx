"use client";

import React from "react";
import { motion } from "framer-motion";

const DIFFERENCES = [
  { id: "experience", title: "Proven Experience", description: "Deep technical background in building real-world, high-impact systems that drive critical infrastructure.", span: "md:col-span-2", bgColor: "bg-brand-lite-red", iconPath: "M13,2L3,14h9l-1,8l10-12h-9l1-8z" },
  { id: "security", title: "Secure Environments", description: "Architecting software for highly secure and controlled environments with extreme resilience.", span: "col-span-1", bgColor: "bg-brand-green", iconPath: "M12,1L3,5v6c0,5.5,3.8,10.7,9,12c5.2-1.3,9-6.5,9-12V5L12,1z" },
  { id: "custom", title: "Fully Custom", description: "Purpose-built solutions tailored exactly to your unique business logic and operational goals.", span: "col-span-1", bgColor: "bg-brand-green", iconPath: "M19.4,15c0.3-0.8,0.3-1.6,0-2.4l2.1-1.6c0.2-0.2,0.3-0.5,0.1-0.7l-2-3.5c-0.1-0.2-0.4-0.3-0.6-0.2l-2.5,1 c-0.7-0.5-1.4-1-2.2-1.3l-0.4-2.6C14,3.4,13.7,3.2,13.5,3.2h-4c-0.3,0-0.5,0.2-0.6,0.5L8.5,6.3C7.7,6.6,7,7.1,6.3,7.6l-2.5-1 c-0.2-0.1-0.5,0-0.6,0.2l-2,3.5c-0.1,0.2-0.1,0.5,0.1,0.7l2.1,1.6c-0.3,0.8-0.3,1.6,0,2.4l-2.1,1.6c-0.2,0.2-0.3,0.5-0.1,0.7l2,3.5 c0.1,0.2,0.4,0.3,0.6,0.2l2.5-1c0.7,0.5,1.4,1,2.2,1.3l0.4,2.6c0.1,0.3,0.3,0.5,0.6,0.5h4c0.3,0,0.5-0.2,0.6-0.5l0.4-2.6 c0.8-0.3,1.5-0.8,2.2-1.3l2.5,1c0.2,0.1,0.5,0,0.6-0.2l2-3.5c0.1-0.2,0.1-0.5-0.1-0.7L19.4,15z M12,15.5c-1.9,0-3.5-1.6-3.5-3.5 s1.6-3.5,3.5-3.5s3.5,1.6,3.5,3.5S13.9,15.5,12,15.5z" },
  { id: "global", title: "Global Efficiency", description: "Optimized technical delivery models providing premium quality at competitive global scales.", span: "md:col-span-2", bgColor: "bg-brand-lite-red", iconPath: "M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,20c-4.41,0-8-3.59-8-8s3.59-8,8-8s8,3.59,8,8 S16.41,20,12,20z M11,7h2v2h-2V7z M11,11h2v6h-2V11z" },
  { id: "support", title: "Performance & Support", description: "Unwavering focus on scalability, benchmarks, and dedicated long-term technical evolution.", span: "md:col-span-2", bgColor: "bg-brand-lite-red", iconPath: "M16,6l2.29,2.29l-4.88,4.88l-4-4L2,16.59L3.41,18l6-6l4,4l6.3-6.29L22,12V6H16z" },
  { id: "innovation", title: "Technical Precision", description: "Executing complex technical roadmaps with extreme engineering meticulousness and accuracy.", span: "col-span-1", bgColor: "bg-brand-green", iconPath: "M12,2L12,22 M2,12L22,12 M12,12 m-8,0 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0" },
];

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
          <h2 className="text-6xl lg:text-8xl font-heading font-medium tracking-tighter leading-[0.8] uppercase text-brand-lite-red">
            What Sets <br />
            <span className="text-brand-green">Us Apart</span>
          </h2>
          <p className="text-xl text-muted-foreground/50 max-w-xl font-light">Industrial engineering standards combined with modern aesthetic precision.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-[340px]">
          {DIFFERENCES.map((diff, i) => (
            <GridItem key={diff.id} diff={diff} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
