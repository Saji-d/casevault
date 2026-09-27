"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Bookmark, RefreshCw, Scale, ChevronRight, Clock, Home as HomeIcon, Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import LiveStats from "../components/LiveStats";
import CategoryCard from "../components/CategoryCard";
import DocumentCard from "../components/DocumentCard";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import AdvancedSearchDrawer from "../components/AdvancedSearchDrawer";
import DocumentReader from "../components/DocumentReader";
import AIFeatures from "../components/AIFeatures";
import WhyCaseVault from "../components/WhyCaseVault";
import Footer from "../components/Footer";
import BackgroundEffects from "../components/BackgroundEffects";
import { api, DocumentListItem, DocumentDetail, FilterOptions, StatsResponse } from "../lib/api";

function HomeContent() {
  const searchParams = useSearchParams();

  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState<"home" | "search">("home");
  const [readingDocSlug, setReadingDocSlug] = useState<string | null>(null);
  const [readingDoc, setReadingDoc] = useState<DocumentDetail | null>(null);
  const [isLoadingDoc, setIsLoadingDoc] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<{
    items: DocumentListItem[];
    total: number;
    pages: number;
  } | null>(null);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [filters, setFilters] = useState<FilterOptions | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedSource, setSelectedSource] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [sortBy, setSortBy] = useState<
    "relevance" | "newest" | "oldest" | "alphabetical"
  >("relevance");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [recentDocs, setRecentDocs] = useState<DocumentListItem[]>([]);
  const [popularDocs, setPopularDocs] = useState<DocumentListItem[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);

  const [bookmarkedSlugs, setBookmarkedSlugs] = useState<string[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isBookmarkPanelOpen, setIsBookmarkPanelOpen] = useState(false);

  // Restore state from URL on mount
  useEffect(() => {
    const q = searchParams.get("q");
    const cat = searchParams.get("category");
    if (q || cat) {
      if (q) setSearchQuery(q);
      if (cat) setSelectedCategory(cat);
      setActiveSection("search");
      setHasSearched(true);
    }
  }, []);

  // Theme sync
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("light", !isDarkMode);
  }, [isDarkMode]);

  // Load bookmarks, history, and initial data on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedBookmarks = localStorage.getItem("casevault_bookmarks");
      if (savedBookmarks) setBookmarkedSlugs(JSON.parse(savedBookmarks));
      const savedHistory = localStorage.getItem("casevault_history");
      if (savedHistory) setRecentSearches(JSON.parse(savedHistory));
    }
    fetchInitialData();
  }, []);

  // After mount, if URL had search params, trigger the search
  useEffect(() => {
    if (hasSearched) {
      executeSearch(1);
      setHasSearched(false);
    }
  }, [hasSearched]);

  const fetchInitialData = async () => {
    try {
      const [statsRes, filtersRes, recentRes, popularRes] = await Promise.all([
        api.getStats().catch(() => null),
        api.getFilters().catch(() => null),
        api.getRecent(4).catch(() => []),
        api.getPopular(4).catch(() => []),
      ]);
      if (statsRes) setStats(statsRes);
      if (filtersRes) setFilters(filtersRes);
      setRecentDocs(recentRes);
      setPopularDocs(popularRes);
    } catch (err) {
      console.error("Failed to load initial data:", err);
    }
  };

  // Build URL params from search state
  const buildSearchParams = useCallback(() => {
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set("q", searchQuery.trim());
    if (selectedCategory) params.set("category", selectedCategory);
    return params.toString();
  }, [searchQuery, selectedCategory]);

  // Sync URL with search state
  useEffect(() => {
    if (activeSection === "search") {
      const params = buildSearchParams();
      const url = params ? `?${params}` : window.location.pathname;
      window.history.replaceState(null, "", url);
    }
  }, [searchQuery, selectedCategory, activeSection, buildSearchParams]);

  // Listen for browser back/forward
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const q = params.get("q");
      const cat = params.get("category");
      if (q || cat) {
        if (q) setSearchQuery(q);
        if (cat) setSelectedCategory(cat);
        setActiveSection("search");
        setReadingDocSlug(null);
      } else {
        setActiveSection("home");
        setSearchQuery("");
        handleResetFilters();
        setReadingDocSlug(null);
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const executeSearch = async (page = 1) => {
    setIsLoadingSearch(true);
    setReadingDocSlug(null);
    setActiveSection("search");
    try {
      const params = {
        keyword: searchQuery.trim() || undefined,
        category: selectedCategory || undefined,
        year: selectedYear ? parseInt(selectedYear) : undefined,
        status: selectedStatus || undefined,
        language: selectedLanguage || undefined,
        source: selectedSource || undefined,
        tag: selectedTag || undefined,
        sort_by: sortBy,
        page,
        limit: 8,
      };
      const results = await api.search(params);
      setSearchResults(results);
      setCurrentPage(page);
      if (searchQuery.trim() && !recentSearches.includes(searchQuery.trim())) {
        const updatedHistory = [searchQuery.trim(), ...recentSearches.slice(0, 4)];
        setRecentSearches(updatedHistory);
        localStorage.setItem("casevault_history", JSON.stringify(updatedHistory));
      }
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setIsLoadingSearch(false);
    }
  };

  // Called when Enter is pressed or Search button clicked
  const handleSearch = () => {
    if (searchQuery.trim() || selectedCategory) {
      executeSearch(1);
    }
  };

  // Called when category filter changes in sidebar / drawer
  const handleFilterChange = () => {
    if (activeSection === "search") {
      executeSearch(1);
    }
  };

  const handleReadDocument = async (slug: string) => {
    setIsLoadingDoc(true);
    setReadingDocSlug(slug);
    try {
      const doc = await api.getDocument(slug);
      setReadingDoc(doc);
      api.getPopular(4).then(setPopularDocs).catch(() => {});
    } catch (err) {
      console.error("Failed to load document:", err);
      setReadingDocSlug(null);
    } finally {
      setIsLoadingDoc(false);
    }
  };

  const handleToggleBookmark = (slug: string) => {
    let updated: string[];
    if (bookmarkedSlugs.includes(slug)) {
      updated = bookmarkedSlugs.filter((s) => s !== slug);
    } else {
      updated = [...bookmarkedSlugs, slug];
    }
    setBookmarkedSlugs(updated);
    localStorage.setItem("casevault_bookmarks", JSON.stringify(updated));
  };

  const handleShareDocument = (slug: string, title: string) => {
    const url = `${window.location.origin}/documents/${slug}`;
    navigator.clipboard.writeText(url).then(() => {
      alert(`Copied link for "${title}" to clipboard!`);
    });
  };

  const handleResetFilters = () => {
    setSelectedCategory("");
    setSelectedYear("");
    setSelectedStatus("");
    setSelectedLanguage("");
    setSelectedSource("");
    setSelectedTag("");
    setSortBy("relevance");
    setCurrentPage(1);
  };

  const handleSyncCorpus = async () => {
    setIsSyncing(true);
    try {
      const res = await api.sync();
      alert(`Synchronized! Synced ${res.synced_count} documents.`);
      fetchInitialData();
      if (activeSection === "search") executeSearch(currentPage);
    } catch {
      alert("Failed to synchronize documents.");
    } finally {
      setIsSyncing(false);
    }
  };

  const handlePopularSearch = (term: string) => {
    setSearchQuery(term);
    setActiveSection("search");
    setTimeout(() => {
      executeSearch(1);
    }, 0);
  };

  const handleNavigateHome = () => {
    setActiveSection("home");
    setReadingDocSlug(null);
    setSearchQuery("");
    handleResetFilters();
    setSearchResults(null);
    window.history.replaceState(null, "", window.location.pathname);
  };

  const handleNavigateSearch = () => {
    setActiveSection("search");
    setReadingDocSlug(null);
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <BackgroundEffects />

      <Navbar
        isDarkMode={isDarkMode}
        toggleTheme={() => setIsDarkMode(!isDarkMode)}
        onNavigateSearch={handleNavigateSearch}
        onNavigateHome={handleNavigateHome}
        activeSection={readingDocSlug ? "" : activeSection}
        bookmarkCount={bookmarkedSlugs.length}
        onShowBookmarks={() => setIsBookmarkPanelOpen(true)}
      />

      <div className="relative z-10 flex-1">
        {/* Document Reader */}
        {readingDocSlug && (
          <div className="bg-background">
            {isLoadingDoc ? (
              <div className="flex flex-col items-center justify-center py-32 space-y-4">
                <RefreshCw className="animate-spin text-muted-foreground" size={28} />
                <span className="text-sm text-muted-foreground font-medium">
                  Loading document...
                </span>
              </div>
            ) : readingDoc ? (
              <DocumentReader
                document={readingDoc}
                onBack={() => setReadingDocSlug(null)}
                isBookmarked={bookmarkedSlugs.includes(readingDoc.slug)}
                onToggleBookmark={() => handleToggleBookmark(readingDoc.slug)}
                onShare={() =>
                  handleShareDocument(readingDoc.slug, readingDoc.title)
                }
              />
            ) : (
              <div className="text-center py-20">
                <p className="text-destructive">Failed to load document.</p>
                <button
                  onClick={() => setReadingDocSlug(null)}
                  className="mt-4 px-4 py-2 bg-foreground text-background rounded-xl text-xs font-bold cursor-pointer"
                >
                  Return
                </button>
              </div>
            )}
          </div>
        )}

        {/* Home Page */}
        {!readingDocSlug && activeSection === "home" && (
          <main>
            <HeroSection
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onSearch={handleSearch}
              onOpenAdvanced={() => setIsDrawerOpen(true)}
              onPopularSearch={handlePopularSearch}
            />

            <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 pb-8">
              <LiveStats stats={stats} />
            </section>

            <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-16 sm:py-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex items-end justify-between mb-8"
              >
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
                    Browse by Category
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1.5">
                    Explore legal documents organized by practice areas
                  </p>
                </div>
                <button
                  onClick={() => {
                    setActiveSection("search");
                    handleResetFilters();
                  }}
                  className="hidden sm:flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  View All
                  <ChevronRight size={14} />
                </button>
              </motion.div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {([
                  {
                    name: "Constitution",
                    desc: "Supreme Law of Bangladesh",
                    count: stats?.documents_by_category["Constitution"] || 5,
                  },
                  {
                    name: "General Act",
                    desc: "Penal Code, CrPC, Contract laws",
                    count: stats?.documents_by_category["General Act"] || 6,
                  },
                  {
                    name: "Labour Law",
                    desc: "Employment & Factory codes",
                    count: stats?.documents_by_category["Labour Law"] || 6,
                  },
                  {
                    name: "Judgement",
                    desc: "Supreme Court rulings",
                    count: stats?.documents_by_category["Judgement"] || 11,
                  },
                ] as const).map((cat, idx) => (
                  <CategoryCard
                    key={cat.name}
                    name={cat.name}
                    description={cat.desc}
                    count={cat.count}
                    index={idx}
                    onClick={() => {
                      setSelectedCategory(cat.name);
                      setActiveSection("search");
                    }}
                  />
                ))}
              </div>
            </section>

            <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 pb-16 sm:pb-20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                      Popular Documents
                    </h3>
                    <Scale size={14} className="text-muted-foreground/40" />
                  </div>
                  <div className="space-y-2.5">
                    {popularDocs.map((doc, idx) => (
                      <DocumentCard
                        key={doc.id}
                        doc={doc}
                        isBookmarked={bookmarkedSlugs.includes(doc.slug)}
                        onRead={handleReadDocument}
                        onToggleBookmark={handleToggleBookmark}
                        onShare={handleShareDocument}
                        index={idx}
                        variant="compact"
                      />
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                      Recently Updated
                    </h3>
                    <Clock size={14} className="text-muted-foreground/40" />
                  </div>
                  <div className="space-y-2.5">
                    {recentDocs.map((doc, idx) => (
                      <DocumentCard
                        key={doc.id}
                        doc={doc}
                        isBookmarked={bookmarkedSlugs.includes(doc.slug)}
                        onRead={handleReadDocument}
                        onToggleBookmark={handleToggleBookmark}
                        onShare={handleShareDocument}
                        index={idx}
                        variant="compact"
                      />
                    ))}
                  </div>
                </motion.div>
              </div>
            </section>

            <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 pb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="border border-border bg-card rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                      <RefreshCw size={15} className="text-accent" />
                    </div>
                    <h3 className="font-serif text-base font-bold text-foreground">
                      Document Ingestion Pipeline
                    </h3>
                  </div>
                  <p className="text-xs text-muted-foreground max-w-xl leading-relaxed">
                    CaseVault loads markdown documents with YAML front matter
                    parsed directly from crawled legal gazettes.
                  </p>
                </div>
                <button
                  onClick={handleSyncCorpus}
                  disabled={isSyncing}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-foreground text-background hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-bold transition-all cursor-pointer"
                >
                  <RefreshCw size={14} className={isSyncing ? "animate-spin" : ""} />
                  {isSyncing ? "Syncing..." : "Sync Corpus"}
                </button>
              </motion.div>
            </section>

            <AIFeatures />
            <WhyCaseVault />
          </main>
        )}

        {/* Search View */}
        {!readingDocSlug && activeSection === "search" && (
          <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
              <aside className="w-full lg:w-64 shrink-0 space-y-4">
                <button
                  onClick={handleNavigateHome}
                  className="flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider cursor-pointer"
                >
                  <ChevronRight size={14} className="-rotate-180" />
                  Back to Home
                </button>

                <div className="border border-border bg-card rounded-2xl p-5 space-y-5">
                  <div>
                    <label
                      htmlFor="search-category"
                      className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2.5 block"
                    >
                      Category
                    </label>
                    <select
                      id="search-category"
                      value={selectedCategory}
                      onChange={(e) => {
                        setSelectedCategory(e.target.value);
                        setCurrentPage(1);
                        handleFilterChange();
                      }}
                      className="w-full bg-card border border-border rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-accent/30 cursor-pointer"
                    >
                      <option value="">All Categories</option>
                      {filters?.categories.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="search-year"
                      className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2.5 block"
                    >
                      Year
                    </label>
                    <select
                      id="search-year"
                      value={selectedYear}
                      onChange={(e) => {
                        setSelectedYear(e.target.value);
                        setCurrentPage(1);
                        handleFilterChange();
                      }}
                      className="w-full bg-card border border-border rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-accent/30 cursor-pointer"
                    >
                      <option value="">Any Year</option>
                      {filters?.years.map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="search-sort"
                      className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2.5 block"
                    >
                      Sort By
                    </label>
                    <select
                      id="search-sort"
                      value={sortBy}
                      onChange={(e) => {
                        setSortBy(e.target.value as any);
                        setCurrentPage(1);
                        handleFilterChange();
                      }}
                      className="w-full bg-card border border-border rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-accent/30 cursor-pointer"
                    >
                      <option value="relevance">Relevance</option>
                      <option value="newest">Newest</option>
                      <option value="oldest">Oldest</option>
                      <option value="alphabetical">A-Z</option>
                    </select>
                  </div>

                  <button
                    onClick={() => setIsDrawerOpen(true)}
                    className="w-full flex items-center justify-center gap-2 border border-border hover:bg-secondary/30 py-2.5 rounded-xl text-xs font-semibold text-muted-foreground hover:text-foreground transition-all cursor-pointer"
                  >
                    All Filters
                  </button>

                  <button
                    onClick={() => {
                      handleResetFilters();
                      if (activeSection === "search") executeSearch(1);
                    }}
                    className="w-full text-center text-[10px] font-semibold text-muted-foreground hover:text-foreground transition-colors pt-1 block cursor-pointer"
                  >
                    Clear All
                  </button>
                </div>
              </aside>

              <div className="flex-1 space-y-6">
                <SearchBar
                  value={searchQuery}
                  onChange={(val) => setSearchQuery(val)}
                  onSubmit={handleSearch}
                  onOpenAdvanced={() => setIsDrawerOpen(true)}
                  variant="inline"
                />

                {/* Active filter chips */}
                {(selectedCategory ||
                  selectedYear ||
                  selectedStatus ||
                  selectedLanguage ||
                  selectedSource ||
                  selectedTag) && (
                  <div className="flex flex-wrap items-center gap-1.5 py-2 px-4 bg-secondary/20 border border-border rounded-xl">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mr-1">
                      Filters:
                    </span>
                    {selectedCategory && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[10px] bg-card text-foreground border border-border">
                        {selectedCategory}
                        <X
                          size={10}
                          className="hover:text-destructive cursor-pointer"
                          onClick={() => {
                            setSelectedCategory("");
                            handleFilterChange();
                          }}
                        />
                      </span>
                    )}
                    {selectedYear && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[10px] bg-card text-foreground border border-border">
                        {selectedYear}
                        <X
                          size={10}
                          className="hover:text-destructive cursor-pointer"
                          onClick={() => {
                            setSelectedYear("");
                            handleFilterChange();
                          }}
                        />
                      </span>
                    )}
                    {selectedStatus && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[10px] bg-card text-foreground border border-border">
                        {selectedStatus}
                        <X
                          size={10}
                          className="hover:text-destructive cursor-pointer"
                          onClick={() => {
                            setSelectedStatus("");
                            handleFilterChange();
                          }}
                        />
                      </span>
                    )}
                    {selectedLanguage && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[10px] bg-card text-foreground border border-border">
                        {selectedLanguage}
                        <X
                          size={10}
                          className="hover:text-destructive cursor-pointer"
                          onClick={() => {
                            setSelectedLanguage("");
                            handleFilterChange();
                          }}
                        />
                      </span>
                    )}
                    {selectedSource && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[10px] bg-card text-foreground border border-border">
                        {selectedSource}
                        <X
                          size={10}
                          className="hover:text-destructive cursor-pointer"
                          onClick={() => {
                            setSelectedSource("");
                            handleFilterChange();
                          }}
                        />
                      </span>
                    )}
                    {selectedTag && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[10px] bg-card text-foreground border border-border">
                        #{selectedTag}
                        <X
                          size={10}
                          className="hover:text-destructive cursor-pointer"
                          onClick={() => {
                            setSelectedTag("");
                            handleFilterChange();
                          }}
                        />
                      </span>
                    )}
                  </div>
                )}

                <SearchResults
                  items={searchResults?.items || []}
                  total={searchResults?.total || 0}
                  page={currentPage}
                  pages={searchResults?.pages || 1}
                  isLoading={isLoadingSearch}
                  onReadDocument={handleReadDocument}
                  bookmarkedSlugs={bookmarkedSlugs}
                  onToggleBookmark={handleToggleBookmark}
                  onShareDocument={handleShareDocument}
                  onPageChange={(p) => executeSearch(p)}
                  searchQuery={searchQuery}
                  onClearFilters={handleResetFilters}
                  onReturnHome={handleNavigateHome}
                />
              </div>
            </div>
          </main>
        )}
      </div>

      <AdvancedSearchDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        filters={filters}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
        selectedSource={selectedSource}
        setSelectedSource={setSelectedSource}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        sortBy={sortBy}
        setSortBy={setSortBy}
        onApplyFilters={() => {
          setCurrentPage(1);
          executeSearch(1);
        }}
        onResetFilters={handleResetFilters}
      />

      {/* Bookmarks Panel */}
      <AnimatePresence>
        {isBookmarkPanelOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsBookmarkPanelOpen(false)}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm cursor-pointer"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 250 }}
              className="fixed top-0 right-0 z-50 h-full w-full max-w-sm border-l border-border bg-background shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between border-b border-border px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                    <Bookmark size={14} className="text-accent" />
                  </div>
                  <h3 className="font-serif text-base font-bold text-foreground">
                    Bookmarks ({bookmarkedSlugs.length})
                  </h3>
                </div>
                <button
                  onClick={() => setIsBookmarkPanelOpen(false)}
                  className="w-8 h-8 rounded-lg border border-border hover:bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
                {bookmarkedSlugs.length === 0 ? (
                  <div className="text-center py-20 text-muted-foreground text-xs space-y-2">
                    <Bookmark size={24} className="mx-auto opacity-30" />
                    <p>No saved documents yet.</p>
                    <p>Click the bookmark icon on search result cards.</p>
                  </div>
                ) : (
                  bookmarkedSlugs.map((slug) => (
                    <motion.div
                      key={slug}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      whileHover={{ x: 3 }}
                      onClick={() => {
                        handleReadDocument(slug);
                        setIsBookmarkPanelOpen(false);
                      }}
                      className="border border-border bg-card hover:bg-secondary/20 p-3.5 rounded-xl cursor-pointer transition-all"
                    >
                      <span className="text-[9px] text-muted-foreground font-semibold uppercase tracking-wider block mb-0.5">
                        Saved Document
                      </span>
                      <span className="text-xs font-semibold text-foreground hover:text-accent transition-colors block truncate">
                        {slug
                          .replace(/-/g, " ")
                          .replace(/\b\w/g, (c) => c.toUpperCase())}
                      </span>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {!readingDocSlug && <Footer />}
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <HomeContent />
    </Suspense>
  );
}
