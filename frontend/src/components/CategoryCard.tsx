"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface CategoryCardProps {
  name: string;
  description: string;
  count: number;
  onClick: () => void;
  index: number;
}

const categoryIcons: Record<string, string> = {
  Constitution: "⚖️",
  "General Act": "📜",
  "Labour Law": "🔨",
  Judgement: "🏛️",
};

export default function CategoryCard({
  name,
  description,
  count,
  onClick,
  index,
}: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onClick={onClick}
      className="group relative border border-border bg-card p-6 rounded-2xl cursor-pointer overflow-hidden"
    >
      {/* Hover gradient */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-accent/[0.03] to-transparent" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xl">{categoryIcons[name] || "📄"}</span>
          <ChevronRight
            size={16}
            className="text-muted-foreground/30 group-hover:text-accent/60 group-hover:translate-x-0.5 transition-all"
          />
        </div>

        <h3 className="font-serif text-lg font-bold text-foreground mb-1.5">
          {name}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          {description}
        </p>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold text-accent uppercase tracking-wider">
            {count} indexed
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>
      </div>
    </motion.div>
  );
}
