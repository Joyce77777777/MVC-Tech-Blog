// API routes for user-related actions
const router = require("express").Router();
const { User } = require("../../models");

/**
 * GET all users.
 * This route fetches all users from the database, excluding their passwords for security.
 */
router.get("/", async (req, res) => {
  try {
    const dbUserData = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    res.json(dbUserData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

/**
 * POST a new user (Sign up).
 * This route creates a new user with the provided username, email, and password,
 * and initializes a session for them.
 */
router.post("/signup", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

/**
 * POST login a user.
 * This route authenticates a user by their username and password. If successful,
 * it initiates a session for the user.
 */
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });

    if (!userData) {
      res.status(400).json({ message: "Incorrect username or password." });
      return;
    }

    const validPassword = userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect username or password." });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json({ user: userData, message: "Successfully logged in." });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

/**
 * POST log out a user.
 * This route ends the session for a logged-in user, effectively logging them out.
 */
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end(); // Successful logout leads to no content to send back
    });
  } else {
    res.status(404).end(); // If not logged in, nothing to log out from
  }
});

module.exports = router;
