import { IDigimon } from "@/domains/digimon/models/digimon.model";
import {
  getAllDigimons,
  getDigimon,
} from "@/domains/digimon/services/digimon.service";
import DigimonTemplate from "@/domains/digimon/template";
import ErrorTemplate from "@/domains/error/template";

export async function generateStaticParams() {
  const { digimons } = await getAllDigimons();

  return digimons.map((digimon: IDigimon) => ({
    name: digimon.name.toLowerCase(),
  }));
}

export default async function DigimonPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const { status, digimon } = await getDigimon(name);

  if (!digimon) {
    return <ErrorTemplate code={status} />;
  }

  return (
    <div className="bg-black text-green-500 min-h-screen flex flex-col items-center p-8">
      <DigimonTemplate digimon={digimon} />
    </div>
  );
}
