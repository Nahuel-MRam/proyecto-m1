//* BLOQUE 1: FUNCIÓN PARA GENERAR UN COLOR HEX ALEATORIO
let coloresBloqueados = [];

function hexadecimalAleatorio() {
  const letras = "0123456789ABCDEF";
  let hex = "#";
  for (let i = 0; i < 6; i++) {
    hex += letras[Math.floor(Math.random() * 16)];
  }
  return hex;
}
//* BLOQUE 2: FUNCIÓN PARA CONVERTIR HEXADECIMAL A FORMATO HSL

function hexadecimalAHsl(hex) {
  let red = parseInt(hex.slice(1, 3), 16) / 255;
  let green = parseInt(hex.slice(3, 5), 16) / 255;
  let blue = parseInt(hex.slice(5, 7), 16) / 255;
  let max = Math.max(red, green, blue);
  let min = Math.min(red, green, blue);
  let luminosidad = (max + min) / 2;
  let tono, saturacion;

  if (max === min) {
    tono = 0;
    saturacion = 0;
  } else {
    let diferencia = max - min;

    saturacion =
      luminosidad > 0.5
        ? diferencia / (2 - max - min) 
        : diferencia / (max + min);


    if (max === red) {
      tono = ((green - blue) / diferencia + (green < blue ? 6 : 0)) / 6;
    } else if (max === green) {
      tono = ((blue - red) / diferencia + 2) / 6;
    } else {
      tono = ((red - green) / diferencia + 4) / 6;
    }
  }

  return `hsl(${Math.round(tono * 360)}, ${Math.round(saturacion * 100)}%, ${Math.round(luminosidad * 100)}%)`;
}
//* BLOQUE 3: FUNCIÓN PARA MOSTRAR EL TOAST (microfeedback)

function mostrarToast(mensaje) {
  const toast = document.getElementById("toast");
  toast.textContent = mensaje;
  toast.classList.add("visible");

  setTimeout(function () {
    toast.classList.remove("visible");
  }, 2000);
}

//* BLOQUE 4: FUNCIÓN PRINCIPAL - GENERAR LA PALETA
// Hace tres cosas: lee el DOM, crea elementos nuevos y los inserta.

function generarPaleta() {
  // ── Paso 1: Leer cuántos colores eligió el usuario ──────────
  // getElementById busca el elemento con ese id en el HTML
  // .value nos da el valor seleccionado en el <select>
  // parseInt() lo convierte de texto a número entero
  const cantidad = parseInt(document.getElementById("select-cantidad").value);

  // ── Paso 2: Obtener el contenedor de la paleta ──────────────
  // Es el <div id="paleta"> del HTML donde vamos a insertar las tarjetas
  const contenedor = document.getElementById("paleta");

  // ── Paso 3: Limpiar la paleta anterior ──────────────────────
  // innerHTML = '' borra todo el contenido HTML que había adentro
  contenedor.innerHTML = "";

  // ── Paso 4: Crear una tarjeta por cada color ─────────────────
  // El bucle for se repite "cantidad" veces (6, 8 o 9)
  for (let i = 0; i < cantidad; i++) {
    // Generamos un color HEX aleatorio usando la función
    const hex = coloresBloqueados[i] || hexadecimalAleatorio();
    // Lo convertimos a HSL para mostrarlo también en la tarjeta
    const hsl = hexadecimalAHsl(hex);

    // ── Códigos HEX y HSL ────────────────────────────────────
    // Lee el estado del toggle DENTRO del bucle,
    // para que cada tarjeta se cree con el formato correcto
    const mostrarHsl = document.getElementById("toggle-formato").checked;

    // ── Creamos la tarjeta (div.color-card) ──────────────────
    // createElement crea un elemento HTML nuevo pero todavía NO está en la página
    const card = document.createElement("div");

    // classList.add agrega una clase CSS al elemento
    card.classList.add("color-card");

    // setAttribute agrega atributos HTML al elemento
    // role="listitem" es para accesibilidad (lectores de pantalla)
    card.setAttribute("role", "listitem");

    // tabindex="0" permite navegar hasta esta tarjeta con la tecla Tab
    card.setAttribute("tabindex", "0");

    // title muestra un tooltip cuando el mouse pasa por encima
    card.setAttribute("title", "Clic para copiar " + hex);

    // ── Creamos el bloque de color (div.muestra) ─────────────
    const muestra = document.createElement("div");
    muestra.classList.add("muestra");

    // style.backgroundColor aplica el color de fondo directamente
    // Esto es CSS inline aplicado desde JavaScript
    muestra.style.backgroundColor = hex;

    // ── Creamos el texto con el código HEX ──────────────────
    const codigoHex = document.createElement("div");
    codigoHex.classList.add("codigo-hex");
    // Si el toggle está en HSL, ocultamos el HEX y viceversa
    if (mostrarHsl) codigoHex.classList.add("oculto");
    // textContent inserta texto plano dentro del elemento
    codigoHex.textContent = hex;

    // ── Creamos el texto con el código HSL ──────────────────
    // Misma estructura que el HEX, pero mostramos el formato HSL
    const codigoHsl = document.createElement("div");
    codigoHsl.classList.add("codigo-hsl");
    // Si el toggle está en HEX, ocultamos el HSL
    if (!mostrarHsl) codigoHsl.classList.add("oculto");
    codigoHsl.textContent = hsl;
    const candado = document.createElement("div");
    candado.classList.add("candado");
    candado.textContent = coloresBloqueados[i] ? "🔒" : "🔓";
    // ── Armamos la tarjeta juntando las piezas ───────────────
    // appendChild inserta un elemento ADENTRO de otro
    card.appendChild(muestra);
    card.appendChild(codigoHex);
    card.appendChild(codigoHsl);
    card.appendChild(candado)
    candado.addEventListener("click", function (e) {
      e.stopPropagation();
      if (coloresBloqueados[i]) {
        coloresBloqueados[i] = null;
        candado.textContent = "🔓";
      } else {
        coloresBloqueados[i] = hex;
        candado.textContent = "🔒";
      }
    });

    // ── Agregamos el evento de clic para copiar ──────────────
    card.addEventListener("click", function () {
      // navigator.clipboard.writeText() copia texto al portapapeles
      // Devuelve una Promesa (.then) que se ejecuta cuando termina
      navigator.clipboard.writeText(hex).then(function () {
        mostrarToast("¡Copiado: " + hex + "!");
      });
    });


    card.addEventListener("click", function () {
      // Revisamos el estado actual del toggle
      const mostrarHsl = document.getElementById("toggle-formato").checked;

      // Elegimos qué código copiar
      const codigoACopiar = mostrarHsl ? hsl : hex;

      // Copiamos el formato que se está mostrando
      navigator.clipboard.writeText(codigoACopiar).then(function () {
        // Mostramos un toast con el valor copiado
        mostrarToast("¡Copiado: " + codigoACopiar + "!");
      });
    });

    // ── Insertamos la tarjeta en la página ───────────────────
    // Recién acá el elemento aparece en el HTML visible
    contenedor.appendChild(card);
  }

  // Avisamos que la paleta fue generada
  mostrarToast("¡Paleta generada!");
}
// Funcion guardado de paletas
   function renderizarPaletas() {
  const paletas = JSON.parse(localStorage.getItem("paletas") || "[]");
  const contenedor = document.getElementById("paletas-guardadas");
  contenedor.innerHTML = "";

  paletas.forEach(function (paleta) {
    const fila = document.createElement("div");
    fila.classList.add("paleta-guardada");

    paleta.forEach(function (color) {
      const bloque = document.createElement("div");
      bloque.classList.add("bloque-guardado");
      bloque.style.backgroundColor = color;
      fila.appendChild(bloque);
    });

    contenedor.appendChild(fila);
  });
}

function guardarPaleta() {
  const cards = document.querySelectorAll(".color-card .muestra");
  const colores = [];

  cards.forEach(function (muestra) {
    colores.push(muestra.style.backgroundColor);
  });

  const paletas = JSON.parse(localStorage.getItem("paletas") || "[]");
  paletas.push(colores);
  localStorage.setItem("paletas", JSON.stringify(paletas));

  mostrarToast("¡Paleta guardada!");
  renderizarPaletas();
}
    
// ============================================================
//* BLOQUE 5: EVENTOS
// ============================================================

// Cuando el usuario hace clic en el botón, llamamos a generarPaleta()
document.getElementById("btn-generar").addEventListener("click", generarPaleta);

// Cuando el usuario mueve el toggle, recorremos todas las tarjetas
// y mostramos u ocultamos los códigos según el formato elegido
document
  .getElementById("toggle-formato")
  .addEventListener("change", function () {
    const mostrarHsl = this.checked;

    // querySelectorAll devuelve todas las tarjetas de la paleta
    document.querySelectorAll(".codigo-hex").forEach(function (el) {
      // toggle('oculto', condicion) agrega la clase si la condicion es true
      // y la saca si es false
      el.classList.toggle("oculto", mostrarHsl);
    });

    document.querySelectorAll(".codigo-hsl").forEach(function (el) {
      el.classList.toggle("oculto", !mostrarHsl);
    });
  });

// Generamos una paleta apenas carga la página,
// para que no aparezca vacía al entrar
generarPaleta();

document.getElementById("btn-guardar").addEventListener("click", guardarPaleta);

renderizarPaletas();