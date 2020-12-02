const express = require("express");
const router = express.Router();
const { asyncHandler, csrfProtection, validationResult, check } = require('../utils');
const db = require('../db/models');

const validateSignUpForm = [
  check("username")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a username")
    .isLength({ max: 15 })
    .withMessage("Username cannot be longer than 15 characters"),
  check("firstName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a first name")
    .isLength({ max: 30 })
    .withMessage("First name cannot be longer than 30 characters"),
  check("lastName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a last name")
    .isLength({ max: 30 })
    .withMessage("Last name cannot be longer than 30 characters"),
  check("email")
    .exists({ checkFalsy: true })
    .withMessage("Please provide an email")
    .isEmail()
    .withMessage("Please provide a valid email")
    .custom((value) => {
      return db.User.findOne({
        where: {
          email: value
        }
      })
        .then((user) => {
          if (user) throw new Error('The provided email is already in use by another account')
          // return Promise.reject('The provided email is already in use by another account')
        })
    }),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password"),
  check("confirmPassword")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Please make sure passwords match.")
      }
      return true;
    })
];

router.get("/sign-up", csrfProtection, asyncHandler(async (req, res) => {
  res.render("sign-up", { csrfToken: req.csrfToken() });
}));

router.post("/sign-up", validateSignUpForm, csrfProtection, asyncHandler(async (req, res) => {
  const { username, firstName, lastName, email, password } = req.body;
  console.log(username);
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const errors = validationErrors.array().map((error) => error.msg);
    const err = Error("Bad Request");
    err.status = 400;
    err.title = "Bad Request";
    err.errors = errors;
    return res.status(400).render('sign-up', { errors });
  } else {

    res.redirect("/");
  }
}));

module.exports = router;