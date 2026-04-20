const router = require("express").Router();

const {
  register,
  login,
  me
} = require("../services/auth.service");

const authMiddleware =
require("../middleware/auth.middleware");

router.post("/register", register);
router.post("/login", login);
router.get("/me", authMiddleware, me);

module.exports = router;