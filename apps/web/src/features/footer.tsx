"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Icons } from "@beetstack/icons";

const SOCIAL_LINKS = [
  { id: "github", icon: "Github", href: "https://github.com/beetstack", label: "GitHub" },
  { id: "linkedin", icon: "LinkedIn", href: "https://linkedin.com/company/beetstack", label: "LinkedIn" },
  { id: "instagram", icon: "Instagram", href: "https://instagram.com/beetstack", label: "Instagram" },
  { id: "twitter", icon: "Twitter", href: "https://twitter.com/beetstack", label: "Twitter" },
];

export function Footer() {
  return (
    <footer className="relative bg-[#050505] py-16 px-6 lg:px-12 overflow-hidden border-t border-white/5">
      {/* Background Decorative Element */}
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-brand-lite-red/5 blur-[100px] rounded-full -mr-32 -mb-32 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center gap-12">

        {/* Brand & Socials Section */}
        <div className="flex flex-col items-center gap-8">
          <Link href="/" className="inline-block">
            <Image
              src="/logo.png"
              alt="Beetstack"
              width={100}
              height={26}
              className="h-6 w-auto brightness-200"
            />
          </Link>

          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map((social) => {
              const Icon = Icons[social.icon as keyof typeof Icons];
              return (
                <motion.a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, color: "var(--brand-lite-red)" }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full border border-white/5 bg-white/[0.02] flex items-center justify-center text-white/30 hover:border-brand-lite-red/30 transition-all duration-300 backdrop-blur-sm"
                  aria-label={social.label}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              );
            })}
          </div>
        </div>

        {/* Bottom Metadata */}
        <div className="w-full pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-center">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-white/20 text-[10px] font-mono uppercase tracking-[0.2em]">
            <p>© 2026 Beetstack IT Solutions. All Rights Reserved.</p>
            <span className="hidden md:block opacity-30">|</span>
            <span className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-brand-green animate-pulse" />
              Systems Operational
            </span>
          </div>

          <Link
            href="#top"
            className="text-white/20 hover:text-white text-[10px] font-mono uppercase tracking-[0.2em] transition-colors"
          >
            Back to top ↑
          </Link>
        </div>
      </div>

      {/* Subtle Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none select-none">
        <h2 className="text-[12vw] font-black leading-none tracking-tighter select-none">BEETSTACK</h2>
      </div>
    </footer>
  );
}
