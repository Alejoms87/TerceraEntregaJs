// Tercera Entrega Js, en este caso se realizo el juego de memoria en donde
// para ganar, se tienen que dar vuelta dos cartas del mismo color
// Se utilizo lo visto hasta ahora en las clases de Js a partir de DOM

const contenedorTarjetas = document.querySelector(".contenedor");
const colores = [
  "red",
  "yellow",
  "green",
  "blue",
  "purple",
  "gold",
  "greenyellow",
  "teal",
];

const listaColores = [...colores, ...colores];

const contadorTarjeta = listaColores.length;

let cartasReveladas = 0;

let cartasActivadas = null;

let finJugada = false;

function crearCarta(color) {
  const element = document.createElement("div");
  element.classList.add("carta");
  element.setAttribute("carta-color", color);
  element.setAttribute("carta-revelada", "false");

  element.addEventListener("click", () => {
    const revelada = element.getAttribute("carta-revelada");

    if (finJugada || revelada === "true" || element === cartasActivadas) {
      return;
    }
    element.style.backgroundColor = color;

    if (!cartasActivadas) {
      cartasActivadas = element;
      return;
    }

    const machearColor = cartasActivadas.getAttribute("carta-color");
    if (machearColor === color) {
      cartasActivadas.setAttribute("carta-revelada", "true");
      element.setAttribute("carta-revelada", "true");

      finJugada = false;
      cartasActivadas = null;
      cartasReveladas += 2;
      if (cartasReveladas === contadorTarjeta) {
        Swal.fire({
          title: "¡Ganaste!",
          text: "¡Felicidades! ¿Quieres jugar de nuevo?",
          icon: "success",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sí, jugar de nuevo",
          cancelButtonText: "No",
        }).then((result) => {
          if (result.isConfirmed) {
            location.reload();
          } else {
            window.location.href = "fin.html";
          }
        });
      }

      return;
    }

    finJugada = true;
    setTimeout(() => {
      element.style.backgroundColor = null;
      cartasActivadas.style.backgroundColor = null;

      finJugada = false;
      cartasActivadas = null;
    }, 1000);
  });

  return element;
}

for (let i = 0; i < contadorTarjeta; i++) {
  const randomIndex = Math.floor(Math.random() * listaColores.length);
  const color = listaColores[randomIndex];
  const carta = crearCarta(color);

  listaColores.splice(randomIndex, 1);

  contenedorTarjetas.appendChild(carta);
}
