const express = require("express");
const bcrypt = require('bcryptjs');
const router = express.Router();
const { asyncHandler, csrfProtection, validationResult, check } = require('../utils');
const db = require('../db/models');
const { loginUser, logoutUser } = require('../auth');


router.get('/', asyncHandler(async (req, res) => {
    const { userId } = req.session.auth;
    const userInfo = await db.User.findByPk(userId);
    const postCount = await db.Post.count({
        where: {authorId: userId},
    })
    const userLikes = await db.Like.count({
        include: {
            model: db.Post,
            where: {authorId: userId}
        },
    })
    res.render('profile', { userInfo, req, postCount, userLikes});
}))

//get count of all posts user has 







module.exports = router;