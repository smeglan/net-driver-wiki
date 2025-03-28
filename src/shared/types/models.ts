import Digimon from "@/domains/digimon/models/digimon.model";
import Digitama from "@/domains/digitama/models/digitama.model";
import Item from "@/domains/item/models/item.model";

export enum ModelType {
  Digimon = "digimon",
  Digitama = "digitama",
  Item = "item",
}

// Mapa para asociar el enum con los modelos reales
export const ModelMap = {
  [ModelType.Digimon]: Digimon,
  [ModelType.Digitama]: Digitama,
  [ModelType.Item]: Item,
};
