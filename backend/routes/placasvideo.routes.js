const { Router } = require("express");
const multer = require("multer");
const path = require("path");

const PlacaVideoController = require("../controllers/placasvideo.controllers");
const validarProducto = require("../middlewares/validarProducto");
const validarPlacaVideo = require("../middlewares/validarPlaca");

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

// Obtener todas las placas
router.get("/traerTodos", PlacaVideoController.traerTodos);

// Obtener todas las placas (vista admin)
router.get("/traerTodosAdmin", async (req, res) => {
    try {
        const placasvideo = await PlacaVideoController.obtenerTodos();
        res.render("placasvideo", { placasvideo });
    } catch (error) {
        res.status(500).send("Error al cargar las Placas de video");
    }
});

// Formulario de creación
router.get("/crearPlaca", (req, res) => {
    res.render("crearPlacas");
});

// Subir imagen y devolver su URL
router.post("/upload", upload.single("imagen"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No se subió ninguna imagen" });
    }
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.json({ url: imageUrl });
});

// Crear una nueva placa
router.post("/", validarProducto, validarPlacaVideo, PlacaVideoController.crear);

// Formulario de edición
router.get("/editar/:id", async (req, res) => {
    try {
        const placa = await PlacaVideoController.obtenerPorId(req.params.id);
        res.render("editarPlaca", { placa });
    } catch (error) {
        res.status(500).send("Error al cargar el placa");
    }
});

// Actualizar una placa
router.put("/:id", validarProducto, validarPlacaVideo, PlacaVideoController.actualizar);

module.exports = router;