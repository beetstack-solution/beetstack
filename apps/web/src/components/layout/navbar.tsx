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
        className={`fixed top-0 z-50 w-full transition-all duration-500 ${navPy} ${navBg}`}
      >
        {/* ── DESKTOP layout: logo left | links centre | actions right ── */}
        <div className="hidden items-center justify-between px-8 lg:flex">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center">
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
          <div className="flex items-center gap-10 text-xs font-medium uppercase tracking-widest">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full px-3 py-1 transition-all duration-300 hover:scale-125 hover:bg-background hover:text-brand-red"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="group relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-brand-red bg-transparent transition-all duration-300"
              aria-label="Toggle theme"
            >
              <div className="absolute inset-0 origin-left scale-x-0 bg-brand-lite-red transition-transform duration-500 group-hover:scale-x-100" />
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
              <button className="group relative flex h-10 items-center justify-center gap-2 overflow-hidden rounded-full border-2 border-brand-green bg-transparent px-10 transition-all duration-300">
                <div className="absolute inset-0 origin-left scale-x-0 bg-brand-green transition-transform duration-500 group-hover:scale-x-100" />
                <span className="relative z-10 font-heading text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-green transition-colors duration-500 group-hover:text-background">
                  Get Quote
                </span>
              </button>
            </Link>
          </div>
        </div>

        {/* ── MOBILE layout: [hamburger] [logo centred] [spacer] ── */}
        <div className="relative flex items-center justify-between px-5 pt-2 lg:hidden">
          {/* Left — hamburger */}
          <button
            onClick={() => setIsMenuOpen((v) => !v)}
            className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <span
              className={`absolute block h-[2px] w-[30px] rounded-full bg-brand-lite-red transition-all duration-300 ${
                isMenuOpen ? "rotate-45" : "-translate-y-[5px]"
              }`}
            />
            <span
              className={`absolute block h-[2px] w-[30px] rounded-full bg-brand-lite-red transition-all duration-300 ${
                isMenuOpen ? "-rotate-45" : "translate-y-[5px]"
              }`}
            />
          </button>

          {/* Centre — logo (absolute so it's truly centred) */}
          <Link
            href="/"
            className="absolute left-1/2 flex -translate-x-1/2 items-center"
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
          <div className="h-9 w-9 shrink-0" aria-hidden />
        </div>
      </nav>

      {/* ── Full-Screen Mobile Menu Overlay ── */}
      <motion.div
        initial={false}
        animate={isMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={`bg-background/98 fixed inset-0 z-[48] flex flex-col backdrop-blur-2xl lg:hidden ${
          isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Nav links */}
        <div className="flex flex-1 flex-col items-start justify-center gap-1 px-8">
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
              className="group flex w-full items-center gap-4 border-b border-foreground/5 py-4 last:border-0"
            >
              <span className="w-6 shrink-0 font-mono text-[11px] tracking-widest text-brand-lite-red">
                0{i + 1}
              </span>
              <span className="animate-brand-gradient font-heading text-4xl font-medium tracking-tighter transition-colors duration-200 group-hover:text-brand-lite-red sm:text-5xl">
                {link.label}
              </span>
            </motion.a>
          ))}

          {/* ── Theme toggle — inside the nav links section ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isMenuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
            transition={{
              delay: isMenuOpen ? NAV_LINKS.length * 0.07 + 0.05 : 0,
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex w-full items-center gap-4 pt-6"
          >
            <span className="text-brand-lite-red/40 font-mono text-[11px] uppercase tracking-widest">
              Theme
            </span>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex items-center gap-3 rounded-full border border-foreground/10 bg-foreground/5 px-4 py-2 transition-colors hover:bg-foreground/10"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <>
                  <Icons.Sun className="h-4 w-4 text-brand-lite-red" />
                  <span className="font-heading text-sm text-foreground/70">
                    Light Mode
                  </span>
                </>
              ) : (
                <>
                  <Icons.Moon className="h-4 w-4 text-brand-lite-red" />
                  <span className="font-heading text-sm text-foreground/70">
                    Dark Mode
                  </span>
                </>
              )}
            </button>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <div className="shrink-0 px-8 pb-10">
          <Link href="#contact" onClick={() => setIsMenuOpen(false)}>
            <button className="shadow-brand-lite-red/10 h-14 w-full rounded-full border-2 border-brand-lite-red bg-brand-lite-red font-heading text-[14px] font-bold uppercase tracking-[0.2em] text-background shadow-lg">
              Get Quote
            </button>
          </Link>
        </div>
      </motion.div>
    </>
  );
}
