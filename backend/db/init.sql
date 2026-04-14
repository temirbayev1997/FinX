-- users
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name TEXT,
  tax_mode TEXT DEFAULT '200'
);

-- transactions
CREATE TABLE IF NOT EXISTS transactions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  type TEXT,
  amount NUMERIC,
  category TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);