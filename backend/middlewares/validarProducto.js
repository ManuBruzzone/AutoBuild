module.exports = (req, res, next) => {
  const { nombre, marca, precio, fechaLanzamiento } = req.body;

  if (!nombre?.trim() || !marca?.trim() || !fechaLanzamiento) {
    return res.status(400).send("Faltan datos obligatorios del producto");
  }

  if (typeof precio !== "number" || !Number.isInteger(precio) || precio <= 0) {
    return res.status(400).send("El precio debe ser mayor a 0");
  }

  next();
};
