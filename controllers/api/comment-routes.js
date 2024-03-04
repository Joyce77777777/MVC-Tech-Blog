// API Routes for Comments
const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

/**
 * POST endpoint for creating a new comment.
 * This route is protected, requiring authentication before a comment can be created.
 * The user's ID is retrieved from the session to associate the comment with the user.
 */
router.post("/", withAuth, async (req, res) => {
  try {
    // Attempt to create a new comment in the database using the information in the request body
    // along with the user ID stored in the session.
    const newComment = await Comment.create({
      ...req.body, // Spread syntax to copy properties from req.body to the new object
      user_id: req.session.user_id, // Associate the comment with the logged-in user
    });

    // Respond with the newly created comment data and a 200 OK status
    res.status(200).json(newComment);
  } catch (err) {
    // If an error occurs, respond with the error and a 400 Bad Request status
    res.status(400).json(err);
  }
});

module.exports = router;
