"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Globe,
  Bookmark,
  Share2,
  BookOpen,
  Award,
  Clock,
  ArrowUpRight,
  Tag,
} from "lucide-react";
import { DocumentListItem } from "../lib/api";

interface DocumentCardProps {
  doc: DocumentListItem;
  isBookmarked: boolean;
  onRead: (slug: string) => void;
  onToggleBookmark: (slug: string) => void;
  onShare: (slug: string, title: string) => void;
  index: number;
  variant?: "default" | "compact";
  searchQuery?: string;
}

function highlightText(text: string, query: string): React.ReactNode {
  if (!query || !text) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${escaped})`, "gi"));
  if (parts.length === 1) return text;
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="bg-accent/20 text-accent rounded-sm px-0.5">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
}

export default function DocumentCard({
  doc,
  isBookmarked,
  onRead,
  onToggleBookmark,
  onShare,
  index,
  variant = "default",
  searchQuery,
}: DocumentCardProps) {
  const readingTime = useMemo(() => {
    return (doc as any).reading_time || 12;
  }, []);

  if (variant === "compact") {
    return (
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        whileHover={{ x: 3 }}
        onClick={() => onRead(doc.slug)}
        className="group flex items-center justify-between p-3 rounded-xl border border-border/50 hover:border-border bg-card/50 hover:bg-secondary/20 cursor-pointer transition-all"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && onRead(doc.slug)}
        aria-label={`Read ${doc.title}`}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-1 h-8 rounded-full bg-accent/30 shrink-0" />
          <div className="min-w-0">
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider block mb-0.5">
              {doc.category}
            </span>
            <span className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors block truncate">
              {searchQuery ? highlightText(doc.title, searchQuery) : doc.title}
            </span>
          </div>
        </div>
        <ArrowUpRight
          size={14}
          className="text-muted-foreground/30 group-hover:text-accent/60 shrink-0 transition-colors"
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      whileHover={{ y: -2 }}
      className="group relative border border-border bg-card hover:bg-secondary/10 rounded-2xl p-5 transition-all"
      role="article"
      aria-label={`Document: ${doc.title}`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-secondary/60 border border-border text-muted-foreground">
            {doc.category}
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border border-border/50 bg-secondary/30 text-accent">
            <Award size={10} />
            {doc.source}
          </span>
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
              doc.status === "Active"
                ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-500"
                : "border-amber-500/20 bg-amber-500/10 text-amber-500"
            }`}
          >
            {doc.status}
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleBookmark(doc.slug);
          }}
          className="p-2 rounded-xl border border-transparent hover:border-border hover:bg-secondary/30 text-muted-foreground hover:text-gold transition-all cursor-pointer shrink-0"
          title={isBookmarked ? "Remove Bookmark" : "Save Document"}
          aria-label={isBookmarked ? "Remove bookmark" : "Save document"}
        >
          <Bookmark
            size={14}
            fill={isBookmarked ? "currentColor" : "none"}
            className={isBookmarked ? "text-gold" : ""}
          />
        </button>
      </div>

      <h4
        onClick={() => onRead(doc.slug)}
        className="text-base sm:text-lg font-bold text-foreground group-hover:text-accent transition-colors leading-snug mb-2 cursor-pointer"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && onRead(doc.slug)}
      >
        {searchQuery ? highlightText(doc.title, searchQuery) : doc.title}
      </h4>

      <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
        {searchQuery && doc.summary
          ? highlightText(doc.summary, searchQuery)
          : doc.summary || "No summary available for this legal document."}
      </p>

      <div className="flex items-center justify-between gap-4 pt-3 border-t border-border/50">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Calendar size={12} />
            <span>{doc.year}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Globe size={12} />
            <span>{doc.language}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={12} />
            <span>{readingTime} min</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onShare(doc.slug, doc.title);
            }}
            className="p-2 rounded-xl border border-border bg-secondary/20 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            title="Share Link"
            aria-label="Share document link"
          >
            <Share2 size={12} />
          </button>
          <button
            onClick={() => onRead(doc.slug)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-foreground text-background text-xs font-bold hover:opacity-90 transition-all cursor-pointer"
            aria-label={`Read ${doc.title}`}
          >
            <BookOpen size={12} />
            Read
          </button>
        </div>
      </div>

      {doc.tags && doc.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {doc.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded text-[9px] text-muted-foreground font-medium"
            >
              <Tag size={8} />
              {searchQuery ? highlightText(tag, searchQuery) : tag}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}
