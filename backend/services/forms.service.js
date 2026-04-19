const fs = require("fs");
const path = require("path");
const { PDFDocument, StandardFonts } = require("pdf-lib");

const { getFinanceContext } = require("./finance.service");

function money(value = 0) {
  return Number(value || 0).toLocaleString("ru-RU");
}

function drawField(page, font, item) {
  page.drawText(String(item.text), {
    x: item.x,
    y: item.y,
    size: item.size || 10,
    font
  });
}

/* =========================
   AI / SMART LOGIC 220
========================= */

function calcTaxableIncome(ctx) {
  const income = Number(ctx.income || 0);
  const expense = Number(ctx.expense || 0);

  return Math.max(0, income - expense);
}

function calcTax(ctx) {
  const taxable = calcTaxableIncome(ctx);

  return Math.round(taxable * 0.1);
}

function calcRiskLevel(ctx) {
  const income = Number(ctx.income || 0);
  const expense = Number(ctx.expense || 0);

  if (income === 0) return "HIGH";
  if (expense > income) return "HIGH";
  if (expense > income * 0.7) return "MEDIUM";

  return "LOW";
}

function build220Fields(ctx, fake, year) {
  const taxableIncome =
    calcTaxableIncome(ctx);

  const tax =
    calcTax(ctx);

  const risk =
    calcRiskLevel(ctx);

  return [
    // ======================
    // PAGE 1
    // ======================

    // ИИН
    {
      page: 1,
      x: 108,
      y: 690,
      text: fake.iin,
      size: 9
    },

    // Год
    {
      page: 1,
      x: 495,
      y: 652,
      text: year,
      size: 10
    },

    // ФИО
    {
      page: 1,
      x: 160,
      y: 622,
      text: fake.fio,
      size: 10
    },

    // Доход
    {
      page: 1,
      x: 670,
      y: 38,
      text: money(ctx.income),
      size: 9
    },

    // ======================
    // PAGE 2
    // ======================

    // Общий доход
    {
      page: 2,
      x: 670,
      y: 575,
      text: money(ctx.income),
      size: 9
    },

    // Расходы
    {
      page: 2,
      x: 670,
      y: 185,
      text: money(ctx.expense),
      size: 9
    },

    // ======================
    // PAGE 3
    // ======================

    // Итого вычеты
    {
      page: 3,
      x: 670,
      y: 120,
      text: money(ctx.expense),
      size: 9
    },

    // ======================
    // PAGE 4
    // ======================

    // Налогооблагаемый доход
    {
      page: 4,
      x: 670,
      y: 500,
      text: money(taxableIncome),
      size: 9
    },

    // Ставка
    {
      page: 4,
      x: 720,
      y: 145,
      text: "10",
      size: 9
    },

    // Налог
    {
      page: 4,
      x: 670,
      y: 110,
      text: money(tax),
      size: 9
    },

    // ======================
    // PAGE 5
    // ======================

    // Итоговый налог
    {
      page: 5,
      x: 670,
      y: 655,
      text: money(tax),
      size: 9
    },

    // Код органа
    {
      page: 5,
      x: 520,
      y: 165,
      text: fake.taxCode,
      size: 9
    },

    // AI риск-анализ
    {
      page: 5,
      x: 120,
      y: 120,
      text: "RISK: " + risk,
      size: 9
    }
  ];
}

async function generateForm220AI(req, res) {
  try {
    const ctx =
      await getFinanceContext();

    const year =
      new Date().getFullYear();

    const fake = {
      iin: "123456789012",
      fio: "TEST USER",
      taxCode: "6001"
    };

    const filePath = path.join(
      __dirname,
      "../templates/220.pdf"
    );

    const pdfBytes =
      fs.readFileSync(filePath);

    const pdfDoc =
      await PDFDocument.load(
        pdfBytes
      );

    const font =
      await pdfDoc.embedFont(
        StandardFonts.Helvetica
      );

    const pages =
      pdfDoc.getPages();

    const fields =
      build220Fields(
        ctx,
        fake,
        year
      );

    fields.forEach((item) => {
      const page =
        pages[item.page - 1];

      if (!page) return;

      drawField(
        page,
        font,
        item
      );
    });

    const result =
      await pdfDoc.save();

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=form220.pdf"
    );

    res.send(
      Buffer.from(result)
    );

  } catch (err) {
    console.log(
      "FORM ERROR:",
      err
    );

    res.status(500).json({
      error:
        "Ошибка генерации формы"
    });
  }
}

module.exports = {
  generateForm220AI
};