// Define a custom middleware function named `withAuth` to enforce authentication on certain routes
const withAuth = (req, res, next) => {
  // Check if the `logged_in` property on the session object does not exist or is false
  if (!req.session.logged_in) {
    // If the user is not logged in, redirect them to the login page
    res.redirect("/login");
  } else {
    // If the user is logged in, continue with the next middleware or route handler
    next();
  }
};
module.exports = withAuth;
