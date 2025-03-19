import mongoose, { Connection } from "mongoose";

interface MongooseCache {
  conn: Connection | null;
  promise: Promise<Connection> | null;
}

const globalWithMongoose = global as typeof globalThis & { mongoose?: MongooseCache };
const cached: MongooseCache = globalWithMongoose.mongoose || { conn: null, promise: null };

if (!globalWithMongoose.mongoose) {
  globalWithMongoose.mongoose = cached;
}

export async function connectDB(): Promise<Connection> {
  if (cached.conn) {
    console.log("✅ Usando conexión existente a MongoDB");
    return cached.conn;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error("⚠️ La variable de entorno MONGODB_URI no está definida");
  }

  try {
    console.log("🔄 Conectando a MongoDB...");
    cached.promise =
      cached.promise ||
      mongoose.connect(process.env.MONGODB_URI, {
        dbName: "myDatabase", // ⚡ Opcional: nombre de la base de datos
        bufferCommands: false,
      }).then((mongooseInstance) => mongooseInstance.connection); // 👈 Aquí convertimos el resultado a Connection

    cached.conn = await cached.promise;
    console.log("✅ Conectado a MongoDB");
    return cached.conn;
  } catch (error) {
    console.error("❌ Error conectando a MongoDB:", error);
    throw error;
  }
}