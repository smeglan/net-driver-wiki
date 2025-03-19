import SearchBar from "@/shared/components/search-bar";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-green-400 font-mono">
      <h1 className="text-4xl mb-6">Net Driver Wiki</h1>
      <SearchBar />
    </main>
  );
}
