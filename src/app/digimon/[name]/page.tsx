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

export default function DigimonPage({ params }: DigimonPageProps) {
  const { name } = params;

  // 👇 OBTENER DIGIMON DE FORMA SEGURA
  return getDigimon(name).then(({ status, digimon }) => {
    if (!digimon) {
      redirect(`/error/${status}`);
    }

    return (
      <div className="bg-black text-green-500 min-h-screen flex flex-col items-center p-8">
        <DigimonTemplate digimon={digimon} />
      </div>
    );
  });
}
