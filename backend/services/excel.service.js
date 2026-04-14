const ExcelJS = require("exceljs");

async function generateExcel(data) {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Отчёт");

  sheet.columns = [
    { header: "Показатель", key: "name", width: 25 },
    { header: "Значение", key: "value", width: 20 },
  ];

  sheet.addRows([
    { name: "Доход", value: data.income },
    { name: "Расход", value: data.expense },
    { name: "Прибыль", value: data.profit },
    { name: "Налог", value: data.tax },
    { name: "Режим", value: data.mode },
  ]);

  return workbook;
}

module.exports = { generateExcel };