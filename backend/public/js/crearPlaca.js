function crearPlaca() {
    const crearPlaca = document.getElementById("crearPlaca");

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

    crearPlaca.onclick = async (e) => {
        e.preventDefault();

        try {
            const imagenFile = imagen.files[0];
            const urlImagen = await subirImagen(imagenFile);

            const response = await fetch("http://localhost:3000/placasvideo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                nombre:           nombre.value,
                marca:            marca.value,
                tipo:             tipo.value,
                tipoMemoria:      tipoMemoria.value,
                capacidadMemoria: capacidadMemoria.value,
                chipsetGpu:       chipsetGpu.value,
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

            if (!response.ok) {
                const error = await response.json();
                 Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.message || 'Error al crear la placa de video',
                    confirmButtonColor: '#d33'
                });
                return;
              //  alert("Error del servidor: " + error.message);
                ///return;
            }

           // alert("Placa de video creado correctamente.");
            Swal.fire({
                icon: 'success',
                title: 'Placa de video creada correctamente',
                toast: true,
                position: 'center',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                customClass: {
                    popup: 'swal2-smaller'
                },
                didClose: () => {
                    window.location.href = "/frontend/pantallas/admin/home_admin.html";
                }
            });
        } catch (error) {
            console.error("Error inesperado:", error);
            alert("Error inesperado al crear la Placa de video");
        }
    };

    function subirImagen(file) {
        const formData = new FormData();
        formData.append("imagen", file);

        return fetch("http://localhost:3000/placasvideo/upload", {
            method: "POST",
            body: formData
            })
            .then(res => res.json())
            .then(valor => {
                return valor.url;
        });
    }
}

crearPlaca();