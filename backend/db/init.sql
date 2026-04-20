-- users
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,

    full_name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password TEXT,
    bin_iin VARCHAR(20) UNIQUE,

    phone VARCHAR(30),
    business_name VARCHAR(255),
    category VARCHAR(100),
    tax_mode VARCHAR(100),
    legal_address VARCHAR(255),

    created_at TIMESTAMP DEFAULT NOW()
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

CREATE TABLE IF NOT EXISTS clients (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  phone VARCHAR(100),
  total NUMERIC DEFAULT 0,
  debt NUMERIC DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);