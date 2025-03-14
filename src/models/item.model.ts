import { IItem } from './../interfaces/item.interface';
import mongoose, { Schema } from "mongoose";

const ItemSchema = new Schema<IItem>({
  name: { type: String, required: true },
  description: { type: String, required: true },

});

export const ItemModel = mongoose.model<IItem>("Item", ItemSchema);