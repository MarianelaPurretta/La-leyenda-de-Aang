// Declaración de variables globales
let ataqueJugador;
let ataqueEnemigo;
let vidasJugador = 3;
let vidasEnemigo = 3;

// Función para iniciar el juego
function iniciarJuego() {
    // Escondemos las secciones no relevantes al inicio
    document.getElementById("seleccionar-ataque").style.display = "none";
    document.getElementById("reglas-del-juego").style.display = "none";
    document.getElementById("seleccionar-personaje").style.display = "none";
    document.getElementById("reiniciar").style.display = "none";

    // Añadimos el escuchador de eventos a los botones iniciales
    document.getElementById('boton-reglas').addEventListener('click', mostrarReglas);
    document.getElementById('boton-jugar').addEventListener('click', seleccionarPersonajeJugador);
    document.getElementById('boton-reiniciar').addEventListener('click', reiniciarJuego);

    // Añadimos escuchadores de eventos a los botones de ataques
    document.getElementById('boton-punio').addEventListener('click', ataquePunio);
    document.getElementById('boton-patada').addEventListener('click', ataquePatada);
    document.getElementById('boton-barrida').addEventListener('click', ataqueBarrida);
}

// Función para mostrar las reglas del juego
function mostrarReglas() {
    document.getElementById("reglas-del-juego").style.display = "block";
}

// Funci贸n para seleccionar el personaje del jugador
function seleccionarPersonajeJugador() {
    // Escondemos la secci贸n del inicio y mostramos la de selecci贸n de personaje
    document.getElementById("inicio").style.display = "none";
    document.getElementById("seleccionar-personaje").style.display = "block";
    document.getElementById("reglas-del-juego").style.display = "none";

    // A帽adimos el escuchador de eventos al bot贸n de seleccionar personaje
    document.getElementById('boton-personaje').addEventListener('click', confirmarPersonajeJugador);
}
// Funci贸n para seleccionar el personaje del jugador
function seleccionarPersonajeJugador() {
    // Escondemos la secci贸n del inicio y mostramos la de selecci贸n de personaje
    document.getElementById("inicio").style.display = "none";
    document.getElementById("seleccionar-personaje").style.display = "block";
    document.getElementById("reglas-del-juego").style.display = "none";

    // Seleccionar una tarjeta de personaje
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            // Remover la clase "seleccionada" de todas las tarjetas
            cards.forEach(c => c.classList.remove('seleccionada'));
            // A帽adir la clase "seleccionada" a la tarjeta clicada
            card.classList.add('seleccionada');
        });
    });

    // A帽adimos el escuchador de eventos al bot贸n de seleccionar personaje
    document.getElementById('boton-personaje').addEventListener('click', confirmarPersonajeJugador);
}

// Funci贸n para confirmar el personaje seleccionado por el jugador
function confirmarPersonajeJugador() {
    let selectedCard = document.querySelector('.card.seleccionada');
    let spanPersonajeJugador = document.getElementById('personaje-jugador');

    if (selectedCard) {
        const personajeId = selectedCard.id;
        spanPersonajeJugador.innerHTML = personajeId.charAt(0).toUpperCase() + personajeId.slice(1);
        document.body.className = personajeId; // Aplica la clase para fondo espec铆fico
    } else {
        let mensajeError = document.createElement("p");
        mensajeError.innerHTML = 'Selecciona un personaje';
        mensajeError.style.color = "red";
        let seccionSeleccionarPersonaje = document.getElementById("seleccionar-personaje");
        seccionSeleccionarPersonaje.appendChild(mensajeError);

        setTimeout(() => {
            seccionSeleccionarPersonaje.removeChild(mensajeError);
        }, 2000);

        return;
    }

    document.getElementById("seleccionar-personaje").style.display = "none";
    document.getElementById("seleccionar-ataque").style.display = "block";
    seleccionarPersonajeEnemigo();
}

// Funci贸n para seleccionar el personaje enemigo al azar
function seleccionarPersonajeEnemigo() {
    let personajeAleatorio = aleatorio(1, 4);
    let spanPersonajeEnemigo = document.getElementById('personaje-enemigo');

    // Asignamos el personaje enemigo basado en el n煤mero aleatorio generado
    if (personajeAleatorio == 1) {
        spanPersonajeEnemigo.innerHTML = 'Zuko';
    } else if (personajeAleatorio == 2) {
        spanPersonajeEnemigo.innerHTML = 'Katara';
    } else if (personajeAleatorio == 3) {
        spanPersonajeEnemigo.innerHTML = 'Aang';
    } else {
        spanPersonajeEnemigo.innerHTML = 'Toph';
    }
}

// Funci贸n para generar un n煤mero aleatorio entre min y max (inclusive)
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

// Función para determinar el ataque aleatorio del enemigo
function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(1, 3);

    if (ataqueAleatorio == 1) {
        ataqueEnemigo = 'Punio';
    } else if (ataqueAleatorio == 2) {
        ataqueEnemigo = 'Patada';
    } else {
        ataqueEnemigo = 'Barrida';
    }

    // Iniciamos el combate después de seleccionar los ataques
    combate();
}

// Función para reiniciar el juego
function reiniciarJuego() {
    location.reload();
}

// Función para manejar el combate
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

// Función para revisar las vidas de los jugadores
function revisarVidas() {
    if (vidasEnemigo == 0) {
        // Si el enemigo se queda sin vidas, mostramos mensaje de victoria
        crearMensajeFinal("FELICITACIONES GANASTE 🏆");
    } else if (vidasJugador == 0) {
        // Si el jugador se queda sin vidas, mostramos mensaje de derrota
        crearMensajeFinal("PERDISTE, NO TE RINDAS 😭");
    }
}

// Función para crear el mensaje final del juego
function crearMensajeFinal(resultadoFinal) {
    let sectionMensaje = document.getElementById("mensajes");
    let parrafo = document.createElement("p");

    parrafo.innerHTML = resultadoFinal;
    sectionMensaje.appendChild(parrafo);

    // Deshabilitamos los botones de ataques después de finalizar el juego
    document.getElementById('boton-punio').disabled = true;
    document.getElementById('boton-patada').disabled = true;
    document.getElementById('boton-barrida').disabled = true;

    // Mostramos el botón de reinicio
    document.getElementById("reiniciar").style.display = "block";
}

// Función para crear mensajes durante el combate
function crearMensaje(resultado) {
    let sectionMensaje = document.getElementById("mensajes");
    let parrafo = document.createElement("p");

    parrafo.innerHTML = "Tu personaje atacó con " + ataqueJugador + ", el personaje del enemigo atacó con " + ataqueEnemigo + " - " + resultado;
    sectionMensaje.appendChild(parrafo);
}

// Función para generar un número aleatorio entre un mínimo y un máximo
function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Iniciamos el juego cuando la página ha cargado completamente
window.addEventListener('load', iniciarJuego);
// Función para reprodución música
document.addEventListener('DOMContentLoaded', function () {
    const audioAmbiental = document.getElementById('audio-ambiental');
    const audioJuego = document.getElementById('audio-juego');
    const audioEfectoBoton = document.getElementById('audio-efecto-boton');
    const botones = document.querySelectorAll('button');

    // Reproducir sonido al hacer clic en cualquier botón
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

    // Opcional: Ocultar el botón de reglas si ya no lo necesitas
    this.style.display = 'none';
});

// Seleccionar el bot贸n y la imagen
const botonJugar = document.getElementById('boton-jugar');
const imagenAvatar = document.querySelector('.foto-avatar-png');
const imagenBola = document.querySelector('.BOLA-avatar-png');

// Agregar el evento de clic al bot贸n
botonJugar.addEventListener('click', () => {
    // Ocultar la imagen al hacer clic en el bot贸n
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

// Función para reproducir el sonido de un personaje al hacer clic en la card
function playCharacterSoundOnClick(character) {
    if (currentCharacterSound) {
        currentCharacterSound.pause();
        currentCharacterSound.currentTime = 0;
    }
    currentCharacterSound = new Audio(sounds[character]);
    currentCharacterSound.play();
}

// Añadir eventos 'click' a cada card
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