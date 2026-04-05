"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

import { TESTIMONIALS, COMPANIES } from "@/data";

// Arc positions for 7 avatars — mapped to dist from activeIndex
const ARC_POSITIONS = [
  { x: -42, y: -28, scale: 0.55, zIndex: 1 },
  { x: -29, y: -14, scale: 0.65, zIndex: 2 },
  { x: -16, y: -5, scale: 0.75, zIndex: 3 },
  { x: 0, y: 0, scale: 1.0, zIndex: 10 }, // active centre
  { x: 16, y: -5, scale: 0.75, zIndex: 3 },
  { x: 29, y: -14, scale: 0.65, zIndex: 2 },
  { x: 42, y: -28, scale: 0.55, zIndex: 1 },
];

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(3); // start centre
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const goTo = useCallback((dir: 1 | -1) => {
    setActiveIndex(
      (prev) => (prev + dir + TESTIMONIALS.length) % TESTIMONIALS.length,
    );
  }, []);

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
      className="relative overflow-hidden bg-background py-32 lg:py-48"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Ambient blobs */}
      <div className="bg-brand-lite-red/[0.04] pointer-events-none absolute left-1/4 top-0 h-[60vw] w-[60vw] rounded-full blur-[140px]" />
      <div className="bg-brand-green/[0.03] pointer-events-none absolute bottom-0 right-1/4 h-[50vw] w-[50vw] rounded-full blur-[120px]" />

      <div className="container relative z-10 mx-auto px-6 lg:px-24">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 flex flex-col items-center space-y-4 text-center"
        >
          <h2 className="font-heading text-5xl font-medium uppercase leading-[0.9] tracking-tighter lg:text-8xl">
            <span className="animate-brand-gradient">What our</span>
            <br />
            <span className="text-brand-green">Clients say?</span>
          </h2>
          <p className="max-w-lg text-lg font-light text-muted-foreground/50">
            World-class engineering partnerships backed by real outcomes and
            honest words from our clients.
          </p>
        </motion.div>

        {/* Avatar Arc with smooth sliding (Non-Spring) */}
        <div className="relative mb-16 flex h-44 select-none items-end justify-center">
          <div className="relative flex h-full w-full max-w-4xl items-center justify-center">
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
                      ease: "easeInOut",
                    }}
                    onClick={() => setActiveIndex(i)}
                    className="absolute cursor-pointer focus:outline-none"
                    style={{ zIndex: pos.zIndex }}
                  >
                    <div
                      className={`relative overflow-hidden rounded-full transition-all duration-500 ${
                        isCentre
                          ? "shadow-[0_0_40px_rgba(227,55,101,0.4)] ring-4 ring-brand-lite-red"
                          : "ring-brand-lite-red/30 hover:ring-brand-lite-red/60 ring-2"
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
        <div className="relative mx-auto mt-6 max-w-3xl">
          {/* Nav Arrows */}
          <button
            onClick={() => goTo(-1)}
            className="absolute -left-6 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-brand-red text-white shadow-[0_0_30px_rgba(227,55,101,0.4)] transition-all hover:scale-110 active:scale-95 lg:-left-20 lg:h-14 lg:w-14"
            aria-label="Previous"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button
            onClick={() => goTo(1)}
            className="absolute -right-6 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-brand-red text-white shadow-[0_0_30px_rgba(227,55,101,0.4)] transition-all hover:scale-110 active:scale-95 lg:-right-20 lg:h-14 lg:w-14"
            aria-label="Next"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>

          {/* Card Container (Static) */}
          <div
            className="border-brand-lite-red/15 bg-brand-lite-red/[0.04] space-y-6 overflow-hidden rounded-[2.5rem] border p-10 text-center shadow-[0_8px_60px_rgba(227,55,101,0.1)] backdrop-blur-sm"
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
                  <h3 className="animate-brand-gradient font-heading text-2xl font-medium tracking-tight lg:text-3xl">
                    {active.name}
                  </h3>
                  <p className="mt-1.5 font-mono text-sm uppercase tracking-widest text-muted-foreground/60">
                    {active.location} · {active.role}
                  </p>
                </div>

                {/* Quote */}
                <p className="mx-auto max-w-2xl text-lg font-light italic leading-relaxed text-foreground/80 lg:text-xl">
                  "{active.quote}"
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── Company Logo Ticker ── */}
      <div className="relative mt-24 overflow-hidden">
        {/* Section label */}
        <p className="mb-8 text-center font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground/40">
          Trusted by world-class teams
        </p>

        {/* Edge fade masks */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24"
          style={{
            background:
              "linear-gradient(to right, hsl(var(--background)), transparent)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24"
          style={{
            background:
              "linear-gradient(to left, hsl(var(--background)), transparent)",
          }}
        />

        {/* Ticker track — 6 copies so content is always wider than any viewport.
            Animation moves -50% (= 3 copies) then resets; copy 4 = copy 1 → seamless */}
        <div
          className="animate-scroll-ticker flex w-max items-center hover:[animation-play-state:paused]"
          style={{ gap: "4rem" }}
        >
          {Array.from({ length: 6 }).flatMap((_, setIdx) =>
            COMPANIES.map((company) => (
              <div
                key={`${setIdx}-${company.id}`}
                className="group flex flex-shrink-0 items-center justify-center px-4"
              >
                <div
                  className="relative"
                  style={{ width: company.width, height: company.height }}
                >
                  <Image
                    src={company.logo}
                    alt={company.name}
                    fill
                    className="object-contain opacity-25 brightness-0 transition-all duration-500 group-hover:opacity-100 group-hover:brightness-100"
                    sizes={`${company.width}px`}
                  />
                </div>
              </div>
            )),
          )}
        </div>
      </div>
    </section>
  );
}
