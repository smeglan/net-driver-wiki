import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/database";
import Digimon, { IDigimon } from "@/models/digimon.model";

interface IRequestContext {
  params: Promise<{name:string}> 
}

export async function GET(_: NextRequest, context: IRequestContext) {

  try {
    await connectDB();
    const { name } = await Promise.resolve(context.params);
    const digimon = await Digimon.findOne({ name });

    if (!digimon) {
      return NextResponse.json({ error: "Digimon not found" }, { status: 404 });
    }

    return NextResponse.json(digimon, { status: 200 });
  } catch (error) {
    console.log("Error to find Digimon", error);
    return NextResponse.json({ error: "Error to find Digimon" }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, context: IRequestContext) {
  try {
    await connectDB();
    const { name } = await Promise.resolve(context.params);
    const deletedDigimon = await Digimon.findOneAndDelete({
      name: name,
    });

    if (!deletedDigimon) {
      return NextResponse.json({ error: "Digimon not found" }, { status: 404 });
    }

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
      return NextResponse.json(
        { error: "Digimon not found" },
        { status: 404 }
      );
    }

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
      return NextResponse.json(
        { error: "Digimon not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedDigimon, { status: 200 });
  } catch (error) {
    console.log("Error to update Digimons", error);
    return NextResponse.json(
      { error: "Error to update Digimon" },
      { status: 500 }
    );
  }
}
