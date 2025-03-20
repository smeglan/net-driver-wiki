"use client";

import { fetchDigimons } from "@/domains/digimon/services/fetch-digimons";
import SearchBar from "@/shared/components/search-bar";
import { useEffect, useState } from "react";

export default function Home() {
  const [digimons, setDigimons] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchDigimons();
        console.log(data)
        setDigimons(data);
      } catch (error) {
        console.error("Error al obtener Digimons", error);
      }
    }

    fetchData();
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-green-400 font-mono">
      <h1 className="text-4xl mb-6">Net Driver Wiki</h1>
      <SearchBar digimons={digimons}/>
    </main>
  );
}
