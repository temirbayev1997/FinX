const express = require("express");
const router = express.Router();

const {
  generateForm220AI
} = require("../services/forms.service");

router.get("/220-ai", generateForm220AI);

module.exports = router;