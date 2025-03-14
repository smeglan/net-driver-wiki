import { Document } from "mongoose";

export interface IQuest extends Document{
 name:string,
 description: string,
}