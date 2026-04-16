function calculate(transactions, mode = "200") {
  let income = 0;
  let expense = 0;

  transactions.forEach((t) => {
    const type = String(t.type).toLowerCase().trim();
    const amount = Number(String(t.amount).replace(/\s/g, ""));

    if (type === "income") {
      income += amount;
    } else if (type === "expense") {
      expense += amount;
    }
  });

  const profit = income - expense;

  const tax =
    mode === "200"
      ? income * 0.03
      : profit * 0.1;

  return { income, expense, profit, tax };
}

module.exports = calculate;