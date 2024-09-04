// Declaraci贸n de variables globales
let ataqueJugador;
let ataqueEnemigo;
let vidasJugador = 3;
let vidasEnemigo = 3;
let personajeJugador;
let personajeEnemigo;

// Funci贸n para iniciar el juego
function iniciarJuego() {
    // Escondemos las secciones no relevantes al inicio
    document.getElementById("seleccionar-ataque").style.display = "none";
    document.getElementById("reglas-del-juego").style.display = "none";
    document.getElementById("seleccionar-personaje").style.display = "none";
    document.getElementById("reiniciar").style.display = "none";

    // A帽adimos el escuchador de eventos a los botones iniciales
    document.getElementById('boton-reglas').addEventListener('click', mostrarReglas);
    document.getElementById('boton-jugar').addEventListener('click', seleccionarPersonajeJugador);
    document.getElementById('boton-reiniciar').addEventListener('click', reiniciarJuego);

    // A帽adimos escuchadores de eventos a los botones de ataques
    document.getElementById('boton-punio').addEventListener('click', ataquePunio);
    document.getElementById('boton-patada').addEventListener('click', ataquePatada);
    document.getElementById('boton-barrida').addEventListener('click', ataqueBarrida);
}

// Funci贸n para mostrar las reglas del juego
function mostrarReglas() {
    document.getElementById("reglas-del-juego").style.display = "block";
}

// Funci璐竛 para seleccionar el personaje del jugador
function seleccionarPersonajeJugador() {
    // Escondemos la secci璐竛 del inicio y mostramos la de selecci璐竛 de personaje
    document.getElementById("inicio").style.display = "none";
    document.getElementById("seleccionar-personaje").style.display = "block";
    document.getElementById("reglas-del-juego").style.display = "none";

    // A甯絘dimos el escuchador de eventos al bot璐竛 de seleccionar personaje
    document.getElementById('boton-personaje').addEventListener('click', confirmarPersonajeJugador);
}
// Funci璐竛 para seleccionar el personaje del jugador
function seleccionarPersonajeJugador() {
    // Escondemos la secci璐竛 del inicio y mostramos la de selecci璐竛 de personaje
    document.getElementById("inicio").style.display = "none";
    document.getElementById("seleccionar-personaje").style.display = "block";
    document.getElementById("reglas-del-juego").style.display = "none";

    // Seleccionar una tarjeta de personaje
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            // Remover la clase "seleccionada" de todas las tarjetas
            cards.forEach(c => c.classList.remove('seleccionada'));
            // A甯絘dir la clase "seleccionada" a la tarjeta clicada
            card.classList.add('seleccionada');
        });
    });

    // A甯絘dimos el escuchador de eventos al bot璐竛 de seleccionar personaje
    document.getElementById('boton-personaje').addEventListener('click', confirmarPersonajeJugador);
}

// Funci贸n para confirmar el personaje seleccionado por el jugador
function confirmarPersonajeJugador() {
    let selectedCard = document.querySelector('.card.seleccionada');

    if (selectedCard) {
        personajeJugador = selectedCard.id; // Guarda el id del personaje seleccionado
        document.body.className = personajeJugador; // Aplica la clase para fondo espec铆fico

        // Muestra la imagen del personaje seleccionado en la card de combate
        const imgJugador = selectedCard.querySelector('img').cloneNode();
        document.getElementById('card-personaje-jugador').appendChild(imgJugador);
    } else {
        mostrarMensajeError("Selecciona un personaje");
        return;
    }

    document.getElementById("seleccionar-personaje").style.display = "none";
    document.getElementById("seleccionar-ataque").style.display = "block";
    seleccionarPersonajeEnemigo();
}

// Funci贸n para seleccionar el personaje enemigo al azar
function seleccionarPersonajeEnemigo() {
    let personajeAleatorio = aleatorio(1, 4);

    let personajeEnemigoId;
    if (personajeAleatorio == 1) {
        personajeEnemigoId = 'zuko';
    } else if (personajeAleatorio == 2) {
        personajeEnemigoId = 'katara';
    } else if (personajeAleatorio == 3) {
        personajeEnemigoId = 'aang';
    } else {
        personajeEnemigoId = 'toph';
    }

    personajeEnemigo = personajeEnemigoId;

    // Muestra la imagen del personaje enemigo en la card de combate
    const imgEnemigo = document.getElementById(personajeEnemigoId).querySelector('img').cloneNode();
    document.getElementById('card-personaje-enemigo').appendChild(imgEnemigo);
}

// Funci璐竛 para generar un n鐓ero aleatorio entre min y max (inclusive)
function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Funciones para los ataques del jugador
function ataquePunio() {
    ataqueJugador = 'Punio';
    ataqueAleatorioEnemigo();
}

function ataquePatada() {
    ataqueJugador = 'Patada';
    ataqueAleatorioEnemigo();
}

function ataqueBarrida() {
    ataqueJugador = 'Barrida';
    ataqueAleatorioEnemigo();
}

// Funci贸n para determinar el ataque aleatorio del enemigo
function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(1, 3);

    if (ataqueAleatorio == 1) {
        ataqueEnemigo = 'Punio';
    } else if (ataqueAleatorio == 2) {
        ataqueEnemigo = 'Patada';
    } else {
        ataqueEnemigo = 'Barrida';
    }

    // Iniciamos el combate despu茅s de seleccionar los ataques
    combate();
}

// Funci贸n para reiniciar el juego
function reiniciarJuego() {
    location.reload();
}

function combate() {
    let spanVidasJugador = document.getElementById("vidas-jugador");
    let spanVidasEnemigo = document.getElementById("vidas-enemigo");

    // Determinamos el resultado del combate basado en los ataques
    if (ataqueEnemigo == ataqueJugador) {
        crearMensaje("EMPATE");
    } else if (
        (ataqueJugador == "Punio" && ataqueEnemigo == "Barrida") ||
        (ataqueJugador == "Patada" && ataqueEnemigo == "Punio") ||
        (ataqueJugador == "Barrida" && ataqueEnemigo == "Patada")
    ) {
        crearMensaje("GANASTE");
        vidasEnemigo--;
        spanVidasEnemigo.innerHTML = vidasEnemigo;
    } else {
        crearMensaje("PERDISTE");
        vidasJugador--;
        spanVidasJugador.innerHTML = vidasJugador;
    }

    // Revisamos si alguna de las vidas ha llegado a cero
    revisarVidas();
}

// Funci贸n para revisar las vidas de los jugadores
function revisarVidas() {
    if (vidasEnemigo == 0) {
        // Si el enemigo se queda sin vidas, mostramos mensaje de victoria
        crearMensajeFinal("FELICITACIONES GANASTE 馃弳");
    } else if (vidasJugador == 0) {
        // Si el jugador se queda sin vidas, mostramos mensaje de derrota
        crearMensajeFinal("PERDISTE, NO TE RINDAS 馃槶");
    }
}

// Funci贸n para crear el mensaje final del juego
function crearMensajeFinal(resultadoFinal) {
    let sectionMensaje = document.getElementById("mensajes");
    let mensajeDiv = document.createElement("div");
    mensajeDiv.classList.add("mensaje-burbuja", "mensaje-final");

    let parrafo = document.createElement("p");
    parrafo.innerHTML = resultadoFinal;
    mensajeDiv.appendChild(parrafo);

    sectionMensaje.appendChild(mensajeDiv);

    // Aplicar animaci贸n de entrada
    mensajeDiv.classList.add("animacion-entrada");

    // Deshabilitar los botones de ataque
    document.getElementById('boton-punio').disabled = true;
    document.getElementById('boton-patada').disabled = true;
    document.getElementById('boton-barrida').disabled = true;

    // Mostrar el bot贸n de reinicio
    document.getElementById("reiniciar").style.display = "block";

    // Eliminar el mensaje despu茅s de un tiempo
    setTimeout(() => {
        mensajeDiv.classList.remove("animacion-entrada");
        mensajeDiv.classList.add("animacion-salida");

        // Eliminar el mensaje del DOM despu茅s de la animaci贸n de salida
        setTimeout(() => {
            sectionMensaje.removeChild(mensajeDiv);
        }, 500); // Duraci贸n de la animaci贸n de salida
    }, 3000); // Duraci贸n del mensaje en pantalla
}

// Funci贸n para crear mensajes durante el combate
function crearMensaje(resultado) {
    let sectionMensaje = document.getElementById("mensajes");

    // Eliminar el mensaje anterior, si existe
    let mensajeAnterior = document.querySelector(".mensaje-burbuja");
    if (mensajeAnterior) {
        mensajeAnterior.classList.remove("animacion-entrada");
        mensajeAnterior.classList.add("animacion-salida");

        // Eliminar el mensaje del DOM despu茅s de la animaci贸n de salida
        setTimeout(() => {
            sectionMensaje.removeChild(mensajeAnterior);
        }, 500); // Duraci贸n de la animaci贸n de salida
    }

    // Crear el nuevo mensaje
    let mensajeDiv = document.createElement("div");
    mensajeDiv.classList.add("mensaje-burbuja");

    // Crear el contenido del mensaje
    let parrafo = document.createElement("p");
    parrafo.innerHTML = "Tu personaje atac贸 con " + ataqueJugador + ", el personaje del enemigo atac贸 con " + ataqueEnemigo + " - " + resultado;
    mensajeDiv.appendChild(parrafo);

    // A帽adir el nuevo mensaje a la secci贸n de mensajes
    sectionMensaje.appendChild(mensajeDiv);

    // Aplicar animaci贸n de entrada
    mensajeDiv.classList.add("animacion-entrada");

    // Eliminar el mensaje despu茅s de un tiempo
    setTimeout(() => {
        mensajeDiv.classList.remove("animacion-entrada");
        mensajeDiv.classList.add("animacion-salida");

        // Eliminar el mensaje del DOM despu茅s de la animaci贸n de salida
        setTimeout(() => {
            sectionMensaje.removeChild(mensajeDiv);
        }, 500); // Duraci贸n de la animaci贸n de salida
    }, 2000); // Duraci贸n del mensaje en pantalla
}

// Funci贸n para generar un n煤mero aleatorio entre un m铆nimo y un m谩ximo
function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Iniciamos el juego cuando la p谩gina ha cargado completamente
window.addEventListener('load', iniciarJuego);
// Funci贸n para reproduci贸n m煤sica
document.addEventListener('DOMContentLoaded', function () {
    const audioAmbiental = document.getElementById('audio-ambiental');
    const audioJuego = document.getElementById('audio-juego');
    const audioEfectoBoton = document.getElementById('audio-efecto-boton');
    const botones = document.querySelectorAll('button');

    // Reproducir sonido al hacer clic en cualquier bot贸n
    botones.forEach(boton => {
        boton.addEventListener('click', function () {
            // Reiniciar el audio para que pueda reproducirse nuevamente
            audioEfectoBoton.currentTime = 0;
            audioEfectoBoton.play();
        });
    });

    const botonJugar = document.getElementById('boton-jugar');
    const botonReglas = document.getElementById('boton-reglas');

    // Cuando el usuario haga clic en "Reglas del Juego"
    botonReglas.addEventListener('click', function () {
        audioAmbiental.play();
    });

    // Cuando el usuario haga clic en "Jugar"
    botonJugar.addEventListener('click', function () {
        audioAmbiental.pause();
        audioAmbiental.currentTime = 0;
        audioJuego.play();
    });
});

document.getElementById('boton-reglas').addEventListener('click', function () {
    // Ocultar la imagen de Aang
    document.querySelector('.foto-avatar-png').style.display = 'none';
    document.querySelector('.BOLA-avatar-png').style.display = 'none';

    // Mostrar las reglas del juego
    document.getElementById('reglas-del-juego').style.display = 'block';

    // Opcional: Ocultar el bot贸n de reglas si ya no lo necesitas
    this.style.display = 'none';
});

// Seleccionar el bot璐竛 y la imagen
const botonJugar = document.getElementById('boton-jugar');
const imagenAvatar = document.querySelector('.foto-avatar-png');
const imagenBola = document.querySelector('.BOLA-avatar-png');

// Agregar el evento de clic al bot璐竛
botonJugar.addEventListener('click', () => {
    // Ocultar la imagen al hacer clic en el bot璐竛
    imagenAvatar.style.display = 'none';
    imagenBola.style.display = 'none';
});
// Rutas de los archivos de sonido en la carpeta assets/music
const sounds = {
    zuko: 'assets/music/fuego.mp3',
    katara: 'assets/music/agua.mp3',
    aang: 'assets/music/aire.mp3',
    toph: 'assets/music/tierra.mp3'
};

// Variable para el sonido actual
let currentCharacterSound = null;

// Funci贸n para reproducir el sonido de un personaje al hacer clic en la card
function playCharacterSoundOnClick(character) {
    if (currentCharacterSound) {
        currentCharacterSound.pause();
        currentCharacterSound.currentTime = 0;
    }
    currentCharacterSound = new Audio(sounds[character]);
    currentCharacterSound.play();
}

// A帽adir eventos 'click' a cada card
document.getElementById('zuko').addEventListener('click', function () {
    playCharacterSoundOnClick('zuko');
});

document.getElementById('katara').addEventListener('click', function () {
    playCharacterSoundOnClick('katara');
});

document.getElementById('aang').addEventListener('click', function () {
    playCharacterSoundOnClick('aang');
});

document.getElementById('toph').addEventListener('click', function () {
    playCharacterSoundOnClick('toph');
});