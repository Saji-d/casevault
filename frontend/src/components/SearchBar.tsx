"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, Mic, X } from "lucide-react";

interface SearchBarProps {
  ref?: React.RefObject<HTMLInputElement | null>;
  value: string;
  onChange: (val: string) => void;
  onSubmit?: () => void;
  onFocus?: () => void;
  onOpenAdvanced: () => void;
  variant?: "hero" | "inline";
}

export default function SearchBar({
  value,
  onChange,
  onSubmit,
  onFocus,
  onOpenAdvanced,
  variant = "hero",
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "/" &&
        document.activeElement !== inputRef.current &&
        !e.metaKey &&
        !e.ctrlKey
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit?.();
    }
  };

  const isHero = variant === "hero";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`relative group ${isHero ? "max-w-2xl mx-auto" : "w-full"}`}
    >
      <div
        className={`absolute -inset-1 rounded-2xl opacity-0 blur-xl transition-opacity duration-500 ${
          isFocused ? "opacity-100" : ""
        }`}
        style={{
          background:
            "linear-gradient(135deg, hsl(var(--accent) / 0.15), hsl(var(--navy) / 0.15))",
        }}
      />

      <div
        className={`relative flex items-center bg-card border transition-all duration-300 ${
          isFocused
            ? "border-accent/30 shadow-lg shadow-accent/5"
            : "border-border hover:border-muted-foreground/20"
        } ${isHero ? "rounded-2xl" : "rounded-xl"}`}
      >
        <button
          onClick={onSubmit}
          className="flex items-center pl-4 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          aria-label="Search"
        >
          <Search size={isHero ? 20 : 16} />
        </button>

        <input
          ref={inputRef}
          type="text"
          role="searchbox"
          aria-label="Search legal documents"
          placeholder={
            isHero
              ? "Search acts, judgments, sections, keywords..."
              : "Search acts, sections, keywords..."
          }
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            setIsFocused(true);
            onFocus?.();
          }}
          onBlur={() => setIsFocused(false)}
          className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground/50 px-3 py-3.5 text-sm"
        />

        <div className="flex items-center gap-1.5 pr-2">
          {value && (
            <button
              onClick={() => onChange("")}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors cursor-pointer"
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}

          <button
            onClick={onOpenAdvanced}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors cursor-pointer"
            title="Advanced Filters"
            aria-label="Advanced search filters"
          >
            <SlidersHorizontal size={isHero ? 16 : 14} />
          </button>

          <button
            onClick={onSubmit}
            className="px-3 py-1.5 rounded-lg bg-foreground text-background text-xs font-semibold hover:opacity-90 transition-opacity cursor-pointer"
            aria-label="Execute search"
          >
            Search
          </button>

          <kbd className="hidden sm:inline-flex h-7 select-none items-center gap-1 rounded-lg border border-border bg-secondary/50 px-2 font-mono text-[10px] font-medium text-muted-foreground">
            <span>/</span>
          </kbd>
        </div>
      </div>

      {isHero && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex items-center justify-center gap-1.5 mt-3 text-[11px] text-muted-foreground/60"
        >
          <Mic size={11} />
          <span>Voice search coming soon</span>
        </motion.div>
      )}
    </motion.div>
  );
}
