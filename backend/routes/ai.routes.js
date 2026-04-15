const express = require("express");
const router = express.Router();

const pool = require("../db");
const calculate = require("../utils/calculate");
const { generateReport } = require("../services/ai.service");

router.post("/report", async (req, res) => {
  try {
    const calc = calculate(req.body);
    const report = await generateReport(calc);

    res.json({
      ...calc,
      report,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка AI" });
  }
});

router.get("/insights", async (req, res) => {
  const result = await pool.query("SELECT * FROM transactions");

  const data = calculate(result.rows, "200");

  const prompt = `
  У меня есть бизнес данные:

  Доход: ${data.income}
  Расход: ${data.expense}
  Прибыль: ${data.profit}

  Дай краткие рекомендации:
  - оптимизация расходов
  - рост прибыли
  - финансовое состояние
  `;

  const ai = await generateReport(prompt);

  res.json({ insights: ai });
});

router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const result = await pool.query("SELECT * FROM transactions");
    const data = calculate(result.rows, "200");

    const prompt = `
    Ты финансовый помощник для ИП в Казахстане.

    Данные:
    Доход: ${data.income}
    Расход: ${data.expense}
    Прибыль: ${data.profit}

    Вопрос пользователя:
    ${message}

    Ответь просто и по делу.
    `;

    const ai = await generateReport(prompt);

    res.json({ reply: ai });

  } catch (err) {
    res.status(500).json({ error: "Ошибка AI" });
  }
});

module.exports = router;