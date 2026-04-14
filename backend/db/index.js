const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  user: "user",
  password: "password",
  database: "finance",
  port: 5432,
});

module.exports = pool;