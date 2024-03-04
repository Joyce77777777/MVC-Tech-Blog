const { User } = require("../models");
const userData = [
  {
    username: "testuser1",
    email: "test1@test.com",
    password: "testpassword1",
  },
  {
    username: "testuser2",
    email: "test2@test.com",
    password: "testpassword2",
  },
  {
    username: "testuser3",
    email: "test3@test.com",
    password: "testpassword3",
  },
  {
    username: "testuser4",
    email: "test4@test.com",
    password: "testpassword4",
  },
  {
    username: "testuser5",
    email: "test5@test.com",
    password: "testpassword5",
  },
  {
    username: "testuser6",
    email: "test6@test.com",
    password: "testpassword6",
  },
];
const seedUsers = () => User.bulkCreate(userData);
module.exports = seedUsers;
