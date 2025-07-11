window.onload = () => {
  const botonDescargar = document.getElementById("descargar-pdf");

 

  botonDescargar.onclick = () => {
     Swal.fire({
    title: "Generando ticket...",
    text: "Por favor, espere unos segundos",
    icon: "info",
    showConfirmButton: false,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

   setTimeout(() => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: [80, 200], // Formato de ticket
    });

 
    const resumen = JSON.parse(localStorage.getItem("ticket")) || {};
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const cliente = resumen.cliente || "Sin nombre";
    const fecha = resumen.fecha || new Date().toLocaleDateString();
 

    let y = 10;
    let total = 0;

    // Encabezado
    doc.setFontSize(13);
    doc.setFont(undefined, "bold");
    doc.text("AutoBuild", 40, y, { align: "center" });
    y += 5;
    doc.text("Venta de componentes", 40, y, { align: "center" });
    y += 10;

    // Línea divisora
    doc.setLineWidth(0.3);
    doc.line(5, y, 75, y);
    y += 5;

    // Datos generales
    doc.setFontSize(11);
    doc.setFont(undefined, "normal");
    doc.text(`Cliente: ${cliente}`, 10, y);
    y += 5;
    doc.text(`Fecha: ${fecha}`, 10, y);
    y += 6;
    doc.line(5, y, 75, y);
    y += 6;

carrito.forEach((item, i) => {
  const cantidad = item.cantidad || 1;
  const nombreProducto = `${i + 1}. ${item.nombre}`;


  const nombreLineas = doc.splitTextToSize(nombreProducto, 65);
  doc.text(nombreLineas, 10, y);
  y += nombreLineas.length * 5;

  // Precio debajo
  const textoPrecio = `Precio: $${item.precio.toLocaleString("es-AR")} x ${cantidad}`;
  doc.text(textoPrecio, 10, y);
  y += 6;

  total += item.precio * cantidad;
});
    y += 4;
    doc.line(5, y, 75, y);
    y += 7;

    // Total
    doc.setFont(undefined, "bold");
    doc.setFontSize(13);
   // doc.text(`Total: $${total}`, 10, y);
   doc.text(`Total: $${total.toLocaleString("es-AR")}`, 10, y);

    y += 10;

    // Agradecimiento
    doc.line(5, y, 75, y);
    y += 5;
    doc.setFontSize(10);
    doc.setFont(undefined, "normal");
    doc.text("*** ¡Muchas gracias por su compra! ***", 40, y, {
      align: "center",
    });

    y += 5;
    doc.rect(5, 5, 70, y);
    doc.save("ticketAutobuild.pdf");
     Swal.close(); // Cierra el spinner
  }, 1600); // Tiempo para permitir que Swal se vea un instante
  };
};
