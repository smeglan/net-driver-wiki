import SearchBar from "@/shared/components/search-bar";
import ErrorTemplate from "@/domains/error/template";
import { getAllDigimons } from "@/domains/digimon/services/digimon.service";

export default async function DigimonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { status, digimons } = await getAllDigimons();
  if (!digimons) {
    return <ErrorTemplate code={status} />;
  }
  return (
    <body className="bg-black text-green-500">
      <div className="flex flex-col items-center p-4">
        <SearchBar digimons={digimons} />
      </div>
      <main>{children}</main>
    </body>
  );
}
