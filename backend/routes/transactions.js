const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/", async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM transactions ORDER BY created_at DESC"
  );
  res.json(result.rows);
});

router.post("/", async (req, res) => {
  const { type, amount, category } = req.body;

  const result = await pool.query(
    "INSERT INTO transactions (type, amount, category) VALUES ($1, $2, $3) RETURNING *",
    [type, amount, category]
  );

  res.json(result.rows[0]);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  await pool.query("DELETE FROM transactions WHERE id=$1", [id]);

  res.json({ success: true });
});

module.exports = router;