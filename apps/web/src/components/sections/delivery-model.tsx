"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform, MotionValue } from "framer-motion";
import { Icons } from "@beetstack/icons";
import Image from "next/image";
import { useTheme } from "next-themes";

import { DELIVERY_STEPS, Step } from "@/data";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  DESKTOP COMPONENTS (Horizontal Scroll)
 * ─────────────────────────────────────────────────────────────────────────────
 */

const RoadmapIcon = ({ step, index, scrollYProgress }: { step: Step; index: number; scrollYProgress: MotionValue<number> }) => {
  const { resolvedTheme } = useTheme();
  const stepCount = DELIVERY_STEPS.length - 1;
  const targetPos = index / stepCount;

  const isActive = useTransform(scrollYProgress,
    [targetPos - 0.005, targetPos],
    [0, 1]
  );

  const isDark = resolvedTheme === "dark";
  const inactiveColor = isDark ? "#000000" : "#ffffff";
  const activeIconColor = isDark ? "#000000" : "#ffffff";

  const bgColor = useTransform(isActive, [0, 1], [inactiveColor, "#e33765"]);
  const iconColor = useTransform(isActive, [0, 1], ["#e33765", activeIconColor]);
  const borderColor = "var(--brand-red)";

  return (
    <div className="flex flex-col justify-center items-center group relative">
      <div className="group-hover:opacity-100 transition-opacity">
        <Image src="/images/leef.webp" alt="Beetroot leaf" width={30} height={30} className="object-contain" style={{ height: "auto" }} />
      </div>
      <motion.div
        style={{
          backgroundColor: bgColor,
          borderColor: borderColor,
        }}
        className="relative z-10 w-12 h-12 rounded-full border-2 flex items-center justify-center shadow-lg transition-all duration-500"
      >
        <motion.div style={{ color: iconColor }} className="relative z-20 font-heading font-medium text-xs">
          0{index + 1}
        </motion.div>
      </motion.div>
    </div>
  );
};

const HorizontalDeliveryStep = ({ step, index }: { step: Step, index: number }) => {
  const IconComponent = Icons[step.icon];

  return (
    <div className="relative flex-shrink-0 min-w-[500px] w-[100vw] h-full flex items-center justify-center px-12 lg:px-24">
      <div className="flex justify-center gap-12 lg:gap-24 w-full max-w-7xl items-center relative">
        <div className="flex flex-col items-center lg:items-end text-right space-y-4">
          <div className="space-y-1">
            <div className="text-6xl lg:text-9xl font-heading font-medium text-brand-lite-red/10 leading-none">
              {IconComponent ? <IconComponent className="text-brand-lite-red" /> : null}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start text-left space-y-6 pr-[500px]">
          <h3 className="text-4xl lg:text-7xl font-heading font-medium text-brand-green uppercase tracking-tighter leading-none">
            <span className="text-brand-lite-red">0{index + 1}</span> {step.title}
          </h3>
          <p className="text-lg lg:text-2xl font-light text-foreground/70 leading-relaxed max-w-md">
            {step.description}
          </p>
        </div>
      </div>
    </div>
  );
};

function DesktopHorizontalLayout() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0vw", "-600vw"]);
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <section ref={targetRef} className="relative h-[600vh] bg-background">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden border-t border-foreground/5 bg-background z-30">
        {/* Roadmap Progress */}
        <div className="absolute top-24 left-0 w-full px-12 items-center z-50 pointer-events-none">
          <div className="w-full relative flex items-center justify-between">
            <motion.div
              style={{ scaleX, transformOrigin: "left" }}
              className="absolute top-1/2 left-0 w-full h-[2px] bg-brand-lite-red -translate-y-1/2 shadow-[0_0_20px_rgba(227,55,101,0.5)] mt-2"
            />
            {DELIVERY_STEPS.map((step, i) => (
              <RoadmapIcon key={step.id} step={step} index={i} scrollYProgress={scrollYProgress} />
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-12 left-12 lg:bottom-16 lg:left-24 z-40">
          <div className="flex flex-col">
            <h2 className="text-xl lg:text-3xl font-heading font-medium tracking-tighter text-brand-lite-red uppercase leading-none">
              How We <span className="text-brand-green">Deliver</span>
            </h2>
            <p className="text-[10px] lg:text-xs font-mono text-foreground/40 mt-1 uppercase tracking-[0.4em]">
              Precision Lifecycle
            </p>
          </div>
        </div>

        {/* Content Track */}
        <motion.div style={{ x }} className="flex h-full relative z-20 w-[700vw]">
          {DELIVERY_STEPS.map((step, i) => (
            <HorizontalDeliveryStep key={step.id} step={step} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  MOBILE COMPONENTS (Vertical Sequence)
 * ─────────────────────────────────────────────────────────────────────────────
 */

const VerticalDeliveryStep = ({ step, index }: { step: Step, index: number }) => {
  const IconComponent = Icons[step.icon];
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="relative w-full py-16 flex flex-col items-center text-center px-6 border-b border-foreground/5 last:border-0"
    >
      <div className="text-6xl font-heading font-medium text-brand-lite-red/10 leading-none mb-6">
        {IconComponent ? <IconComponent className="text-brand-lite-red" /> : `0${index + 1}`}
      </div>
      <h3 className="text-3xl font-heading font-medium text-brand-green uppercase tracking-tighter mb-4">
        <span className="text-brand-lite-red">0{index + 1}</span> {step.title}
      </h3>
      <p className="text-base font-light text-foreground/70 leading-relaxed max-w-sm">
        {step.description}
      </p>
    </motion.div>
  );
};

function MobileVerticalLayout() {
  return (
    <section className="bg-background py-20 overflow-hidden">
      <div className="px-6 mb-12">
        <h2 className="text-3xl font-heading font-medium tracking-tighter text-brand-lite-red uppercase leading-none">
          How We <span className="text-brand-green">Deliver</span>
        </h2>
        <p className="text-[10px] font-mono text-foreground/40 mt-2 uppercase tracking-[0.3em]">
          Precision Lifecycle
        </p>
      </div>
      <div className="flex flex-col w-full">
        {DELIVERY_STEPS.map((step, i) => (
          <VerticalDeliveryStep key={step.id} step={step} index={i} />
        ))}
      </div>
    </section>
  );
}

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  MAIN SECTION
 * ─────────────────────────────────────────────────────────────────────────────
 */

export function DeliveryModelSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div id="delivery-model">
      {isMobile ? <MobileVerticalLayout /> : <DesktopHorizontalLayout />}
    </div>
  );
}
