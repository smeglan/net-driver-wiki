import { NextRequest } from "next/server";

const SECRET_KEY = process.env.API_SECRET_KEY || "Mamemon";

export function isAuthorized(req: NextRequest) {
  const authHeader = req.headers.get("Authorization");
  return authHeader === `Bearer ${SECRET_KEY}`;
}