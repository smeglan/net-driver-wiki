import Image from "next/image";
import { IDigimon } from "./models/digimon.model";
import ImageStore from "@/shared/lib/image-store";

interface IDigimonTemplateProps {
  digimon: IDigimon;
}

export default function DigimonTemplate(props: IDigimonTemplateProps) {
  const { digimon } = props;
  return (
    <div className="flex flex-col md:flex-row bg-black text-green-400 p-6 font-mono">
      <div className="md:w-1/3 flex justify-center items-center">
        {digimon.name&&<Image
          src={ImageStore[digimon.name]}
          alt={digimon.name}
          width={200}
          height={200}
          className="rounded-lg"
        />}
      </div>

      <div className="md:w-2/3 flex flex-col justify-between p-4">
        <h1 className="text-4xl md:text-6xl font-bold text-center md:text-left border-b-2 border-green-600 pb-2">
          {digimon.name.toUpperCase()}
        </h1>
        {digimon.stats && (
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-lg">
            <div>HP: {digimon.stats.hp}</div>
            <div>Attack: {digimon.stats.attack}</div>
            <div>Defense: {digimon.stats.defense}</div>
            <div>Speed: {digimon.stats.speed}</div>
          </div>
        )}
        <p className="mt-6 text-lg text-green-300">{digimon.description}</p>
      </div>
    </div>
  );
}
