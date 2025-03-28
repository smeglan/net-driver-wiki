import { NextRequest, NextResponse } from "next/server";
import { Auth } from "@/domains/user/services/auth.service";

export async function POST(req: NextRequest) {
  const { identifier, password } = await req.json();
  const auth = await Auth(identifier, password);
  if (auth.status !== 200) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }
  const response = NextResponse.json(
    { message: "Login successful" },
    { status: 200 }
  );

  if (typeof auth.token === "string") {
    response.cookies.set({
        name: "token",
        value: auth.token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 7 * 24 * 60 * 60, // 7 días
      });
  }
  return response;
}
