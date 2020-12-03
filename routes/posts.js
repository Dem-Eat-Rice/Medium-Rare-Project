const express = require("express");
const router = express.Router();
const { asyncHandler, validationResult } = require("../utils");
const db = require("../db/models");

const { check } = require("express-validator");


const { Post, User } = db;


router.get(
  "/",
  asyncHandler(async (req, res) => {
    const allPosts = await Post.findAll({
      include: [{ model: User, attributes: ["username"] }],
      order: [["createdAt", "DESC"]],
      attributes: ["title", "body", "authorId"],
    });
    res.render("posts", {allPosts, req});

  })
);

module.exports = router;
