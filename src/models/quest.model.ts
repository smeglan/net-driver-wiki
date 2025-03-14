import { IQuest } from '../interfaces/quest.interface';
import mongoose, { Schema } from "mongoose";

const QuestSchema = new Schema<IQuest>({
  name: { type: String, required: true },
  description: { type: String, required: true },

});

export const QuestModel = mongoose.model<IQuest>("Quest", QuestSchema);