const express = require("express");
const router = express.Router();

const { calculateTax } = require("../utils/calculate");

router.post("/calculate", (req, res) => {
  try {
    const result = calculateTax(req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Ошибка расчёта" });
  }
});

module.exports = router;