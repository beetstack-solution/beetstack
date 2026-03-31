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

const FOOTER_LINKS = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#who-we-are" },
      { label: "Our Story", href: "#slice" },
      { label: "Services", href: "#services" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Expertise",
    links: [
      { label: "AI & Innovation", href: "#why-beetstack" },
      { label: "Tech Stack", href: "#tech-stack" },
      { label: "Security", href: "#security" },
      { label: "Delivery Model", href: "#delivery" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative bg-[#050505] pt-24 pb-12 px-6 lg:px-12 overflow-hidden border-t border-white/5">
      {/* Background Decorative Element */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-brand-lite-red/5 blur-[120px] rounded-full -mr-48 -mb-48 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8 mb-20">
          
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <Image 
                src="/logo.png" 
                alt="Beetstack" 
                width={120} 
                height={30} 
                className="h-8 w-auto brightness-200"
              />
            </Link>
            <p className="text-white/50 text-sm leading-relaxed max-w-sm mb-8">
              Innovating the future of software with secure, scalable, and premium digital solutions. From AI integration to robust architectures, we stack success for global brands.
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => {
                const Icon = Icons[social.icon as keyof typeof Icons];
                return (
                  <motion.a
                    key={social.id}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, backgroundColor: "var(--brand-lite-red)", borderColor: "var(--brand-lite-red)" }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors duration-300 backdrop-blur-sm"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Links Columns */}
          {FOOTER_LINKS.map((group) => (
            <div key={group.title} className="lg:col-span-1">
              <h4 className="text-white font-mono text-[10px] uppercase tracking-[0.2em] mb-6 opacity-30">
                {group.title}
              </h4>
              <ul className="space-y-4">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href}
                      className="text-white/40 hover:text-brand-lite-red text-sm transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter / CTA Column */}
          <div className="lg:col-span-1 flex flex-col items-start lg:items-end lg:text-right">
             <h4 className="text-white font-mono text-[10px] uppercase tracking-[0.2em] mb-6 opacity-30">
                Contact
              </h4>
              <p className="text-white/40 text-sm mb-2">info@beetstack.in</p>
              <p className="text-white/40 text-sm">+91 6282345226</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-[10px] font-mono uppercase tracking-widest">
            © 2026 Beetstack IT Solutions. All Rights Reserved.
          </p>
          <div className="flex items-center gap-8 text-white/20 text-[10px] font-mono uppercase tracking-widest">
             <span className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-brand-green animate-pulse" />
                Systems Operational
             </span>
             <Link href="#top" className="hover:text-white transition-colors">Back to top</Link>
          </div>
        </div>
      </div>
      
      {/* Decorative Branding */}
      <div className="absolute -bottom-10 -left-10 opacity-[0.02] pointer-events-none select-none">
        <h2 className="text-[15vw] font-black leading-none select-none">BEETSTACK</h2>
      </div>
    </footer>
  );
}
