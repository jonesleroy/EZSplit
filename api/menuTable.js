import express from "express";
import {
  createMenuTable,
  getMenuTableById,
  getAllMenuTables,
  getMenuTable,
} from "#db/queries/menuTable";

import requireBody from "#middleware/requireBody";
import { createToken } from "#utils/jwt";
const router = express.Router();
export default router;

// Get all menu-table entries
router.get("/", async (req, res) => {
  try {
    const menuTable = await getMenuTable();
    res.status(200).json(menuTable);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve menu tables" });
  }
});
// get menu by id (No need for post)
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const menuTable = await getMenuTableById(id);
    res.status(200).json(menuTable);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve menu table by ID" });
  }
});
router.post("/", requireBody(["menu_id", "table_id"]), async (req, res) => {
  const { menu_id, table_id } = req.body;
  try {
    const menuTable = await createMenuTable(menu_id, table_id);
    // const token = createToken(menuTable.id);  // Temporarily disabled
    res.status(201).json({ menuTable });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create menu table" });
  }
});
