const express = require("express");
const router = express.Router();

const pool = require("../db");
const calculate = require("../utils/calculate");
const { getFinanceContext } = require("../services/finance.service");
const { generateReport } = require("../services/ai.service");

const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 3600 });

router.post("/report", async (req, res) => {
  try {
    const ctx = await getFinanceContext();

const prompt = `
Ты финансовый аналитик для ИП Казахстана.

Проанализируй бизнес подробно:

Доход: ${ctx.income}
Расход: ${ctx.expense}
Прибыль: ${ctx.profit}
Налог: ${ctx.tax}

Дай:
1. Общую оценку
2. Финансовое состояние
3. Риски
4. План роста
5. Рекомендации
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
    if (cache.has("insights")) {
      return res.json(cache.get("insights"));
    }

    const ctx = await getFinanceContext();

    const prompt = `
Ты финансовый консультант для ИП Казахстана.

Данные:
Доход: ${ctx.income} тг
Расход: ${ctx.expense} тг
Прибыль: ${ctx.profit} тг
Налог: ${ctx.tax} тг
Средний чек: ${ctx.avgCheck} тг
Маржинальность: ${ctx.profitMargin}%
Доля расходов: ${ctx.expenseRatio}%
Риск: ${ctx.riskLevel}
Топ категория: ${ctx.topCategory}

Дай:
📈 2 вывода
⚠️ 2 риска
💡 3 совета

Максимум 7 строк.
`;

    const ai = await generateReport(prompt);

    const result = { insights: ai };

    cache.set("insights", result);

    res.json(result);

  } catch (err) {
    res.json({
      insights: "AI временно недоступен"
    });
  }
});

router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const ctx = await getFinanceContext();
    console.log("CTX DEBUG:", ctx); // 👈 ДОБАВЬ

const prompt = `
Ты финансовый консультант Казахстана.

Данные бизнеса:
Доход: ${ctx.income}
Расход: ${ctx.expense}
Прибыль: ${ctx.profit}
Налог: ${ctx.tax}
Операций: ${ctx.transactionsCount}
Средний чек: ${ctx.avgCheck}

Правила:
- Отвечай только на вопрос пользователя
- Не придумывай новые вопросы
- Не пиши "Первый вопрос"
- Не делай список из 7 пунктов без просьбы
- Ответ до 5 строк
- Конкретно и полезно

Вопрос пользователя:
${message}

Ответ:
`;

    const ai = await generateReport(prompt);

    res.json({ reply: ai });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка AI" });
  }
});

module.exports = router;