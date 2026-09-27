"use client";

import React, { useMemo, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DocumentDetail } from "../lib/api";
import MarkdownRenderer from "./MarkdownRenderer";
import {
  ArrowLeft,
  Calendar,
  FileText,
  Globe,
  Bookmark,
  Share2,
  Sparkles,
  MessageSquare,
  Network,
  Clock,
  Send,
  X,
  Menu,
  BookOpen,
  ChevronDown,
} from "lucide-react";

interface DocumentReaderProps {
  document: DocumentDetail;
  onBack: () => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onShare: () => void;
}

type AITab = "summary" | "ask" | "citations" | "related";

export default function DocumentReader({
  document,
  onBack,
  isBookmarked,
  onToggleBookmark,
  onShare,
}: DocumentReaderProps) {
  const [activeTab, setActiveTab] = useState<AITab>("summary");
  const [chatInput, setChatInput] = useState("");
  const [showToc, setShowToc] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const [chatMessages, setChatMessages] = useState<
    Array<{ sender: "user" | "ai"; text: string }>
  >([
    {
      sender: "ai",
      text: `Hello! I am your CaseVault Assistant. I have loaded "${document.title}". Ask me to summarize sections, extract legal liabilities, or explain key terms.`,
    },
  ]);

  const readingTime = useMemo(() => {
    if (!document.content) return 1;
    const wordCount = document.content.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(wordCount / 225));
  }, [document.content]);

  const tableOfContents = useMemo(() => {
    if (!document.content) return [];
    const lines = document.content.split("\n");
    const headers: Array<{ text: string; level: number }> = [];
    lines.forEach((line) => {
      if (line.startsWith("# ")) {
        headers.push({ text: line.replace("# ", "").trim(), level: 1 });
      } else if (line.startsWith("## ")) {
        headers.push({ text: line.replace("## ", "").trim(), level: 2 });
      }
    });
    return headers;
  }, [document.content]);

  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;
      const el = contentRef.current;
      const scrollTop = el.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      if (scrollHeight > 0) {
        setReadingProgress(Math.min((scrollTop / scrollHeight) * 100, 100));
      }
    };
    const el = contentRef.current;
    if (el) el.addEventListener("scroll", handleScroll);
    return () => el?.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const userMsg = chatInput.trim();
    setChatMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    setChatInput("");
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: `[AI Copilot - Phase 2] I received your question: "${userMsg}". In the next phase, when RAG and LLM models are integrated, I will fetch semantic chunks of this document and perform full contextual legal synthesis.`,
        },
      ]);
    }, 800);
  };

  return (
    <div className="flex flex-col lg:flex-row max-w-7xl mx-auto">
      {/* Reading progress bar */}
      <div className="fixed top-16 left-0 right-0 z-30 h-0.5 bg-border">
        <div
          className="h-full bg-accent/60 transition-all duration-150 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* LEFT: Table of Contents (desktop) */}
      <aside className="hidden xl:block w-56 shrink-0 pt-6 pl-8">
        <div className="sticky top-24 space-y-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <ArrowLeft size={14} />
            Back
          </button>

          {tableOfContents.length > 0 && (
            <div className="mt-6">
              <h5 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-3">
                On This Page
              </h5>
              <ul className="space-y-1.5">
                {tableOfContents.map((header, idx) => (
                  <li
                    key={idx}
                    style={{ paddingLeft: `${(header.level - 1) * 12}px` }}
                  >
                    <a
                      href={`#${header.text}`}
                      className="text-xs text-muted-foreground/70 hover:text-foreground block truncate transition-colors leading-relaxed"
                      title={header.text}
                    >
                      {header.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </aside>

      {/* CENTER: Document Content */}
      <main
        ref={contentRef}
        className="flex-1 min-w-0 max-h-screen overflow-y-auto"
      >
        <div className="border-x border-border bg-card mx-4 sm:mx-6 lg:mx-8 my-6 rounded-3xl shadow-sm">
          {/* Mobile TOC toggle */}
          <div className="xl:hidden flex items-center justify-between px-6 pt-5 pb-2">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <ArrowLeft size={14} />
              Back
            </button>
            <button
              onClick={() => setShowToc(!showToc)}
              className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <Menu size={14} />
              Contents
            </button>
          </div>

          {/* Mobile TOC dropdown */}
          <AnimatePresence>
            {showToc && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden border-b border-border mx-6"
              >
                <ul className="py-3 space-y-1.5">
                  {tableOfContents.map((header, idx) => (
                    <li
                      key={idx}
                      style={{ paddingLeft: `${(header.level - 1) * 12 + 8}px` }}
                    >
                      <a
                        href={`#${header.text}`}
                        onClick={() => setShowToc(false)}
                        className="text-xs text-muted-foreground/70 hover:text-foreground block truncate transition-colors"
                      >
                        {header.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-muted-foreground font-medium px-6 pt-3 pb-1 flex-wrap">
            <span
              onClick={onBack}
              className="hover:text-foreground transition-colors cursor-pointer"
            >
              Corpus
            </span>
            <span>/</span>
            <span className="uppercase tracking-wide hover:text-foreground transition-colors">
              {document.category}
            </span>
            <span>/</span>
            <span className="text-foreground/70 truncate max-w-[200px]">
              {document.title}
            </span>
          </nav>

          {/* Document header */}
          <div className="px-6 pb-6">
            <div className="flex flex-wrap items-center gap-2.5 mb-4 pt-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-secondary/60 border border-border text-muted-foreground">
                {document.category}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border border-accent/20 bg-accent/5 text-accent">
                <Sparkles size={10} />
                {document.source}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border border-border bg-secondary/30 text-muted-foreground">
                <BookOpen size={10} />
                {readingTime} min read
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground leading-tight">
              {document.title}
            </h1>

            {/* Meta bar */}
            <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Calendar size={12} />
                <span>Year: {document.year}</span>
              </div>
              {document.act_number && document.act_number !== "N/A" && (
                <div className="flex items-center gap-1.5">
                  <FileText size={12} />
                  <span>Act: {document.act_number}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <Globe size={12} />
                <span>Language: {document.language}</span>
              </div>
              {document.updated_at && (
                <div className="flex items-center gap-1.5">
                  <Clock size={12} />
                  <span>Updated: {document.updated_at}</span>
                </div>
              )}
            </div>
          </div>

          {/* Actions bar */}
          <div className="flex items-center gap-2 px-6 pb-2 border-b border-border">
            <button
              onClick={onToggleBookmark}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                isBookmarked
                  ? "border-gold/30 bg-gold/10 text-gold"
                  : "border-border bg-secondary/20 text-muted-foreground hover:text-foreground"
              }`}
            >
              <Bookmark
                size={12}
                fill={isBookmarked ? "currentColor" : "none"}
              />
              {isBookmarked ? "Saved" : "Save"}
            </button>
            <button
              onClick={onShare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-border bg-secondary/20 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <Share2 size={12} />
              Share
            </button>
            <div className="flex-1" />
            <span className="text-[10px] text-muted-foreground/50">
              {document.slug}
            </span>
          </div>

          {/* Content */}
          <div className="px-6 sm:px-8 py-6 sm:py-8">
            <MarkdownRenderer content={document.content} />
          </div>
        </div>
      </main>

      {/* RIGHT: AI Sidebar */}
      <section className="w-full lg:w-80 shrink-0 border-l border-border bg-background flex flex-col h-screen sticky top-16">
        {/* Sidebar tabs */}
        <div className="flex items-center border-b border-border px-4 py-3 gap-0.5">
          {(
            [
              { key: "summary", label: "Summary", icon: Sparkles },
              { key: "ask", label: "Ask", icon: MessageSquare },
              { key: "citations", label: "Cite", icon: Network },
              { key: "related", label: "Related", icon: BookOpen },
            ] as const
          ).map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as AITab)}
                className={`flex-1 flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === tab.key
                    ? "bg-secondary/60 text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon size={12} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {/* Summary */}
          {activeTab === "summary" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2 text-xs font-semibold text-accent bg-accent/5 border border-accent/20 px-3 py-2 rounded-xl">
                <Sparkles size={13} className="animate-pulse" />
                <span>Future RAG Pipeline</span>
              </div>
              <h4 className="font-serif text-sm font-bold text-foreground">
                Executive Brief
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {document.summary ||
                  "CaseVault's parser extracts front matter details. In Phase 2, LLM chunking will formulate an analytical outline detailing judicial rationale."}
              </p>

              <div className="border border-border rounded-xl p-4 bg-secondary/10 space-y-2.5">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  Key Legal Issues
                </span>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  <li className="flex items-start gap-1.5">
                    <span className="text-accent mt-0.5">•</span>
                    <span>Constitutional boundary limits of statutory modifications.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-accent mt-0.5">•</span>
                    <span>Requirements of registration for transfer deeds.</span>
                  </li>
                </ul>
              </div>

              <button
                disabled
                className="w-full bg-secondary/30 border border-border text-muted-foreground rounded-xl py-2.5 text-xs font-semibold cursor-not-allowed flex items-center justify-center gap-1.5"
              >
                <Sparkles size={13} />
                Generate Deep Analysis
              </button>
            </motion.div>
          )}

          {/* Ask AI */}
          {activeTab === "ask" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col h-full"
            >
              <div className="flex-1 space-y-3 mb-4 overflow-y-auto pr-1">
                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-xl max-w-[90%] leading-relaxed text-xs ${
                      msg.sender === "user"
                        ? "bg-foreground text-background ml-auto"
                        : "bg-secondary/30 border border-border text-muted-foreground"
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="flex gap-2 mt-auto">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask about this document..."
                  className="flex-1 bg-secondary/20 border border-border rounded-xl px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-muted-foreground/30"
                />
                <button
                  type="submit"
                  className="p-2 rounded-xl bg-foreground text-background hover:opacity-90 transition-all cursor-pointer"
                >
                  <Send size={13} />
                </button>
              </form>
            </motion.div>
          )}

          {/* Citations */}
          {activeTab === "citations" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2 text-xs font-semibold text-accent bg-accent/5 border border-accent/20 px-3 py-2 rounded-xl">
                <Network size={13} className="animate-pulse" />
                <span>Citation Network (Phase 2)</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                In Phase 2, CaseVault will build a legal citation graph to
                visually link this document to other statutes, amendment acts,
                or supreme court judgements referencing it.
              </p>

              <div className="border border-border rounded-xl p-4 bg-secondary/10 space-y-3">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
                  References
                </span>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between border-b border-border pb-2">
                    <span className="font-medium text-foreground/80 truncate max-w-[140px]">
                      Constitution Article 27
                    </span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-secondary/50 border border-border text-muted-foreground uppercase">
                      Statute
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-foreground/80 truncate max-w-[140px]">
                      BLAST v. Bangladesh (2003)
                    </span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-secondary/50 border border-border text-muted-foreground uppercase">
                      Judgement
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Related */}
          {activeTab === "related" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-3"
            >
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
                Recommended Documents
              </span>
              <div className="space-y-2.5">
                {[
                  { title: "Penal Code, 1860 Summary", cat: "General Act" },
                  {
                    title: "Article 32: Right to Life",
                    cat: "Constitution",
                  },
                  {
                    title: "Masdar Hossain Case",
                    cat: "Judgement",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="border border-border hover:bg-secondary/20 rounded-xl p-3 transition-all cursor-pointer"
                  >
                    <span className="text-[9px] text-muted-foreground font-semibold uppercase block mb-0.5">
                      {item.cat}
                    </span>
                    <span className="text-xs font-semibold text-foreground hover:text-accent transition-colors">
                      {item.title}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
