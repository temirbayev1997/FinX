const axios = require("axios");

function cleanText(text = "") {
  return text
    .replace(/^Ответ:\s*/i, "")
    .replace(/Первый вопрос:/gi, "")
    .replace(/Второй вопрос:/gi, "")
    .replace(/Третий вопрос:/gi, "")
    .trim();
}

async function generateReport(prompt) {
  try {
    const response = await axios.post(
      "http://localhost:8080/completion",
      {
        prompt,
        n_predict: 420,
        temperature: 0.2,
        top_k: 30,
        top_p: 0.9,
        stop: ["Пользователь:", "USER:"]
      }
    );

    return cleanText(response.data.content);

  } catch (err) {
    console.log(err.message);
    return "AI временно недоступен.";
  }
}

module.exports = { generateReport };