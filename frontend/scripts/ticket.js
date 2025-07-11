document.addEventListener("DOMContentLoaded", () => {
  const resumen = JSON.parse(localStorage.getItem("ticket"));
  if (!resumen) {
    document.body.innerHTML = "<h2>Error: no hay datos de la compra.</h2>";
    return;
  }

  document.getElementById("ticket-cliente").innerText = `Cliente: ${resumen.cliente}`;
  document.getElementById("ticket-fecha").innerText = `Fecha: ${resumen.fecha}`;

  const contenedor = document.getElementById("ticket-productos");
  contenedor.innerHTML = "";

  let total = 0;

  resumen.productos.forEach(producto => {
    const tarjeta = document.createElement("div");
    tarjeta.className = "producto-ticket";

    const subtotal = producto.precio * (producto.cantidad || 1);
    total += subtotal;

    tarjeta.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p>Precio unitario: $${producto.precio}</p>
      <p>Cantidad: ${producto.cantidad || 1}</p>
      <p>Subtotal: $${subtotal}</p>
    `;

    contenedor.appendChild(tarjeta);
  });

  document.getElementById("ticket-total").innerText = `Total: $${total}`;

  // Botn salir
  const salirBtn = document.getElementById("salir-btn");
  salirBtn.addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "./bienvenida.html";
  });
  //
 
    const botonDescarga = document.getElementById("descargar-pdf");
  botonDescarga.addEventListener("click", () => {
    generarTicketPDF(() => {
      console.log("Ticket generado correctamente");
    });
  });
});
