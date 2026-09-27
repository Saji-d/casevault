"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Scale, Sun, Moon, Bookmark } from "lucide-react";

interface NavbarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  onNavigateHome: () => void;
  onNavigateSearch: () => void;
  activeSection: string;
  bookmarkCount: number;
  onShowBookmarks: () => void;
}

const navLinks = [
  { label: "Home", action: "home" as const },
  { label: "Search", action: "search" as const },
  { label: "Library", href: "/library" },
  { label: "AI Chat", href: "/chat" },
  { label: "Dashboard", href: "/dashboard" },
];

export default function Navbar({
  isDarkMode,
  toggleTheme,
  onNavigateHome,
  onNavigateSearch,
  activeSection,
  bookmarkCount,
  onShowBookmarks,
}: NavbarProps) {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const }}
      className="sticky top-0 z-40 w-full border-b border-border bg-background/70 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-10">
        {/* Logo */}
        <button onClick={onNavigateHome} className="flex items-center gap-3 group shrink-0 cursor-pointer">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-transform group-hover:scale-105 duration-300">
            <Scale size={17} />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-base font-bold tracking-tight text-foreground">
              CaseVault
            </span>
            <span className="text-[9px] text-muted-foreground font-medium tracking-[0.15em] uppercase -mt-0.5">
              Bangladesh
            </span>
          </div>
        </button>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            if (link.href) {
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className="px-3.5 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary/50"
                >
                  {link.label}
                </Link>
              );
            }
            return (
              <button
                key={link.label}
                onClick={link.action === "home" ? onNavigateHome : link.action === "search" ? onNavigateSearch : undefined}
                className={`px-3.5 py-2 text-sm font-medium transition-colors rounded-lg cursor-pointer ${
                  activeSection === link.action
                    ? "text-foreground bg-secondary/60"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/30"
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onShowBookmarks}
            className="relative p-2.5 rounded-xl text-muted-foreground hover:text-foreground border border-border bg-secondary/30 hover:bg-secondary/60 transition-colors cursor-pointer"
            title="Bookmarked Documents"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={bookmarkCount > 0 ? "currentColor" : "none"}
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4 text-gold"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
              />
            </svg>
            {bookmarkCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[9px] font-bold text-primary-foreground">
                {bookmarkCount}
              </span>
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="p-2.5 rounded-xl text-muted-foreground hover:text-foreground border border-border bg-secondary/30 hover:bg-secondary/60 transition-colors cursor-pointer"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun size={15} /> : <Moon size={15} />}
          </motion.button>

          <div className="hidden sm:flex items-center gap-2 ml-2">
            <Link
              href="/dashboard"
              className="text-xs font-semibold text-muted-foreground hover:text-foreground px-3 py-2 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-xl bg-foreground px-4 py-2 text-xs font-bold text-background transition-all hover:opacity-90"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
