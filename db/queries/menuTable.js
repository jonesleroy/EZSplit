import db from "#db/client";
import bcrypt from "bcrypt";

export async function createMenuTable(menuId, tableId) {
  const sql = `
  INSERT INTO menu_table
    (menu_id, table_id)
  VALUES
    ($1, $2)
  RETURNING *
  `;
  const {
    rows: [menuTable],
  } = await db.query(sql, [menuId, tableId]);
  return menuTable;
}

export async function getMenuTable() {
  const sql = `
  SELECT DISTINCT menu_table.*,
    menu.items AS menu_items,
    table.table_num AS table_table_num
  FROM appointments
    JOIN menu ON menu_table.menu_id = menu.id
    JOIN table_number ON menu_table.table_id = table.id

  `;
  const { rows: appointments } = await db.query(sql);
  return appointments;
}

export async function getAllMenuTables() {
  const sql = `
  SELECT * 
  FROM menu_table
  `;
  const { rows: menuTable } = await db.query(sql);
  return menuTable;
}
export async function getMenuTableById(id) {
  const sql = `
  SELECT * 
  FROM table_number
  JOIN menu_table ON table_number.id = menu_table.table_id
  JOIN menu ON menu_table.menu_id = menu.id
  WHERE table_number.id = $1
  `;
  const { rows: menuTable } = await db.query(sql, [id]);
  return menuTable;
}
