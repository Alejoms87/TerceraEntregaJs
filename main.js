// Tercera Entrega Js, en este caso se realizo el juego de memoria en donde
// para ganar, se tienen que dar vuelta dos cartas del mismo color
// Se utilizo lo visto hasta ahora en las clases de Js a partir de DOM


// Primero creo las constantes para el contenedor de las cartas y la lista de colores
// Creo una lista duplicada de colores
// Ahora creo una variable para el contador de tarjetas
// Creo las variables de estado del juego, sin cartas reveleadas ni activadas y sin el fin del juego activado


const contenedorTarjetas = document.querySelector(".contenedor");
const colores = ["red", "yellow", "green", "blue", "purple", "gold", "greenyellow", "teal"];
const listaColores = [...colores, ...colores];
const contadorTarjeta = listaColores.length;
let cartasReveladas = 0;
let cartasActivadas = null;
let finJugada = false;

// Ahora creo una clase para representar una carta del juego

class Carta {
  constructor(color) {
    this.color = color;
    this.revelada = false;
    this.elemento = this.crearElemento();
  }

  crearElemento() {
    const elemento = document.createElement("div");
    elemento.classList.add("carta");
    elemento.setAttribute("carta-color", this.color);
    elemento.setAttribute("carta-revelada", "false");
    elemento.addEventListener("click", this.revelar.bind(this));
    return elemento;
  }

  revelar() {
    if (finJugada || this.revelada || this.elemento === cartasActivadas) {
      return;
    }
    this.elemento.style.backgroundColor = this.color;

    if (!cartasActivadas) {
      cartasActivadas = this.elemento;
      return;
    }

    const colorMatch = cartasActivadas.getAttribute("carta-color");
    if (colorMatch === this.color) {
      cartasActivadas.setAttribute("carta-revelada", "true");
      this.elemento.setAttribute("carta-revelada", "true");

      finJugada = false;
      cartasActivadas = null;
      cartasReveladas += 2;
      if (cartasReveladas === contadorTarjeta) {
        this.mostrarMensajeGanador();
      }
      guardarEstadoJuego();
      return;
    }

    finJugada = true;
    setTimeout(() => {
      this.elemento.style.backgroundColor = null;
      cartasActivadas.style.backgroundColor = null;

      finJugada = false;
      cartasActivadas = null;
    }, 1000);
  }

  mostrarMensajeGanador() {
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
        reiniciarJuego();
      } else {
        window.location.href = "fin.html";
      }
    });
  }
}

// Ahora me toca crear una funcion  para barajar las cartas

function barajar(lista) {
  for (let i = lista.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [lista[i], lista[j]] = [lista[j], lista[i]];
  }
}

// Ahora tengo que crear una funcion para crear las cartas y agregarlas al contenedor


function crearCartas() {
  barajar(listaColores);
  listaColores.forEach((color, index) => {
    const carta = new Carta(color);
    contenedorTarjetas.appendChild(carta.elemento);
    if (localStorage.getItem(`carta-${index}`) === "true") {
      carta.revelar();
    }
  });
}

// Ahora creo otra funcion para reiniciar el juego
// Vuelvo a reestablecer las variables de estado

function reiniciarJuego() {
  contenedorTarjetas.innerHTML = "";
  cartasReveladas = 0;
  cartasActivadas = null;
  finJugada = false;
  localStorage.clear(); // Limpiar datos guardados en localStorage
  crearCartas();
}

function guardarEstadoJuego() {
  const cartas = document.querySelectorAll(".carta");
  cartas.forEach((carta, index) => {
    localStorage.setItem(`carta-${index}`, carta.getAttribute("carta-revelada"));
  });
}

function iniciarJuego() {
  crearCartas();
}

iniciarJuego();
