const express = require("express");
const router = express.Router();
const { asyncHandler, csrf, csrfProtection } = require('../utils');


router.get("/", csrfProtection, asyncHandler(async (req, res) => {
  res.render("sign-up", { csrfToken: req.csrfToken() });
}));

router.post("/", csrfProtection, asyncHandler(async (req, res) => {
  const { } = req.body;
}));

module.exports = router;