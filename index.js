import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

//routes
//import digimon from "./src/api/digimon";
import item from "./src/api/item";
import quest from "./src/api/quest";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/digimon", digimon);
app.use("/item", item);
app.use("/quest", quest);

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => console.log("🔥 Conectado a MongoDB"));

app.get("/", (_req, res) => res.send("Hola"));

// Start server 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor en http://localhost:${PORT}`));