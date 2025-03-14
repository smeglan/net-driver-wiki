import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

//routes
import digimon from "./api/digimon";
import item from "./api/item";
import quest from "./api/quest";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/digimon", digimon);
app.use("/item", item);
app.use("/quest", quest);

// MongoDB conection
mongoose
  .connect(process.env.MONGO_URI as string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as mongoose.ConnectOptions)
  .then(() => console.log("🔥 Conectado a MongoDB"))
  .catch((error) => console.error("❌ Error en la conexión a MongoDB:", error));

app.get("/", (_req:any, res:any) => res.send("Hola"));

// Start server 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor en http://localhost:${PORT}`));