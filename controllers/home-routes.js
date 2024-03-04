// Home Routes for rendering views based on different endpoints
const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

/**
 * Route to render the homepage with all posts.
 */
router.get("/", async (req, res) => {
  try {
    // Retrieve all posts including the usernames of their creators
    const postData = await Post.findAll({
      include: [{ model: User, attributes: ["username"] }],
    });
    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render("homepage", { posts, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

/**
 * Route to render a single post page by its ID.
 */
router.get("/post/:id", withAuth, async (req, res) => {
  try {
    // Retrieve specific post by ID including the username of the creator and comments
    const postData = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ["username"] },
        { model: Comment, include: [{ model: User, attributes: ["username"] }] },
      ],
    });

    if (!postData) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }

    const post = postData.get({ plain: true });

    // Pass post data to the single post view
    res.render("post", { ...post, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

/**
 * Route to render the dashboard page, showing only the current user's posts.
 */
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    // Retrieve all posts for the logged-in user
    const postData = await Post.findAll({
      where: { user_id: req.session.user_id },
      include: [{ model: User, attributes: ["username"] }],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    // Render the dashboard view with user's posts
    res.render("dashboard", { posts, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

/**
 * Route to render the login page, redirect if already logged in.
 */
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }
  res.render("login");
});

/**
 * Route to render the signup page, redirect if already logged in.
 */
router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }
  res.render("signup");
});

/**
 * Route to render the page for creating a new post, requires login.
 */
router.get("/newpost", (req, res) => {
  if (req.session.logged_in) {
    res.render("newpost");
    return;
  }
  res.redirect("/login");
});

/**
 * Route to render the edit post page by post ID, requires login.
 */
router.get("/editpost/:id", withAuth, async (req, res) => {
  try {
    // Retrieve the specific post to edit
    const postData = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ["username"] },
        { model: Comment, include: [{ model: User, attributes: ["username"] }] },
      ],
    });

    if (!postData) {
      res.status(404).json({ message: "No post found with the corresponding id!" });
      return;
    }

    const post = postData.get({ plain: true });

    // Render the edit post view with the post data
    res.render("editpost", { ...post, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
