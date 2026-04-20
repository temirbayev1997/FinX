const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (
 req,
 res
) => {
 try {
  const {
   full_name,
   email,
   password,
   bin_iin,
   phone,
   business_name,
   category,
   legal_address
  } = req.body;

  const check =
   await db.query(
    "SELECT * FROM users WHERE email=$1",
    [email]
   );

  if (check.rows.length) {
   return res.status(400).json({
    message: "Email занят"
   });
  }

  const hash =
   await bcrypt.hash(
    password,
    10
   );

  await db.query(
   `
   INSERT INTO users
   (
    full_name,
    email,
    password,
    bin_iin,
    phone,
    business_name,
    category,
    legal_address
   )
   VALUES
   ($1,$2,$3,$4,$5,$6,$7,$8)
   `,
   [
    full_name,
    email,
    hash,
    bin_iin,
    phone,
    business_name,
    category,
    legal_address
   ]
  );

  res.json({
   message:
    "Успешная регистрация"
  });

 } catch (error) {
  console.log(error);

  res.status(500).json({
   message:
    "Ошибка сервера"
  });
 }
};

exports.login = async (
 req,
 res
) => {
 try {
  const { email, password } =
   req.body;

  const result =
   await db.query(
    "SELECT * FROM users WHERE email=$1",
    [email]
   );

  if (!result.rows.length) {
   return res.status(400).json({
    message:
     "Нет пользователя"
   });
  }

  const user =
   result.rows[0];

  const valid =
   await bcrypt.compare(
    password,
    user.password
   );

  if (!valid) {
   return res.status(400).json({
    message:
     "Неверный пароль"
   });
  }

  const token =
   jwt.sign(
    {
     id: user.id
    },
    "secret123",
    {
     expiresIn:
      "7d"
    }
   );

  res.json({ token });

 } catch {
  res.status(500).json({
   message:
    "Ошибка входа"
  });
 }
};

exports.me = async (
 req,
 res
) => {
 const user =
  await db.query(
   `
    SELECT
      id,
      full_name,
      email,
      bin_iin,
      phone,
      business_name,
      category,
      tax_mode,
      legal_address
      FROM users
    WHERE id=$1
   `,
   [req.user.id]
  );

 res.json(user.rows[0]);
};