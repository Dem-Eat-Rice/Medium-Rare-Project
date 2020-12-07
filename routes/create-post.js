const express = require("express");
const router = express.Router();
const {
  asyncHandler,
  validationResult,
  csrfProtection,
  check,
} = require("../utils");
const db = require("../db/models");

const { Post, User } = db;

const validateNewPostForm = [
  check("postTitle")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a Title for your story"),
  check("createNewPostTextArea")
    .exists({ checkFalsy: true })
    .withMessage("Please provide text for your post"),
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
    .render("create-post", { errors, csrfToken: req.csrfToken(), req });
};

router.get(
  "/",
  csrfProtection,
  asyncHandler(async (req, res) => {
    console.log("hi");
    res.render("create-post", {
      req,
      title: "Create Post",
      csrfToken: req.csrfToken(),
    });
  })
);

router.post(
  "/",
  validateNewPostForm,
  csrfProtection,
  asyncHandler(async (req, res) => {
    const validationError = validationResult(req);
    if (!validationError.isEmpty()) {
      validate(validationError, res, req);
    } else {
      const { title, postBody } = req.body;
      const post = await db.Post.findAll({
        where: { authorId: req.session.auth.userId },
      });
      post.title = title;
      post.body = postBody;

      await Post.create({
        title,
        postBody,
      });

      res.redirect("/");
    }
  })
);

module.exports = router;
