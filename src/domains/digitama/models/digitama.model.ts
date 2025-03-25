import { Schema, model, Document } from "mongoose";

export interface IDigitama extends Document {
  name: string;
  title: string;
  description: string;
  image: string;
  curiosities: string[]
}

const DigitamaSchema = new Schema<IDigitama>({
  name: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  curiosities: { type: [], required: true }
});

export default model<IDigitama>("Digitama", DigitamaSchema);