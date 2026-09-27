"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  MessageSquare,
  Network,
  Search,
  FileSearch,
  BrainCircuit,
} from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Semantic Search",
    description:
      "Find relevant legal documents using natural language queries. Our AI understands legal context, not just keywords.",
  },
  {
    icon: MessageSquare,
    title: "AI Legal Assistant",
    description:
      "Ask questions about any document and get instant, contextual answers powered by advanced language models.",
  },
  {
    icon: Network,
    title: "Citation Network",
    description:
      "Explore how laws interconnect. Visual citation graphs show relationships between statutes and judgements.",
  },
  {
    icon: FileSearch,
    title: "Document Analysis",
    description:
      "Extract key legal issues, obligations, and liabilities from any document with AI-powered summarization.",
  },
  {
    icon: BrainCircuit,
    title: "RAG Pipeline",
    description:
      "Retrieval-Augmented Generation ensures every AI response is grounded in actual legal text, not hallucinated.",
  },
  {
    icon: Sparkles,
    title: "Smart Recommendations",
    description:
      "Get personalized document recommendations based on your research patterns and current document context.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } },
};

export default function AIFeatures() {
  return (
    <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-20 sm:py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/20 bg-accent/5 text-xs font-medium text-accent mb-4">
          <Sparkles size={12} />
          <span>Planned for Phase 2</span>
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mt-3">
          AI Research Features (Roadmap)
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base max-w-lg mx-auto mt-3 leading-relaxed">
          None of these are built yet. Today CaseVault offers keyword search
          over its document library; these AI features are the planned next phase.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border/50 rounded-2xl overflow-hidden border border-border"
      >
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="bg-card p-6 sm:p-7 group hover:bg-secondary/10 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-4 group-hover:bg-accent/15 transition-colors">
                <Icon size={18} className="text-accent" />
              </div>
              <h3 className="font-serif text-lg font-bold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
