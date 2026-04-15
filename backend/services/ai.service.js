const axios = require("axios");

async function generateReport(prompt) {
  try {
    const response = await axios.post("http://localhost:8080/completion", {
      prompt: `${prompt}`, // 🔥 ОБЯЗАТЕЛЬНО
      n_predict: 200,
      temperature: 0.4,
    });

    return response.data.content;

  } catch (err) {
    console.error("AI ERROR:", err.response?.data || err.message);
    throw err;
  }
}

module.exports = { generateReport };