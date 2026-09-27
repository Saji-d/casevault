"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ChevronRight } from "lucide-react";
import SearchBar from "./SearchBar";

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  onSearch: () => void;
  onOpenAdvanced: () => void;
  onPopularSearch: (term: string) => void;
}

const popularSearches = [
  "Constitution",
  "Labour Act 2006",
  "Penal Code 1860",
  "CrPC",
  "VAT Act",
  "Income Tax",
  "Companies Act",
  "Contract Act",
  "Evidence Act",
  "Writ",
  "CPC",
  "Land Law",
  "Cyber Security",
  "Customs Act",
  "Family Law",
  "Digital Security",
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
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export default function HeroSection({
  searchQuery,
  setSearchQuery,
  onSearch,
  onOpenAdvanced,
  onPopularSearch,
}: HeroSectionProps) {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative text-center max-w-4xl mx-auto pt-16 pb-10 sm:pt-24 sm:pb-14 px-4"
    >
      <motion.div variants={itemVariants} className="flex justify-center mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 text-xs font-medium text-accent">
          <Sparkles size={12} />
          <span>Phase 1 prototype · Legal document search</span>
        </div>
      </motion.div>

      <motion.h1
        variants={itemVariants}
        className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.08]"
      >
        Find Bangladesh Laws
        <br />
        <span className="text-accent">Instantly</span>
      </motion.h1>

      <motion.p
        variants={itemVariants}
        className="mt-4 text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed"
      >
        Search, filter, and read constitutional mandates, statutes, labor codes,
        and Supreme Court judgements with structured precision.
      </motion.p>

      <motion.div variants={itemVariants} className="mt-8">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onSubmit={onSearch}
          onOpenAdvanced={onOpenAdvanced}
          variant="hero"
        />
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="mt-6"
      >
        <span className="text-xs font-medium text-muted-foreground block mb-2.5">
          Popular Searches
        </span>
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-xl mx-auto">
          {popularSearches.map((term) => (
            <motion.button
              key={term}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onPopularSearch(term)}
              className="px-3 py-1.5 rounded-lg border border-border bg-secondary/30 text-xs text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors cursor-pointer"
            >
              {term}
            </motion.button>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="hidden sm:flex items-center justify-center gap-1 mt-10 text-muted-foreground/40 text-[11px]"
      >
        <span>Scroll to explore</span>
        <ChevronRight size={12} className="rotate-90" />
      </motion.div>
    </motion.section>
  );
}
