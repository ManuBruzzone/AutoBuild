function editarPlaca() {
    console.log("entra aca")
    const editarBtn = document.getElementById("editarPlaca");

    const idPlaca = editarBtn.dataset.id;

    const nombre           = document.getElementById("nombre");
    const marca            = document.getElementById("marca");
    const tipo             = document.getElementById("tipo");
    const tipoMemoria      = document.getElementById("tipoMemoria");
    const capacidadMemoria = document.getElementById("capacidadMemoria");
    const chipsetGpu       = document.getElementById("chipsetGpu");
    const vga              = document.getElementById("vga");
    const dviDigital       = document.getElementById("dviDigital");
    const hdmi             = document.getElementById("hdmi");
    const displayports     = document.getElementById("displayports");
    const precio           = document.getElementById("precio");
    const fechaLanzamiento = document.getElementById("fechaLanzamiento");
    const imagen           = document.getElementById("imagen");
    const visible          = document.getElementById("visible");

    editarBtn.onclick = async (e) => {
        e.preventDefault();

        try {
            let urlImagen = imagen.dataset.urlActual;

            if (imagen.files.length > 0) {
                const imagenFile = imagen.files[0];
                urlImagen = await subirImagen(imagenFile);
            }

            const response = await fetch(`http://localhost:3000/placasvideo/${idPlaca}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nombre:           nombre.value.trim(),
                    marca:            marca.value.trim(),
                    tipo:             tipo.value.trim(),
                    tipoMemoria:      tipoMemoria.value.trim(),
                    capacidadMemoria: parseInt(capacidadMemoria.value, 10),
                    chipsetGpu:       chipsetGpu.value.trim(),
                    vga:              parseInt(vga.value, 10),
                    dviDigital:       parseInt(dviDigital.value, 10),
                    hdmi:             parseInt(hdmi.value, 10),
                    displayports:     parseInt(displayports.value, 10),
                    precio:           parseInt(precio.value, 10),
                    fechaLanzamiento: fechaLanzamiento.value,
                    imagen:           urlImagen,
                    visible:          visible.checked
                }),
            });

            const result = await response.json();
            if (!response.ok) {
                alert("Error: " + result.message);
                return;
            }

            alert("Placa de video modificada correctamente.");
            window.location.href = "/frontend/pantallas/admin/home_admin.html";
        } catch (error) {
            console.error("Error al modificar:", error);
            alert("Error inesperado al modificar la placa de video.");
            window.location.href = "/frontend/pantallas/admin/home_admin.html";
        }
    };

    visible.onclick = (e) => {
        e.preventDefault();

        const nuevoEstado = visible.checked;

        let textoAccion = "";

        if (nuevoEstado) {
            textoAccion = "Activar nuevamente para el usuario (Activar)";
        } else {
            textoAccion = "Eliminar para el usuario (Desactivar)";
        }

        const modalConfirmacion = document.createElement("div");
        modalConfirmacion.classList.add("modal");
        modalConfirmacion.style.display = "flex";

        modalConfirmacion.innerHTML = `
            <div class="modal" style="
                position: fixed;
                top: 0; left: 0;
                width: 100vw; height: 100vh;
                background-color: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
            ">

                <div class="modal-contenido" style="
                    background-color: white;
                    padding: 2rem;
                    border-radius: 10px;
                    width: 90%;
                    max-width: 500px;
                    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
                    position: relative;
                    text-align: center;
                    animation: fadeIn 0.3s ease-in-out;
                ">
                    <span id="cerrarModal" style="
                        position: absolute;
                        top: 10px;
                        right: 15px;
                        font-size: 24px;
                        font-weight: bold;
                        cursor: pointer;
                        color: #999;
                    ">&times;</span>

                    <h2 style="margin-top: 0; color: #333">¿Confirmás el cambio de visibilidad?</h2>
                    <p id="detalleCompra" style="margin: 1rem 0; color: #333">${textoAccion}</p>

                    <div style="display: flex; justify-content: center; gap: 1rem; margin-top: 1rem;">
                        <button id="btnConfirmar" class="btn btn-confirmar">Confirmar</button>
                        <button id="btnCancelar" class="btn btn-cancelar">Cancelar</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modalConfirmacion);

        const cerrarModal = () => {
            document.body.removeChild(modalConfirmacion);
        };

        document.getElementById("cerrarModal").onclick = cerrarModal;

        document.getElementById("btnCancelar").onclick = () => {
            cerrarModal();
        };

        document.getElementById("btnConfirmar").onclick = () => {
            visible.checked = nuevoEstado;
            cerrarModal();
        };
    };

    function subirImagen(file) {
        const formData = new FormData();
        formData.append("imagen", file);

        return fetch("http://localhost:3000/placasvideo/upload", {
            method: "POST",
            body: formData
        })
        .then(res => res.json())
        .then(valor => valor.url);
    }
}

editarPlaca();