"use client";

import React from "react";
import { motion } from "framer-motion";
import { Database, Scale, FileText, Cpu } from "lucide-react";
import { StatsResponse } from "../lib/api";

interface LiveStatsProps {
  stats: StatsResponse | null;
}

const statItems = [
  {
    label: "Scanned Documents",
    value: "42,000+",
    subLabel: "locally indexed",
    icon: Database,
  },
  {
    label: "General Acts & Laws",
    value: "120+",
    subLabel: "locally indexed",
    icon: Scale,
  },
  {
    label: "Supreme Court Cases",
    value: "500+",
    subLabel: "locally indexed",
    icon: FileText,
  },
  {
    label: "AI Processing",
    value: "AI Ready",
    subLabel: "Vector embeddings live",
    icon: Cpu,
  },
];

export default function LiveStats({ stats }: LiveStatsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border/50 rounded-2xl overflow-hidden border border-border"
    >
      {statItems.map((item, idx) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 + idx * 0.08 }}
            className="bg-card p-5 sm:p-6 flex flex-col gap-2 group hover:bg-secondary/20 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                {item.label}
              </span>
              <Icon
                size={16}
                className="text-muted-foreground/40 group-hover:text-accent/60 transition-colors"
              />
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground block">
                {item.value}
              </span>
              <span className="text-[11px] font-medium text-muted-foreground mt-0.5 block">
                {item.subLabel}
              </span>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
