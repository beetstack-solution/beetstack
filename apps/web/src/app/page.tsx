"use client";

import dynamic from "next/dynamic";
import { Icons } from "@beetstack/icons";
import { Button } from "@repo/ui/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import Image from "next/image";
import { HeroContent } from "@/features/hero/hero-content";

// Optimized Dynamic Imports
const Hero3D = dynamic(() => import("@/features/hero/hero-3d").then((mod) => mod.Hero3D), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-primary/5 animate-pulse" />,
});

const ServicesSection = dynamic(() => import("@/features/services-layers-section").then((mod) => mod.ServicesLayersSection), { ssr: false });
const WhoWeAreSection = dynamic(() => import("@/features/who-we-are-section").then((mod) => mod.WhoWeAreSection), { ssr: false });
const SliceSection = dynamic(() => import("@/features/3d-slice-section").then((mod) => mod.SliceSection), { ssr: false });
const TechStackSection = dynamic(() => import("@/features/tech-stack-section").then((mod) => mod.TechStackSection), { ssr: false });
const DifferenceSection = dynamic(() => import("@/features/difference-section").then((mod) => mod.DifferenceSection), { ssr: false });

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress, scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 30);
  });

  // Background opacity maps to scroll
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0.4]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased selection:bg-primary selection:text-white overflow-x-hidden">


      <nav className={`fixed top-0 w-full z-50 px-8 transition-all duration-500 flex items-center justify-between ${isScrolled
        ? "py-4 backdrop-blur-md bg-background shadow border-b border-primary/5"
        : "py-10 bg-transparent"
        }`}>
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Beetstack Logo"
            width={160}
            height={40}
            className="h-10 w-auto object-contain"
            priority
          />
        </div>

        <div className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2 gap-10 text-xs font-medium uppercase tracking-widest opacity-60">
          <a href="#about" className="hover:text-primary transition-colors hover:opacity-100">About</a>
          <a href="#services" className="hover:text-primary transition-colors hover:opacity-100">Services</a>
          <a href="#expertise" className="hover:text-primary transition-colors hover:opacity-100">Expertise</a>
          <a href="#portfolio" className="hover:text-primary transition-colors hover:opacity-100">Portfolio</a>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full w-10 h-10 hover:bg-primary dark:bg-white bg-black"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Icons.Sun className="h-5 w-5 text-primary" />
            ) : (
              <Icons.Moon className="h-5 w-5 text-white" />
            )}
          </Button>
          <Button size="lg" className="rounded-full px-10 h-10 bg-foreground text-background font-heading font-medium uppercase tracking-widest text-[10px] flex items-center gap-2 group transition-all">
            Contact
          </Button>
        </div>

        {/* Full-screen Menu Overlay (Mobile Only) */}
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={isMenuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed lg:hidden inset-0 z-[55] bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center p-8"
        >
          <div className="flex flex-col items-center gap-12 text-center">
            <div className="flex flex-col gap-8 text-2xl font-heading font-medium tracking-tighter">
              <a href="#about" onClick={() => setIsMenuOpen(false)} className="hover:text-primary transition-colors">About</a>
              <a href="#services" onClick={() => setIsMenuOpen(false)} className="hover:text-primary transition-colors">Services</a>
              <a href="#expertise" onClick={() => setIsMenuOpen(false)} className="hover:text-primary transition-colors">Expertise</a>
              <a href="#portfolio" onClick={() => setIsMenuOpen(false)} className="hover:text-primary transition-colors">Portfolio</a>
            </div>
          </div>
        </motion.div>
      </nav>

      {/* Global Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[4px] bg-brand-green z-[60]">
        <motion.div
          className="h-full bg-brand-lite-red origin-left"
          style={{ scaleX: scrollYProgress }}
        />
      </div>

      <section className="relative">
        {/* Sticky 3D Background */}
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
          <motion.div
            style={{ opacity: heroOpacity, scale: heroScale }}
            className="absolute inset-0 z-0"
          >
            <Hero3D />
          </motion.div>

          <div className="relative z-10 w-full">
            <HeroContent />
          </div>
        </div>
      </section>

      {/* Main Content Flow */}
      <main className="relative z-20 space-y-20 pb-20">
        <WhoWeAreSection />
        <SliceSection />
        <ServicesSection />
        <TechStackSection />
        <DifferenceSection />
      </main>

      <footer className="py-24 border-t border-primary/5 px-8 flex items-center justify-between opacity-40 text-[10px] font-black uppercase tracking-widest">
        <div className="flex items-center gap-4">
          <Image
            src="/logo.png"
            alt="Beetstack Logo"
            width={80}
            height={20}
            className="h-5 w-auto object-contain transition-opacity hover:opacity-100"
          />
          <p>© 2026. Next-Generation IDE Platform.</p>
        </div>
        <div className="flex gap-12">
          <a href="#" className="hover:text-primary transition-colors">Twitter</a>
          <a href="#" className="hover:text-primary transition-colors">GitHub</a>
          <a href="#" className="hover:text-primary transition-colors">Discord</a>
        </div>
      </footer>
    </div>
  );
}
