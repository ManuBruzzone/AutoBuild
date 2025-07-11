
const path = require("path");

const express = require("express");
const router = express.Router();
const {
  crearVenta,
  obtenerVentas,
  obtenerVentaPorId,
  exportarVentasJSON
} = require("../controllers/ventas.controllers");

router.post("/", crearVenta);
router.get("/", obtenerVentas);
router.get("/exportar", exportarVentasJSON);
router.get("/:id", obtenerVentaPorId);


//NUEVA RUTA PARA DESCARGAR POR EL USUARIO
//y en el navegaor http://localhost:3000/ventas/descargar/json

router.get("/descargar/json", (req, res) => {
  const ruta = path.join(__dirname, "..", "ventas.json");
  res.download(ruta, "ventas.json", (err) => {
    if (err) {
      console.error("Error al descargar archivo:", err);
      res.status(500).send("Error al descargar el archivo");
    }
  });
});

module.exports = router;

