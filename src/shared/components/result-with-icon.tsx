import Image from "next/image";
import { Categories } from "@/shared/types/categories";

interface ResultWithIconProps {
  name: string;
  imageUrl: string;
  category: Categories;
}

function getCategoryClass(category: Categories): string {
  switch (category) {
    case Categories.Digimon:
      return "bg-blue-500 text-white";
    case Categories.Item:
      return "bg-yellow-500 text-black";
    case Categories.Digitama:
      return "bg-red-500 text-white";
    default:
      return "bg-gray-500 text-white";
  }
}

export default function ResultWithIcon({
  name,
  imageUrl,
  category,
}: ResultWithIconProps) {
  return (
    <div className="flex items-center gap-3 p-2 hover:bg-green-500 hover:text-black cursor-pointer transition-all rounded-lg">
      {imageUrl && (
        <div className="w-10 h-10 relative">
          <Image
            src={imageUrl}
            alt={name|| "Image not available"}
            layout="fill"
            objectFit="contain"
            className="rounded-md"
          />
        </div>
      )}
      <div className="flex flex-col">
        <span className="text-lg font-semibold">{name}</span>
        <span
          className={`text-xs font-bold px-2 py-1 rounded-full w-fit ${getCategoryClass(
            category
          )}`}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </span>
      </div>
    </div>
  );
}
