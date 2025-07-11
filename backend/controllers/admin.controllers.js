const bcrypt = require("bcrypt");
const Admin = require("../models/admin");

const loginAdmin = async (req, res) => {
const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ where: { username } });

    if (!admin) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    const passwordValida = await bcrypt.compare(password, admin.passwordHash);
    if (!passwordValida) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    return res.status(200).json({ mensaje: "Login exitoso" });
  } catch (error) {
    console.error("Error en login:", error);
    return res.status(500).json({ error: "Error del servidor" });
  }
};

module.exports = {
  loginAdmin
};
