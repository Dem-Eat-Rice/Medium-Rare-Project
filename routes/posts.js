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
      attributes: ["title", "body", "authorId", "id"],
    });
    res.render("posts", {allPosts, req});

  })
);

// link to specific post(\\d+)
router.get("/:id(\\d+)",
  asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.id);
    const readPosts = await Post.findByPk(postId);
    if (readPosts) {
      res.json({ readPosts });
    // } else {
    //   next(postNotFoundError(postId));
    // }
  }
}));

module.exports = router;
