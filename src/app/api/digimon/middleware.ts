import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const { method } = req;

  if (method === "GET") {
    return NextResponse.next();
  }

  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string; role: string };
    const { role } = decoded;
    if (method === "POST" || method === "DELETE") {
      if (role !== "admin") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware Digimon error: \n", error);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
export const config = {
  matcher: "/api/digimon/:path*",
};