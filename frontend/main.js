let paginaActual = 1;
const productosPorPagina = 12;
let todosLosProductos = [];
let tipoProducto = "";

function renderizarProductos() {
    const contenedor = document.getElementById("productos-container");
    contenedor.innerHTML = "";

    const productosVisibles = todosLosProductos.filter(p => p.visible == 1);

    const inicio = (paginaActual - 1) * productosPorPagina;
    const fin = inicio + productosPorPagina;
    const productosPagina = productosVisibles.slice(inicio, fin);

    for (const item of productosPagina) {
        try {
            let producto;
            if (tipoProducto === "procesadores") {
                producto = Procesador.createFromJsonString(item);
            } else if (tipoProducto === "placas-video") {
                producto = PlacaVideo.createFromJsonString(item);
            }
            contenedor.appendChild(producto.createHtmlElement());
        } catch (error) {
            console.error(`Error al crear ${tipoProducto}: `, error.message);
        }
    }

    actualizarBotones();
}

async function cargarProductos(url, tipo) {
    try {
        const respuesta = await fetch(url);
        todosLosProductos = await respuesta.json();
        tipoProducto = tipo;
        paginaActual = 1;
        renderizarProductos();
        console.log(`${tipo} cargados exitosamente.`);
    } catch (error) {
        console.error(`Error al cargar ${tipo}:`, error.message);
    }
}

function actualizarBotones() {
    document.getElementById("pagina").innerText = `Página ${paginaActual}`;

    const siguienteInicio = paginaActual * productosPorPagina;
    const haySiguiente = siguienteInicio < todosLosProductos.length;

    document.getElementById("btnAnterior").disabled = (paginaActual === 1);
    document.getElementById("btnSiguiente").disabled = !haySiguiente;
}
//recuperar el nombre desde localStorage y mostrarlo formateado en las siguientes pantallas.
document.addEventListener("DOMContentLoaded", () => {
    const nombreCliente = localStorage.getItem("clienteNombre");
    const saludoEl = document.getElementById("saludoCliente");
    const tipo = document.body.getAttribute("data-producto");

    if (saludoEl && nombreCliente) {
    let nombreLimpio = nombreCliente
        .replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "") //permite letras y espacios
        .replace(/\s+/g, " ")                   //reemplaza varios espacios por uno
        .trim()
        .split(" ")
        .map(p => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase())
        .join(" ");

 if (nombreLimpio === "") {
    nombreLimpio = "Usuario";
}

    if (tipo === "procesadores") {
        saludoEl.innerText = `Hola ${nombreLimpio}, ¡Elegi tus procesadores!`;
    } else if (tipo === "placas-video") {
        saludoEl.innerText = `Hola ${nombreLimpio}, ¡Elegi tus placas de video!`;
    } else {
        saludoEl.innerText = `Hola ${nombreLimpio}, ¡Empezá tu pedido!`;
    }
}

    if (tipo === "procesadores") {
        cargarProductos("http://localhost:3000/procesadores/traerTodos", "procesadores");
        } else if (tipo === "placas-video") {
        cargarProductos("http://localhost:3000/placasvideo/traerTodos", "placas-video");
        }

    const btnPlacas = document.getElementById("irPlacas");
    if (btnPlacas) {
        btnPlacas.addEventListener("click", () => {
            window.location.href = "./placasdevideo.html";
        });
    }

    const btnProcesadores = document.getElementById("irProcesadores");
    if (btnProcesadores) {
        btnProcesadores.addEventListener("click", () => {
            window.location.href = "./procesadores.html";
        });
    }

    const botonAdmin = document.getElementById("btn-admin");
    if (botonAdmin) {
        botonAdmin.addEventListener("click", () => {
            window.location.href = "/frontend/pantallas/admin/log_admin.html";
        });
    }

    const botonSalir = document.getElementById("btn-salir");
    if (botonSalir) {
        botonSalir.addEventListener("click", () => {
            window.location.href = "/frontend/pantallas/usuario/bienvenida.html"
        });
    }
});

const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");

if (btnAnterior) {
    btnAnterior.addEventListener("click", () => {
        if (paginaActual > 1) {
            paginaActual--;
            renderizarProductos();
        }
    });
}

if (btnSiguiente) {
    btnSiguiente.addEventListener("click", () => {
        const siguienteInicio = paginaActual * productosPorPagina;
        if (siguienteInicio < todosLosProductos.length) {
            paginaActual++;
            renderizarProductos();
        }
    });
}

function mostrarNotificacion(mensaje) {
    const notificacion = document.getElementById("notificacion");
    notificacion.textContent = mensaje;
    notificacion.style.display = "block";

    setTimeout(() => {
        notificacion.style.display = "none";
    }, 1500);
}

function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const index = carrito.findIndex(item => item.id === producto.id && item.nombre === producto.nombre);

    if (index !== -1) {
        carrito[index].cantidad = (carrito[index].cantidad || 1) + 1;
    } else {
        producto.cantidad = 1;
        carrito.push(producto);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarNotificacion(`Producto agregado: ${producto.nombre}`);
}