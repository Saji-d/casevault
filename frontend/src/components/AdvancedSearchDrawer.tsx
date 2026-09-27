"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Filter, RotateCcw, Check } from "lucide-react";
import { FilterOptions } from "../lib/api";

interface AdvancedSearchDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterOptions | null;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedYear: string;
  setSelectedYear: (yr: string) => void;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  selectedLanguage: string;
  setSelectedLanguage: (lang: string) => void;
  selectedSource: string;
  setSelectedSource: (src: string) => void;
  selectedTag: string;
  setSelectedTag: (tag: string) => void;
  sortBy: string;
  setSortBy: (sort: "relevance" | "newest" | "oldest" | "alphabetical") => void;
  onApplyFilters: () => void;
  onResetFilters: () => void;
}

const sortOptions = [
  { label: "Relevance", val: "relevance" },
  { label: "Newest", val: "newest" },
  { label: "Oldest", val: "oldest" },
  { label: "A-Z", val: "alphabetical" },
] as const;

export default function AdvancedSearchDrawer({
  isOpen,
  onClose,
  filters,
  selectedCategory,
  setSelectedCategory,
  selectedYear,
  setSelectedYear,
  selectedStatus,
  setSelectedStatus,
  selectedLanguage,
  setSelectedLanguage,
  selectedSource,
  setSelectedSource,
  selectedTag,
  setSelectedTag,
  sortBy,
  setSortBy,
  onApplyFilters,
  onResetFilters,
}: AdvancedSearchDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm cursor-pointer"
            aria-hidden="true"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 250 }}
            className="fixed top-0 right-0 z-50 h-full w-full max-w-lg border-l border-border bg-background shadow-2xl flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Advanced search filters"
          >
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <Filter size={15} className="text-accent" />
                </div>
                <h2 className="font-serif text-lg font-bold text-foreground">
                  Advanced Search
                </h2>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg border border-border hover:bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                aria-label="Close advanced search"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-7">
              {/* Category - button grid */}
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-3">
                  Document Category
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSelectedCategory("")}
                    className={`px-4 py-2.5 rounded-xl text-xs font-semibold text-left border transition-all cursor-pointer ${
                      selectedCategory === ""
                        ? "bg-foreground text-background border-foreground"
                        : "bg-card border-border text-muted-foreground hover:border-muted-foreground/30"
                    }`}
                  >
                    All Categories
                  </button>
                  {filters?.categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-semibold text-left border transition-all truncate cursor-pointer ${
                        selectedCategory === cat
                          ? "bg-foreground text-background border-foreground"
                          : "bg-card border-border text-muted-foreground hover:border-muted-foreground/30"
                      }`}
                      title={cat}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort - button grid */}
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-3">
                  Sort By
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {sortOptions.map((opt) => (
                    <button
                      key={opt.val}
                      onClick={() => setSortBy(opt.val)}
                      className={`px-3 py-2.5 rounded-xl text-xs font-semibold text-center border transition-all cursor-pointer ${
                        sortBy === opt.val
                          ? "bg-foreground text-background border-foreground"
                          : "bg-card border-border text-muted-foreground hover:border-muted-foreground/30"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Select dropdowns with theme-aware styling */}
              <div>
                <label
                  htmlFor="adv-year"
                  className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2"
                >
                  Publication Year
                </label>
                <select
                  id="adv-year"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full bg-card border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent/30 cursor-pointer"
                >
                  <option value="">Any Year</option>
                  {filters?.years.map((yr) => (
                    <option key={yr} value={yr}>
                      {yr}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="adv-status"
                  className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2"
                >
                  Law Status
                </label>
                <select
                  id="adv-status"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full bg-card border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent/30 cursor-pointer"
                >
                  <option value="">Any Status</option>
                  {filters?.statuses.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="adv-lang"
                  className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2"
                >
                  Language
                </label>
                <select
                  id="adv-lang"
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full bg-card border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent/30 cursor-pointer"
                >
                  <option value="">Any Language</option>
                  {filters?.languages.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="adv-source"
                  className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2"
                >
                  Source
                </label>
                <select
                  id="adv-source"
                  value={selectedSource}
                  onChange={(e) => setSelectedSource(e.target.value)}
                  className="w-full bg-card border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent/30 cursor-pointer"
                >
                  <option value="">Any Source</option>
                  {filters?.sources.map((src) => (
                    <option key={src} value={src}>
                      {src}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="adv-tag"
                  className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2"
                >
                  Tag
                </label>
                <select
                  id="adv-tag"
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  className="w-full bg-card border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-accent/30 cursor-pointer"
                >
                  <option value="">Select Tag...</option>
                  {filters?.tags.map((tg) => (
                    <option key={tg} value={tg}>
                      #{tg}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="border-t border-border px-6 py-5 grid grid-cols-2 gap-4">
              <button
                onClick={onResetFilters}
                className="flex items-center justify-center gap-2 border border-border hover:bg-secondary/30 rounded-xl py-3 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <RotateCcw size={14} />
                Reset
              </button>
              <button
                onClick={() => {
                  onApplyFilters();
                  onClose();
                }}
                className="flex items-center justify-center gap-2 bg-foreground text-background hover:opacity-90 rounded-xl py-3 text-xs font-bold transition-all cursor-pointer"
              >
                <Check size={14} />
                Apply Filters
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
