import { DigimonAttribute, DigimonStage } from "@/shared/types/digimon";
import mongoose, { Schema, Document } from "mongoose";

export interface IDigimon extends Document {
  name: string;
  description: string;
  stage: DigimonStage;
  attribute: DigimonAttribute;
  image?: string;
  stats?: {
    hp: number,
    attack: number;
    defense: number;
    speed: number;
  };
}

const DigimonSchema = new Schema<IDigimon>({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  stage: { type: String, required: true },
  attribute: { type: String, required: true },
  image: { type: String, required: false },
  stats: {
    hp: { type: Number, default: 0 },
    attack: { type: Number, default: 0 },
    defense: { type: Number, default: 0 },
    speed: { type: Number, default: 0 },
  },
});

export default mongoose.models.Digimon || mongoose.model<IDigimon>("Digimon", DigimonSchema);