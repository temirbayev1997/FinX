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

module.exports = router;