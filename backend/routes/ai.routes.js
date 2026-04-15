const express = require("express");
const router = express.Router();

const { calculateTax } = require("../utils/calculate");
const { generateReport } = require("../services/ai.service");

router.post("/report", async (req, res) => {
  try {
    const calc = calculateTax(req.body);
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

  const ai = await generateAI(prompt);

  res.json({ insights: ai });
});

module.exports = router;