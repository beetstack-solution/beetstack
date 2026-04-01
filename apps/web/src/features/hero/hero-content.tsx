"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@repo/ui/button";
import { Icons } from "@beetstack/icons";
import Image from "next/image";

export function HeroContent() {
  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 sm:p-6 text-center pointer-events-none">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl space-y-6 sm:space-y-12"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-4 mb-6 sm:mb-12 justify-center"
        >
          <Image
            src="/logo.png"
            alt="Beetstack Logo"
            width={320}
            height={80}
            className="h-12 sm:h-16 lg:h-20 w-auto object-contain drop-shadow-2xl"
            priority
          />
        </motion.div>

        <div className="space-y-4 sm:space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-heading font-medium tracking-tight select-none leading-[1.1] text-foreground">
            Scalable Software. <br /> Built for Global Impact.
          </h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 pt-6 sm:pt-12 pointer-events-auto"
        >
          <Button size="lg" className="w-full sm:w-auto rounded-full px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-heading font-medium bg-foreground text-background hover:bg-foreground/90 transition-all flex items-center justify-center gap-4 shadow-2xl">
            <Icons.Projects className="h-4 w-4" />
            Our Services
          </Button>
          <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-full px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-heading font-medium backdrop-blur-md transition-all hover:bg-primary/5 border-primary/50">
            Our Portfolio
            <Icons.ChevronRight className="h-5 w-5" />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
