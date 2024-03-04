// Main API route setup
const router = require("express").Router();
const userRoutes = require("./user-routes");
const postRoutes = require("./post-routes");
const commentRoutes = require("./comment-routes");

/**
 * Aggregate and use specific route modules for different parts of the application.
 * Each route module is responsible for handling API requests related to its domain.
 */

// User-related API routes
// Prefix all routes defined in `user-routes.js` with `/users`
router.use("/users", userRoutes);

// Post-related API routes
// Prefix all routes defined in `post-routes.js` with `/posts`
router.use("/posts", postRoutes);

// Comment-related API routes
// Prefix all routes defined in `comment-routes.js` with `/comments`
router.use("/comments", commentRoutes);

// Export the configured router to be mounted by the Express application
module.exports = router;
