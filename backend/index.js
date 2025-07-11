
// Módulos principales
const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

// Middlewares personalizados
const logger = require("./middlewares/logger");
const errores = require("./middlewares/errores");

// Base de datos y modelos
const sequelize = require('./database/sequelize');
require('./models/placasvideo');
require('./models/procesadores');
require('./models/ventas');
require('./models/relaciones');

// Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger);
app.use(errores);

// Archivos estaticos / Publicos
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Rutas principales
const adminRoutes = require("./routes/admin.routes");
const procesadoresRouter = require("./routes/procesadores.routes");
const placasvideoRouter = require("./routes/placasvideo.routes");
const ventasRouter = require("./routes/ventas.routes");

app.use("/admin", adminRoutes);
app.use("/procesadores", procesadoresRouter);
app.use("/placasvideo", placasvideoRouter);
app.use("/ventas", ventasRouter);


// Sincronización con Sequelize
console.log("Iniciando Sequelize...");
sequelize.sync()
    .then(() => {
        console.log("Conexión OK.");
        return sequelize.authenticate();
    })
    .then(() => {
        console.log("Conexión a la base de datos establecida con éxito.");
        console.log("Tablas sincronizadas.");
    })
    .catch(err => {
        console.error("No se pudo conectar a la base de datos:", err);
    });

// Levantar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor levantado en el puerto ${PORT} con éxito.`);
});