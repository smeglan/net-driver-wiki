import { NextRequest } from "next/server";
import Digimon from "@/domains/digimon/models/digimon.model";
import { handleGet, handlePost } from "@/shared/services/api";

export async function GET(request: NextRequest) {
  return handleGet(request, Digimon, "name title stage attribute");
}

export async function POST(request: NextRequest) {
  return handlePost(request, Digimon);
}
