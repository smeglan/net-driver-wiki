import Image from "next/image";

interface DigimonIconProps {
  name: string;
  imageUrl: string;
}

export default function ResultWithIcon({ name, imageUrl }: DigimonIconProps) {
  return (
    <div className="flex items-center gap-2 p-2 hover:bg-green-500 hover:text-black cursor-pointer transition-all rounded-lg">
      <Image
        src={imageUrl}
        alt={name}
        width={40}
        height={40}
      />
      <span className="text-lg">{name}</span>
    </div>
  );
}