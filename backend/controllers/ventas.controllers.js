const { Venta, Producto } = require("../models/relaciones");
const fs = require("fs");
const path = require("path");

// POST /ventas
const crearVenta = async (req, res) => {
  try {
    const { cliente, total, productos } = req.body;

    // Crear la venta
    const venta = await Venta.create({
      cliente,
      fecha: new Date(),
      total,
    });

    // Si llegan productos y es un array, asociarlos a la venta con cantidad
    if (Array.isArray(productos) && productos.length > 0) {
      for (const prod of productos) {
        await venta.addProducto(prod.id, {
          through: { cantidad: prod.cantidad || 1 } // Default 1 si no llega cantidad
        });
      }
    }

    res.status(201).json({ mensaje: "Venta registrada correctamente", venta });
  } catch (error) {
    console.error("Error al crear venta:", error);
    res.status(500).json({ error: "No se pudo registrar la venta" });
  }
};

// GET /ventas
const obtenerVentas = async (req, res) => {
  try {
    const ventas = await Venta.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: {
        model: Producto,
        attributes: { exclude: ['createdAt', 'updatedAt'] },

      }
    });

    res.status(200).json(ventas);
  } catch (error) {
    console.error("Error al obtener ventas:", error);
    res.status(500).json({ error: "Error al obtener las ventas" });
  }
};

// GET /ventas/:id
const obtenerVentaPorId = async (req, res) => {
  try {
    const idVenta = req.params.id;
    const venta = await Venta.findByPk(idVenta, {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: {
        model: Producto,
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      }
    });

    if (!venta) {
      return res.status(404).json({ error: "Venta no encontrada" });
    }

    res.status(200).json(venta);
  } catch (error) {
    console.error("Error al obtener venta por ID:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// GET /ventas/exportar
const exportarVentasJSON = async (req, res) => {
  try {
    const ventas = await Venta.findAll({
      include: {
        model: Producto,
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      }
    });

    const ruta = path.join(__dirname, "..", "ventas.json");
    fs.writeFileSync(ruta, JSON.stringify(ventas, null, 2));

    res.status(200).json({ mensaje: "Archivo ventas.json generado correctamente." });
  } catch (error) {
    console.error("Error al exportar ventas:", error);
    res.status(500).json({ error: "No se pudo exportar las ventas" });
  }
};

module.exports = {
  crearVenta,
  obtenerVentas,
  obtenerVentaPorId, 
  exportarVentasJSON
};