import { getAllDigimons } from "@/domains/digimon/services/digimon.service";
import ErrorTemplate from "@/domains/error/template";
import SearchBar from "@/shared/components/search-bar";

export default async function Home() {
  const { status, digimons } = await getAllDigimons();
  if (!digimons) {
    return <ErrorTemplate code={status} />;
  }
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-green-400 font-mono">
      <h1 className="text-4xl mb-6">Net Driver Wiki</h1>
      <SearchBar digimons={digimons} />
    </main>
  );
}
