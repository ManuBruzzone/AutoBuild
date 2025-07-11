//se encarga de capturar y validar el nombre pantalla bienvenida
document.addEventListener("DOMContentLoaded", () => {
  const inputNombre = document.getElementById("nombreUsuario");
  const btnContinuar = document.getElementById("btnContinuar");

  if (inputNombre && btnContinuar) {
    // evitar enter ya que todo debe ser probado con los botones
    inputNombre.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
      }
    });

    // formatear solo al salir del input
    inputNombre.addEventListener("blur", () => {
      let nombre = inputNombre.value
        .replace(/\s+/g, " ")
        .trim()
        .split(" ")
        .map((p) => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase())
        .join(" ");

      inputNombre.value = nombre;
    });

    // validar al continuar
    btnContinuar.addEventListener("click", () => {
      const nombre = inputNombre.value.trim();
      const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

      if (nombre === "" || !regex.test(nombre)) {
        Swal.fire({
          icon: "error",
          title: "Nombre inválido",
          text: "Solo se permiten letras y espacios.",
          toast: true,
          position: "center",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          customClass: {
            popup: "swal2-smaller",
          },
        });
        return;
      }

      setTimeout(() => {
        errorElement.style.display = "none";
      }, 1500);
      // Capitalizar nombre
      const nombreFormateado = nombre
        .split(" ")
        .map((p) => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase())
        .join(" ");

      localStorage.setItem("clienteNombre", nombreFormateado);
      window.location.href = "inicio.html";
    });
  }
});
