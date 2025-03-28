import mongoose, { Schema, Document, Types } from "mongoose";

export interface IItem extends Document {
  name: string;
  title: string;
  description: string;
  price?: number;
  sellValue?: number;
  blackMarketValue?: number;
  usages?: string[];
  relatedDigimons?: Types.ObjectId[];
  obtainMethods?: string[];
  purchasable: boolean;
  type: "consumable" | "driver" | "program";
}

const ItemSchema = new Schema<IItem>({
  name: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: false },
  sellValue: { type: Number, required: false },
  blackMarketValue: { type: Number, required: false },
  usages: [{ type: String }],
  relatedDigimons: [{ type: Schema.Types.ObjectId, ref: "Digimon" }],
  obtainMethods: [{ type: String }],
  purchasable: { type: Boolean, default: false },
  type: { type: String, enum: ["consumable", "equipment", "key-item", "misc"], required: true },
});

export default mongoose.models.Item || mongoose.model<IItem>("Item", ItemSchema);
