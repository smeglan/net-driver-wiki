import { Model } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { isAuthorized } from "@/shared/services/auth-middleware";
import { connectDB } from "@/shared/lib/database";
import { revalidateTag } from "next/cache";

export async function handleGet<T>(
  request: NextRequest,
  model: Model<T>,
  fields?: string
) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    await connectDB();
    const data = await model.find({}, fields).lean();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

export async function handleGetOne<T>(
    request: NextRequest,
    model: Model<T>,
    searchField: keyof T,
    search: string,
    populateFields?: string[] | boolean
  ) {
    if (!isAuthorized(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
      await connectDB();
      if (!search) {
        return NextResponse.json(
          { error: "Search value is required" },
          { status: 400 }
        );
      }
      const searched: Record<string, unknown> = { [searchField as string]: search };
      let query = model.findOne(searched); 
  
      if (populateFields) {
        if (populateFields === true) {
          const paths = Object.keys(model.schema.paths).filter(
            (path) =>
              model.schema.paths[path].instance === "ObjectId" ||
              model.schema.paths[path].options?.ref
          );
          paths.forEach((path) => {
            query = query.populate(path);
          });
        } else if (Array.isArray(populateFields)) {
          populateFields.forEach((field) => {
            query = query.populate(field);
          });
        }
      }
  
      const result = await query.lean();
  
      if (!result) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }
  
      return NextResponse.json(result, { status: 200 });
    } catch (error) {
      console.error("Error fetching data:", error);
      return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
    }
  }

export async function handlePost<T>(request: NextRequest, model: Model<T>) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const body: T = await request.json();
    const newData = new model(body);
    await newData.save();
    revalidateTag(model.collection.name);
    return NextResponse.json(newData, { status: 201 });
  } catch (error) {
    console.error("Error saving data:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

export async function handlePut<T>(
  request: NextRequest,
  model: Model<T>,
  searchField: keyof T,
  search: string
) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const body = await request.json();
    const filter = { [searchField]: search } as Partial<T>;
    const updatedData = await model.findOneAndUpdate(filter, body, {
      new: true,
    });

    if (!updatedData) {
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }

    revalidateTag(model.collection.name);
    return NextResponse.json(updatedData, { status: 200 });
  } catch (error) {
    console.error("Error updating data:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

export async function handlePatch<T>(
  request: NextRequest,
  model: Model<T>,
  searchField: keyof T,
  search: string
) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const body = await request.json();
    const filter = { [searchField]: search } as Partial<T>;
    const updatedData = await model.findOneAndUpdate(filter, body, {
      new: true,
    });

    if (!updatedData) {
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }

    revalidateTag(model.collection.name);
    return NextResponse.json(updatedData, { status: 200 });
  } catch (error) {
    console.error("Error updating data:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

export async function handleDelete<T>(
  request: NextRequest,
  model: Model<T>,
  searchField: keyof T,
  search: string
) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const filter = { [searchField]: search } as Partial<T>;
    const deletedData = await model.findOneAndDelete(filter);

    if (!deletedData) {
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }

    revalidateTag(model.collection.name);
    return NextResponse.json(
      { message: "Deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting data:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
