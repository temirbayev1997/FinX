const ExcelJS =
  require("exceljs");

async function generateExcel(
  data
) {
  const workbook =
    new ExcelJS.Workbook();

  workbook.creator =
    "FinAI System";

  workbook.created =
    new Date();

  /* =========================
     SHEET 1 DASHBOARD
  ========================= */

  const ws =
    workbook.addWorksheet(
      "Dashboard",
      {
        views: [
          {
            showGridLines:
              false
          }
        ]
      }
    );

  ws.columns = [
    { width: 22 },
    { width: 18 },
    { width: 18 },
    { width: 18 },
    { width: 18 },
    { width: 18 }
  ];

  /* TITLE */
  ws.mergeCells("A1:F2");

  ws.getCell("A1").value =
    "Аналитический отчёт";

  ws.getCell("A1").font = {
    size: 22,
    bold: true,
    color: {
      argb: "FFFFFF"
    }
  };

  ws.getCell("A1").alignment =
    {
      horizontal:
        "center",
      vertical:
        "middle"
    };

  ws.getCell("A1").fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: {
      argb: "1D4ED8"
    }
  };

  /* KPI BOXES */
  const cards = [
    {
      row: 4,
      title: "Доход",
      value:
        data.income || 0,
      color:
        "16A34A"
    },
    {
      row: 7,
      title: "Расход",
      value:
        data.expense ||
        0,
      color:
        "DC2626"
    },
    {
      row: 10,
      title: "Прибыль",
      value:
        data.profit || 0,
      color:
        "2563EB"
    },
    {
      row: 13,
      title: "Налог",
      value:
        data.tax || 0,
      color:
        "F59E0B"
    }
  ];

  cards.forEach(
    (item) => {
      ws.mergeCells(
        `A${item.row}:B${item.row}`
      );

      ws.mergeCells(
        `A${
          item.row + 1
        }:B${
          item.row + 1
        }`
      );

      ws.getCell(
        `A${item.row}`
      ).value =
        item.title;

      ws.getCell(
        `A${
          item.row + 1
        }`
      ).value =
        Number(
          item.value
        ).toLocaleString(
          "ru-RU"
        ) + " ₸";

      [
        `A${item.row}`,
        `A${
          item.row + 1
        }`
      ].forEach(
        (cell) => {
          ws.getCell(
            cell
          ).fill = {
            type:
              "pattern",
            pattern:
              "solid",
            fgColor:
              {
                argb:
                  item.color
              }
          };

          ws.getCell(
            cell
          ).font = {
            bold: true,
            color: {
              argb:
                "FFFFFF"
            },
            size:
              cell.includes(
                item.row +
                  1
              )
                ? 16
                : 12
          };

          ws.getCell(
            cell
          ).alignment = {
            horizontal:
              "center",
            vertical:
              "middle"
          };
        }
      );
    }
  );

  /* STATUS */
  ws.mergeCells(
    "D4:F8"
  );

  ws.getCell("D4").value =
    `СТАТУС БИЗНЕСА

${
  data.profit > 0
    ? "🟢 Рост"
    : "🔴 Риск"
}

Маржа:
${
  data.income > 0
    ? (
        (data.profit /
          data.income) *
        100
      ).toFixed(1)
    : 0
}%

Режим:
${
  data.mode ||
  "Упрощёнка"
}`;

  ws.getCell("D4").alignment =
    {
      wrapText: true,
      vertical:
        "middle"
    };

  ws.getCell("D4").font = {
    size: 14,
    bold: true
  };

  ws.getCell("D4").fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: {
      argb: "E5E7EB"
    }
  };

  /* MINI BAR */
  ws.getCell("D10").value =
    "Доход";

  ws.getCell("D11").value =
    "Расход";

  ws.getCell("D12").value =
    "Прибыль";

  ws.getCell("E10").value =
    data.income || 0;

  ws.getCell("E11").value =
    data.expense || 0;

  ws.getCell("E12").value =
    data.profit || 0;

  [
    "E10",
    "E11",
    "E12"
  ].forEach((c) => {
    ws.getCell(c).numFmt =
      "#,##0";
  });

  ws.addConditionalFormatting(
    {
      ref: "E10:E12",
      rules: [
        {
          type:
            "dataBar",
          cfvo: [
            {
              type:
                "min"
            },
            {
              type:
                "max"
            }
          ],
          color:
            "60A5FA"
        }
      ]
    }
  );

  /* AI BLOCK */
  ws.mergeCells(
    "D14:F17"
  );

  ws.getCell("D14").value =
    `AI РЕКОМЕНДАЦИИ

• Снизить постоянные расходы
• Увеличить продажи
• Контролировать налоговые выплаты`;

  ws.getCell("D14").alignment =
    {
      wrapText: true,
      vertical:
        "top"
    };

  ws.getCell("D14").fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: {
      argb: "DBEAFE"
    }
  };

  ws.getCell("D14").font = {
    size: 12
  };

  /* =========================
     SHEET 2 TRANSACTIONS
  ========================= */

  const tx =
    workbook.addWorksheet(
      "Transactions"
    );

  tx.columns = [
    {
      header: "Дата",
      key: "date",
      width: 18
    },
    {
      header: "Тип",
      key: "type",
      width: 16
    },
    {
      header:
        "Категория",
      key:
        "category",
      width: 24
    },
    {
      header:
        "Сумма",
      key:
        "amount",
      width: 18
    }
  ];

  tx.getRow(1).font = {
    bold: true
  };

  if (
    Array.isArray(
      data.transactions
    )
  ) {
    tx.addRows(
      data.transactions
    );
  }

  /* =========================
     SHEET 3 AI REPORT
  ========================= */

  const ai =
    workbook.addWorksheet(
      "AI Report"
    );

  ai.mergeCells("A1:E2");

  ai.getCell("A1").value =
    "AI BUSINESS REPORT";

  ai.getCell("A1").font = {
    size: 20,
    bold: true
  };

  ai.addRows([
    [],
    [],
    [
      "Показатель",
      "Значение"
    ],
    [
      "Статус",
      data.profit > 0
        ? "Рост"
        : "Риск"
    ],
    [
      "Маржа",
      data.income > 0
        ? (
            (data.profit /
              data.income) *
            100
          ).toFixed(1) +
          "%"
        : "0%"
    ],
    [
      "Совет",
      "Сократить расходы"
    ]
  ]);

  return workbook;
}

module.exports = {
  generateExcel
};