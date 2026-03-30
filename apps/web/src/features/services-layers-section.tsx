"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: "software",
    title: "Custom Software",
    description: "End-to-end digital engineering tailored to your unique business logic. We build scalable, mission-critical systems designed to solve complex industrial challenges.",
    image: "/images/services/demo-img.png",
  },
  {
    id: "saas",
    title: "SaaS Platforms",
    description: "Architecting multi-tenant cloud ecosystems for global scale. High-performance software-as-a-service platforms focused on user retention and technical speed.",
    image: "/images/services/demo-img.png",
  },
  {
    id: "mobile",
    title: "Mobile Applications",
    description: "Resilient iOS and Android development with fluid performance. Precision-engineered native experiences that establish a dominant market authority.",
    image: "/images/services/demo-img.png",
  },
  {
    id: "erp",
    title: "ERP & Enterprise",
    description: "Smarter resource planning and enterprise-grade software solutions. Unifying fragmented business processes into a cohesive, high-efficiency digital core.",
    image: "/images/services/demo-img.png",
  },
  {
    id: "website",
    title: "Modern Websites",
    description: "High-fidelity digital presences engineered with Next.js and React. Focus on technical SEO, accessibility, and high-conversion web ecosystems.",
    image: "/images/services/demo-img.png",
  },
  {
    id: "seo",
    title: "SEO & Marketing",
    description: "Data-driven digital marketing and technical SEO strategies. Dominating search results and scaling your brand presence across the global digital landscape.",
    image: "/images/services/demo-img.png",
  },
];

function BeetrootLayers({ progress, isForeground = false }: { progress: MotionValue<number>, isForeground?: boolean }) {
  const rotateSlower = useTransform(progress, [0, 1], [0, isForeground ? -90 : 120]);
  const scalePulse = useTransform(progress, [0, 0.5, 1], [1, isForeground ? 1.1 : 1.3, 1]);

  return (
    <motion.div
      style={{ rotate: rotateSlower, scale: scalePulse }}
      className={`absolute inset-0 flex items-center justify-center pointer-events-none ${isForeground ? 'z-20 scale-[1.35] lg:scale-[1.65]' : '-z-10 scale-[1.7] lg:scale-[2.8]'}`}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* The single slice SVG with multiple internal layers */}
        <svg viewBox="0 0 200 200" className={`w-full h-full ${isForeground ? 'opacity-15' : 'opacity-40'}`}>
          <defs>
            <radialGradient id="sliceGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="#e33765" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#a21c3c" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#a21c3c" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="ringStroke" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a21c3c" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#e33765" stopOpacity="1" />
              <stop offset="100%" stopColor="#a21c3c" stopOpacity="0.5" />
            </linearGradient>
          </defs>

          {/* Organic Concentric Rings - Each "Circle" now has internal layers */}
          {[1, 0.85, 0.7, 0.55, 0.4, 0.25].map((s, i) => (
            <motion.path
              key={i}
              d="M100,20 C140,20 180,60 180,100 C180,140 140,180 100,180 C60,180 20,140 20,100 C20,60 60,20 100,20 Z"
              fill="none"
              stroke="url(#ringStroke)"
              strokeWidth={isForeground ? 0.5 + (i * 0.15) : 1.2 + (i * 0.3)}
              style={{
                scale: s,
                transformOrigin: "center",
              }}
              animate={{
                d: [
                  "M100,20 C145,25 185,65 180,105 C175,145 135,185 95,180 C55,175 15,135 20,95 C25,55 55,15 100,20 Z",
                  "M100,25 C135,15 175,55 182,100 C185,145 145,185 100,175 C55,170 25,135 18,90 C15,45 65,40 100,25 Z",
                  "M100,20 C145,25 185,65 180,105 C175,145 135,185 95,180 C55,175 15,135 20,95 C25,55 55,15 100,20 Z"
                ]
              }}
              transition={{
                duration: 12 + i * 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2
              }}
            />
          ))}

          {/* Core glow */}
          <circle cx="100" cy="100" r="10" fill="#e33765" className="opacity-20 blur-md" />
        </svg>

        {/* Outer ambient glow - only for background */}
        {!isForeground && (
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute w-full h-full bg-brand-red/10 rounded-full blur-[120px]"
          />
        )}
      </div>
    </motion.div>
  );
}

function LadderSection({ service, index }: { service: ServiceItem, index: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const isEven = index % 2 === 0;

  // Professional Ladder Model Parallax
  const textY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const imageY = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div ref={containerRef} className="relative min-h-screen flex items-center">
      <div className="container mx-auto px-6 lg:px-24">
        <div className={`grid lg:grid-cols-2 gap-16 lg:gap-32 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}>

          {/* Image Side with Beetroot Layers Behind & In Front (Sandwich) */}
          <motion.div
            style={{ y: imageY, opacity }}
            className={`relative aspect-[4/3] flex items-center justify-center ${!isEven ? 'lg:order-last' : ''}`}
          >
            {/* Background Beetroot Layers */}
            <BeetrootLayers progress={scrollYProgress} isForeground={false} />

            {/* The Mockup Image Container with Floating Animation */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.5
              }}
              className="relative w-full h-full rounded-[2rem] overflow-hidden group z-10"
            >
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Foreground Beetroot Layers (Floating in front of image) */}
            <BeetrootLayers progress={scrollYProgress} isForeground={true} />
          </motion.div>

          {/* Text Side */}
          <motion.div
            style={{ y: textY, opacity }}
            className="space-y-8"
          >
            <div className="flex items-center gap-6">
              <div className="flex flex-col justify-center items-center">
                <Image src="/images/leef.png" alt="leef" width={40} height={40} />
                <div className="relative w-16 h-16 flex items-center justify-center">
                  {/* Internal Beetroot Layers for the Number Circle */}
                  <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none">
                    <circle cx="50" cy="50" r="48" stroke="#a21c3c" strokeWidth="2.5" fill="none" opacity="0.8" />
                    <circle cx="50" cy="50" r="38" stroke="#e33765" strokeWidth="1.5" fill="none" opacity="0.4" />
                    <circle cx="50" cy="50" r="28" stroke="#a21c3c" strokeWidth="1" fill="none" opacity="0.2" />
                  </svg>
                  <span className="relative text-[20px] font-mono font-bold text-brand-red tracking-[0.1em] z-10">
                    0{index + 1}
                  </span>
                  <div className="absolute inset-0 bg-brand-red/5 rounded-full" />
                </div>
              </div>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-brand-red to-transparent opacity-20 mt-4" />
            </div>

            <div className="space-y-6">
              <h3 className="text-4xl lg:text-6xl font-heading font-medium tracking-tighter leading-tight text-brand-lite-red uppercase">
                {service.title}
              </h3>
              <p className="text-xl lg:text-2xl font-light text-foreground leading-relaxed max-w-xl">
                {service.description}
              </p>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Central "Ladder" Rung Decor */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-brand-red/0 via-brand-red/10 to-brand-red/0 hidden lg:block -translate-x-1/2 pointer-events-none" />
    </div>
  );
}

export function ServicesLayersSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="services" ref={containerRef} className="relative bg-background overflow-hidden">
      {/* Intro Section */}
      <div className="h-screen flex flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <h2 className="text-7xl lg:text-[10rem] font-heading font-semibold tracking-tighter leading-[0.85] uppercase text-brand-lite-red">
            What We <br />
            <span className="text-brand-green">Provide</span>
          </h2>
          <div className="pt-10 flex flex-col items-center gap-12">
            <p className="text-xl text-muted-foreground/40 max-w-lg font-light leading-relaxed">
              We provide end-to-end digital solutions across industries, engineered for total scale and resilient performance.
            </p>
            <div className="w-[1px] h-32 bg-gradient-to-b from-brand-red/0 via-brand-red to-brand-red/0" />
          </div>
        </motion.div>
      </div>

      {/* Ladder Services Flow */}
      <div className="relative">
        {SERVICES.map((service, index) => (
          <LadderSection
            key={service.id}
            service={service}
            index={index}
          />
        ))}
      </div>

      {/* Floating Design Tokens */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-[20%] left-0 w-[400px] h-[400px] bg-brand-red/[0.03] rounded-full blur-[120px]" />
        <div className="absolute top-[60%] right-0 w-[500px] h-[500px] bg-brand-red/[0.02] rounded-full blur-[150px]" />
        <div className="absolute bottom-[10%] left-1/4 w-[300px] h-[300px] bg-brand-red/[0.05] rounded-full blur-[100px]" />
      </div>
    </section>
  );
}
