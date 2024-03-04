// Importing required modules and dependencies
const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const exphbs = require('express-handlebars');

// Import custom modules
const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');

// Create an Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

// Session configuration
const sess = {
  secret: 'secret information', // Environment variable is recommended for production
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// Apply Express middleware
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(express.static('public')); // Serve static files from the "public" directory
app.use(session(sess)); // Use session middleware with the defined configuration

// Set Handlebars as the default template engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Register application routes
app.use(routes);

// Start the server
// First, sync the Sequelize models to the database, then start the server to listen for requests
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));
});
