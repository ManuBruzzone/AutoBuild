const { DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize");

const PlacaVideo = sequelize.define("PlacaVideo", {
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
    tipo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tipoMemoria: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    capacidadMemoria: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    chipsetGpu: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    vga: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    dviDigital: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    hdmi: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    displayports: {
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

module.exports = PlacaVideo;