function crearProcesador() {
  const crearProcesador = document.getElementById("crearProcesador");

  const nombre           = document.getElementById("nombre");
  const marca            = document.getElementById("marca");
  const modelo           = document.getElementById("modelo");
  const socket           = document.getElementById("socket");
  const chipsetGpu       = document.getElementById("chipsetGpu");
  const nucleos          = document.getElementById("nucleos");
  const hilos            = document.getElementById("hilos");
  const frecuencia       = document.getElementById("frecuencia");
  const precio           = document.getElementById("precio");
  const fechaLanzamiento = document.getElementById("fechaLanzamiento");
  const imagen           = document.getElementById("imagen");
  const visible          = document.getElementById("visible");

  crearProcesador.onclick = async (e) => {
    e.preventDefault();

    try {
      const imagenFile = imagen.files[0];
      const urlImagen = await subirImagen(imagenFile);

      const response = await fetch("http://localhost:3000/procesadores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nombre:           nombre.value,
          marca:            marca.value,
          modelo:           modelo.value,
          socket:           socket.value,
          chipsetGpu:       chipsetGpu.value,
          nucleos:          parseInt(nucleos.value, 10),
          hilos:            parseInt(hilos.value, 10),
          frecuencia:       parseFloat(frecuencia.value),
          precio:           parseInt(precio.value, 10),
          fechaLanzamiento: fechaLanzamiento.value,
          imagen:           urlImagen,
          visible:          visible.checked
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        /*alert("Error del servidor: " + error.message);
        return;*/
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message || 'Error al crear el procesador',
          confirmButtonColor: '#d33'
        });
        return;
      }
      Swal.fire({
        icon: 'success',
        title: 'Procesador creado correctamente',
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        customClass: {
          popup: 'swal2-smaller'
        },
        didClose: () => {
          window.location.href = "/frontend/pantallas/admin/home_admin.html";
        }
      });

     // alert("Procesador creado correctamente.");
    } catch (error) {
      console.error("Error inesperado:", error);
      alert("Error inesperado al crear el procesador.");
     
    }
  };

  function subirImagen(file) {
    const formData = new FormData();
    formData.append("imagen", file);

    return fetch("http://localhost:3000/procesadores/upload", {
      method: "POST",
      body: formData
    })
      .then(res => res.json())
      .then(valor => {
        return valor.url;
      });
  }
}

crearProcesador();