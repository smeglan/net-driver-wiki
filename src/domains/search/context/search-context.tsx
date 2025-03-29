"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { SearchResult } from "@/domains/search/types/search-result";

interface SearchContextProps {
  results: SearchResult[];
  setResults: (results: SearchResult[]) => void;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [results, setResults] = useState<SearchResult[]>([]);

  return (
    <SearchContext.Provider value={{ results, setResults }}>
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
