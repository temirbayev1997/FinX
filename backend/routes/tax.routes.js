const express = require("express");
const router = express.Router();
const pool = require("../db");
const calculate = require("../utils/calculate");

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM transactions");

    const data = calculate(result.rows, "200");

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Ошибка расчёта" });
  }
});

module.exports = router;