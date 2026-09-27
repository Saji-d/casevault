"use client";

import React from "react";
import { motion } from "framer-motion";
import { FileText, ArrowLeft, ArrowRight, Search, X, Home } from "lucide-react";
import { DocumentListItem } from "../lib/api";
import DocumentCard from "./DocumentCard";

interface SearchResultsProps {
  items: DocumentListItem[];
  total: number;
  page: number;
  pages: number;
  isLoading: boolean;
  onReadDocument: (slug: string) => void;
  bookmarkedSlugs: string[];
  onToggleBookmark: (slug: string) => void;
  onShareDocument: (slug: string, title: string) => void;
  onPageChange: (newPage: number) => void;
  searchQuery?: string;
  onClearFilters?: () => void;
  onReturnHome?: () => void;
}

export default function SearchResults({
  items,
  total,
  page,
  pages,
  isLoading,
  onReadDocument,
  bookmarkedSlugs,
  onToggleBookmark,
  onShareDocument,
  onPageChange,
  searchQuery,
  onClearFilters,
  onReturnHome,
}: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="space-y-4" role="status" aria-label="Loading search results">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className="border border-border bg-card p-6 rounded-2xl animate-pulse space-y-4"
          >
            <div className="flex items-center gap-2">
              <div className="h-5 bg-secondary/50 rounded-full w-20" />
              <div className="h-5 bg-secondary/50 rounded-full w-16" />
            </div>
            <div className="h-7 bg-secondary/50 rounded-lg w-3/4" />
            <div className="space-y-2">
              <div className="h-4 bg-secondary/50 rounded w-full" />
              <div className="h-4 bg-secondary/50 rounded w-2/3" />
            </div>
            <div className="flex gap-4">
              <div className="h-4 bg-secondary/50 rounded w-16" />
              <div className="h-4 bg-secondary/50 rounded w-20" />
              <div className="h-4 bg-secondary/50 rounded w-24" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-16 px-6 border border-dashed border-border rounded-2xl text-center"
        role="status"
        aria-label="No search results"
      >
        <div className="w-16 h-16 rounded-2xl bg-secondary/40 border border-border flex items-center justify-center mb-5">
          <Search size={28} className="text-muted-foreground" />
        </div>
        <h3 className="font-serif text-xl font-bold text-foreground mb-2">
          No matching documents found
        </h3>
        <p className="text-sm text-muted-foreground max-w-sm leading-relaxed mb-6">
          {searchQuery
            ? `No results for "${searchQuery}".`
            : "No documents match the current filters."}
        </p>

        <div className="space-y-2.5 text-left text-sm text-muted-foreground">
          <p className="font-medium">Try:</p>
          <ul className="space-y-1.5">
            <li className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
              Removing some filters
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
              Using different keywords
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
              Checking spelling
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
              Browsing by category instead
            </li>
          </ul>
        </div>

        <div className="flex flex-wrap items-center gap-3 mt-8">
          {onClearFilters && (
            <button
              onClick={onClearFilters}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-border bg-secondary/30 text-xs font-semibold text-foreground hover:bg-secondary/60 transition-colors cursor-pointer"
            >
              <X size={13} />
              Clear Filters
            </button>
          )}
          {onReturnHome && (
            <button
              onClick={onReturnHome}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-foreground text-background text-xs font-bold hover:opacity-90 transition-all cursor-pointer"
            >
              <Home size={13} />
              Return Home
            </button>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6" role="region" aria-label="Search results">
      <div className="flex items-center justify-between text-xs text-muted-foreground pb-3 border-b border-border">
        <span>
          Showing{" "}
          <span className="font-semibold text-foreground">{items.length}</span>{" "}
          of <span className="font-semibold text-foreground">{total}</span>{" "}
          documents
          {searchQuery && (
            <>
              {" "}
              for &ldquo;
              <span className="font-semibold text-foreground">{searchQuery}</span>
              &rdquo;
            </>
          )}
        </span>
        <span>
          Page{" "}
          <span className="font-semibold text-foreground">{page}</span> of{" "}
          {pages}
        </span>
      </div>

      <div className="space-y-4">
        {items.map((doc, idx) => (
          <DocumentCard
            key={doc.id}
            doc={doc}
            isBookmarked={bookmarkedSlugs.includes(doc.slug)}
            onRead={onReadDocument}
            onToggleBookmark={onToggleBookmark}
            onShare={onShareDocument}
            index={idx}
            searchQuery={searchQuery}
          />
        ))}
      </div>

      {pages > 1 && (
        <nav
          className="flex items-center justify-between pt-4 border-t border-border"
          aria-label="Search results pagination"
        >
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border bg-secondary/20 text-xs font-semibold text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
            aria-label="Previous page"
          >
            <ArrowLeft size={14} />
            Previous
          </button>

          <div className="flex items-center gap-1.5">
            {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => onPageChange(p)}
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-semibold transition-all cursor-pointer ${
                  p === page
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/30"
                }`}
                aria-label={`Page ${p}`}
                aria-current={p === page ? "page" : undefined}
              >
                {p}
              </button>
            ))}
          </div>

          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page === pages}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border bg-secondary/20 text-xs font-semibold text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
            aria-label="Next page"
          >
            Next
            <ArrowRight size={14} />
          </button>
        </nav>
      )}
    </div>
  );
}
