const express = require("express");
const router = express.Router();

const pool = require("../db");
const calculate = require("../utils/calculate");
const { getFinanceContext } = require("../services/finance.service");
const { generateReport } = require("../services/ai.service");

router.post("/report", async (req, res) => {
  try {
    const ctx = await getFinanceContext();

const prompt = `

Данные бизнеса (ПОЛНЫЕ И ДОСТОВЕРНЫЕ):
Доход: ${ctx.income}
Расход: ${ctx.expense}
Прибыль: ${ctx.profit}
Налог: ${ctx.tax}
Средний чек: ${ctx.avgCheck}
Главная категория: ${ctx.topCategory}

Важно:
- данные полные и корректные
- не говори что информации недостаточно
- не проси уточнений
- анализируй только эти данные

Задача:
- оцени бизнес
- найди проблемы
- дай рекомендации
`;

    const report = await generateReport(prompt);

    res.json({
      ...ctx,
      report,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка AI" });
  }
});

router.get("/insights", async (req, res) => {
  try {
    const ctx = await getFinanceContext();

const prompt = `

Данные бизнеса (ПОЛНЫЕ И ДОСТОВЕРНЫЕ):
Доход: ${ctx.income}
Расход: ${ctx.expense}
Прибыль: ${ctx.profit}
Налог: ${ctx.tax}
Средний чек: ${ctx.avgCheck}
Главная категория: ${ctx.topCategory}

Важно:
- данные полные и корректные
- не говори что информации недостаточно
- не проси уточнений
- анализируй только эти данные

Задача:
- оцени бизнес
- найди проблемы
- дай рекомендации
`;

    const ai = await generateReport(prompt);

    res.json({ insights: ai });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка AI" });
  }
});

router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const ctx = await getFinanceContext();
    console.log("CTX DEBUG:", ctx); // 👈 ДОБАВЬ

const prompt = `

Данные бизнеса:
Доход: ${ctx.income}
Расход: ${ctx.expense}
Прибыль: ${ctx.profit}
Налог: ${ctx.tax}
Количество операций: ${ctx.transactionsCount}
Средний чек: ${ctx.avgCheck}
Главная категория расходов: ${ctx.topCategory}

Правила:
- не придумывай числа
- отвечай кратко
- используй цифры из данных

Вопрос:
${message}
`;

    const ai = await generateReport(prompt);

    res.json({ reply: ai });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка AI" });
  }
});

module.exports = router;