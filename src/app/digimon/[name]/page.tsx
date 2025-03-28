import { IDigimon } from "@/domains/digimon/models/digimon.model";
import DigimonTemplate from "@/domains/digimon/template";
import ErrorTemplate from "@/domains/error/template";
import { getAll, getOne } from "@/shared/services/getter";
import { Categories } from "@/shared/types/categories";

export async function generateStaticParams() {
  const { data } = await getAll<IDigimon>(Categories.Digimon);
  const digimons = data ?? [];
  return digimons.map((digimon: IDigimon) => ({
    name: digimon.name.toLowerCase(),
  }));
}

export default async function DigimonPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const { status, data: digimon } = await getOne<IDigimon>(
    Categories.Digimon,
    name
  );

  if (!digimon) {
    return <ErrorTemplate code={status} />;
  }

  return (
    <div className="bg-black text-green-500 min-h-screen flex flex-col items-center p-8">
      <DigimonTemplate digimon={digimon} />
    </div>
  );
}
