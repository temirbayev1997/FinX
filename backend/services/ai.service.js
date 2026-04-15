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

  try {
    const response = await axios.post(
      "http://localhost:8080/v1/chat/completions",
      {
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 200,
        temperature: 0.5,
      }
    );

    return response.data.choices[0].message.content;

  } catch (err) {
    console.error("AI ERROR:", err.response?.data || err.message);
    throw err;
  }
}

module.exports = { generateReport };