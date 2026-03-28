"use client";

import { Icons } from "@beetstack/icons";
import { Button } from "@repo/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@repo/ui/card";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Hero3D } from "@/features/hero/hero-3d";
import { HeroContent } from "@/features/hero/hero-content";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background text-foreground font-[family-name:var(--font-geist-sans)] transition-colors duration-500">
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
      <main className="max-w-7xl mx-auto px-6 py-24 space-y-32">
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
              Core Capabilities
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Leveraging the most advanced technology stacks to deliver unparalleled software solutions.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="group hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 bg-card/40 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icons.Settings className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">Modular Architecture</CardTitle>
                <CardDescription className="text-base pt-2">
                  Building with independent, swappable components that scale with your business logic.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 bg-card/40 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icons.User className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">Enterprise Identity</CardTitle>
                <CardDescription className="text-base pt-2">
                  Sophisticated authentication and authorization flows tailored for high-security environments.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 bg-card/40 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icons.Home className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">Scalable Infrastructure</CardTitle>
                <CardDescription className="text-base pt-2">
                  Pro-active cloud management and automated deployment structures for 99.9% uptime.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* Feature Icons Grid - Centralized */}
        <section className="bg-primary/[0.03] rounded-[3rem] p-12 md:p-20 border border-primary/10 relative overflow-hidden group">
          <div className="absolute inset-0 bg-primary/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-5 gap-12 place-items-center opacity-70 hover:opacity-100 transition-opacity duration-500">
            <div className="flex flex-col items-center gap-4 group/icon hover:scale-110 transition-transform">
              <Icons.Search className="h-10 w-10 text-primary group-hover:drop-shadow-[0_0_8px_rgba(var(--primary),0.8)]" />
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Search</span>
            </div>
            <div className="flex flex-col items-center gap-4 group/icon hover:scale-110 transition-transform">
              <Icons.Mail className="h-10 w-10 text-primary group-hover:drop-shadow-[0_0_8px_rgba(var(--primary),0.8)]" />
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Messaging</span>
            </div>
            <div className="flex flex-col items-center gap-4 group/icon hover:scale-110 transition-transform text-red-500">
              <Icons.Heart className="h-10 w-10 group-hover:drop-shadow-[0_0_8px_currentColor]" />
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Engagement</span>
            </div>
            <div className="flex flex-col items-center gap-4 group/icon hover:scale-110 transition-transform">
              <Icons.Bell className="h-10 w-10 text-primary group-hover:drop-shadow-[0_0_8px_rgba(var(--primary),0.8)]" />
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Alerts</span>
            </div>
            <div className="flex flex-col items-center gap-4 group/icon hover:scale-110 transition-transform text-green-500">
              <Icons.Check className="h-10 w-10 group-hover:drop-shadow-[0_0_8px_currentColor]" />
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Quality</span>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Branding */}
      <footer className="border-t border-primary/10 py-12 text-center text-muted-foreground">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
             <div className="w-3 h-3 rounded-full bg-primary" />
          </div>
          <span className="font-black text-foreground tracking-tighter">BEETSTACK</span>
        </div>
        <p className="text-sm">© 2026 Beetstack IT Solutions. Built with precision.</p>
      </footer>
    </div>
  );
}
