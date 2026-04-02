"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useTime } from "framer-motion";

import { SECURITY_FEATURES } from "@/data";

export function SecuritySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  const time = useTime();
  const autoRotate = useTransform(time, (t: number) => (t / 60) % 360);
  const scrollRotate = useTransform(scrollYProgress, [0, 1], [0, 720]);
  const finalRotate = useTransform([autoRotate, scrollRotate], ([a, s]) => Number(a) + Number(s));
  const scannerScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.15, 0.95]);

  return (
    <section id="security-experience" ref={containerRef} className="relative bg-background overflow-hidden py-32 lg:py-48">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="w-full h-full bg-[linear-gradient(rgba(145,170,62,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(145,170,62,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="container mx-auto px-6 lg:px-24 space-y-20">
        <div className="flex flex-col lg:flex-row items-end justify-between gap-12 border-b border-white/5 pb-16">
          <div className="space-y-4">
            <h2 className="text-5xl lg:text-8xl font-heading font-medium tracking-tighter uppercase leading-[0.9]">
              <span className="animate-brand-gradient">High-Security</span> <br />
              <span className="text-brand-green">Environments</span>
            </h2>
          </div>
          <p className="text-lg lg:text-xl font-light text-foreground/80 max-w-xl leading-relaxed">
            Beetstack develops software solutions for high-sensitivity and controlled environments, including defence-related and institutional use cases.
          </p>
        </div>

        <div className="space-y-[8vh]">
          {SECURITY_FEATURES.map((feature, i) => (
            <div key={i} className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-24 min-h-[40vh] ${i % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}>
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="w-full lg:w-[40%] flex flex-col items-center justify-center space-y-10 p-12 rounded-[3rem] bg-white/[0.04] border border-white/10 group hover:border-brand-green/30 transition-all duration-1000">
                <div className="relative w-40 lg:w-48 aspect-square flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {[180, 120, 80].map((size, ringIndex) => (
                      <div key={ringIndex} className="absolute rounded-full border border-brand-green/20 shadow-[0_0_15px_rgba(145,170,62,0.05)]" style={{ width: `${(size / 180) * 100}%`, height: `${(size / 180) * 100}%` }} />
                    ))}
                    {Array.from({ length: 8 }).map((_, dotIndex) => {
                      const randomSize = Math.floor(Math.random() * (170 - 40 + 1)) + 40;
                      const randomAngle = Math.floor(Math.random() * 360);
                      return (
                        <motion.div key={dotIndex} animate={{ opacity: [0.1, 0.8, 0.1] }} transition={{ duration: 3, repeat: Infinity, delay: dotIndex * 0.4 }} className="absolute top-1/2 left-1/2 w-1 h-1 bg-brand-green shadow-[0_0_8px_rgba(145,170,62,0.4)] rounded-full" style={{ transform: `rotate(${randomAngle}deg) translate(${randomSize / 2}px) rotate(-${randomAngle}deg)`, marginLeft: '-2px', marginTop: '-2px' }} />
                      );
                    })}
                  </div>

                  <motion.div style={{ rotate: finalRotate, scale: scannerScale }} className="absolute inset-0 flex items-center justify-center">
                    {[180, 120, 80].map((size, index) => (
                      <div key={index} className="absolute top-1/2 left-1/2 w-4 lg:w-6 h-[2px] bg-brand-green shadow-[0_0_20px_rgba(145,170,62,1),0_0_40px_rgba(145,170,62,0.5)] rounded-full" style={{ transformOrigin: 'left center', transform: `rotate(0deg) translate(${size / 2}px)`, marginLeft: '-3px', marginTop: '-1px' }} />
                    ))}
                    <div className="absolute top-1/2 left-1/2 w-1/2 h-[1px] bg-gradient-to-r from-brand-green to-transparent origin-left -translate-y-1/2 opacity-60 shadow-[0_0_20px_rgba(145,170,62,0.8)]" />
                  </motion.div>

                  <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-background/55 backdrop-blur-xl border border-brand-green/40 flex items-center justify-center text-brand-green z-10 shadow-2xl group-hover:scale-110 transition-transform duration-700">
                    <feature.icon className="w-6 h-6 lg:w-8 lg:h-8" />
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="text-2xl lg:text-3xl font-heading font-medium text-brand-green uppercase tracking-tighter decoration-brand-green/20 group-hover:scale-[1.02]">{feature.title}</h3>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: i % 2 === 0 ? 30 : -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex-1 p-10 lg:p-14 rounded-[3rem] border border-white/5 bg-white/[0.015] hover:bg-white/[0.03] transition-all duration-1000 group/desc">
                <div className="space-y-8">
                  <div className="flex flex-wrap gap-3">
                    {feature.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded-full border border-brand-green/30 bg-brand-green/5 text-[9px] font-mono tracking-widest text-brand-green uppercase">{tag}</span>
                    ))}
                  </div>
                  <div className="space-y-6">
                    <div className="w-10 h-[2px] bg-brand-green/40 group-hover/desc:w-full transition-all duration-1000 shadow-[0_0_10px_rgba(145,170,62,0.3)]" />
                    <p className="text-lg lg:text-xl font-light text-foreground leading-relaxed text-balance">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
