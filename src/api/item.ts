import { Router } from "express";
import { ItemModel } from "../models/item.model";

const router = Router();

// 🟢 Create a Item
router.post("/", async (req: any, res: any) => {
  try {
    const newItem = new ItemModel(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: "Error to save Item" });
  }
});

// 🔵 Obtener todos los Item
router.get("/", async (_req: any, res: any) => {
  const items = await ItemModel.find();
  res.json(items);
});

// 🟡 Obtener un Item por ID
router.get("/:name", async (req: any, res: any) => {
  try {
    const item = await ItemModel.findOne({name:req.params.name});
    if (!item) return res.status(404).json({ error: "Not found" });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: "Error to get item" });
  }
});

// 🟠 Actualizar un Item
router.put("/:id", async (req: any, res:any) => {
  try {
    const updatedItem = await ItemModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedItem) return res.status(404).json({ error: "No encontrado" });
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: "Error to update Item" });
  }
});

// 🔴 Eliminar un Item
router.delete("/:id", async (req: any, res: any) => {
  try {
    await ItemModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Item eliminado" });
  } catch (error) {
    res.status(500).json({ error: "Error to delete Item" });
  }
});

export default router;