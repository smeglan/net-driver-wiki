"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { SearchResult } from "@/domains/search/types/search-result";
import Fuse from "fuse.js";
import { useSearchParams } from "next/navigation";

interface SearchContextProps {
  fuse: Fuse<SearchResult> | null;
  setFuse: (fuse: Fuse<SearchResult> | null) => void;
  query: string;
  setQuery: (query: string) => void;
  results: SearchResult[];
  setResults: (results: SearchResult[]) => void;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("q") || "";
  const [fuse, setFuse] = useState<Fuse<SearchResult> | null>(null);
  const [query, setQuery] = useState<string>(queryParam);
  const [results, setResults] = useState<SearchResult[]>([]);

  return (
    <SearchContext.Provider
      value={{ fuse, setFuse, query, setQuery, results, setResults }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch debe usarse dentro de un SearchProvider");
  }
  return context;
}
