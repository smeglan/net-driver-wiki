import { Document } from "mongoose";

export interface IDigimon extends Document{
 name:string,
 description: string,
 stats?: {
    attack: Number,
    defense: Number,
    speed: Number
 }
}