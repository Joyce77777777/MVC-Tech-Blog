const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcryptjs = require('bcryptjs');

class User extends Model {
  // Method to check if the entered password matches the hashed password in the database
  checkPassword(loginPw) {
    return bcryptjs.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    // User ID
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Username
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    // Email
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true, // Validates the email format
      },
    },
    // Password
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8], // Password must be at least 8 characters long
      },
    },
  },
  {
    // Model hooks for hashing passwords before creating/updating User records
    hooks: {
      async beforeCreate(newUser) {
        newUser.password = await bcryptjs.hash(newUser.password, 10);
        return newUser;
      },
      async beforeUpdate(updatedUser) {
        updatedUser.password = await bcryptjs.hash(updatedUser.password, 10);
        return updatedUser;
      },
    },
    sequelize, // Pass the sequelize instance
    timestamps: false, // Disable automatic timestamp tracking
    freezeTableName: true, // Prevent Sequelize from pluralizing table names
    underscored: true, // Use underscored instead of camelCase for column names
    modelName: 'user', // Define the model name
  }
);

module.exports = User;
