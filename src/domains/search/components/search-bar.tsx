"use client";

import { ArrowRightIcon, XMarkIcon } from "@heroicons/react/24/solid";
import ResultWithIcon from "@/shared/components/result-with-icon";
import { useRouter } from "next/navigation";
import { useSearch } from "@/domains/search/context/search-context";
import { useEffect, useMemo, useState } from "react";
import { getQuery } from "@/domains/search/services/get-query";
import { IDigimon } from "@/domains/digimon/models/digimon.model";
import { IDigitama } from "@/domains/digitama/models/digitama.model";
import { IItem } from "@/domains/item/models/item.model";

interface ISearchBarProps {
  digimons: IDigimon[];
  items: IItem[];
  digitamas: IDigitama[];
}

export default function SearchBar({
  digimons,
  items,
  digitamas,
}: ISearchBarProps) {
  const router = useRouter();
  const [showList, setShowList] = useState(false);
  const { fuse, setFuse, query, setQuery, results, setResults } = useSearch();

  const newFuse = useMemo(() => {
    return getQuery(digimons, items, digitamas);
  }, [digimons, items, digitamas]);

  useEffect(() => {
    if (newFuse) setFuse(newFuse);
  }, [newFuse, setFuse]);

  useEffect(() => {
    if (fuse && query.trim() !== "") {
      search(query);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fuse]);

  const search = (value: string) => {
    setQuery(value);
    if (!fuse || value.trim() === "") {
      setShowList(false);
      setResults([]);
      return;
    }
    const newResults = fuse.search(value).map((result) => result.item);
    setResults(newResults);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setShowList(true);
    search(value);
  };

  const handleSelect = (name: string) => {
    setQuery(name);
    setShowList(false);
  };

  const executeSearch = () => {
    if (!query.trim()) return;
    router.push(`/search?q=${query}`);
  };

  return (
    <div className="relative w-72">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        onKeyDown={(e) => e.key === "Enter" && executeSearch()}
        placeholder="Buscar..."
        className="w-full p-2 text-lg border-2 border-green-500 rounded-full bg-black text-green-400 focus:outline-none focus:border-green-300"
      />

      {query && (
        <button
          className="absolute inset-y-0 right-10 flex items-center"
          onClick={() => {
            setQuery("");
            setResults([]);
          }}
        >
          <XMarkIcon className="w-5 h-5 text-green-500 font-bold hover:text-white" />
        </button>
      )}

      <button
        className="absolute inset-y-0 right-3 flex items-center"
        onClick={executeSearch}
      >
        <ArrowRightIcon className="w-7 h-7 text-green-500 font-bold hover:text-green-400" />
      </button>

      {showList && results.length > 0 && (
        <ul className="absolute w-full mt-2 bg-black border border-green-500 rounded-lg shadow-lg max-h-80 overflow-y-auto styles">
          {results.map((result, index) => (
            <li key={index} onClick={() => handleSelect(result.name)}>
              <ResultWithIcon
                name={result.title || result.name}
                imageUrl={result.iconURL}
                category={result.category}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
