import SearchBarTemplate from "@/domains/search/templates/search";

export default async function DigimonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body className="bg-black text-green-500">
      <div className="flex flex-col items-center p-4">
        <SearchBarTemplate/>
      </div>
      <main>{children}</main>
    </body>
  );
}
