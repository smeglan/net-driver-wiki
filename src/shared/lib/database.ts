import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
  throw new Error("❌ MONGO_URI is not defined in environment variables.");
}

// Definir una interfaz para la caché de la conexión
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Usar `globalThis` en lugar de `var`
const globalCache = globalThis as unknown as { mongooseCache?: MongooseCache };
globalCache.mongooseCache = globalCache.mongooseCache ?? { conn: null, promise: null };

export async function connectDB(): Promise<typeof mongoose> {
  try {
    if (globalCache.mongooseCache!.conn) {
      console.log("🟢 Using existing MongoDB connection.");
      return globalCache.mongooseCache!.conn;
    }

    if (!globalCache.mongooseCache!.promise) {
      console.log("🔄 Connecting to MongoDB...");
      globalCache.mongooseCache!.promise = mongoose.connect(MONGO_URI, {
        bufferCommands: false,
      });
    }

    globalCache.mongooseCache!.conn = await globalCache.mongooseCache!.promise;
    console.log("✅ Connected to MongoDB!");

    return globalCache.mongooseCache!.conn;
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    throw new Error("Failed to connect to MongoDB");
  }
}
