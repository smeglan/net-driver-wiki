import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/shared/lib/database";
import Digitama, { IDigitama } from "@/domains/digitama/models/digitama.model";
import { isAuthorized } from "@/shared/services/auth-middleware";
import { revalidateTag } from "next/cache";

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    await connectDB();
    const digitamas = await Digitama.find({}, "name title description").lean();
    return NextResponse.json(digitamas, { status: 200 });
  } catch (error) {
    console.error("Error getting Digitamas:", error);
    return NextResponse.json(
      { error: "Error fetching Digitama data" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    await connectDB();
    const body: IDigitama = await request.json();
    const newDigitama = new Digitama(body);
    await newDigitama.save();
    revalidateTag("digitamas");
    return NextResponse.json(newDigitama, { status: 201 });
  } catch (error) {
    console.log("Error to save Digitama", error);
    return NextResponse.json(
      { error: "Error to save Digitama" },
      { status: 500 }
    );
  }
}
