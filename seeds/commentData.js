const { Comment } = require("../models");

const commentData = [
  {
    comment_text: "Hello, welcome to the site!",
    user_id: 1,
    post_id: 1,
  },
  {
    comment_text: "Welcome!",
    user_id: 2,
    post_id: 1,
  },
  {
    comment_text: "This is so exciting!",
    user_id: 3,
    post_id: 1,
  },
  {
    comment_text: "What a good new site to get my news from!",
    user_id: 4,
    post_id: 1,
  },
  {
    comment_text: "Hey we're getting popular!",
    user_id: 1,
    post_id: 2,
  },
  {
    comment_text: "Welcome to the interwebs!",
    user_id: 2,
    post_id: 2,
  }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
