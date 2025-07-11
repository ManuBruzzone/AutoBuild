module.exports = (req, res, next) => {
  const { modelo, socket, chipsetGpu, nucleos, hilos, frecuencia } = req.body;

  if (!modelo?.trim() || !socket?.trim()) {
    return res.status(400).send("Faltan campos obligatorios del procesador: modelo o socket.");
  }
  if (![nucleos, hilos].every(n => Number.isInteger(n) && n >= 1)) {
    return res.status(400).send("Núcleos e hilos deben ser enteros positivos.");
  }
  if (typeof frecuencia !== "number" || isNaN(frecuencia) || frecuencia < 0.1) {
    return res.status(400).send("La frecuencia debe ser un número válido mayor a 0.");
  }

  next();
};