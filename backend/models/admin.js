const { DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize");

const Admin = sequelize.define("admin", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Admin;
