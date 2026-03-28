"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@repo/ui/card";
import { Icons } from "@beetstack/icons";

const services = [
  {
    title: "Cloud Infrastructure",
    description: "Architecting resilient, multi-cloud ecosystems with 99.9% uptime and automated scaling.",
    icon: Icons.Settings,
    delay: 0.1,
  },
  {
    title: "Enterprise Solutions",
    description: "Custom-built, monorepo-first architectures that unify your corporate software stack.",
    icon: Icons.Home,
    delay: 0.3,
  },
  {
    title: "Security & IAM",
    description: "Sophisticated identity management and encryption layers for mission-critical data.",
    icon: Icons.User,
    delay: 0.5,
  },
];

export function ServicesSection() {
  return (
    <section className="py-24 bg-primary/[0.02]">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4"
        >
          <h2 className="text-4xl md:text-6xl font-black tracking-tight">Our Services</h2>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
            Layered solutions for complex IT challenges.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: service.delay, duration: 0.8, ease: "easeOut" as const }}
              className="perspective-1000"
            >
              <Card className="h-full group hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 bg-card/60 backdrop-blur-md">
                <CardHeader>
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-all">
                    <service.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-3xl font-black tracking-tight">{service.title}</CardTitle>
                  <CardDescription className="text-lg pt-4 leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
