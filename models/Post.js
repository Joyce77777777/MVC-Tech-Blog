const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Post extends Model {}

Post.init(
  {
    // Post ID
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Post title
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Post content
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1], // Ensures the post has content
      },
    },
    // User ID (Foreign Key)
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user", // References the User model
        key: "id", // Specifies the field in the User model that Post.user_id refers to
      },
    },
  },
  {
    sequelize, // Pass the sequelize instance
    timestamps: true, // Enable automatic timestamp tracking
    freezeTableName: true, // Prevent Sequelize from pluralizing table names
    underscored: true, // Use underscored instead of camelCase for column names
    modelName: "post", // Define the model name
  }
);

module.exports = Post;
