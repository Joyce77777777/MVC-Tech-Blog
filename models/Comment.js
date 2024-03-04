const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Comment extends Model {}

Comment.init(
  {
    // Comment ID
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Comment text
    comment_text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1], // Ensure the comment has at least one character
      },
    },
    // User ID who created the comment
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user", // References the 'user' model
        key: "id", // Specifically, the 'id' field of the 'user' model
      },
    },
    // Post ID the comment is associated with
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "post", // References the 'post' model
        key: "id", // Specifically, the 'id' field of the 'post' model
      },
    },
  },
  {
    sequelize, // The database connection instance
    timestamps: true, // Enable automatic creation of 'createdAt' and 'updatedAt' fields
    freezeTableName: true, // Prevent Sequelize from pluralizing the table name
    underscored: true, // Use snake_case rather than camelCase for database fields
    modelName: "comment", // Define the model name
  }
);

module.exports = Comment;
