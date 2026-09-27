const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface DocumentListItem {
  id: number;
  slug: string;
  title: string;
  year: number;
  category: string;
  act_number?: string;
  language: string;
  status: string;
  jurisdiction: string;
  source: string;
  updated_at?: string;
  summary?: string;
  search_views: number;
  tags: string[];
  created_at: string;
}

export interface DocumentDetail extends DocumentListItem {
  content: string;
}

export interface SearchResponse {
  items: DocumentListItem[];
  total: number;
  page: number;
  pages: number;
  limit: number;
}

export interface FilterOptions {
  categories: string[];
  tags: string[];
  years: number[];
  languages: string[];
  statuses: string[];
  sources: string[];
}

export interface StatsResponse {
  total_documents: number;
  total_acts: number;
  total_judgements: number;
  total_categories: number;
  documents_by_category: Record<string, number>;
}

export interface SearchParams {
  keyword?: string;
  category?: string;
  year?: number;
  act_number?: string;
  language?: string;
  status?: string;
  tag?: string;
  sort_by?: "relevance" | "newest" | "oldest" | "alphabetical";
  page?: number;
  limit?: number;
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${path}`;
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!response.ok) {
    const errorBody = await response.text().catch(() => "Unknown error");
    throw new Error(`API Request failed: ${response.status} ${response.statusText} - ${errorBody}`);
  }

  return response.json() as Promise<T>;
}

export const api = {
  // Get paginated list of documents
  getDocuments: (category?: string, page = 1, limit = 10) => {
    const url = `/documents?page=${page}&limit=${limit}${category ? `&category=${encodeURIComponent(category)}` : ""}`;
    return request<SearchResponse>(url);
  },

  // Get detailed document by slug
  getDocument: (slug: string) => {
    return request<DocumentDetail>(`/documents/${slug}`);
  },

  // Search and filter documents
  search: (params: SearchParams) => {
    const searchParams = new URLSearchParams();
    if (params.keyword) searchParams.append("keyword", params.keyword);
    if (params.category) searchParams.append("category", params.category);
    if (params.year) searchParams.append("year", params.year.toString());
    if (params.act_number) searchParams.append("act_number", params.act_number);
    if (params.language) searchParams.append("language", params.language);
    if (params.status) searchParams.append("status", params.status);
    if (params.tag) searchParams.append("tag", params.tag);
    if (params.sort_by) searchParams.append("sort_by", params.sort_by);
    if (params.page) searchParams.append("page", params.page.toString());
    if (params.limit) searchParams.append("limit", params.limit.toString());

    return request<SearchResponse>(`/search?${searchParams.toString()}`);
  },

  // Get distinct categories
  getCategories: () => {
    return request<string[]>("/categories");
  },

  // Get filter choices
  getFilters: () => {
    return request<FilterOptions>("/filters");
  },

  // Get corpus statistics
  getStats: () => {
    return request<StatsResponse>("/stats");
  },

  // Get recently updated documents
  getRecent: (limit = 5) => {
    return request<DocumentListItem[]>(`/documents/recent?limit=${limit}`);
  },

  // Get popular documents
  getPopular: (limit = 5) => {
    return request<DocumentListItem[]>(`/documents/popular?limit=${limit}`);
  },

  // Trigger content synchronization
  sync: () => {
    return request<{ message: string; synced_count: number }>("/documents/sync", {
      method: "POST",
    });
  },
};
