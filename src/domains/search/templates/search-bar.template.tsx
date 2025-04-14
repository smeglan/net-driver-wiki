import { IDigimon } from "@/domains/digimon/models/digimon.model";
import { IDigitama } from "@/domains/digitama/models/digitama.model";
import ErrorTemplate from "@/domains/error/template";
import { IItem } from "@/domains/item/models/item.model";
import SearchBar from "@/domains/search/components/search-bar";
import { getAll } from "@/shared/services/getter";
import { Categories } from "@/shared/types/categories";

export default async function SearchBarTemplate() {
  const { status, data: digimons } = await getAll<IDigimon>(Categories.Digimon);
  const { data: items } = await getAll<IItem>(Categories.Item);
  const { data: digitamas } = await getAll<IDigitama>(Categories.Digitama);
  if (!digimons && !items && !digitamas) {
    return <ErrorTemplate code={status} />;
  }
  const safeDigimons = digimons ?? [];
  const safeItems = items ?? [];
  const safeDigitamas = digitamas ?? [];
  return (
    <SearchBar
      digimons={safeDigimons}
      items={safeItems}
      digitamas={safeDigitamas}
    />
  );
}
