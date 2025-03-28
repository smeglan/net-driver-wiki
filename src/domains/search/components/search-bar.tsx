"use client";
import { useState, useEffect } from "react";
import Fuse from "fuse.js";
import { ArrowRightIcon, XMarkIcon } from "@heroicons/react/24/solid";
import ResultWithIcon from "@/shared/components/result-with-icon";
import ImageStore from "@/shared/lib/image-store";
import { IDigimon } from "@/domains/digimon/models/digimon.model";
import { IItem } from "@/domains/item/models/item.model";
import { IDigitama } from "@/domains/digitama/models/digitama.model";
import { useRouter } from "next/navigation";
import { Categories } from "@/shared/types/categories";

interface ISearchBarProps {
  digimons: IDigimon[] | null;
  items: IItem[] | null;
  digitamas: IDigitama[] | null;
}

interface SearchResult {
  title: string;
  name: string;
  category: Categories;
}

export default function SearchBar({
  digimons,
  items,
  digitamas,
}: ISearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([]);
  const [fuse, setFuse] = useState<Fuse<SearchResult> | null>(null);

  useEffect(() => {
    const safeDigimons = digimons ?? [];
    const safeItems = items ?? [];
    const safeDigitamas = digitamas ?? [];

    if (
      safeDigimons.length > 0 ||
      safeItems.length > 0 ||
      safeDigitamas.length > 0
    ) {
      const data: SearchResult[] = [
        ...safeDigimons.map((d) => ({
          title: d.title,
          name: d.name,
          description: d.description,
          stage: d.stage,
          attribute: d.attribute,
          category: Categories.Digimon,
        })),
        ...safeItems.map((i) => ({
          title: i.title,
          name: i.name,
          description: i.description,
          category: Categories.Item,
        })),
        ...safeDigitamas.map((d) => ({
          title: d.title,
          name: d.name,
          description: d.description,
          category: Categories.Digitama,
        })),
      ];

      const options = {
        keys: [
          "name", // Búsqueda por slug
          "title", // Búsqueda por el nombre bonito
          "description", // Búsqueda por descripción
          "category", // Para filtrar por tipo de entidad
          "stage", // Solo en Digimon (baby, adult, etc.)
          "attribute", // Solo en Digimon (vaccine, virus, etc.)
        ],
        threshold: 0.3, // Permite errores tipográficos leves
        minMatchCharLength: 2, // Mínimo de caracteres antes de buscar
      };

      setFuse(new Fuse(data, options));
    }
  }, [digimons, items, digitamas]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (!fuse || value.trim() === "") {
      setFilteredResults([]);
      return;
    }

    const results = fuse.search(value).map((result) => result.item);
    setFilteredResults(results);
  };

  const handleSelect = (name: string) => {
    setQuery(name);
    setFilteredResults([]);
  };

  const search = () => {
    router.push(`/search?q=${query}`);
  };

  return (
    <div className="relative w-72">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Buscar..."
        className="w-full p-2 text-lg border-2 border-green-500 rounded-full bg-black text-green-400 focus:outline-none focus:border-green-300"
      />

      {query && (
        <button
          className="absolute inset-y-0 right-10 flex items-center"
          onClick={() => {
            setQuery("");
            setFilteredResults([]);
          }}
        >
          <XMarkIcon className="w-5 h-5 text-green-500 font-bold hover:text-white" />
        </button>
      )}
      <button
        className="absolute inset-y-0 right-3 flex items-center"
        onClick={search}
      >
        <ArrowRightIcon className="w-7 h-7 text-green-500 font-bold hover:text-green-400" />
      </button>

      {filteredResults.length > 0 && (
        <ul
          className="absolute w-full mt-2 bg-black border border-green-500 rounded-lg shadow-lg 
               max-h-80 overflow-y-auto styles"
        >
          {filteredResults.map((result, index) => (
            <li key={index} onClick={() => handleSelect(result.name)}>
              <ResultWithIcon
                name={result.title || result.name}
                imageUrl={
                  ImageStore[result.category]["icon"][
                    `${result.name.replaceAll("-", "_")}`
                  ] || ImageStore.digimon?.art?.default
                }
                category={result.category}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
