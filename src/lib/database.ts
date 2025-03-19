import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("MONGO_URI is not defined in environment variables.");
}

// Definir una interfaz para la caché de la conexión
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Usar una variable global tipada en TypeScript
declare global {
  var mongooseCache: MongooseCache | undefined;
}

// Inicializar la caché si no existe
const cached: MongooseCache = global.mongooseCache ?? { conn: null, promise: null };

export async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  console.log("🔌 Connected to MongoDB");

  global.mongooseCache = cached;

  return cached.conn;
}
