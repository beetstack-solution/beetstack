"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HeroContent } from "@/components/sections/hero/hero-content";
import { Navbar } from "@/components/layout/navbar";

// Optimized Dynamic Imports
const Hero3D = dynamic(() => import("@/components/sections/hero/hero-3d").then((mod) => mod.Hero3D), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-primary/5 animate-pulse" />,
});

const ServicesSection = dynamic(() => import("@/components/sections/services-layers").then((mod) => mod.ServicesLayersSection), { ssr: false });
const WhoWeAreSection = dynamic(() => import("@/components/sections/who-we-are").then((mod) => mod.WhoWeAreSection), { ssr: false });
const SliceSection = dynamic(() => import("@/components/sections/3d-slice").then((mod) => mod.SliceSection), { ssr: false });
const TechStackSection = dynamic(() => import("@/components/sections/tech-stack").then((mod) => mod.TechStackSection), { ssr: false });
const DifferenceSection = dynamic(() => import("@/components/sections/difference").then((mod) => mod.DifferenceSection), { ssr: false });
const SecuritySection = dynamic(() => import("@/components/sections/security").then((mod) => mod.SecuritySection), { ssr: false });
const DeliveryModelSection = dynamic(() => import("@/components/sections/delivery-model").then((mod) => mod.DeliveryModelSection), { ssr: false });
const WhyBeetstackSection = dynamic(() => import("@/components/sections/why-beetstack").then((mod) => mod.WhyBeetstackSection), { ssr: false });
const ContactSection = dynamic(() => import("@/components/sections/contact").then(mod => mod.ContactSection), { ssr: false });
const TestimonialsSection = dynamic(() => import("@/components/sections/testimonials").then(mod => mod.TestimonialsSection), { ssr: false });
const Footer = dynamic(() => import("@/components/layout/footer").then(mod => mod.Footer), { ssr: false });

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();

  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0.4]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div id="top" className="relative min-h-screen bg-background text-foreground font-sans antialiased selection:bg-primary selection:text-white">

      <Navbar />

      {/* Global Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[4px] bg-brand-green z-[60]">
        <motion.div
          className="h-full bg-brand-lite-red origin-left"
          style={{ scaleX: scrollYProgress }}
        />
      </div>

      <section className="relative">
        {/* Sticky 3D Background */}
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden relative">
          <motion.div
            style={{ opacity: heroOpacity, scale: heroScale }}
            className="absolute inset-0 z-0"
          >
            <Hero3D />
          </motion.div>

          <div className="relative z-10 w-full container mx-auto px-4">
            <HeroContent />
          </div>
        </div>
      </section>

      {/* Main Content Flow */}
      <main className="relative z-20 flex flex-col pt-20">
        <WhoWeAreSection />
        <div className="relative">
          <SliceSection />
        </div>
        <ServicesSection />
        <WhyBeetstackSection />
        <TechStackSection />
        <DifferenceSection />
        <SecuritySection />
        <DeliveryModelSection />
        <TestimonialsSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
