const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "1234",
  database: "finance_ai",
  port: 5432,
  connectionTimeoutMillis: 3000
});

module.exports = pool;