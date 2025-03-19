import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("⚠️ La variable de entorno MONGODB_URI no está definida.");
}

let cached = (global as any).mongoose || { conn: null, promise: null };

export async function connectDB() {
  try {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
      cached.promise = mongoose
        .connect(MONGODB_URI, {
          dbName: "net_driver_wiki",
          bufferCommands: false,
        })
        .then((mongoose) => mongoose);
    }
    cached.conn = await cached.promise;
    console.log("✅ Conectado a MongoDB");
    return cached.conn;
  } catch (error) {
    console.error("❌ Error al conectar a MongoDB:", error);
    throw new Error("Error al conectar a la base de datos");
  }
}
