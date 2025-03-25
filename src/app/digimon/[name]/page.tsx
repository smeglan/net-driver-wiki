import { IDigimon } from "@/domains/digimon/models/digimon.model";
import { getAllDigimons, getDigimon } from "@/domains/digimon/services/digimon.service";
import DigimonTemplate from "@/domains/digimon/template";
import ErrorTemplate from "@/domains/error/template";

export async function generateStaticParams() {
  const {digimons} = await getAllDigimons();

  return digimons.map((digimon: IDigimon) => ({
    name: digimon.name,
  }));
}

async function DigimonPage({ params }: { params: { name: string } }){
  const a = await getDigimon(params.name);
  const {status, digimon} = a
  if (!digimon) {
    return <ErrorTemplate code={status}/>;
  }
  return (
    <div className="bg-black text-green-500 min-h-screen flex flex-col items-center p-8">
      {digimon && <DigimonTemplate digimon={digimon} />}
    </div>
  );
};

export default DigimonPage;
