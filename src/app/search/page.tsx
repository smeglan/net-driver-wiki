"use client";
import { useSearchParams } from "next/navigation";
import RelatedSearchTemplated from "@/domains/search/templates/related-search.template";
import { useSearch } from "@/domains/search/context/search-context";

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const { results } = useSearch();
  return <RelatedSearchTemplated query={query} results={results} />;
}
