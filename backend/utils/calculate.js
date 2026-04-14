function calculateTax(data) {
  const { income, expense, mode } = data;

  let profit = income - expense;
  let tax = 0;

  if (mode === "200") {
    tax = income * 0.03;
  } else if (mode === "220") {
    tax = profit * 0.1;
  }

  return {
    income,
    expense,
    profit,
    tax,
  };
}

module.exports = { calculateTax };