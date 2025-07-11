class PlacaVideo {
  id;
  nombre;
  marca;
  tipo;
  tipoMemoria;
  capacidadMemoria;
  chipsetGpu;
  vga;
  dviDigital;
  hdmi;
  displayports;
  precio;
  fechaLanzamiento;
  imagen;
  visible;

  constructor(
    id,
    nombre,
    marca,
    tipo,
    tipoMemoria,
    capacidadMemoria,
    chipsetGpu,
    vga,
    dviDigital,
    hdmi,
    displayports,
    precio,
    fechaLanzamiento,
    imagen,
    visible
  ) {
    this.id = id;
    this.nombre = nombre;
    this.marca = marca;
    this.tipo = tipo;
    this.tipoMemoria = tipoMemoria;
    this.capacidadMemoria = capacidadMemoria;
    this.chipsetGpu = chipsetGpu;
    this.vga = vga;
    this.dviDigital = dviDigital;
    this.hdmi = hdmi;
    this.displayports = displayports;
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
      typeof valor.tipo === "string" &&
      typeof valor.tipoMemoria === "string" &&
      typeof valor.capacidadMemoria === "string" &&
      typeof valor.chipsetGpu === "string" &&
      typeof valor.vga === "number" &&
      typeof valor.dviDigital === "number" &&
      typeof valor.hdmi === "number" &&
      typeof valor.displayports === "number" &&
      typeof valor.precio === "number" &&
      (typeof valor.fechaLanzamiento === "string" || valor.fechaLanzamiento instanceof Date) &&
      typeof valor.imagen === "string" &&
      typeof valor.visible === "boolean"

    ) {
      return new PlacaVideo(
        valor.id,
        valor.nombre,
        valor.marca,
        valor.tipo,
        valor.tipoMemoria,
        valor.capacidadMemoria,
        valor.chipsetGpu,
        valor.vga,
        valor.dviDigital,
        valor.hdmi,
        valor.displayports,
        valor.precio,
        new Date(valor.fechaLanzamiento),
        valor.imagen,
        valor.visible,
      );
    } else {
      console.error("Validación falló para: ", valor);
      throw new Error("Formato invalido para crear una Placa de Video.");
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
        PlacaVideo.abrirModalConDetalles(this);
      });
      
      contenedor.append(imageElement, nameElement, priceElement, verDetallesBoton);
  
      return contenedor; 
    }
  }

  static abrirModalConDetalles(Placa) {
    const modal = document.createElement("div");
    modal.classList.add("modal");

    modal.innerHTML = `
      <div class="modal-contenido">
        <span class="cerrar">&times;</span>
        <div class="modal-header">
          <img src="${Placa.imagen}" alt="${Placa.nombre}" class="modal-img"/>
          <div class="modal-info">
            <h2>${Placa.nombre}</h2>
            <p class="precio-modal">$${Placa.precio.toLocaleString("es-AR")}</p>
            <button class="btn-agregar-carrito">Agregar al carrito</button>
          </div>
        </div>

        <div class="modal-especificaciones">
          <h3>Especificaciones Técnicas</h3>
          <ul>
            <li><strong>Marca:</strong> ${Placa.marca}</li>
            <li><strong>Tipo:</strong> ${Placa.tipo}</li>
            <li><strong>Tipo Memoria:</strong> ${Placa.tipoMemoria}</li>
            <li><strong>Capacidad Memoria:</strong> ${Placa.capacidadMemoria}</li>
            <li><strong>Chipset GPU:</strong> ${Placa.chipsetGpu}</li>
            <li><strong>Salidas VGA:</strong> ${Placa.vga}</li>
            <li><strong>DVI Digital:</strong> ${Placa.dviDigital}</li>
            <li><strong>HDMI:</strong> ${Placa.hdmi}</li>
            <li><strong>DisplayPorts:</strong> ${Placa.displayports}</li>
            <li><strong>Lanzamiento:</strong> ${new Date(Placa.fechaLanzamiento).toLocaleDateString()}</li>
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
        id: Placa.id,
        nombre: Placa.nombre,
        precio: Placa.precio,
        imagen: Placa.imagen
      });
      modal.remove();
    });
  }
}