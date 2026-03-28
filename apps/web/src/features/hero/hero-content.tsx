"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@repo/ui/button";

export function HeroContent() {
  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center pointer-events-none">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="space-y-6"
      >
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight drop-shadow-sm select-none">
          <span className="text-primary drop-shadow-[0_0_15px_rgba(var(--primary),0.5)]">
            Beetstack
          </span>{" "}
          <span className="text-foreground">IT Solutions</span>
        </h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="max-w-xl mx-auto text-lg md:text-xl text-muted-foreground font-medium leading-relaxed drop-shadow-sm"
        >
          Architecting the next generation of scalable, enterprise-grade software with 
          <span className="text-primary font-bold"> Beetroot-inspired</span> precision.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 pointer-events-auto"
        >
          <Button size="lg" className="rounded-full px-12 py-7 text-lg shadow-xl shadow-primary/20 transition-all hover:scale-110 active:scale-95">
            Get Started
          </Button>
          <Button variant="outline" size="lg" className="rounded-full px-12 py-7 text-lg backdrop-blur-md transition-all hover:scale-110 active:scale-95">
            Our Work
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
