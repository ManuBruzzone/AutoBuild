
document.addEventListener("DOMContentLoaded", () => {
  // acceso rapido
  const usuarioAdmin = "adminNoeManu";
  const contraAdmin = "EstoEsSecreto###";


  document.getElementById("btnAccesoRapido").addEventListener("click", () => {
    const userInput = document.getElementById("inputNombreUsuarioAdmin");
    const passInput = document.getElementById("inputContraAdmin");

    userInput.value = usuarioAdmin;
    passInput.removeAttribute("readonly");
    passInput.setAttribute("type", "text");
    passInput.value = contraAdmin;
    passInput.setAttribute("type", "password");
  });


  document.getElementById("loginForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById("inputNombreUsuarioAdmin").value;
    const password = document.getElementById("inputContraAdmin").value;

    try {
      const res = await fetch("http://localhost:3000/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (res.ok) {
        window.location.href = "./home_admin.html";
      } else {
        mostrarAlerta(data.error || "Ocurrió un error al iniciar sesión.")
       // mostrarAlerta("Usuario o contraseña incorrectos!");
      }
    } catch (error) {
      console.error("Error al hacer login:", error);
      mostrarAlerta("Error de red");
    }

    console.log(username, password);
  });

  // Volver
  const btnVolver = document.getElementById("btn-volver");
  if (btnVolver) {
    btnVolver.addEventListener("click", () => {
      window.location.href = "/frontend/pantallas/usuario/bienvenida.html";
    });
  }

  // Mostrar alerta
  function mostrarAlerta(mensaje) {
    const alerta = document.getElementById("alertaLogin");
    alerta.textContent = mensaje;
    alerta.style.display = "block";

    setTimeout(() => {
      alerta.style.display= "none";
    }, 3000);
  }
});
