import Image from "next/image";
import Link from "next/link";
import ImageStore from "@/shared/lib/image-store";
import { IDigitama } from "@/domains/digitama/models/digitama.model";
import { IDigimon } from "@/domains/digimon/models/digimon.model";
import { Categories } from "@/shared/types/categories";

interface RelatedItemsProps {
  title: string;
  items: (IDigitama | IDigimon)[];
  category: Categories.Digimon | Categories.Digitama;
}

export default function RelatedItems({ title, items, category }: RelatedItemsProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className="pt-6">
      <h3 className="text-green-300 text-xl mb-2 border-b-2 border-green-600 pb-2">{title}</h3>
      <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
        {items.map((item) => (
          <Link key={`${title}_related_${item.name}`} href={`/${category}/${item.name}`} passHref>
            <div className="flex flex-col items-center text-center text-green-300 hover:text-green-400 transition">
              <Image
                src={ImageStore[category].art[item.name] || ImageStore.digimon.art.default}
                alt={item.title|| "Image not available"}
                width={80}
                height={80}
                className="rounded-lg border border-green-500"
              />
              <span className="mt-1 text-xs md:text-sm">{item.title}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
