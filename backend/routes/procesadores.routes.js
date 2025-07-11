const { Router } = require("express");
const multer = require("multer");
const path = require("path");

const ProcesadorController = require("../controllers/procesadores.controllers");
const validarProducto = require("../middlewares/validarProducto");
const validarProcesador = require("../middlewares/validarProcesador");

const router = Router();

// Configuración de Multer para subir imágenes
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${Date.now()}${ext}`);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const isValid = allowedTypes.test(file.mimetype);
    isValid ? cb(null, true) : cb(new Error("Tipo de archivo no permitido"));
};

const upload = multer({ storage, fileFilter });

// Obtener todos los procesadores
router.get("/traerTodos", ProcesadorController.traerTodos);

// Vista admin con todos los procesadores
router.get("/traerTodosAdmin", async (req, res) => {
    try {
        const procesadores = await ProcesadorController.obtenerTodos();
        res.render("procesadores", { procesadores });
    } catch (error) {
        res.status(500).send("Error al cargar los procesadores");
    }
});

// Formulario de creación
router.get("/crearProcesador", (req, res) => {
    res.render("crearProcesadores");
});

// Subida de imagen y retorno de URL
router.post("/upload", upload.single("imagen"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No se subió ninguna imagen" });
    }
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.json({ url: imageUrl });
});

// Crear nuevo procesador
router.post("/", validarProducto, validarProcesador, ProcesadorController.crear);

// Formulario de edición
router.get("/editar/:id", async (req, res) => {
    try {
        const procesador = await ProcesadorController.obtenerPorId(req.params.id);
        res.render("editarProcesador", { procesador });
    } catch (error) {
        res.status(500).send("Error al cargar el procesador");
    }
});

// Actualizar un procesador
router.put("/:id", validarProducto, validarProcesador, ProcesadorController.actualizar);

module.exports = router;