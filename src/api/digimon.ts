import { Router } from "express";
import { DigimonModel } from "../models/digimon.model";

const router = Router();

// 🟢 Create a Digimon
router.post("/", async (req: any, res: any) => {
  try {
    const newDigimon = new DigimonModel(req.body);
    await newDigimon.save();
    res.status(201).json(newDigimon);
  } catch (error) {
    res.status(500).json({ error: "Error to save Digimon" });
  }
});

// 🔵 Obtener todos los Digimon
router.get("/", async (_req: any, res: any) => {
  try {
    const digimons = await DigimonModel.find();
    res.json(digimons);
  } catch (error) {
    res.status(500).json({ error: "Error to get Digimons" });
  }
});

// 🟡 Obtener un Digimon por ID
router.get("/:name", async (req: any, res: any) => {
  try {
    const digimon = await DigimonModel.findOne({name:req.params.name});
    if (!digimon) return res.status(404).json({ error: "Not found" });
    res.json(digimon);
  } catch (error) {
    res.status(500).json({ error: "Error to get Digimon" });
  }
});

// 🟠 Actualizar un Digimon
router.put("/:id", async (req: any, res:any) => {
  try {
    const updatedDigimon = await DigimonModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedDigimon) return res.status(404).json({ error: "No encontrado" });
    res.json(updatedDigimon);
  } catch (error) {
    res.status(500).json({ error: "Error to update Digimon" });
  }
});

// 🔴 Eliminar un Digimon
router.delete("/:id", async (req: any, res: any) => {
  try {
    await DigimonModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Digimon eliminado" });
  } catch (error) {
    res.status(500).json({ error: "Error to delete Digimon" });
  }
});

export default router;