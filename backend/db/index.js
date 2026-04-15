const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  user: "postgres",
  password: "1234",
  database: "finance_ai",
  port: 5432,
});

module.exports = pool;