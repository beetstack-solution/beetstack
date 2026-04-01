"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

import { TESTIMONIALS } from "@/data";

// Arc positions for 7 avatars — mapped to dist from activeIndex
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
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const goTo = useCallback(
    (dir: 1 | -1) => {
      setActiveIndex((prev) =>
        (prev + dir + TESTIMONIALS.length) % TESTIMONIALS.length
      );
    },
    []
  );

  // Auto-update effect: every 3 seconds
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      goTo(1);
    }, 3000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, goTo]);

  const active = TESTIMONIALS[activeIndex]!;

  return (
    <section 
      id="testimonials" 
      className="relative py-24 lg:py-32 overflow-hidden bg-background"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
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

        {/* Avatar Arc with smooth sliding (Non-Spring) */}
        <div className="relative h-44 mb-16 select-none flex items-end justify-center">
          <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
            <AnimatePresence initial={false}>
              {TESTIMONIALS.map((person, i) => {
                // Calculate wrap-around distance
                let dist = i - activeIndex;
                const half = Math.floor(TESTIMONIALS.length / 2);
                if (dist > half) dist -= TESTIMONIALS.length;
                if (dist < -half) dist += TESTIMONIALS.length;

                const isVisible = Math.abs(dist) <= 3;
                if (!isVisible) return null;

                const slotIdx = dist + 3; // map -3..3 to 0..6
                const pos = ARC_POSITIONS[slotIdx]!;
                const isCentre = dist === 0;

                return (
                  <motion.button
                    key={person.id}
                    initial={false}
                    animate={{
                      x: dist * 110, // Horizontal distribution
                      y: pos.y * -1.8,
                      scale: pos.scale,
                      opacity: isCentre ? 1 : 0.4 + (pos.scale - 0.55) * 1.3,
                      zIndex: pos.zIndex,
                    }}
                    transition={{ 
                      duration: 0.6,
                      ease: "easeInOut"
                    }}
                    onClick={() => setActiveIndex(i)}
                    className="absolute cursor-pointer focus:outline-none"
                    style={{ zIndex: pos.zIndex }}
                  >
                    <div
                      className={`relative rounded-full overflow-hidden transition-all duration-500 ${
                        isCentre
                          ? "ring-4 ring-brand-lite-red shadow-[0_0_40px_rgba(227,55,101,0.4)]"
                          : "ring-2 ring-brand-lite-red/30 hover:ring-brand-lite-red/60"
                      }`}
                      style={{
                        width: isCentre ? 100 : 64,
                        height: isCentre ? 100 : 64,
                      }}
                    >
                      <Image
                        src={person.avatar}
                        alt={person.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 64px, 100px"
                      />
                    </div>
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Testimonial Card */}
        <div className="relative max-w-3xl mx-auto mt-6">
          {/* Nav Arrows */}
          <button
            onClick={() => goTo(-1)}
            className="absolute -left-6 lg:-left-20 top-1/2 -translate-y-1/2 z-20 w-10 h-10 lg:w-14 lg:h-14 rounded-full bg-brand-red flex items-center justify-center text-white shadow-[0_0_30px_rgba(227,55,101,0.4)] hover:scale-110 active:scale-95 transition-all"
            aria-label="Previous"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button
            onClick={() => goTo(1)}
            className="absolute -right-6 lg:-right-20 top-1/2 -translate-y-1/2 z-20 w-10 h-10 lg:w-14 lg:h-14 rounded-full bg-brand-red flex items-center justify-center text-white shadow-[0_0_30px_rgba(227,55,101,0.4)] hover:scale-110 active:scale-95 transition-all"
            aria-label="Next"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>

          {/* Card Container (Static) */}
          <div 
            className="rounded-[2.5rem] border border-brand-lite-red/15 bg-brand-lite-red/[0.04] backdrop-blur-sm p-10 text-center space-y-6 shadow-[0_8px_60px_rgba(227,55,101,0.1)] overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="space-y-6"
              >
                {/* Name & location */}
                <div>
                  <h3 className="text-2xl lg:text-3xl font-heading font-medium tracking-tight text-brand-lite-red">
                    {active.name}
                  </h3>
                  <p className="text-sm font-mono uppercase tracking-widest text-muted-foreground/60 mt-1.5">
                    {active.location} · {active.role}
                  </p>
                </div>

                {/* Quote */}
                <p className="text-lg lg:text-xl font-light text-foreground/80 leading-relaxed max-w-2xl mx-auto italic">
                  "{active.quote}"
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
