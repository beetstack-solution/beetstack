"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, MotionValue } from "framer-motion";
import { Icons } from "@beetstack/icons";
import Image from "next/image";

import { DELIVERY_STEPS, Step } from "@/data";

const RoadmapIcon = ({ step, index, scrollYProgress }: { step: Step; index: number; scrollYProgress: MotionValue<number> }) => {
  const stepCount = DELIVERY_STEPS.length - 1;
  const targetPos = index / stepCount;

  const isActive = useTransform(scrollYProgress,
    [targetPos - 0.005, targetPos],
    [0, 1]
  );

  const bgColor = useTransform(isActive, [0, 1], ["#ffffff", "var(--brand-lite-red)"]);
  const iconColor = useTransform(isActive, [0, 1], ["var(--brand-lite-red)", "#ffffff"]);
  const borderColor = "var(--brand-red)";

  return (
    <div className="flex flex-col justify-center items-center group relative">
      <div className="group-hover:opacity-100 transition-opacity">
        <Image src="/images/leef.png" alt="Beetroot leaf" width={30} height={30} className="object-contain" />
      </div>

      <motion.div
        style={{
          backgroundColor: bgColor,
          borderColor: borderColor,
        }}
        className="relative z-10 w-12 h-12 rounded-full border-2 flex items-center justify-center shadow-lg transition-all duration-300"
      >
        <div className="absolute inset-0.5 rounded-full border border-white/5 pointer-events-none" />
        <div className="absolute inset-1.5 rounded-full border border-white/5 pointer-events-none" />
        <div className="absolute inset-2.5 rounded-full border border-white/5 pointer-events-none" />

        <motion.div style={{ color: iconColor }} className="relative z-20">
          0 {index + 1}
        </motion.div>
      </motion.div>

      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[10px] font-mono text-white/50 uppercase whitespace-nowrap bg-background/50 backdrop-blur-sm px-2 py-0.5 rounded border border-white/5">
        {step.title}
      </div>
    </div>
  );
};

const DeliveryStep = ({ step }: { step: Step }) => {
  const IconComponent = Icons[step.icon];

  return (
    <div className="relative flex-shrink-0 w-[100vw] h-full flex items-center justify-center px-12 lg:px-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 w-full max-w-6xl items-center relative">
        <div className="flex flex-col items-center lg:items-end text-center lg:text-right space-y-4">
          <div className="space-y-1">
            <div className="text-6xl lg:text-9xl font-heading font-medium text-brand-lite-red/10 leading-none">
              {IconComponent ? <IconComponent className="text-brand-lite-red" /> : null}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
          <h3 className="text-4xl lg:text-7xl font-heading font-medium text-brand-green uppercase tracking-tighter leading-none">
            {step.title}
          </h3>
          <p className="text-lg lg:text-2xl font-light text-foreground/70 leading-relaxed max-w-md">
            {step.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export const DeliveryModelSection = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // 7 items of 100vw each. 
  // Scroll from 0 to -600vw translates through the full list.
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", "-600vw"]);

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section
      id="delivery-model"
      ref={targetRef}
      className="relative h-[600vh] bg-background -mt-20 pt-20"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden border-t border-white/5 bg-background z-30">

        {/* Global Roadmap Progress Header (Lowered to clear navbar) */}
        <div className="absolute top-24 left-0 w-full px-12 lg:px-24 flex items-center z-50 pointer-events-none">
          <div className="w-full relative flex items-center justify-between">
            {/* Background Base Line */}
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 -translate-y-1/2" />
            {/* Active Progress Line */}
            <motion.div
              style={{ scaleX, transformOrigin: "left" }}
              className="absolute mt-2 top-1/2 left-0 w-full h-[2px] bg-brand-lite-red -translate-y-1/2 shadow-[0_0_15px_rgba(227,55,101,0.8)]"
            />
            {/* Phase Marker Icons */}
            {DELIVERY_STEPS.map((step, i) => (
              <RoadmapIcon key={step.id} step={step} index={i} scrollYProgress={scrollYProgress} />
            ))}
          </div>
        </div>

        {/* Background Atmosphere */}
        <div className="absolute top-0 right-0 w-[40vh] h-[40vh] bg-brand-green/3 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[40vh] h-[40vh] bg-brand-red/3 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

        {/* Floating Roadmap Legend */}
        <div className="absolute bottom-12 left-12 lg:bottom-16 lg:left-24 z-40">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex flex-col"
          >
            <h2 className="text-xl lg:text-3xl font-heading font-medium tracking-tighter text-brand-green uppercase leading-none">
              How We <span className="text-foreground">Deliver</span>
            </h2>
            <p className="text-[10px] lg:text-xs font-mono text-foreground/40 mt-1 uppercase tracking-[0.4em]">
              Precision Lifecycle
            </p>
          </motion.div>
        </div>

        {/* Static Path Track */}
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5 -translate-y-1/2 z-0" />
        <motion.div
          style={{ scaleX, transformOrigin: "left" }}
          className="absolute top-1/2 left-0 w-full h-[2px] bg-brand-green/30 -translate-y-1/2 z-10"
        />

        {/* The Content Track - Forced to be 700vw wide */}
        <motion.div
          style={{ x }}
          className="flex h-full relative z-20 w-[700vw]"
        >
          {DELIVERY_STEPS.map((step) => (
            <DeliveryStep
              key={step.id}
              step={step}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
