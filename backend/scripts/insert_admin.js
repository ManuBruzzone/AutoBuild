const bcrypt = require("bcrypt");
const Admin = require("../models/admin");
const sequelize = require("../database/sequelize");

(async () => {
  try {
    await sequelize.sync();

     const existe = await Admin.findOne({ where: { username: "adminNoeManu" } });

  if (existe) {
      console.log("Ya existe el admin 'adminNoeManu'. No se inserto de nuevo.");
    } else {

    const hash = await bcrypt.hash("EstoEsSecreto###", 10);
    //console.log(hash);

    await Admin.create({ username: "adminNoeManu", passwordHash: hash });
    
    console.log("ADMIN CREADO CORRECTAMENTE");
    }
  } catch (error) {
    console.error("Error al insertar admin:", error);
  } finally {
    await sequelize.close();
  }
})();
