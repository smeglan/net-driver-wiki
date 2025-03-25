import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/shared/lib/database";
import Digitama, { IDigitama } from "@/domains/digitama/models/digitama.model";
import { isAuthorized } from "@/shared/services/auth-middleware";
import { revalidateTag } from "next/cache";

interface IRequestContext {
  params: Promise<{ name: string }>;
}

export async function GET(_: NextRequest, context: IRequestContext) {
  try {
    await connectDB();
    const { name } = await Promise.resolve(context.params);
    const digitama = await Digitama.findOne({ name }).populate("digitamas");
    if (!digitama) {
      return NextResponse.json({ error: "Digitama not found" }, { status: 404 });
    }
    return NextResponse.json(digitama, { status: 200 });
  } catch (error) {
    console.log("Error to find Digitama", error);
    return NextResponse.json(
      { error: "Error to find Digitama" },
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
    const deletedDigitama = await Digitama.findOneAndDelete({
      name: name,
    });

    if (!deletedDigitama) {
      return NextResponse.json({ error: "Digitama not found" }, { status: 404 });
    }
    revalidateTag("digitamas");
    return NextResponse.json({ message: "Digitama deleted" }, { status: 200 });
  } catch (error) {
    console.log("Error to delete Digitama", error);
    return NextResponse.json(
      { error: "Error to delete Digitama" },
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
    const body: IDigitama = await request.json();
    const updatedDigitama = await Digitama.findOneAndReplace(
      { name: name },
      body,
      { new: true }
    );

    if (!updatedDigitama) {
      return NextResponse.json({ error: "Digitama not found" }, { status: 404 });
    }
    revalidateTag(name);
    return NextResponse.json(updatedDigitama, { status: 200 });
  } catch (error) {
    console.log("Error to update Digitama", error);
    return NextResponse.json(
      { error: "Error to update Digitama" },
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
    const updatedDigitama = await Digitama.findOneAndUpdate(
      { name: name },
      { $set: body },
      { new: true }
    );

    if (!updatedDigitama) {
      return NextResponse.json({ error: "Digitama not found" }, { status: 404 });
    }
    revalidateTag(name);
    return NextResponse.json(updatedDigitama, { status: 200 });
  } catch (error) {
    console.log("Error to update Digitamas", error);
    return NextResponse.json(
      { error: "Error to update Digitama" },
      { status: 500 }
    );
  }
}
