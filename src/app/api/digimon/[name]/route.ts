import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/database";
import Digimon, { IDigimon } from "@/models/digimon.model";

export async function GET(request: NextRequest,{ params }: { params: { name: string } }) {
  try {
    await connectDB();
    const digimon = await Digimon.findOne({ name: params.name });

    if (!digimon) {
      return NextResponse.json(
        { error: "Digimon no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(digimon, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error buscando Digimon" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { name: string } }) {
  try {
    await connectDB();

    const deletedDigimon = await Digimon.findOneAndDelete({
      name: params.name,
    });

    if (!deletedDigimon) {
      return NextResponse.json({ error: "Digimon not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Digimon deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error to delete Digimon" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: { params: { name: string } }) {
  try {
    await connectDB();
    const body: IDigimon = await request.json();

    const updatedDigimon = await Digimon.findOneAndReplace(
      { name: params.name },
      body,
      { new: true }
    );

    if (!updatedDigimon) {
      return NextResponse.json(
        { error: "Digimon no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedDigimon, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error actualizando Digimon" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { name: string } }) {
  try {
    await connectDB();
    const body = await request.json();

    const updatedDigimon = await Digimon.findOneAndUpdate(
      { name: params.name },
      { $set: body },
      { new: true }
    );

    if (!updatedDigimon) {
      return NextResponse.json(
        { error: "Digimon no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedDigimon, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error actualizando Digimon" },
      { status: 500 }
    );
  }
}
