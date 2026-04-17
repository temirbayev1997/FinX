const pool = require("../db");
const calculate = require("../utils/calculate");

async function getFinanceContext() {
  const result = await pool.query(
    "SELECT * FROM transactions"
  );

  const rows = result.rows || [];

  const data = calculate(rows, "220");

  const categories = {};

  rows.forEach((item) => {
    const category =
      item.category || "Другое";

    if (!categories[category]) {
      categories[category] = 0;
    }

    categories[category] += Number(
      item.amount || 0
    );
  });

  const sortedCategories =
    Object.entries(categories).sort(
      (a, b) => b[1] - a[1]
    );

  const topCategory =
    sortedCategories[0]?.[0] ||
    "Нет данных";

  const transactionsCount =
    rows.length;

  const avgCheck =
    data.income > 0 &&
    transactionsCount > 0
      ? Math.round(
          data.income /
            transactionsCount
        )
      : 0;

  const profitMargin =
    data.income > 0
      ? (
          (data.profit /
            data.income) *
          100
        ).toFixed(1)
      : 0;

  const expenseRatio =
    data.income > 0
      ? (
          (data.expense /
            data.income) *
          100
        ).toFixed(1)
      : 0;

  const riskLevel =
    data.profit < 0
      ? "high"
      : expenseRatio > 70
      ? "medium"
      : "low";

  return {
    income: data.income || 0,
    expense: data.expense || 0,
    profit: data.profit || 0,
    tax:
      data.totalTax ||
      data.tax ||
      0,

    topCategory,
    categories:
      sortedCategories,

    transactionsCount,
    avgCheck,
    profitMargin,
    expenseRatio,
    riskLevel
  };
}

module.exports = {
  getFinanceContext
};