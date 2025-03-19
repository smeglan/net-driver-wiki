"use client";

import { useState } from "react";
import ResultWithIcon from "./result-with-icon";
import ImageStore from "@/shared/lib/image-store";

const dummyResults = [
  { name: "agumon"},
  { name: "kokuwamon"},
];

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState<{ name: string }[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setFilteredResults([]);
      return;
    }

    const filtered = dummyResults.filter((digimon) =>
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
      {filteredResults.length > 0 && (
        <ul className="absolute w-full mt-2 bg-black border border-green-500 rounded-lg shadow-lg">
          {filteredResults.map((digimon, index) => (
            <li key={index}  onClick={() => handleSelect(digimon.name)}>
              <ResultWithIcon name={digimon.name} imageUrl={ImageStore[`${digimon.name}Icon`]} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
