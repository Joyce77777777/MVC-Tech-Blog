// API routes for handling Post-related actions
const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

/**
 * GET all posts with their associated User's username.
 */
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      // Include the username of the post creator
      include: [{ model: User, attributes: ["username"] }],
    });
    res.status(200).json(postData);
  } catch (err) {
    // Handle any errors
    res.status(500).json(err);
  }
});

/**
 * GET a single post by its ID, including the associated User's username and comments.
 */
router.get("/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      // Include the post creator's username and comments with usernames of commenters
      include: [
        { model: User, attributes: ["username"] },
        {
          model: Comment,
          include: [{ model: User, attributes: ["username"] }],
        },
      ],
    });

    if (!postData) {
      // If no post is found with the provided ID
      res.status(404).json({ message: "No post found with the corresponding id!" });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    // Handle any errors
    res.status(500).json(err);
  }
});

/**
 * POST a new post, requires user to be authenticated.
 */
router.post("/", withAuth, async (req, res) => {
  try {
    // Create a new post with the data provided in the request body
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id, // Set the user_id to the session's user_id
    });

    res.status(200).json(newPost);
  } catch (err) {
    // Handle any errors
    res.status(400).json(err);
  }
});

/**
 * PUT (update) an existing post, requires user to be authenticated.
 */
router.put("/:id", withAuth, async (req, res) => {
  try {
    // Update the post with the provided data
    const updatedPost = await Post.update(req.body, {
      where: { id: req.params.id },
    });

    if (!updatedPost[0]) {
      // If no post is found with the provided ID
      res.status(404).json({ message: "No post found with the corresponding id!" });
      return;
    }

    res.status(200).json(updatedPost);
  } catch (err) {
    // Handle any errors
    res.status(500).json(err);
  }
});

/**
 * DELETE an existing post, requires user to be authenticated.
 */
router.delete("/:id", withAuth, async (req, res) => {
  try {
    // First, delete all comments associated with the post
    await Comment.destroy({
      where: { post_id: req.params.id },
    });

    // Then, delete the post itself
    const deletedPost = await Post.destroy({
      where: { id: req.params.id },
    });

    if (!deletedPost) {
      // If no post is found with the provided ID
      res.status(404).json({ message: "No post found with the corresponding id!" });
      return;
    }

    res.status(200).json(deletedPost);
  } catch (err) {
    // Handle any errors
    res.status(500).json(err);
  }
});

module.exports = router;
