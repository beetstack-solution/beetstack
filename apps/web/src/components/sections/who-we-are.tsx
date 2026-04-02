"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export function WhoWeAreSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="about" ref={containerRef} className="min-h-screen relative lg:py-60 bg-background overflow-hidden flex justify-center items-center">
      <div className="container mx-auto px-6 lg:px-24 relative z-10">
        <div className="flex flex-col w-full gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-12 text-center max-w-4xl"
          >
            <div className="space-y-12 flex justify-center">
              <h2 className="text-5xl lg:text-8xl font-heading font-medium tracking-tighter leading-[0.9] uppercase text-brand-lite-red flex flex-wrap items-end justify-center text-center">

                <span>Wh</span>

                <div className="flex flex-col justify-center items-center sm:mr-4 ml-1">
                  <Image
                    src="/images/leef.webp"
                    alt="leef"
                    width={50}
                    height={50}
                    className="w-8 sm:w-14"
                    style={{ height: "auto" }}
                  />
                  <div className="relative w-10 h-10 sm:h-20 sm:w-20 flex items-center justify-center md:mb-2">
                    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none">
                      <circle cx="50" cy="50" r="48" stroke="#d1083dff" strokeWidth="4" fill="none" opacity="0.8" />
                      <circle cx="50" cy="50" r="38" stroke="#e33765" strokeWidth="3" fill="none" opacity="0.4" />
                      <circle cx="50" cy="50" r="28" stroke="#a21c3c" strokeWidth="2" fill="none" opacity="0.2" />
                    </svg>
                    <span className="relative text-[20px] font-mono font-bold text-brand-red tracking-[0.1em] z-10"></span>
                    <div className="absolute inset-0 bg-brand-red/5 rounded-full" />
                  </div>
                </div>

                <span className="w-full lg:w-auto text-brand-green mt-2 lg:mt-0">
                  We Are
                </span>

              </h2>
            </div>

            <div className="space-y-8">
              <p className="text-xl lg:text-3xl font-light text-foreground/90 leading-tight">
                Beetstack IT Solutions is a technology company delivering custom software, SaaS platforms, and digital solutions to clients worldwide.
              </p>

              <p className="text-md lg:text-xl font-light text-muted-foreground leading-relaxed text-balance">
                We specialize in building secure, scalable, and high-performance systems that help organizations streamline operations, automate workflows, and accelerate digital growth.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background Rings Container: Tall but horizontally clipped */}
      <div className="absolute inset-x-0 -top-1/2 h-[200%] flex items-center justify-center pointer-events-none -z-0 overflow-x-hidden">
        {([300, 500, 700, 900, 1100, 1300, 1500] as const).map((size, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-brand-red/5"
            style={{ width: size, height: size }}
            animate={{
              borderColor: ["rgba(162, 28, 60, 0.05)", "rgba(227, 55, 101, 0.25)", "rgba(162, 28, 60, 0.05)"],
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-brand-green/[0.03] blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-brand-red/[0.03] blur-[150px] pointer-events-none rounded-full" />
    </section>
  );
}
