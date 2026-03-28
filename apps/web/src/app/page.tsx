"use client";

import dynamic from "next/dynamic";
import { Icons } from "@beetstack/icons";
import { Button } from "@repo/ui/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { HeroContent } from "@/features/hero/hero-content";

// Optimized Dynamic Imports for 3D and heavy sections
const Hero3D = dynamic(() => import("@/features/hero/hero-3d").then((mod) => mod.Hero3D), {
  ssr: false,
  loading: () => <div className="w-full h-[600px] lg:h-[800px] bg-primary/5 animate-pulse rounded-3xl" />,
});

const AboutSection = dynamic(() => import("@/features/about-section").then((mod) => mod.AboutSection), {
  ssr: false,
});

const ServicesSection = dynamic(() => import("@/features/services-section").then((mod) => mod.ServicesSection), {
  ssr: false,
});

const TechStackSection = dynamic(() => import("@/features/tech-stack-section").then((mod) => mod.TechStackSection), {
  ssr: false,
});

const ExperienceSection = dynamic(() => import("@/features/experience-section").then((mod) => mod.ExperienceSection), {
  ssr: false,
});

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background text-foreground font-[family-name:var(--font-geist-sans)] transition-colors duration-500 selection:bg-primary selection:text-primary-foreground">
      {/* Dynamic Theme Toggle - Floating */}
      <div className="fixed top-6 right-6 z-50">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full w-14 h-14 bg-background/50 backdrop-blur-xl border-primary/20 hover:scale-110 active:scale-90 transition-all shadow-2xl shadow-primary/10"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <Icons.Sun className="h-6 w-6 text-yellow-500 animate-[spin_10s_linear_infinite]" />
          ) : (
            <Icons.Moon className="h-6 w-6 text-primary animate-pulse" />
          )}
        </Button>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <Hero3D />
        <HeroContent />
        
        {/* Ambient Gradient Blobs */}
        <div className="absolute top-1/4 -left-10 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse" />
        <div className="absolute bottom-1/4 -right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] -z-10 animate-pulse delay-1000" />
      </section>

      {/* Main Content Area */}
      <main className="space-y-0">
        <AboutSection />
        <ServicesSection />
        <TechStackSection />
        <ExperienceSection />
      </main>

      {/* Footer Branding */}
      <footer className="border-t border-primary/10 py-24 text-center text-muted-foreground bg-primary/[0.02] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-8">
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
               <div className="w-4 h-4 rounded-full bg-primary-foreground animate-pulse" />
            </div>
            <span className="font-black text-3xl text-foreground tracking-tighter">BEETSTACK</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 text-sm font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Contact Us</a>
            <a href="#" className="hover:text-primary transition-colors">Careers</a>
          </div>

          <p className="text-sm pt-8 border-t border-primary/10">
            © 2026 Beetstack IT Solutions. Precision-engineered in the monorepo.
          </p>
        </div>
      </footer>
    </div>
  );
}
