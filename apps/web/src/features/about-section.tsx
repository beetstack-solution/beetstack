"use client";

import React from "react";
import { motion } from "framer-motion";

export function AboutSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" as const },
    },
  };

  return (
    <section className="py-24 relative overflow-hidden group">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-4xl mx-auto px-6 space-y-12"
      >
        <motion.div variants={itemVariants} className="space-y-4">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight flex items-center gap-4">
            <span className="w-12 h-1 bg-primary rounded-full" />
            Our Vision
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
            At Beetstack, we believe in the power of <span className="text-primary font-bold italic">layered innovation</span>. 
            Just like the rings of a beetroot, every successful IT solution is built on deep, 
            interconnected value layers that provide strength and resilience.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-4 text-right">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight flex items-center justify-end gap-4">
            Our Mission
            <span className="w-12 h-1 bg-primary rounded-full" />
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
            We deliver <span className="text-primary font-bold">architectural precision</span> through a monorepo-first 
            philosophy, ensuring every line of code adds to a robust corporate ecosystem. 
            Transparency, scalability, and performance aren't just features—they are our foundation.
          </p>
        </motion.div>
      </motion.div>
      
      {/* Decorative Layer Background */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent -z-10 blur-3xl opacity-50" />
    </section>
  );
}
