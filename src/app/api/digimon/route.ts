import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/database";
import Digimon, { IDigimon } from "@/models/digimon.model";

export async function GET() {
  try {
    await connectDB();
    const digimons = await Digimon.find();
    return NextResponse.json(digimons, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error to get Digimon" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body: IDigimon = await request.json();
    const newDigimon = new Digimon(body);
    await newDigimon.save();
    return NextResponse.json(newDigimon, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error to save Digimon" },
      { status: 500 }
    );
  }
}
