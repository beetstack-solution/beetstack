"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

import { TESTIMONIALS } from "../data";

// Arc positions for 7 avatars — same curved model as reference
const ARC_POSITIONS = [
  { x: -42, y: -28, scale: 0.55, zIndex: 1 },
  { x: -29, y: -14, scale: 0.65, zIndex: 2 },
  { x: -16, y: -5, scale: 0.75, zIndex: 3 },
  { x: 0, y: 0, scale: 1.00, zIndex: 10 }, // active centre
  { x: 16, y: -5, scale: 0.75, zIndex: 3 },
  { x: 29, y: -14, scale: 0.65, zIndex: 2 },
  { x: 42, y: -28, scale: 0.55, zIndex: 1 },
];

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(3); // start centre

  const goTo = useCallback(
    (dir: 1 | -1) => {
      setActiveIndex((prev) =>
        (prev + dir + TESTIMONIALS.length) % TESTIMONIALS.length
      );
    },
    []
  );

  // Build the sliding window of 7 avatars centred on activeIndex
  const windowIndices = Array.from({ length: 7 }, (_, i) =>
    (activeIndex - 3 + i + TESTIMONIALS.length) % TESTIMONIALS.length
  );

  const active = TESTIMONIALS[activeIndex]!;

  return (
    <section id="testimonials" className="relative py-24 lg:py-32 overflow-hidden bg-background">
      {/* Ambient blobs */}
      <div className="absolute top-0 left-1/4 w-[60vw] h-[60vw] bg-brand-lite-red/[0.04] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[50vw] h-[50vw] bg-brand-green/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-24 relative z-10">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center mb-14 space-y-4"
        >
          <h2 className="text-5xl lg:text-8xl font-heading font-medium tracking-tighter leading-[0.85] uppercase text-brand-lite-red">
            What our<br />
            <span className="text-brand-green">Clients say?</span>
          </h2>
          <p className="text-lg text-muted-foreground/50 max-w-lg font-light">
            World-class engineering partnerships backed by real outcomes and honest words from our clients.
          </p>
        </motion.div>

        {/* Avatar Arc */}
        <div className="relative flex items-end justify-center h-44 mb-2 select-none">


          <div className="relative flex items-end justify-center gap-0 w-full max-w-3xl mx-auto px-8">
            {windowIndices.map((dataIdx, slotIdx) => {
              const pos = ARC_POSITIONS[slotIdx]!;
              const isCentre = slotIdx === 3;
              const person = TESTIMONIALS[dataIdx]!;

              return (
                <motion.button
                  key={`${dataIdx}-${slotIdx}`}
                  initial={false}
                  animate={{
                    y: pos.y * -1.5,
                    scale: pos.scale,
                    zIndex: pos.zIndex,
                    opacity: isCentre ? 1 : 0.6 + (pos.scale - 0.55) * 1.5,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  onClick={() => {
                    const offset = slotIdx - 3;
                    if (offset !== 0) {
                      setActiveIndex(
                        (activeIndex + offset + TESTIMONIALS.length) % TESTIMONIALS.length
                      );
                    }
                  }}
                  className="relative flex-1 flex justify-center items-end origin-bottom cursor-pointer focus:outline-none mb-16"
                  style={{ zIndex: pos.zIndex }}
                >
                  <div
                    className={`relative rounded-full overflow-hidden transition-all duration-300 ${isCentre
                      ? "ring-4 ring-brand-lite-red shadow-[0_0_30px_rgba(227,55,101,0.35)]"
                      : "ring-2 ring-brand-lite-red hover:ring-brand-lite-red/50"
                      }`}
                    style={{
                      width: isCentre ? 96 : 64,
                      height: isCentre ? 96 : 64,
                    }}
                  >
                    <Image
                      src={person.avatar}
                      alt={person.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Testimonial Card */}
        <div className="relative max-w-3xl mx-auto mt-6">
          {/* Nav Arrows */}
          <button
            onClick={() => goTo(-1)}
            className="absolute -left-6 lg:-left-16 top-1/2 -translate-y-1/2 z-20 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-brand-red flex items-center justify-center text-white shadow-[0_0_20px_rgba(227,55,101,0.4)] hover:scale-110 transition-transform"
            aria-label="Previous"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          </button>
          <button
            onClick={() => goTo(1)}
            className="absolute -right-6 lg:-right-16 top-1/2 -translate-y-1/2 z-20 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-brand-red flex items-center justify-center text-white shadow-[0_0_20px_rgba(227,55,101,0.4)] hover:scale-110 transition-transform"
            aria-label="Next"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
            </svg>
          </button>

          {/* Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="rounded-[2.5rem] border border-brand-lite-red/15 bg-brand-lite-red/[0.04] backdrop-blur-sm p-10 text-center space-y-6 shadow-[0_8px_60px_rgba(227,55,101,0.08)]"
            >

              {/* Name & location */}
              <div>
                <h3 className="text-2xl font-heading font-medium tracking-tight text-brand-lite-red">
                  {active.name}
                </h3>
                <p className="text-sm font-mono uppercase tracking-widest text-muted-foreground/50 mt-1">
                  {active.location} · {active.role}
                </p>
              </div>

              {/* Quote */}
              <p className="text-base lg:text-lg font-light text-foreground/70 leading-relaxed max-w-2xl mx-auto">
                {active.quote}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
