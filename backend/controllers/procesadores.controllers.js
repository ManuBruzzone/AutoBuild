const Procesador = require("../models/procesadores");
const Producto = require("../models/producto");
const { request, response } = require("express");

class ProcesadorController {
    /**
     *  Obtener todos los procesadores
     */
    static async traerTodos(req, res) {
        try {
            const procesadores = await Procesador.findAll();
            console.log("Procesadores encontrados");
            res.json(procesadores);
        } catch (error) {
            console.error("Error al traer los procesadores:", error);
            res.status(500).json({ error: "Error al obtener procesadores" });
        }
    }

    /**
     *  Obtener todos los procesadores ADMIN
     */
    static async obtenerTodos() {
        try {
            return await Procesador.findAll();
        } catch (error) {
            console.error("Error al obtener procesadores:", error);
            throw error;
        }
    }

    /**
     *  Crear un nuevo procesador y su producto asociado
     */
    static async crear(req, res) {
        try {
            const {
                nombre,
                marca,
                modelo,
                socket,
                chipsetGpu,
                nucleos,
                hilos,
                frecuencia,
                precio,
                fechaLanzamiento,
                imagen,
                visible,
            } = req.body;

            const procesador = await Procesador.create({
                nombre,
                marca,
                modelo,
                socket,
                chipsetGpu,
                nucleos,
                hilos,
                frecuencia,
                precio,
                fechaLanzamiento,
                imagen,
                visible,
            });

            await Producto.create({
                tipo: "procesador",
                referenciaId: procesador.id,
                nombre: procesador.nombre,
                precio: procesador.precio,
            });

            console.log("Procesador y producto creados");
            res.status(201).json({ message: "Procesador creado con éxito", procesador });
        } catch (error) {
            console.error("Error al crear procesador:", error);
            res.status(500).json({ message: "Error al crear procesador", error });
        }
    }

    /**
     *  Obtener procesador por ID
     */
    static async obtenerPorId(id) {
        try {
            return await Procesador.findByPk(id);
        } catch (error) {
            console.error("Error al obtener procesador:", error);
            throw error;
        }
    }

    /**
     *  Actualizar un procesador y su producto asociado
     */
    static async actualizar(req, res) {
        try {
            const id = req.params.id;
            const procesador = await Procesador.findByPk(id);

            if (!procesador) {
                return res.status(404).json({ message: "Procesador no encontrado" });
            }

            const {
                nombre,
                marca,
                modelo,
                socket,
                chipsetGpu,
                nucleos,
                hilos,
                frecuencia,
                precio,
                fechaLanzamiento,
                imagen,
                visible,
            } = req.body;

            await procesador.update({
                nombre,
                marca,
                modelo,
                socket,
                chipsetGpu,
                nucleos,
                hilos,
                frecuencia,
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
                        tipo: "procesador",
                    }
                }
            );

            res.status(200).json({ message: "Procesador actualizado correctamente" });
        } catch (error) {
            console.error("Error al actualizar procesador:", error);
            res.status(500).json({ message: "Error al actualizar procesador" });
        }
    }
}

module.exports = ProcesadorController;
