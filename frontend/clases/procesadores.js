class Procesador {
  id;
  nombre;
  marca;
  modelo;
  socket;
  chipsetGpu;
  nucleos;
  hilos;
  frecuencia;
  precio;
  fechaLanzamiento;
  imagen;
  visible;

  constructor(
    id,
    nombre,
    marca,
    modelo,
    socket,
    chipsetGpu,
    nucleos,
    hilos,
    frecuencia,
    precio,
    fechaLanzamiento,
    imagen,
    visible
  ) {
    this.id = id;
    this.nombre = nombre;
    this.marca = marca;
    this.modelo = modelo;
    this.socket = socket;
    this.chipsetGpu = chipsetGpu;
    this.nucleos = nucleos;
    this.hilos = hilos;
    this.frecuencia = frecuencia;
    this.precio = precio;
    this.fechaLanzamiento = fechaLanzamiento;
    this.imagen = imagen;
    this.visible = visible;
  }

  static createFromJsonString(json) {
    const valor = json;

    if (
      typeof valor.id === "number" &&
      typeof valor.nombre === "string" &&
      typeof valor.marca === "string" &&
      typeof valor.modelo === "string" &&
      typeof valor.socket === "string" &&
      typeof valor.chipsetGpu === "string" &&
      typeof valor.nucleos === "number" &&
      typeof valor.hilos === "number" &&
      typeof valor.frecuencia === "number" &&
      typeof valor.precio === "number" &&
      (typeof valor.fechaLanzamiento === "string" || valor.fechaLanzamiento instanceof Date) &&
      typeof valor.imagen === "string" &&
      typeof valor.visible === "boolean"
    ) {
      return new Procesador(
        valor.id,
        valor.nombre,
        valor.marca,
        valor.modelo,
        valor.socket,
        valor.chipsetGpu,
        valor.nucleos,
        valor.hilos,
        valor.frecuencia,
        valor.precio,
        new Date(valor.fechaLanzamiento),
        valor.imagen,
        valor.visible
      );
    } else {
      throw new Error("Formato invalido para crear un procesador.");
    }
  }


  createHtmlElement(){
    if (this.visible ===  true) {
      const contenedor = document.createElement("div");
      contenedor.classList.add("producto");
  
      const nameElement = document.createElement("h3");
      nameElement.innerHTML = this.nombre;
  
      const priceElement = document.createElement("p");
      priceElement.innerHTML = `$${this.precio.toLocaleString("es-AR")}`;
  
      const imageElement = document.createElement("img");
      imageElement.src = this.imagen;
      
      const verDetallesBoton = document.createElement("button");
          verDetallesBoton.innerHTML = "Ver detalles";
  
      contenedor.addEventListener("click", () => {
       // PlacaVideo.abrirModalConDetalles(this);
       Procesador.abrirModalConDetalles(this);
      });
      
      contenedor.append(imageElement, nameElement, priceElement, verDetallesBoton);
  
      return contenedor; 
    }
  }

  static abrirModalConDetalles(producto) {
        const modal = document.createElement("div");
        modal.classList.add("modal");

        modal.innerHTML = `
            <div class="modal-contenido">
                <span class="cerrar">&times;</span>
                <div class="modal-header">
                    <img src="${producto.imagen}" alt="${producto.nombre}" class="modal-img"/>
                    <div class="modal-info">
                        <h2>${producto.nombre}</h2>
                        <p class="precio-modal">$${producto.precio.toLocaleString("es-AR")}</p>
                        <button class="btn-agregar-carrito">Agregar al carrito</button>
                    </div>
                </div>

                <div class="modal-especificaciones">
                    <h3>Especificaciones Técnicas</h3>
                    <ul>
                        <li><strong>Marca:</strong> ${producto.marca}</li>
                        <li><strong>Modelo:</strong> ${producto.modelo}</li>
                        <li><strong>Socket:</strong> ${producto.socket}</li>
                        <li><strong>Chipset GPU:</strong> ${producto.chipsetGpu}</li>
                        <li><strong>Núcleos:</strong> ${producto.nucleos}</li>
                        <li><strong>Hilos:</strong> ${producto.hilos}</li>
                        <li><strong>Frecuencia:</strong> ${producto.frecuencia} GHz</li>
                        <li><strong>Lanzamiento:</strong> ${new Date(producto.fechaLanzamiento).toLocaleDateString()}</li>
                    </ul>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        modal.querySelector(".cerrar").addEventListener("click", () => {
            modal.remove();
        });

        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });

        modal.querySelector(".btn-agregar-carrito").addEventListener("click", () => {
            agregarAlCarrito({
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                imagen: producto.imagen
            });
            modal.remove();
        });
    }
}