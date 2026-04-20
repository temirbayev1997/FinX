const initDB = require("./db/initDB");
const express = require("express");
const cors = require("cors");

const taxRoutes = require("./routes/tax.routes");
const aiRoutes = require("./routes/ai.routes");
const excelRoutes = require("./routes/excel.routes");
const transactionsRoutes = require("./routes/transactions");
const analyticsRoutes = require("./routes/analytics.routes");
const formsRoutes = require("./routes/forms.routes");
const clentsRoutes = require("./routes/clients.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/tax", taxRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/excel", excelRoutes);
app.use("/api/transactions", transactionsRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/forms", formsRoutes);
app.use("/api/clients", clentsRoutes);

const PORT = 5000;

async function start() {
  await initDB(); 

  app.listen(5000, () => {
    console.log("🚀 Server started");
  });
}

start();