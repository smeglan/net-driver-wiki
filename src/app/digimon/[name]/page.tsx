import { IDigimon } from "@/domains/digimon/models/digimon.model";
import {
  getAllDigimons,
  getDigimon,
} from "@/domains/digimon/services/digimon.service";
import DigimonTemplate from "@/domains/digimon/template";
import { redirect } from "next/navigation";


export async function generateStaticParams() {
  const { digimons } = await getAllDigimons();

  return digimons.map((digimon: IDigimon) => ({
    name: digimon.name,
  }));
}
interface DigimonPageProps {
  params: { name: string };
}

async function DigimonPage({ params }: DigimonPageProps) {
  const { status, digimon } = await getDigimon(params.name);
  if (!digimon) {
    redirect(`/error/${status}`);
  }
  return (
    <div className="bg-black text-green-500 min-h-screen flex flex-col items-center p-8">
      {digimon && <DigimonTemplate digimon={digimon} />}
    </div>
  );
}

export default DigimonPage;
