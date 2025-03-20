"use client";

import { useState } from "react";
import { ArrowRightIcon, XMarkIcon } from "@heroicons/react/24/solid";
import ResultWithIcon from "./result-with-icon";
import ImageStore from "@/shared/lib/image-store";
import { IDigimon } from "@/domains/digimon/models/digimon.model";

interface ISearchBarProps{
  digimons: IDigimon[]|never[]
}

export default function SearchBar(props: ISearchBarProps) {
  const { digimons } = props;
  const [query, setQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState<{ name: string }[]>(
    []
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setFilteredResults([]);
      return;
    }

    const filtered = digimons.filter((digimon) =>
      digimon.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredResults(filtered);
  };
  const handleSelect = (name: string) => {
    setQuery(name);
    setFilteredResults([]);
  };

  return (
    <div className="relative w-72">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Buscar Digimon..."
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
      <button className="absolute inset-y-0 right-3 flex items-center">
        <ArrowRightIcon className="w-7 h-7 text-green-500 font-bold hover:text-green-400" />
      </button>
      {filteredResults.length > 0 && (
        <ul className="absolute w-full mt-2 bg-black border border-green-500 rounded-lg shadow-lg">
          {filteredResults.map((digimon, index) => (
            <li key={index} onClick={() => handleSelect(digimon.name)}>
              <ResultWithIcon
                name={digimon.name}
                imageUrl={ImageStore[`${digimon.name}Icon`]}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
