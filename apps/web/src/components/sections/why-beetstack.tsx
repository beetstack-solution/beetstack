"use client";

import React from "react";
import { motion } from "framer-motion";
import { Icons } from "@beetstack/icons";

import { BENEFITS } from "@/data";

export function WhyBeetstackSection() {
  return (
    <section id="expertise" className="relative py-32 lg:py-48 bg-background overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-brand-lite-red/2 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mb-24 lg:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col space-y-4"
          >
            <span className="text-[10px] lg:text-xs font-mono text-brand-lite-red uppercase tracking-[0.4em]">
              The Beetstack Advantage
            </span>
            <h2 className="text-5xl lg:text-8xl font-heading font-medium tracking-tighter text-brand-lite-red uppercase leading-[0.9]">
              Why <br />
              <span className="text-brand-green">Beetstack</span>
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {BENEFITS.map((benefit, index) => {
            const IconComp = Icons[benefit.icon];
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-brand-lite-red/30 transition-all duration-500 flex flex-col justify-between h-full"
              >
                <div className="space-y-6">
                  <div className="relative w-16 h-16 rounded-full bg-brand-lite-red/5 flex items-center justify-center border border-brand-lite-red/10 group-hover:bg-brand-lite-red/10 transition-colors overflow-hidden">
                    <div className="absolute inset-1 rounded-full border border-brand-lite-red/5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute inset-2 rounded-full border border-brand-lite-red/5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
                    {IconComp && <IconComp className="w-7 h-7 text-brand-lite-red relative z-10" />}
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl font-heading font-medium text-foreground group-hover:text-brand-lite-red transition-colors">
                      {benefit.title}
                    </h3>
                    <p className="text-sm font-light text-foreground/40 group-hover:text-foreground/60 transition-colors leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>

                <div className="mt-12 flex justify-end">
                  <div className="text-[10px] font-mono text-white/10 uppercase tracking-widest">
                    0{index + 1}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
