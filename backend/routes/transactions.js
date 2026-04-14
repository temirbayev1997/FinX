const express = require("express");
const router = express.Router();
const db = require("../db");

// получить все
router.get("/", async (req, res) => {
  const result = await db.query("SELECT * FROM transactions ORDER BY created_at DESC");
  res.json(result.rows);
});

// добавить
router.post("/", async (req, res) => {
  const { type, amount, category } = req.body;

  const result = await db.query(
    "INSERT INTO transactions (type, amount, category) VALUES ($1, $2, $3) RETURNING *",
    [type, amount, category]
  );

  res.json(result.rows[0]);
});

module.exports = router;