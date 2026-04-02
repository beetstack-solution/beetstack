"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icons } from "@beetstack/icons";
import { Button } from "@repo/ui/button";
import { CONTACT_INFO } from "@/data";
import { sendContactEmail } from "@/actions/send-email";

export function ContactSection() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
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
    setErrorMessage(null);

    try {
      const response = await sendContactEmail(formData);
      
      if (response.success) {
        setFormState("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setFormState("idle"), 5000);
      } else {
        setFormState("error");
        setErrorMessage(response.error || "An unknown error occurred");
        setTimeout(() => setFormState("idle"), 7000);
      }
    } catch (err: any) {
      setFormState("error");
      setErrorMessage(err.message || "Something went wrong. Please try again later.");
      setTimeout(() => setFormState("idle"), 7000);
    }
  };



  return (
    <section id="contact" className="px-2 sm:px-6">
      <div className="relative py-10 md:py-48 bg-background border border-foreground/5 overflow-hidden selection:bg-brand-red selection:text-white rounded-[30px] sm:rounded-[60px]">
        {/* Ambient background glows */}
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-brand-red/[0.03] rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-brand-green/[0.03] rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

        <div className="container mx-auto px-2 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div className="space-y-12">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
                <h2 className="text-6xl lg:text-9xl font-heading font-medium tracking-tighter text-foreground leading-none uppercase">
                  Get in <br />
                  <span className="animate-brand-gradient opacity-100">Touch</span>
                </h2>
                <div className="space-y-2">
                  <p className="text-xl lg:text-2xl font-light text-foreground/90">Beetstack IT Solutions</p>
                  <p className="text-sm font-mono uppercase tracking-widest text-foreground/40">Kannur, Kerala, India</p>
                </div>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {CONTACT_INFO.map((item, index) => {
                  const Icon = Icons[item.icon as keyof typeof Icons];
                  return (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="group flex items-center gap-4 p-4 rounded-2xl bg-foreground/[0.02] border border-foreground/5 hover:bg-brand-red/5 hover:border-brand-red/20 transition-all"
                    >
                      <div className="w-12 h-12 rounded-xl bg-brand-red/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        {Icon && <Icon className="w-5 h-5 text-brand-red" />}
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-mono tracking-widest text-foreground/30">{item.label}</p>
                        <p className="text-sm font-medium text-foreground">{item.value}</p>
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 lg:p-12 rounded-[2.5rem] bg-white dark:bg-[#0a0507] shadow-[0_20px_80px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_80px_rgba(0,0,0,0.4)] border border-transparent dark:border-white/5"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="contact-name" className="text-[10px] uppercase font-mono tracking-widest text-brand-red px-2">Name</label>
                    <input
                      required
                      id="contact-name"
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full h-14 bg-brand-red/[0.03] dark:bg-white/[0.02] border border-brand-red/10 dark:border-white/5 rounded-2xl px-6 text-sm text-brand-red dark:text-white placeholder:text-brand-red/30 focus:outline-none focus:border-brand-red/30 dark:focus:border-brand-red/50 transition-all duration-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="contact-email" className="text-[10px] uppercase font-mono tracking-widest text-brand-red px-2">Email</label>
                    <input
                      required
                      id="contact-email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full h-14 bg-brand-red/[0.03] dark:bg-white/[0.02] border border-brand-red/10 dark:border-white/5 rounded-2xl px-6 text-sm text-brand-red dark:text-white placeholder:text-brand-red/30 focus:outline-none focus:border-brand-red/30 dark:focus:border-brand-red/50 transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact-subject" className="text-[10px] uppercase font-mono tracking-widest text-brand-red px-2">Subject</label>
                  <input
                    required
                    id="contact-subject"
                    name="subject"
                    type="text"
                    placeholder="How can we help?"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full h-14 bg-brand-red/[0.03] dark:bg-white/[0.02] border border-brand-red/10 dark:border-white/5 rounded-2xl px-6 text-sm text-brand-red dark:text-white placeholder:text-brand-red/30 focus:outline-none focus:border-brand-red/30 dark:focus:border-brand-red/50 transition-all duration-300"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact-message" className="text-[10px] uppercase font-mono tracking-widest text-brand-red px-2">Message</label>
                  <textarea
                    required
                    id="contact-message"
                    name="message"
                    rows={4}
                    placeholder="Tell us about your project..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-brand-red/[0.03] dark:bg-white/[0.02] border border-brand-red/10 dark:border-white/5 rounded-2xl p-6 text-sm text-brand-red dark:text-white placeholder:text-brand-red/30 focus:outline-none focus:border-brand-red/30 dark:focus:border-brand-red/50 transition-all duration-300 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={formState === "submitting"}
                  className={`w-full h-14 rounded-full font-heading font-medium uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-2 transition-all duration-500 shadow-xl ${formState === "success" ? "bg-green-500 hover:bg-green-600 shadow-green-500/20" : "bg-brand-red hover:bg-brand-red/50 shadow-brand-red/10"} text-background`}
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
                    {formState === "error" && (
                      <motion.span key="error" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-2">
                         Error Occurred
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>

                <AnimatePresence>
                  {formState === "error" && errorMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-mono text-center"
                    >
                      {errorMessage}
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
