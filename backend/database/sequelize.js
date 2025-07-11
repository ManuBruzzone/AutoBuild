const { Sequelize } = require("sequelize");

require("dotenv").config();

console.log("Sequelize en db levantado!")

const sequelize = new Sequelize(
    process.env.SQL_DB, 
    process.env.SQL_USER, 
    process.env.SQL_PASSWORD, 
    {
        dialect: "mysql",
        host: process.env.SQL_HOST,
        port: process.env.SQL_PORT,
    }
);

module.exports = sequelize;