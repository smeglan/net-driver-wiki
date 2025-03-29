"use client";

import Image from "next/image";
import Link from "next/link";
import { SearchResult } from "@/domains/search/types/search-result";

interface RelatedSearchTemplateProps {
  query: string;
  results: SearchResult[];
}

export default function RelatedSearchTemplated({
  query,
  results,
}: RelatedSearchTemplateProps) {
  console.log(results)
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl text-green-300 font-bold mb-4">
        Resultados de búsqueda para: {query}
      </h1>

      {results.length > 0 ? (
        <ul className="space-y-4">
          {results.map((item) => (
            <li
              key={`result_${item.category}_${item.name}`}
              className="flex items-center bg-gray-800 text-white p-4 rounded-lg shadow-md hover:bg-gray-700 transition"
            >
              <Image
                src={item.imageURL}
                alt={item.title||item.name}
                className="w-16 h-16 rounded-md object-cover mr-4"
                height={100}
                width={100}
              />
              <div className="flex-1">
                <h2 className="text-lg font-bold">{item.title||item.name}</h2>
                <p className="text-sm text-gray-300">{item.description}</p>
                <span className="text-xs bg-green-500 text-black px-2 py-1 rounded">
                  {item.category}
                </span>
              </div>
              <Link
                href={`/digimon/${item.name}`}
                className="ml-4 text-green-400 hover:text-green-300"
              >
                Ver más →
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">No se encontraron resultados.</p>
      )}
    </div>
  );
}
