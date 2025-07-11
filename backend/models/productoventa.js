const { DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize");

const ProductoVenta = sequelize.define("ProductoVenta", {
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
});

module.exports = ProductoVenta;