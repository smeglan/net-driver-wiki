import mongoose, { Schema, Document } from "mongoose";
import { IDigimon } from "../interfaces/digimon.interface";

const DigimonSchema = new Schema<IDigimon>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  stats: {
    attack: { type: Number, default: 0 },
    defense: { type: Number, default: 0 },
    speed: { type: Number, default: 0 },
  },
});

export const DigimonModel = mongoose.model<IDigimon>("Digimon", DigimonSchema);