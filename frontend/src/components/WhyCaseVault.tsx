"use client";

import React from "react";
import { motion } from "framer-motion";
import { Scale, Shield, BookOpen, Globe, Layers, Lock } from "lucide-react";

const reasons = [
  {
    icon: Scale,
    title: "Curated Starter Library",
    description:
      "46 documents across constitutional articles, general acts, labour, tax, civil and criminal law, and Supreme Court judgements.",
  },
  {
    icon: Shield,
    title: "Prototype Content",
    description:
      "Documents are seed content written for this prototype, not official Gazette copies. Do not rely on them as legal advice.",
  },
  {
    icon: BookOpen,
    title: "Structured Precision",
    description:
      "Documents are parsed with YAML front matter, organized by category, year, act number, and jurisdiction.",
  },
  {
    icon: Globe,
    title: "Bengali Support (Planned)",
    description:
      "The library is English today. Bengali documents and language-specific search are planned.",
  },
  {
    icon: Layers,
    title: "Search & Filters",
    description:
      "Keyword search with filters for category, year, language, status and tags, plus sorting and pagination.",
  },
  {
    icon: Lock,
    title: "Roadmap",
    description:
      "Accounts, firm workspaces and AI features are planned for Phase 2. This prototype has no login yet.",
  },
];

export default function WhyCaseVault() {
  return (
    <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-20 sm:py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
          Why CaseVault?
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base max-w-lg mx-auto mt-3 leading-relaxed">
          Built specifically for the Bangladesh legal system, CaseVault
          combines comprehensive coverage with modern research tools.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {reasons.map((reason, idx) => {
          const Icon = reason.icon;
          return (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
              whileHover={{ y: -3 }}
              className="border border-border bg-card rounded-2xl p-6 group"
            >
              <Icon
                size={20}
                className="text-accent mb-4 group-hover:scale-110 transition-transform duration-300"
              />
              <h3 className="font-serif text-lg font-bold text-foreground mb-2">
                {reason.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
