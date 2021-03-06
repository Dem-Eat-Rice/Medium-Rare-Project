const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { sequelize } = require("./db/models");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");
const profilesRouter = require("./routes/profile");
const createPostsRouter = require("./routes/create-post");
const { asyncHandler, validationResult } = require("./utils");
//const membersPost = require('./routes/...');
const { restoreUser, requireAuth } = require("./auth");
const db = require("./db/models");
const { Post, User, Tag } = db;

const app = express();

// view engine setup
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// set up session middleware
const store = new SequelizeStore({ db: sequelize });

app.use(
  session({
    secret: "superSecret",
    store,
    saveUninitialized: false,
    resave: false,
  })
);

// create Session table if it doesn't already exist
store.sync();

app.use(restoreUser);
app.get(
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

app.use("/users", usersRouter);
app.use(requireAuth);
app.use("/posts", postsRouter);

app.use("/profile", profilesRouter);
app.use("/create-post", createPostsRouter);
//app.use('/...', membersPost)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error", { req });
});

module.exports = app;
