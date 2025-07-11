const PlacaVideo = require("../models/placasvideo");
const Producto = require("../models/producto");
const { request, response } = require("express");

class PlacaVideoController {
    /**
     * Obtener todas las placas
     */
    static async traerTodos(req, res) {
        try {
            const placas = await PlacaVideo.findAll();
            console.log("Placas encontradas");
            res.json(placas);
        } catch (error) {
            console.error("Error al traer las placas de video:", error);
            res.status(500).json({ error: "Error al obtener placas de video" });
        }
    }

    /**
     * Obtener todas las placas ADMIN
     */
    static async obtenerTodos() {
        try {
            return await PlacaVideo.findAll();
        } catch (error) {
            console.error("Error al obtener placas de video:", error);
            throw error;
        }
    }

    /**
     * Crear una nueva placa de video y su producto asociado
     */
    static async crear(req, res) {
        try {
            const {
                nombre,
                marca,
                tipo,
                tipoMemoria,
                capacidadMemoria,
                chipsetGpu,
                vga,
                dviDigital,
                hdmi,
                displayports,
                precio,
                fechaLanzamiento,
                imagen,
                visible,
            } = req.body;

            const placa = await PlacaVideo.create({
                nombre,
                marca,
                tipo,
                tipoMemoria,
                capacidadMemoria,
                chipsetGpu,
                vga,
                dviDigital,
                hdmi,
                displayports,
                precio,
                fechaLanzamiento,
                imagen,
                visible,
            });

            await Producto.create({
                tipo: "placaVideo",
                referenciaId: placa.id,
                nombre: placa.nombre,
                precio: placa.precio,
            });

            console.log("Placa de video y producto creados");
            res.status(201).json({ message: "Placa de video creada con éxito", placa });
        } catch (error) {
            console.error("Error al crear la placa de video:", error);
            res.status(500).json({ message: "Error al crear la placa de video", error });
        }
    }

    /**
     * Obtener una placa de video por ID
     */
    static async obtenerPorId(id) {
        try {
            return await PlacaVideo.findByPk(id);
        } catch (error) {
            console.error("Error al obtener placa de video:", error);
            throw error;
        }
    }

    /**
     * Actualizar una placa de video y su producto asociado
     */
    static async actualizar(req, res) {
        try {
            const id = req.params.id;

            const placa = await PlacaVideo.findByPk(id);
            if (!placa) {
                return res.status(404).json({ message: "Placa de video no encontrada" });
            }

            const {
                nombre,
                marca,
                tipo,
                tipoMemoria,
                capacidadMemoria,
                chipsetGpu,
                vga,
                dviDigital,
                hdmi,
                displayports,
                precio,
                fechaLanzamiento,
                imagen,
                visible,
            } = req.body;

            await placa.update({
                nombre,
                marca,
                tipo,
                tipoMemoria,
                capacidadMemoria,
                chipsetGpu,
                vga,
                dviDigital,
                hdmi,
                displayports,
                precio,
                fechaLanzamiento,
                imagen,
                visible,
            });

            await Producto.update(
                { nombre, precio },
                {
                    where: {
                        referenciaId: id,
                        tipo: "placaVideo",
                    }
                }
            );

            res.status(200).json({ message: "Placa de video actualizada correctamente" });
        } catch (error) {
            console.error("Error al actualizar placa de video:", error);
            res.status(500).json({ message: "Error al actualizar placa de video" });
        }
    }
}

module.exports = PlacaVideoController;
