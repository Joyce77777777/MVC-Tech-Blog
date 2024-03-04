
const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

// Model Relationships
// Establish a one-to-many relationship between User and Post, indicating that a single user can have multiple posts.
User.hasMany(Post, {
  foreignKey: "user_id",
});

// Establish a many-to-one relationship between Post and User, indicating that a post belongs to a single user.
Post.belongsTo(User, {
  foreignKey: "user_id",
});

// Establish a many-to-one relationship between Comment and User, indicating that a comment is made by a single user.
Comment.belongsTo(User, {
  foreignKey: "user_id",
});

// Establish a many-to-one relationship between Comment and Post, indicating that a comment is made on a single post.
Comment.belongsTo(Post, {
  foreignKey: "post_id",
});

// Establish a one-to-many relationship between Post and Comment, indicating that a post can have multiple comments.
Post.hasMany(Comment, {
  foreignKey: "post_id",
});

// Establish a one-to-many relationship between User and Comment, indicating that a user can make multiple comments.
User.hasMany(Comment, {
  foreignKey: "user_id",
});

module.exports = { User, Post, Comment };
