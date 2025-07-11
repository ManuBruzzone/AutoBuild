/*document.addEventListener("DOMContentLoaded", () => {
  const boton = document.getElementById("toggle-modo");
  const body = document.body;

  const modoGuardado = localStorage.getItem("modo-tema");

  if (modoGuardado === "oscuro") {
    body.classList.add("modo-oscuro");
    boton.textContent = "☀️";
  } else {
    body.classList.add("modo-claro");
    boton.textContent = "🌙";
  }

 if (boton) {
  boton.addEventListener("click", () => {
    if (body.classList.contains("modo-oscuro")) {
      body.classList.remove("modo-oscuro");
      body.classList.add("modo-claro");
      localStorage.setItem("modo-tema", "claro");
      boton.textContent = "🌙";
    } else {
      body.classList.remove("modo-claro");
      body.classList.add("modo-oscuro");
      localStorage.setItem("modo-tema", "oscuro");
      boton.textContent = "☀️";
    }
  });
}
});
*/

document.addEventListener("DOMContentLoaded", () => {
  const boton = document.getElementById("toggle-modo");
  const body = document.body;

  const modoGuardado = localStorage.getItem("modo-tema");

  if (modoGuardado === "oscuro") {
    body.classList.add("modo-oscuro");
    if (boton) boton.textContent = "☀️";
  } else {
    body.classList.add("modo-claro");
    if (boton) boton.textContent = "🌙";
  }

  if (boton) {
    boton.addEventListener("click", () => {
      if (body.classList.contains("modo-oscuro")) {
        body.classList.remove("modo-oscuro");
        body.classList.add("modo-claro");
        localStorage.setItem("modo-tema", "claro");
        boton.textContent = "🌙";
      } else {
        body.classList.remove("modo-claro");
        body.classList.add("modo-oscuro");
        localStorage.setItem("modo-tema", "oscuro");
        boton.textContent = "☀️";
      }
    });
  }
});