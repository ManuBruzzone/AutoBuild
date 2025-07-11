module.exports = (req, res, next) => {
  const { tipo, tipoMemoria, capacidadMemoria, chipsetGpu, vga, dviDigital, hdmi, displayports } = req.body;

  if (!tipo?.trim() || !tipoMemoria?.trim() ||
    !chipsetGpu?.trim() ||
    capacidadMemoria == null ||
    vga == null ||
    dviDigital == null ||
    hdmi == null ||
    displayports == null) {
    return res.status(400).send("Faltan campos especificos de la placa de video");
  }

  const numeros = [vga, dviDigital, hdmi, displayports];
  const camposNumericosValidos = numeros.every(n => Number.isInteger(n) && n >= 0);
  if (!camposNumericosValidos) {
    return res.status(400).send("Los campos numericos deben ser enteros mayores o iguales a 0.");
  }

  next();
};
