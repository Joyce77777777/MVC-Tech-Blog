const { Post } = require("../models");

const postData = [
  {
    title: "Hello World!",
    content: "This is the first post ever made!",
    user_id: 1,
  },
  {
    title: "Second Post",
    content: "This post was made by the 2nd user of the system!",
    user_id: 2,
  },
  {
    title: "Yet Another Post",
    content: "The third user made this post!",
    user_id: 3,
  },
  {
    title: "This page is getting popular",
    content: "I'm the 4th user to use this site and it's exiciting!",
    user_id: 4,
  },
  {
    title: "Lucky Number 5",
    content: "I like the number five so I'm glad I'm the 4th user to use this site.",
    user_id: 5,
  }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
