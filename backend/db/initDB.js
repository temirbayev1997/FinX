const fs = require("fs");
const path = require("path");
const pool = require("../db");

async function waitForDB(retries = 5) {
  while (retries) {
    try {
      await pool.query("SELECT 1");
      console.log("✅ Postgres готов");
      return;
    } catch (err) {
      console.log("⏳ Ждём БД...");
      await new Promise((r) => setTimeout(r, 2000));
      retries--;
    }
  }
  throw new Error("❌ БД не запустилась");
}

async function initDB() {
  try {
    await waitForDB(); 

    const sql = fs.readFileSync(
      path.join(__dirname, "init.sql"),
      "utf-8"
    );

    await pool.query(sql);

    console.log("✅ БД инициализирована");
  } catch (err) {
    console.error("❌ Ошибка БД:", err);
  }
}

module.exports = initDB;