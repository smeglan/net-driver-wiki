import SearchBarTemplate from "@/domains/search/templates/search-bar.template";

export default async function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-green-400 font-mono">
      <h1 className="text-4xl mb-6">Net Driver Wiki</h1>
      <SearchBarTemplate/>
    </div>
  );
}
