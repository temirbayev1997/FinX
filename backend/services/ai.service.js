const axios = require("axios");

async function generateReport(data) {
  const prompt = `
Ты помощник для ИП в Казахстане.

Данные:
Доход: ${data.income}
Расход: ${data.expense}
Прибыль: ${data.profit}
Налог: ${data.tax}

Сделай коротко:

Отчёт:
- ...

Рекомендации:
1.
2.

Не придумывай числа.
Пиши просто и понятно.
`;

  const response = await axios.post("http://localhost:8080/completion", {
    prompt,
    temperature: 0.5,
    n_predict: 150,
    stop: ["</s>"],
  });

  return response.data.content;
}

module.exports = { generateReport };