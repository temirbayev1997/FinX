const fs = require("fs");
const path = require("path");
const { PDFDocument } = require("pdf-lib");

const {
  getFinanceContext
} = require("./finance.service");

async function generateForm220AI(req, res) {
  try {
    const ctx =
      await getFinanceContext();

    const year =
      new Date().getFullYear();

    const fields = [
      {
        page: 1,
        x: 120,
        y: 660,
        text: "123456789012"
      },

      {
        page: 1,
        x: 560,
        y: 628,
        text: String(year)
      },

      {
        page: 1,
        x: 520,
        y: 140,
        text: String(ctx.income)
      },

      {
        page: 4,
        x: 520,
        y: 500,
        text: String(ctx.profit)
      },

      {
        page: 4,
        x: 520,
        y: 140,
        text: String(ctx.tax)
      }
    ];

    const filePath = path.join(
      __dirname,
      "../templates/220.pdf"
    );

    const bytes =
      fs.readFileSync(filePath);

    const pdfDoc =
      await PDFDocument.load(bytes);

    const pages =
      pdfDoc.getPages();

    fields.forEach((item) => {
      const page =
        pages[item.page - 1];

      if (!page) return;

      page.drawText(
        item.text,
        {
          x: item.x,
          y: item.y,
          size: 10
        }
      );
    });

    const pdfBytes =
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
      Buffer.from(pdfBytes)
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
