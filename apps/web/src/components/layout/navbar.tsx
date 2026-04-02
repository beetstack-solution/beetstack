"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useScroll, useMotionValueEvent } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Icons } from "@beetstack/icons";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Expertise", href: "#expertise" },
  { label: "Process", href: "#delivery-model" },
  { label: "Security", href: "#security-experience" },
];

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 30);
  });

  const navPy = isScrolled ? "py-3 lg:py-4" : "py-5 lg:py-10";
  const navBg = isScrolled
    ? "backdrop-blur-md bg-background shadow border-b border-primary/5"
    : "bg-transparent";

  return (
    <>
      {/* ── Top Navigation Bar ── */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${navPy} ${navBg}`}
      >
        {/* ── DESKTOP layout: logo left | links centre | actions right ── */}
        <div className="hidden lg:flex items-center justify-between px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/logo.webp"
              alt="Beetstack Logo"
              width={160}
              height={40}
              className="h-10 w-auto object-contain"
              priority
              loading="eager"
              style={{ width: "auto", height: "100%" }}
            />
          </Link>

          {/* Centred links */}
          <div className="flex items-center gap-10 text-xs font-medium uppercase tracking-widest opacity-60">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="hover:text-primary transition-colors hover:opacity-100"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Theme Toggle Button */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="group relative w-10 h-10 rounded-full border-2 border-brand-red bg-transparent overflow-hidden flex items-center justify-center transition-all duration-300"
              aria-label="Toggle theme"
            >
              <div className="absolute inset-0 bg-brand-lite-red scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
              <div className="relative z-10 transition-colors duration-500">
                {theme === "dark" ? (
                  <Icons.Sun className="h-4 w-4 text-brand-lite-red group-hover:text-white" />
                ) : (
                  <Icons.Moon className="h-4 w-4 text-brand-lite-red group-hover:text-white" />
                )}
              </div>
            </button>

            {/* Contact Button */}
            <Link href="#contact">
              <button
                className="group relative px-10 h-10 rounded-full border-2 border-brand-green bg-transparent overflow-hidden flex items-center justify-center gap-2 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-brand-green scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                <span className="relative z-10 text-[10px] font-semibold font-heading font-medium uppercase tracking-[0.2em] text-brand-green group-hover:text-background transition-colors duration-500">
                  Get Quote
                </span>
              </button>
            </Link>
          </div>
        </div>

        {/* ── MOBILE layout: [hamburger] [logo centred] [spacer] ── */}
        <div className="lg:hidden flex items-center justify-between px-5 relative pt-2">
          {/* Left — hamburger */}
          <button
            onClick={() => setIsMenuOpen((v) => !v)}
            className="relative flex justify-center items-center w-9 h-9 shrink-0 z-10"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <span
              className={`absolute block w-[30px] h-[2px] bg-brand-lite-red rounded-full transition-all duration-300 ${isMenuOpen ? "rotate-45" : "-translate-y-[5px]"
                }`}
            />
            <span
              className={`absolute block w-[30px] h-[2px] bg-brand-lite-red rounded-full transition-all duration-300 ${isMenuOpen ? "-rotate-45" : "translate-y-[5px]"
                }`}
            />
          </button>

          {/* Centre — logo (absolute so it's truly centred) */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 flex items-center"
          >
            <Image
              src="/logo.webp"
              alt="Beetstack Logo"
              width={140}
              height={36}
              className="h-8 w-auto object-contain"
              priority
              loading="eager"
              style={{ width: "auto", height: "100%" }}
            />
          </Link>

          {/* Right — spacer (same width as hamburger to balance) */}
          <div className="w-9 h-9 shrink-0" aria-hidden />
        </div>
      </nav>

      {/* ── Full-Screen Mobile Menu Overlay ── */}
      <motion.div
        initial={false}
        animate={isMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed lg:hidden inset-0 z-[48] bg-background/98 backdrop-blur-2xl flex flex-col ${isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
          }`}
      >
        {/* Nav links */}
        <div className="flex-1 flex flex-col items-start justify-center px-8 gap-1">
          {NAV_LINKS.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              initial={{ opacity: 0, x: -24 }}
              animate={
                isMenuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }
              }
              transition={{
                delay: isMenuOpen ? i * 0.07 + 0.05 : 0,
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group flex items-center gap-4 py-4 w-full border-b border-foreground/5 last:border-0"
            >
              <span className="text-[11px] font-mono text-brand-lite-red tracking-widest w-6 shrink-0">
                0{i + 1}
              </span>
              <span className="text-4xl sm:text-5xl font-heading font-medium tracking-tighter animate-brand-gradient group-hover:text-brand-lite-red transition-colors duration-200">
                {link.label}
              </span>
            </motion.a>
          ))}

          {/* ── Theme toggle — inside the nav links section ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={
              isMenuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }
            }
            transition={{
              delay: isMenuOpen ? NAV_LINKS.length * 0.07 + 0.05 : 0,
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex items-center gap-4 pt-6 w-full"
          >
            <span className="text-[11px] font-mono text-brand-lite-red/40 tracking-widest uppercase">
              Theme
            </span>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex items-center gap-3 px-4 py-2 rounded-full border border-foreground/10 bg-foreground/5 hover:bg-foreground/10 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <>
                  <Icons.Sun className="h-4 w-4 text-brand-lite-red" />
                  <span className="text-sm font-heading text-foreground/70">Light Mode</span>
                </>
              ) : (
                <>
                  <Icons.Moon className="h-4 w-4 text-brand-lite-red" />
                  <span className="text-sm font-heading text-foreground/70">Dark Mode</span>
                </>
              )}
            </button>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <div className="px-8 pb-10 shrink-0">
          <Link href="#contact" onClick={() => setIsMenuOpen(false)}>
            <button
              className="w-full h-14 rounded-full bg-brand-lite-red text-background font-heading font-bold uppercase tracking-[0.2em] text-[14px] shadow-lg shadow-brand-lite-red/10 border-2 border-brand-lite-red"
            >
              Get Quote
            </button>
          </Link>
        </div>
      </motion.div>
    </>
  );
}
