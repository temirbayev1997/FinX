const express = require("express");
const router = express.Router();
const db = require("../db");

const AI_URL = process.env.AI_URL || "http://localhost:8080";

router.post("/analyze", async (req, res) => {
  try {
    const data = await db.query("SELECT * FROM transactions");

    const income = data.rows
      .filter(t => t.type === "income")
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const expenses = data.rows
      .filter(t => t.type === "expense")
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const profit = income - expenses;

    const prompt = `
    У меня есть ИП.

    Доход: ${income} тг
    Расход: ${expenses} тг
    Прибыль: ${profit} тг

    Дай краткий анализ и советы.
    `;

    const response = await fetch(AI_URL + "/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messages: [{ role: "user", content: prompt }]
      })
    });

    const aiData = await response.json();

    res.json({
      income,
      expenses,
      profit,
      ai: aiData.choices[0].message.content
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI error" });
  }
});

module.exports = router;