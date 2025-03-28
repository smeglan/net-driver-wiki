import { NextRequest } from "next/server";
import Digimon from "@/domains/digimon/models/digimon.model";
import "@/domains/digitama/models/digitama.model"; 
import { handleGetOne, handleDelete, handlePatch, handlePut } from "@/shared/services/api";

interface IRequestContext {
  params: Promise<{ value: string }>;
}

export async function GET(request: NextRequest, context: IRequestContext) {
  const { value } = await Promise.resolve(context.params);
  return handleGetOne(request, Digimon, "name", value, ["evolutions", "digitama"]);
}

export async function PUT(request: NextRequest, context: IRequestContext) {
  const { value } = await Promise.resolve(context.params);
  return handlePut(request, Digimon, "name", value);
}

export async function PATCH(request: NextRequest, context: IRequestContext) {
  const { value } = await Promise.resolve(context.params);
  return handlePatch(request, Digimon, "name", value);
}

export async function DELETE(request: NextRequest, context: IRequestContext) {
  const { value } = await Promise.resolve(context.params);
  return handleDelete(request, Digimon, "name", value);
}