const { DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize");

const Procesador = sequelize.define("Procesador", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    marca: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    modelo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    socket: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    chipsetGpu: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nucleos: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    hilos: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    frecuencia: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    precio: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    fechaLanzamiento: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    imagen: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    visible: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
});

module.exports = Procesador;