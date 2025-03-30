import { IDigimon } from "@/domains/digimon/models/digimon.model";
import { IItem } from "@/domains/item/models/item.model";
import { IDigitama } from "@/domains/digitama/models/digitama.model";
import { Categories } from "@/shared/types/categories";
import ImageStore from "@/shared/lib/image-store";
import { SearchResult } from "@/domains/search/types/search-result";
import Fuse from "fuse.js";

export const GetQuery = (
  digimons: IDigimon[],
  items: IItem[],
  digitamas: IDigitama[]
) => {
  if (digimons.length > 0 || items.length > 0 || digitamas.length > 0) {
    const data: SearchResult[] = [
      ...digimons.map((d) => ({
        title: d.title,
        name: d.name,
        iconURL:
          ImageStore[Categories.Digimon]["icon"][
            `${d.name.replaceAll("-", "_")}`
          ] || ImageStore.digimon?.art?.default,
        imageURL:
          ImageStore[Categories.Digimon]["art"][
            `${d.name.replaceAll("-", "_")}`
          ] || ImageStore.digimon?.art?.default,
        description: d.description,
        stage: d.stage,
        attribute: d.attribute,
        category: Categories.Digimon,
      })),
      ...items.map((i) => ({
        title: i.title,
        name: i.name,
        iconURL:
          ImageStore[Categories.Item]["art"][
            `${i.name.replaceAll("-", "_")}`
          ] || ImageStore.digimon?.art?.default,
        imageURL:
          ImageStore[Categories.Item]["art"][
            `${i.name.replaceAll("-", "_")}`
          ] || ImageStore.digimon?.art?.default,
        description: i.description,
        category: Categories.Item,
      })),
      ...digitamas.map((d) => ({
        title: d.title,
        name: d.name,
        iconURL:
          ImageStore[Categories.Digitama]["art"][
            `${d.name.replaceAll("-", "_")}`
          ] || ImageStore.digimon?.art?.default,
        imageURL:
          ImageStore[Categories.Digitama]["art"][
            `${d.name.replaceAll("-", "_")}`
          ] || ImageStore.digimon?.art?.default,
        description: d.description,
        category: Categories.Digitama,
      })),
    ];

    const options = {
      keys: [
        "name", // Búsqueda por slug
        "title", // Búsqueda por el nombre bonito
        "description", // Búsqueda por descripción
        "category", // Para filtrar por tipo de entidad
        "stage", // Solo en Digimon (baby, adult, etc.)
        "attribute", // Solo en Digimon (vaccine, virus, etc.)
      ],
      threshold: 0.3, // Permite errores tipográficos leves
      minMatchCharLength: 2, // Mínimo de caracteres antes de buscar
    };
    const newFuse = new Fuse(data, options);
    return newFuse;
  }
};
