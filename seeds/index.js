const seedUsers = require("./userData");
const seedPosts = require("./postData");
const seedComments = require("./commentData");
const sequelize = require("../config/connection");

const seedAll = async () => {
  // Sync all models with the database, dropping existing tables and re-creating them (WARNING: This will erase all existing data)
  await sequelize.sync({ force: true });
  // Seed the database with user data
  await seedUsers();
  // Seed the database with post data
  await seedPosts();
  // Seed the database with comment data
  await seedComments();
  
  process.exit(0);
};

seedAll();
