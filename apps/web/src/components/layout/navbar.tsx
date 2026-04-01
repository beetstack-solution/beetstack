"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useScroll, useMotionValueEvent } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Icons } from "@beetstack/icons";
import { Button } from "@repo/ui/button";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Expertise", href: "#expertise" },
  { label: "Portfolio", href: "#portfolio" },
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
              src="/logo.png"
              alt="Beetstack Logo"
              width={160}
              height={40}
              className="h-10 w-auto object-contain"
              priority
              loading="eager"
              style={{ width: "auto", height: "auto" }}
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
          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full w-10 h-10 hover:bg-primary dark:bg-white bg-black"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Icons.Sun className="h-5 w-5 text-primary" />
              ) : (
                <Icons.Moon className="h-5 w-5 text-white" />
              )}
            </Button>
            <Button
              size="lg"
              className="rounded-full px-10 h-10 bg-foreground text-background font-heading font-medium uppercase tracking-widest text-[10px] flex items-center gap-2 transition-all"
            >
              Contact
            </Button>
          </div>
        </div>

        {/* ── MOBILE layout: [hamburger] [logo centred] [spacer] ── */}
        <div className="lg:hidden flex items-center justify-between px-5 relative">
          {/* Left — hamburger */}
          <button
            onClick={() => setIsMenuOpen((v) => !v)}
            className="relative flex justify-center items-center w-9 h-9 shrink-0 z-10"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <span
              className={`absolute block w-[18px] h-[1.5px] bg-brand-lite-red rounded-full transition-all duration-300 ${isMenuOpen ? "rotate-45" : "-translate-y-[5px]"
                }`}
            />
            <span
              className={`absolute block w-[18px] h-[1.5px] bg-brand-lite-red rounded-full transition-all duration-300 ${isMenuOpen ? "opacity-0 scale-x-0" : ""
                }`}
            />
            <span
              className={`absolute block w-[18px] h-[1.5px] bg-brand-lite-red rounded-full transition-all duration-300 ${isMenuOpen ? "-rotate-45" : "translate-y-[5px]"
                }`}
            />
          </button>

          {/* Centre — logo (absolute so it's truly centred) */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 flex items-center"
          >
            <Image
              src="/logo.png"
              alt="Beetstack Logo"
              width={140}
              height={36}
              className="h-8 w-auto object-contain"
              priority
              loading="eager"
              style={{ width: "auto", height: "auto" }}
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
        {/* Overlay top bar — hamburger left, logo centre, spacer right */}
        <div
          className={`flex items-center justify-between px-5 shrink-0 relative ${isScrolled ? "py-3" : "py-5"
            }`}
        >
          {/* Close / X button */}
          <button
            onClick={() => setIsMenuOpen(false)}
            className="relative flex justify-center items-center w-9 h-9 rounded-full bg-foreground/10 border border-foreground/10 shrink-0 z-10"
            aria-label="Close menu"
          >
            <span className="absolute block w-[18px] h-[1.5px] bg-foreground rounded-full rotate-45" />
            <span className="absolute block w-[18px] h-[1.5px] bg-foreground rounded-full -rotate-45" />
          </button>

          {/* Centred logo */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2"
            onClick={() => setIsMenuOpen(false)}
          >
            <Image
              src="/logo.png"
              alt="Beetstack"
              width={140}
              height={36}
              className="h-8 w-auto object-contain"
            />
          </Link>

          {/* Spacer */}
          <div className="w-9 h-9 shrink-0" aria-hidden />
        </div>

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
              <span className="text-[11px] font-mono text-brand-lite-red/50 tracking-widest w-6 shrink-0">
                0{i + 1}
              </span>
              <span className="text-4xl sm:text-5xl font-heading font-medium tracking-tighter text-foreground group-hover:text-brand-lite-red transition-colors duration-200">
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
          <Button
            size="lg"
            onClick={() => setIsMenuOpen(false)}
            className="w-full h-14 rounded-full bg-foreground text-background font-heading font-medium uppercase tracking-widest text-xs"
          >
            Get Quote
          </Button>
        </div>
      </motion.div>
    </>
  );
}
