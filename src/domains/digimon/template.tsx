import Image from "next/image";
import { IDigimon } from "@/domains/digimon/models/digimon.model";
import ImageStore from "@/shared/lib/image-store";
import DigimonStats from "@/domains/digimon/components/digimon-stats";
import RelatedItems from "@/domains/digimon/components/related-items";
import DigimonAttributes from "@/domains/digimon/components/digimon-attributes";
import { Categories } from "@/shared/types/categories";

interface IDigimonTemplateProps {
  digimon: IDigimon;
}

export default function DigimonTemplate({ digimon }: IDigimonTemplateProps) {
  console.log(digimon)
  return (
    <div className="flex flex-col bg-black text-green-400 p-6 font-mono border border-green-600 rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row bg-black text-green-400 p-6 font-mono">
        <div className="md:w-1/3 flex flex-col items-center">
          {digimon.name && (
            <Image
              src={
                ImageStore.digimon?.art[digimon.name] ||
                ImageStore.digimon.art.default
              }
              alt={digimon.name|| "Image not available"}
              width={250}
              height={250}
              className="rounded-lg border border-green-500"
            />
          )}
          <DigimonAttributes
            type={digimon.type}
            attribute={digimon.attribute}
            stage={digimon.stage}
          />
        </div>

        <div className="md:w-2/3 flex flex-col justify-between p-4">
          <h1 className="text-4xl md:text-6xl font-bold text-center md:text-left border-b-2 border-green-600 pb-2 max-w-full truncate text-ellipsis">
            {digimon.title.toUpperCase() || digimon.name.toUpperCase() } 
          </h1>
          {digimon.stats && <DigimonStats stats={digimon.stats} />}
        </div>
      </div>

      <div className="md:w-full flex flex-col justify-between p-4">
        <p className="mt-6 text-lg text-green-300">{digimon.description}</p>

        <RelatedItems
          title="🥚 Digitamas"
          items={digimon.digitama || []}
          category={Categories.Digitama}
        />
        <RelatedItems
          title="🔄 Evolutions"
          items={digimon.evolutions || []}
          category={Categories.Digimon}
        />
        <RelatedItems
          title="⏪ Pre-Evolutions"
          items={digimon.preEvolutions || []}
          category={Categories.Digimon}
        />
        <RelatedItems
          title="↔️ Side Evolutions"
          items={digimon.sideEvolutions || []}
          category={Categories.Digimon}
        />
      </div>
    </div>
  );
}
