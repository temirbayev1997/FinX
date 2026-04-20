const router = require("express").Router();

const {
  generateExcel
} = require("../services/excel.service");

const {
  getFinanceContext
} = require("../services/finance.service");

router.get(
  "/download",
  async (req, res) => {
    try {
      const data =
        await getFinanceContext();

      const workbook =
        await generateExcel(
          data
        );

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );

      res.setHeader(
        "Content-Disposition",
        'attachment; filename="report.xlsx"'
      );

      await workbook.xlsx.write(
        res
      );

      res.end();

    } catch (err) {
      console.log(
        "EXCEL ERROR:",
        err
      );

      res.status(500).json({
        error:
          "Ошибка Excel"
      });
    }
  }
);

module.exports = router;