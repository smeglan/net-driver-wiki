import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

//const authRoutes = ["/editor", "/admin"];
const adminRoutes = ["/admin"];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string; role: string };

    const { role } = decoded;
    const pathname = req.nextUrl.pathname;

    if (adminRoutes.includes(pathname) && role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error: \n", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/editor/:path*", "/admin/:path*"],
};
