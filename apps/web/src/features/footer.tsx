"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Icons } from "@beetstack/icons";

import { SOCIAL_LINKS } from "../data";

export function Footer() {
  return (
    <footer className="relative bg-background py-20 px-6 lg:px-12 overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-brand-lite-red/5 blur-[100px] rounded-full -mr-32 -mb-32 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center gap-12">
        <div className="flex flex-col items-center gap-16">
          <Link href="/" className="inline-block transition-transform hover:scale-105">
            <Image
              src="/logo.png"
              alt="Beetstack"
              width={100}
              height={26}
              className="h-10 w-auto"
            />
          </Link>

          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map((social) => {
              const Icon = Icons[social.icon];
              return (
                <motion.a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ color: "var(--brand-lite-red)" }}
                  whileHover={{ scale: 1.1, color: "white", backgroundColor: "var(--brand-lite-red)" }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full border flex items-center justify-center border-brand-lite-red transition-all duration-300 backdrop-blur-sm"
                  aria-label={social.label}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              );
            })}
          </div>
        </div>

        <div className="w-full pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-center">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-black/30 text-[10px] font-mono uppercase tracking-[0.2em]">
            <p>© 2026 Beetstack IT Solutions. All Rights Reserved.</p>
            <span className="hidden md:block opacity-30">|</span>
            <span className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-brand-green" />
              Systems Operational
            </span>
          </div>

          <Link
            href="#top"
            className="text-black/30 hover:text-black text-[10px] font-mono uppercase tracking-[0.2em] transition-colors"
          >
            Back to top ↑
          </Link>
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none">
        <h2 className="text-[12vw] font-black leading-none tracking-tighter text-black">BEETSTACK</h2>
      </div>

      <div className="w-full h-1 bg-brand-lite-red rounded-full absolute bottom-0 left-0" />
    </footer>
  );
}
