import { IDigitama } from "@/domains/digitama/models/digitama.model";
import { IItem } from "@/domains/item/models/item.model";
import { DigimonAttribute, DigimonStage, DigimonType } from "@/shared/types/digimon";
import mongoose, { Schema, Document } from "mongoose";

export interface IDigimon extends Document {
  title: string;
  name: string;
  description: string;
  stage: DigimonStage;
  attribute: DigimonAttribute;
  type: DigimonType;
  image?: string;
  stats?: {
    game: {
      hp: number;
      attack: number;
      defense: number;
      speed: number;
      baseWeight: number;
    };
    base: {
      hp: number;
      attack: number;
      defense: number;
      speed: number;
    };
  };
  digitama?: IDigitama[];
  preEvolutions?: IDigimon[];
  evolutions?: IDigimon[];
  sideEvolutions?: IDigimon[];
  method?: {
    condition?: string;
    trainingPercentage?: number;
    weight?: number;
    errors?: number;
    bonusConditions?: string[];
  };
  items?: IItem[];
}

const DigimonSchema = new Schema<IDigimon>({
  title: { type: String, required: true },
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  stage: { type: String, required: true },
  attribute: { type: String, required: true },
  type: { type: String, required: false },
  image: { type: String, required: false },
  stats: {
    game: {
      hp: { type: Number, default: 0 },
      attack: { type: Number, default: 0 },
      defense: { type: Number, default: 0 },
      speed: { type: Number, default: 0 },
      baseWeight: { type: Number, default: 0 },
    },
    base: {
      hp: { type: Number, default: 0 },
      attack: { type: Number, default: 0 },
      defense: { type: Number, default: 0 },
      speed: { type: Number, default: 0 },
      baseWeight: { type: Number, default: 0 },
    },
  },
  digitama: [{ type: Schema.Types.ObjectId, ref: "Digitama" }],
  preEvolutions: [{ type: Schema.Types.ObjectId, ref: "Digimon" }],
  evolutions: [{ type: Schema.Types.ObjectId, ref: "Digimon" }],
  sideEvolutions: [{ type: Schema.Types.ObjectId, ref: "Digimon" }],
  method: {
    condition: { type: String, required: false },
    trainingPercentage: { type: Number, required: false },
    weight: { type: Number, required: false },
    errors: { type: Number, required: false },
    bonusConditions: [{ type: String }],
  },
  items: [{ type: Schema.Types.ObjectId, ref: "Item" }],
});

export default mongoose.models.Digimon ||
  mongoose.model<IDigimon>("Digimon", DigimonSchema);
