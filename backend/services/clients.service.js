const pool = require("../db");

async function getClients() {
  const result = await pool.query(`
    SELECT *,
    TO_CHAR(created_at,'YYYY-MM-DD') as "lastDeal"
    FROM clients
    ORDER BY id DESC
  `);

  return result.rows;
}

async function createClient(data) {
  const {
    name,
    company,
    phone,
    total,
    debt
  } = data;

  const result = await pool.query(
    `
    INSERT INTO clients
    (name, company, phone, total, debt)
    VALUES ($1,$2,$3,$4,$5)
    RETURNING *
    `,
    [
      name,
      company,
      phone,
      total || 0,
      debt || 0
    ]
  );

  return result.rows[0];
}

async function deleteClient(id) {
  await pool.query(
    "DELETE FROM clients WHERE id=$1",
    [id]
  );
}

module.exports = {
  getClients,
  createClient,
  deleteClient
};