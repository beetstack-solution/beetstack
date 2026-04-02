"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@repo/ui/button";
import { Icons } from "@beetstack/icons";
import Image from "next/image";
import Link from "next/link";

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
          className="flex flex-col items-center gap-4 mb-6 sm:mb-12 justify-center"
        >
          <Image
            src="/logo.webp"
            alt="Beetstack Logo"
            width={320}
            height={80}
            className="h-12 sm:h-16 lg:h-20 w-auto object-contain drop"
            priority
            loading="eager"
            style={{ width: "auto", height: "100%" }}
          />
          <h2 className="text-md font-heading font-medium tracking-widest select-none text-foreground uppercase -mt-8">Layers Of Solutions</h2>
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
          <Link
            href="#services"
            className="group relative w-full sm:w-auto rounded-full px-8 py-2.5 text-base sm:text-lg font-heading font-medium border-2 border-brand-red overflow-hidden flex items-center justify-center gap-4 transition-all duration-500 bg-brand-red text-background hover:bg-brand-lite-red hover:border-brand-lite-red"
          >
            <span className="relative z-10 flex items-center gap-4 group-hover:text-white transition-colors duration-500">
              <Icons.Projects className="h-4 w-4" />
              Our Services
            </span>
          </Link>

          <Link
            href="#portfolio"
            className="group relative w-full sm:w-auto rounded-full px-8 py-2.5 text-base sm:text-lg font-heading font-medium border-2 border-brand-green overflow-hidden flex items-center justify-center gap-2 transition-all duration-500"
          >
            <div className="absolute inset-0 bg-brand-green scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
            <span className="relative z-10 flex items-center gap-2 text-brand-green group-hover:text-white transition-colors duration-500">
              Our Portfolio
              <Icons.ChevronRight className="h-5 w-5" />
            </span>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
