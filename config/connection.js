// Database connection setup using Sequelize ORM.
const Sequelize = require('sequelize');
require('dotenv').config();

/**
 * Create a Sequelize instance (database connection).
 * This supports both a production database provided by JAWSDB_URL for deployment on Heroku
 * and a local database setup for development.
 */
const sequelize = process.env.JAWSDB_URL 
  ? // If JAWSDB_URL is available, use it to connect to the JAWS DB hosted database (for production).
    new Sequelize(process.env.JAWSDB_URL)
  : // Otherwise, connect to a locally hosted MySQL database using environment variables (for development).
    new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      host: 'localhost', // The database server host.
      dialect: 'mysql', // Specifies the database dialect to be used.
      dialectOptions: {
        decimalNumbers: true, // Ensures decimal columns are parsed as numbers.
      },
    });

// Export the sequelize database connection to be used in other parts of the application.
module.exports = sequelize;
