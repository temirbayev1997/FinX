const express = require("express");
const router = express.Router();

const { calculateTax } = require("../utils/calculate");
const { generateExcel } = require("../services/excel.service");

router.post("/download", async (req, res) => {
  try {
    const data = calculateTax(req.body);
    const workbook = await generateExcel({ ...data, mode: req.body.mode });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=report.xlsx"
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    console.error(err);
    res.status(500).send("Ошибка Excel");
  }
});

module.exports = router;