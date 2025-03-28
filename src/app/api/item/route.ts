import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/shared/lib/database";
import Item from "@/domains/item/models/item.model";
import { isAuthorized } from "@/shared/services/auth-middleware";

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    await connectDB();
    const items = await Item.find({}, "name title type description").lean();
    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    console.error("Error getting Items:", error);
    return NextResponse.json({ error: "Error fetching Item data" }, { status: 500 });
  }
}
