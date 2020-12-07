const express = require("express");
const router = express.Router();
const {
  asyncHandler,
  validationResult,
  csrfProtection,
  check,
} = require("../utils");
const db = require("../db/models");

const { Post, User, Tag } = db;


router.get(
  "/",
  asyncHandler(async (req, res) => {
    const allPosts = await Post.findAll({
      include: [{ model: User, attributes: ["username"] }],
      order: [["createdAt", "DESC"]],
      attributes: ["title", "body", "authorId", "id"],
    });
    const taggedPosts = await Post.findAll({
      include: [{ model: Tag }],
    });
    // res.json({ taggedPosts });
    res.render("posts", { allPosts, taggedPosts, req });
  })
);

// link to specific post(\\d+)
router.get(
  "/:id(\\d+)",
  asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.id);
    const readPosts = await Post.findByPk(postId, {
      include: [{ model: User, attributes: ["username"] }, { model: Tag }],
    });
    res.render("article", {
      title: readPosts.title,
      body: readPosts.body,
      author: readPosts.User.username,
      req,
    });
  })
)

module.exports = router;
