import mongoose, { Schema, Document } from "mongoose";

export interface IDigimon extends Document {
  name: string;
  description: string;
  stats?: {
    attack: number;
    defense: number;
    speed: number;
  };
}

const DigimonSchema = new Schema<IDigimon>({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  stats: {
    attack: { type: Number, default: 0 },
    defense: { type: Number, default: 0 },
    speed: { type: Number, default: 0 },
  },
});

export default mongoose.models.Digimon || mongoose.model<IDigimon>("Digimon", DigimonSchema);