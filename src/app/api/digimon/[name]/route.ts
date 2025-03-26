import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/shared/lib/database";
import Digimon, { IDigimon } from "@/domains/digimon/models/digimon.model";
import { isAuthorized } from "@/shared/services/auth-middleware";
import { revalidateTag } from "next/cache";
import "@/domains/digitama/models/digitama.model"; 

interface IRequestContext {
  params: Promise<{ name: string }>;
}

export async function GET(request: NextRequest, context: IRequestContext) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    await connectDB();
    const { name } = await Promise.resolve(context.params);
    const digimon = await Digimon.findOne({ name }).populate("digitama");
    if (!digimon) {
      return NextResponse.json({ error: "Digimon not found" }, { status: 404 });
    }
    return NextResponse.json(digimon, { status: 200 });
  } catch (error) {
    console.log("Error to find Digimon", error);
    return NextResponse.json(
      { error: "Error to find Digimon" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, context: IRequestContext) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    await connectDB();
    const { name } = await Promise.resolve(context.params);
    const deletedDigimon = await Digimon.findOneAndDelete({
      name: name,
    });

    if (!deletedDigimon) {
      return NextResponse.json({ error: "Digimon not found" }, { status: 404 });
    }
    revalidateTag("digimons");
    return NextResponse.json({ message: "Digimon deleted" }, { status: 200 });
  } catch (error) {
    console.log("Error to delete Digimon", error);
    return NextResponse.json(
      { error: "Error to delete Digimon" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, context: IRequestContext) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    await connectDB();
    const { name } = await Promise.resolve(context.params);
    const body: IDigimon = await request.json();
    const updatedDigimon = await Digimon.findOneAndReplace(
      { name: name },
      body,
      { new: true }
    );

    if (!updatedDigimon) {
      return NextResponse.json({ error: "Digimon not found" }, { status: 404 });
    }
    revalidateTag(name);
    return NextResponse.json(updatedDigimon, { status: 200 });
  } catch (error) {
    console.log("Error to update Digimon", error);
    return NextResponse.json(
      { error: "Error to update Digimon" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, context: IRequestContext) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    await connectDB();
    const { name } = await Promise.resolve(context.params);
    const body = await request.json();
    const updatedDigimon = await Digimon.findOneAndUpdate(
      { name: name },
      { $set: body },
      { new: true }
    );

    if (!updatedDigimon) {
      return NextResponse.json({ error: "Digimon not found" }, { status: 404 });
    }
    revalidateTag(name);
    return NextResponse.json(updatedDigimon, { status: 200 });
  } catch (error) {
    console.log("Error to update Digimons", error);
    return NextResponse.json(
      { error: "Error to update Digimon" },
      { status: 500 }
    );
  }
}
