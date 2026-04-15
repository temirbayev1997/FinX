const pool = require("../db");
const calculate = require("../utils/calculate");

async function getFinanceContext() {
  const result = await pool.query("SELECT * FROM transactions");

  const data = calculate(result.rows, "200");

  const categories = {};

  result.rows.forEach(t => {
    if (!categories[t.category]) categories[t.category] = 0;
    categories[t.category] += Number(t.amount);
  });

  const sortedCategories = Object.entries(categories)
    .sort((a, b) => b[1] - a[1]);

  const topCategory = sortedCategories[0]?.[0];

  const transactionsCount = result.rows.length;

  const avgCheck =
    transactionsCount > 0
      ? data.income / transactionsCount
      : 0;

  const profitMargin =
    data.income > 0 ? (data.profit / data.income) * 100 : 0;

  const expenseRatio =
    data.income > 0 ? (data.expense / data.income) * 100 : 0;

  const riskLevel =
    data.profit < 0
      ? "high"
      : expenseRatio > 70
      ? "medium"
      : "low";

  return {
    income: data.income,
    expense: data.expense,
    profit: data.profit,
    tax: data.totalTax || data.tax,

    topCategory,
    categories: sortedCategories,

    transactionsCount,
    avgCheck,

    profitMargin,
    expenseRatio,
    riskLevel
  };
}

module.exports = { getFinanceContext };