import { RefreshToken } from "@/domains/user/services/auth.service";
import { NextResponse } from "next/server";

export async function GET() {
  const response = await RefreshToken();
  return NextResponse.json(response.token, { status: response.status });
}
