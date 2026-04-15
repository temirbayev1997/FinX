function calculate(transactions, mode = "200") {
  let income = 0;
  let expense = 0;

  transactions.forEach((t) => {
    if (t.type === "income") {
      income += Number(t.amount);
    } else {
      expense += Number(t.amount);
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