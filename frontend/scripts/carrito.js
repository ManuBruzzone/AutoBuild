document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("carrito-container");
  const totalEl = document.getElementById("carrito-total");
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const btnVolver = document.getElementById("btn-volver");
  if (btnVolver) {
    btnVolver.addEventListener("click", () => {
      window.location.href = "/frontend/pantallas/usuario/inicio.html";
    });
  }
  function actualizarCarrito() {
    contenedor.innerHTML = "";
    let total = 0;

    carrito.forEach((producto, index) => {
      const tarjeta = document.createElement("div");
      tarjeta.classList.add("producto-carrito");
      tarjeta.classList.add("producto");

      const subtotal = producto.precio * (producto.cantidad || 1);
      total += subtotal;

      tarjeta.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p>Precio unitario: $${producto.precio.toLocaleString("es-AR")}</p>
        <span class="cantidadProducto">Cantidad: ${producto.cantidad || 1}</span>
        <div class="botones-carrito">
          <button class="restar" data-index="${index}">−</button>
          <button class="sumar" data-index="${index}">+</button>
        </div>
        <p>Subtotal: $${subtotal.toLocaleString("es-AR")}</p>
        <button class="eliminar" data-index="${index}">Eliminar</button>
      `;

      contenedor.appendChild(tarjeta);
    });

    totalEl.innerText = `Total: $${total.toLocaleString("es-AR")}`;
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }

  contenedor.addEventListener("click", (e) => {
    const index = e.target.dataset.index;
    if (e.target.classList.contains("sumar")) {
      carrito[index].cantidad = (carrito[index].cantidad || 1) + 1;
    } else if (e.target.classList.contains("restar")) {
      carrito[index].cantidad = Math.max((carrito[index].cantidad || 1) - 1, 1);
    } else if (e.target.classList.contains("eliminar")) {
      carrito.splice(index, 1);
    }
    actualizarCarrito();
  });

  mostrarMensajeCarritoVacio();

  const btnFinalizar = document.getElementById("btnFinalizarCompra");
    if (btnFinalizar) {
    btnFinalizar.addEventListener("click", () => {
  carrito = JSON.parse(localStorage.getItem("carrito")) || [];


    if (carrito.length === 0) {
        const errorCarrito = document.getElementById("errorCarrito");
        errorCarrito.textContent = "Tu carrito esta vacio. Agrega productos y luego completa tu compra"
        errorCarrito.style.display = "block";

        setTimeout(() => {
          errorCarrito.style.display= "none";
        }, 3000);

        return;
    }
    const modal = document.getElementById("modalConfirmacion");
    const detalle = document.getElementById("detalleCompra");
    const total = carrito.reduce((acc, p) => acc + (p.precio * (p.cantidad || 1)), 0);

    detalle.textContent = `Total a pagar: $${total.toLocaleString("es-AR")}`;

    modal.style.display = "flex";

    document.getElementById("btnConfirmar").onclick = () => {
        modal.style.display = "none";
        finalizarCompra(); 
    };

    document.getElementById("btnCancelar").onclick = () => {
        modal.style.display = "none";
    };

    document.getElementById("cerrarModal").onclick = () => {
        modal.style.display = "none";
    };

    
  });
}

document.getElementById("btnVaciarCarrito").onclick = () => {
  vaciarCarrito();
} 

function vaciarCarrito() {
  localStorage.removeItem("carrito");
  location.reload();
}
function mostrarMensajeCarritoVacio() {//interfaz refrescar
  if (carrito.length === 0) {
    contenedor.innerHTML = "<p>Tu carrito está vacío.</p>";
    totalEl.innerText = "Total: $0";
  } else {
    actualizarCarrito();
  }
}

function calcularTotal(carrito) {
  return carrito.reduce((acumulador, producto) => {
    return acumulador + (producto.precio * (producto.cantidad || 1));
  }, 0);
  }

function finalizarCompra() { 
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const cliente = localStorage.getItem("clienteNombre") || "Cliente";

  const resumenCompra = {
    productos: carrito,
    cliente: cliente,
    total: calcularTotal(carrito),
    fecha: new Date().toLocaleDateString()
  };

  localStorage.setItem("ticket", JSON.stringify(resumenCompra));
  window.location.href = "/frontend/pantallas/usuario/ticket.html";//

  fetch("http://localhost:3000/ventas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      cliente: resumenCompra.cliente,
      total: resumenCompra.total,
      productos: carrito
    })
  })
  .then(res => {
    if (!res.ok) throw new Error("Error al guardar la venta en la base de datos.");
    return res.json();
  })
  .then(() => {
    localStorage.removeItem("carrito");
    window.location.href = "/frontend/pantallas/usuario/ticket.html";
  })
  .catch(err => {
    console.error(err);
  });
  }
});
