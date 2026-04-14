const initDB = require("./db/initDB");
const express = require("express");
const cors = require("cors");

const taxRoutes = require("./routes/tax.routes");
const aiRoutes = require("./routes/ai.routes");
const excelRoutes = require("./routes/excel.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/tax", taxRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/excel", excelRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

async function start() {
  await initDB(); 

  app.listen(5000, () => {
    console.log("🚀 Server started");
  });
}

start();