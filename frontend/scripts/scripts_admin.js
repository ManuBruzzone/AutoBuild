document.addEventListener("DOMContentLoaded", () => {
    const secciones = document.querySelectorAll(".menu-admin a");
    const contenido = document.querySelector(".contenido-admin");
    

    secciones.forEach(seccion => {
        seccion.addEventListener("click", (e) => {
            e.preventDefault();
            const texto = seccion.textContent.trim();

            if (texto === "Visualizar Productos") {
                contenido.innerHTML = "<div id=\"contenedorCategorias\"></div>";
                mostrarCategorias("visualizar");

            } else if (texto === "Agregar Productos") {
                contenido.innerHTML = "<div id=\"contenedorCategorias\"></div>";
                mostrarCategorias("agregar");

            } else if (texto === "Salir") {
                window.location.href = "../usuario/inicio.html";
            }
        });
    });

    function cargarSeccion(ruta) {
        fetch(ruta)
            .then(res => res.text())
            .then(html => {
                contenido.innerHTML = html;

                if (ruta.includes("procesadores/crearProcesador")) {
                    cargarScript("http://localhost:3000/public/js/crearProcesador.js");
                }

                if (ruta.includes("placasvideo/crearPlaca")) {
                    cargarScript("http://localhost:3000/public/js/crearPlaca.js");
                }
            })
            .catch(err => {
                contenido.innerHTML = "<p style=\"color: red;\">Error al cargar sección</p>";
                console.error("Error al cargar sección:", err);
            });
    }

    function cargarScript(src) {
        const script = document.createElement("script");
        script.src = src;
        script.type = "text/javascript";
        document.body.appendChild(script);
    }

    function mostrarCategorias(accion) {
        const contenedor = document.getElementById("contenedorCategorias");
        contenedor.style.display = "flex";
        contenedor.style.flexDirection = "column";
        contenedor.style.alignItems = "center";
        contenedor.innerHTML = "";

        const titulo = document.createElement("h2");
        titulo.textContent = accion === "agregar" ? "Categorias disponibles para Agregar" : "Categorias disponibles para visualizar";
        titulo.style.textAlign = "center";
        titulo.style.marginBottom = "20px";
        contenedor.appendChild(titulo);

        //Contenedor de tarjetas
        const contenedorTarjetas = document.createElement("div");
        contenedorTarjetas.style.display = "flex";
        contenedorTarjetas.style.justifyContent = "center";
        contenedorTarjetas.style.flexWrap = "wrap";
        contenedor.appendChild(contenedorTarjetas);

        const categorias = [
            {
                nombre: "Procesadores",
                img: "/frontend/assets/procesador_modelo.png",
                ruta: {
                    visualizar: "http://localhost:3000/procesadores/traerTodosAdmin",
                    agregar: "http://localhost:3000/procesadores/crearProcesador"
                }
            },
            {
                nombre: "Placas de video",
                img: "/frontend/assets/placaVideo_modelo.png",
                ruta: {
                    visualizar: "http://localhost:3000/placasvideo/traerTodosAdmin",
                    agregar: "http://localhost:3000/placasvideo/crearPlaca"
                }
            }
        ];

        categorias.forEach(categoria => {
            const tarjeta = document.createElement("div");
            tarjeta.style.border = "1px solid #ccc";
            tarjeta.style.width = "400px";
            tarjeta.style.margin = "5px";
            tarjeta.style.padding = "5px";
            tarjeta.style.textAlign = "center";
            tarjeta.style.cursor = "pointer";
            tarjeta.style.borderRadius = "8px";
            tarjeta.style.boxShadow = "0 2px 5px rgba(0,0,0,0.2)";

            const img = document.createElement("img");
            img.src = categoria.img;
            img.alt = categoria.nombre;
            img.style.width = "170px";
            img.style.height = "170px";
            img.style.objectFit = "cover";
            img.style.borderRadius = "5px";

            const texto = document.createElement("div");
            texto.textContent = categoria.nombre;
            texto.style.marginTop = "8px";
            texto.style.fontWeight = "bold";
            texto.style.fontSize = "16px";

            tarjeta.appendChild(img);
            tarjeta.appendChild(texto);

            tarjeta.addEventListener("click", () => {
                cargarSeccion(categoria.ruta[accion]);
            });

            contenedor.appendChild(tarjeta);
        });
    }

    document.addEventListener("click", async (e) => {
        if(e.target.classList.contains("btn-modificar-procesador")) {
            e.preventDefault();
            const id = e.target.dataset.id;
            try {
                const res = await fetch(`http://localhost:3000/procesadores/editar/${id}`);
                const html = await res.text();

                const contenedor = document.querySelector(".contenido-admin");
                contenedor.innerHTML = html;

                cargarScript("http://localhost:3000/public/js/editarProcesador.js");

            } catch(err) {
                alert(err.message);//sacr
            }
        }
        else if (e.target.classList.contains("btn-modificar-placa")) {
            e.preventDefault();
            const id = e.target.dataset.id;
            try {
                const res = await fetch(`http://localhost:3000/placasvideo/editar/${id}`);
                const html = await res.text();

                const contenedor = document.querySelector(".contenido-admin");
                contenedor.innerHTML = html;

                cargarScript("http://localhost:3000/public/js/editarPlaca.js");
            } catch(err) {
                alert(err.message);//sacar
            }
        }
    });
});