"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icons } from "@beetstack/icons";
import { Button } from "@repo/ui/button";

export const ContactSection = () => {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setFormState("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setFormState("idle"), 5000);
    } catch (_error) {
      setFormState("error");
      setTimeout(() => setFormState("idle"), 5000);
    }
  };

  const contactInfo = [
    { icon: "Mail", label: "Email", value: "info@beetstack.in", href: "mailto:info@beetstack.in" },
    { icon: "Globe", label: "Website", value: "www.beetstack.in", href: "https://www.beetstack.in" },
    { icon: "WhatsApp", label: "WhatsApp", value: "+91 6282345226", href: "https://wa.me/916282345226" },
    { icon: "Phone", label: "Roshin", value: "+91 9037275308", href: "tel:+919037275308" },
  ];

  return (
    <section className="px-6">
      <div id="contact" className="relative py-24 lg:py-40 bg-brand-lite-red overflow-hidden selection:bg-white selection:text-brand-lite-red rounded-[50px]">
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-black/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div className="space-y-12">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
                <h2 className="text-6xl lg:text-9xl font-heading font-medium tracking-tighter text-white leading-none uppercase">
                  Get in <br />
                  <span className="opacity-40">Touch</span>
                </h2>
                <div className="space-y-2">
                  <p className="text-xl lg:text-2xl font-light text-white/90">Beetstack IT Solutions</p>
                  <p className="text-sm font-mono uppercase tracking-widest text-white/60">Kannur, Kerala, India</p>
                </div>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {contactInfo.map((item, index) => {
                  const Icon = Icons[item.icon as keyof typeof Icons];
                  return (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="group flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                    >
                      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        {Icon && <Icon className="w-5 h-5 text-white" />}
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-mono tracking-widest text-white/40">{item.label}</p>
                        <p className="text-sm font-medium text-white">{item.value}</p>
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="p-8 lg:p-12 rounded-[2.5rem] bg-white shadow-2xl shadow-black/10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-mono tracking-widest text-brand-lite-red/60 px-2">Name</label>
                    <input
                      required
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full h-14 bg-brand-lite-red/5 border border-brand-lite-red/10 rounded-2xl px-6 text-sm text-brand-lite-red placeholder:text-brand-lite-red/30 focus:outline-none focus:border-brand-lite-red/40 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-mono tracking-widest text-brand-lite-red/60 px-2">Email</label>
                    <input
                      required
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full h-14 bg-brand-lite-red/5 border border-brand-lite-red/10 rounded-2xl px-6 text-sm text-brand-lite-red placeholder:text-brand-lite-red/30 focus:outline-none focus:border-brand-lite-red/40 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-mono tracking-widest text-brand-lite-red/60 px-2">Subject</label>
                  <input
                    required
                    type="text"
                    placeholder="How can we help?"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full h-14 bg-brand-lite-red/5 border border-brand-lite-red/10 rounded-2xl px-6 text-sm text-brand-lite-red placeholder:text-brand-lite-red/30 focus:outline-none focus:border-brand-lite-red/40 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-mono tracking-widest text-brand-lite-red/60 px-2">Message</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us about your project..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-brand-lite-red/5 border border-brand-lite-red/10 rounded-2xl p-6 text-sm text-brand-lite-red placeholder:text-brand-lite-red/30 focus:outline-none focus:border-brand-lite-red/40 transition-colors resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={formState === "submitting"}
                  className={`w-full h-14 rounded-2xl font-heading font-medium uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all duration-300 ${formState === "success" ? "bg-green-500 hover:bg-green-600 shadow-[0_0_20px_rgba(34,197,94,0.4)]" : "bg-brand-lite-red hover:bg-brand-red"} text-white`}
                >
                  <AnimatePresence mode="wait">
                    {formState === "idle" && (
                      <motion.span key="send" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                        Send Message
                      </motion.span>
                    )}
                    {formState === "submitting" && (
                      <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-1">
                        {[0, 0.2, 0.4].map((delay) => (
                          <div key={delay} className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: `${delay}s` }} />
                        ))}
                      </motion.div>
                    )}
                    {formState === "success" && (
                      <motion.span key="success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-2">
                        <Icons.Check className="w-4 h-4" /> Message Sent
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
