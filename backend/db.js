const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost", // 🔥 поменяй сюда
  database: "finance_ai",
  password: "1234",
  port: 5432,
});

module.exports = pool;