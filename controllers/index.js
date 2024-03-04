// Main routing entry point for the Express application.
const router = require("express").Router();
const apiRoutes = require("./api"); // API routes for data manipulation and retrieval
const homeRoutes = require("./home-routes"); // Routes for serving HTML pages

/**
 * Use the imported route groups, setting them up with specific base paths.
 * This organizes the route structure, directing API requests to `/api`
 * and homepage-related requests to the root path `/`.
 */

// API Routes
// All requests to paths starting with `/api` are handled by `apiRoutes`
router.use("/api", apiRoutes);

// Home Routes
// Requests to the root path `/` are handled by `homeRoutes`, serving the homepage and related pages
router.use("/", homeRoutes);

// Export the configured router to be used by the Express application
module.exports = router;
