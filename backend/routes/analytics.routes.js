const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        TO_CHAR(created_at, 'YYYY-MM-DD') as date,
        COALESCE(SUM(CASE WHEN type='income' THEN amount ELSE 0 END), 0) as income,
        COALESCE(SUM(CASE WHEN type='expense' THEN amount ELSE 0 END), 0) as expense
      FROM transactions
      GROUP BY date
      ORDER BY date ASC
    `);

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Ошибка аналитики" });
  }
});

router.get("/forecast", async (req, res) => {
  const result = await pool.query(`
    SELECT 
      TO_CHAR(created_at, 'YYYY-MM-DD') as date,
      SUM(CASE WHEN type='income' THEN amount ELSE 0 END) as income
    FROM transactions
    GROUP BY date
    ORDER BY date ASC
  `);

  const data = result.rows.map(r => Number(r.income));

  const avg =
    data.reduce((a, b) => a + b, 0) / (data.length || 1);

  const forecast = Math.round(avg * 30); // месяц

  res.json({ forecast });
});

module.exports = router;