import { Router } from "express";
import { QuestModel } from "../models/quest.model";

const router = Router();

// 🟢 Create a Quest
router.post("/", async (req: any, res: any) => {
  try {
    const newQuest = new QuestModel(req.body);
    await newQuest.save();
    res.status(201).json(newQuest);
  } catch (error) {
    res.status(500).json({ error: "Error to save Quest" });
  }
});

// 🔵 Get all Quests
router.get("/", async (_req: any, res: any) => {
  const quests = await QuestModel.find();
  res.json(quests);
});

// 🟡 Obtener un Quest por ID
router.get("/:name", async (req: any, res: any) => {
  try {
    const quest = await QuestModel.findOne({name:req.params.name});
    if (!quest) return res.status(404).json({ error: "Not found" });
    res.json(quest);
  } catch (error) {
    res.status(500).json({ error: "Error to get Quest" });
  }
});

// 🟠 Actualizar un Quest
router.put("/:id", async (req: any, res:any) => {
  try {
    const updatedQuest = await QuestModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedQuest) return res.status(404).json({ error: "No encontrado" });
    res.json(updatedQuest);
  } catch (error) {
    res.status(500).json({ error: "Error to update Quest" });
  }
});

// 🔴 Eliminar un Quest
router.delete("/:id", async (req: any, res: any) => {
  try {
    await QuestModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Quest eliminado" });
  } catch (error) {
    res.status(500).json({ error: "Error to delete Quest" });
  }
});

export default router;