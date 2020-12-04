const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const {
  asyncHandler,
  csrfProtection,
  validationResult,
  check,
} = require("../utils");
const db = require("../db/models");
const { loginUser, logoutUser } = require("../auth");

async function isPassword(password, hashedPass) {
  const isPassword = await bcrypt.compare(password, hashedPass);
  return isPassword;
}

const validateLoginForm = [
  check("username")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a username")
    .isLength({ max: 15 })
    .withMessage("Username cannot be longer than 15 characters"),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password"),
];

const validateSignUpForm = [
  check("username")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a username")
    .isLength({ max: 15 })
    .withMessage("Username cannot be longer than 15 characters")
    .custom((value) => {
      return db.User.findOne({
        where: {
          username: value,
        },
      }).then((user) => {
        if (user)
          throw new Error(
            "The provided username is already in use by another account"
          );
      });
    }),
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
          email: value,
        },
      }).then((user) => {
        if (user)
          throw new Error(
            "The provided email is already in use by another account"
          );
      });
    }),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password"),
  check("confirmPassword")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Please make sure passwords match.");
      }
      return true;
    }),
];

const validate = (validationErrors, res, req, moreErrors) => {
  const errors = validationErrors.array().map((error) => error.msg);
  const err = Error("Bad Request");
  err.status = 400;
  err.title = "Bad Request";
  err.errors = errors;
  if (moreErrors) {
    errors.push(moreErrors);
  }
  return res
    .status(400)
    .render("login", { errors, csrfToken: req.csrfToken(), req });
};

router.get(
  "/sign-up",
  csrfProtection,
  asyncHandler(async (req, res) => {
    res.render("sign-up", { csrfToken: req.csrfToken(), req });
  })
);

router.post(
  "/sign-up",
  validateSignUpForm,
  csrfProtection,
  asyncHandler(async (req, res) => {
    const { username, firstName, lastName, email, password } = req.body;
    console.log(username);
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      const errors = validationErrors.array().map((error) => error.msg);
      const err = Error("Bad Request");
      err.status = 400;
      err.title = "Bad Request";
      err.errors = errors;
      return res
        .status(400)
        .render("sign-up", { errors, csrfToken: req.csrfToken(), req });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await db.User.create({
        username,
        firstName,
        lastName,
        email,
        hashedPassword,
      });
      loginUser(req, res, newUser);
      res.redirect("/");
    }
  })
);

router.get(
  "/login",
  csrfProtection,
  asyncHandler(async (req, res) => {
    res.render("login", { csrfToken: req.csrfToken(), req });
  })
);

router.post(
  "/login",
  validateLoginForm,
  csrfProtection,
  asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      validate(validationErrors, res, req);
    } else {
      const user = await db.User.findOne({ where: { username } });
      if (
        user &&
        (await isPassword(password, user.hashedPassword.toString()))
      ) {
        loginUser(req, res, user);
        console.log("pass is correct");
        res.redirect("/");
      } else {
        validate(
          validationErrors,
          res,
          req,
          "Please re-enter your credentials"
        );
      }
    }
  })
);

router.post(
  "/logout",
  asyncHandler(async (req, res) => {
    const { userId } = req.session.auth;
    const user = await db.User.findByPk(userId);
    logoutUser(req, res, user);
    res.redirect("/users/login");
  })
);
// get a current logged in users profile
router.get("/profile/:id(\\d+)");

// update something on a users profile
router.post(
  "/update",
  csrfProtection,
  asyncHandler(async (req, res) => {
    const user = await db.User.findByPk(req.session.auth.userId)
    const { firstName, lastName, username, email } = req.body;
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (username) user.username = username;
    if (email) user.email = email;
    await user.save();
    res.redirect("/profile");
  })
);

router.post("/delete", asyncHandler(async (req, res) => {
  const user = await db.User.findByPk(req.session.auth.userId);
  const userPosts = await db.Post.findAll({ where: { authorId: req.session.auth.userId } });
  logoutUser(req, res, user);
  userPosts.forEach(async (post) => await post.destroy());
  await user.destroy();
  res.redirect("/")
}));

router.post("/createbio", csrfProtection, asyncHandler(async (req, res) => {
  const { newBio } = req.body;
  const user = await db.User.findByPk(req.session.auth.userId);
  user.bio = newBio;
  await user.save();
  res.redirect("/profile");
}))

router.post("/deleteBio", csrfProtection, asyncHandler(async (req, res) => {
  const user = await db.User.findByPk(req.session.auth.userId);
  user.bio = '';
  await user.save();
  res.redirect("/profile");
}));

module.exports = router;
