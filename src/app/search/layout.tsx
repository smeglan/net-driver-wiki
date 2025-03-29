import SearchBarTemplate from "@/domains/search/templates/search-bar.template";

export default async function DigimonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-black text-green-500">
      <div className="flex flex-col items-center p-4">
        <SearchBarTemplate />
      </div>
      <div>{children}</div>
    </div>
  );
}
