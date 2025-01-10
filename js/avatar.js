// Declaración de variables globales
let ataqueJugador;
let ataqueEnemigo;
let vidasJugador = 3;
let vidasEnemigo = 3;
let personajeJugador;
let personajeEnemigo;

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
    document.getElementById('boton-punio').addEventListener('click', () => ataqueJugadorFunc('Puño'));
    document.getElementById('boton-patada').addEventListener('click', () => ataqueJugadorFunc('Patada'));
    document.getElementById('boton-barrida').addEventListener('click', () => ataqueJugadorFunc('Barrida'));
}

// Función para mostrar las reglas del juego
function mostrarReglas() {
    document.getElementById("reglas-del-juego").style.display = "block";
}
function regresarPantallaPrincipal() {
    document.getElementById("reglas-del-juego").style.display = "none";
    location.reload();
}

// Asignar la función al botón
document.getElementById("btn-regresar").addEventListener("click", regresarPantallaPrincipal);

// Función para seleccionar el personaje del jugador
function seleccionarPersonajeJugador() {
    // Escondemos la sección del inicio y mostramos la de selección de personaje
    document.getElementById("inicio").style.display = "none";
    document.getElementById("seleccionar-personaje").style.display = "block";
    document.getElementById("reglas-del-juego").style.display = "none";

    // Seleccionar una tarjeta de personaje
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            // Remover la clase "seleccionada" de todas las tarjetas
            cards.forEach(c => c.classList.remove('seleccionada'));
            // Añadir la clase "seleccionada" a la tarjeta clicada
            card.classList.add('seleccionada');
        });
    });

    // Añadimos el escuchador de eventos al botón de seleccionar personaje
    document.getElementById('boton-personaje').addEventListener('click', confirmarPersonajeJugador);
}

// Función para confirmar el personaje seleccionado por el jugador
function confirmarPersonajeJugador() {
    let selectedCard = document.querySelector('.card.seleccionada');

    if (selectedCard) {
        personajeJugador = selectedCard.id; // Guarda el id del personaje seleccionado
        document.body.className = personajeJugador; // Aplica la clase para fondo específico

        // Actualiza el nombre del personaje jugador en el HTML
        document.getElementById('personaje-jugador').textContent = personajeJugador.charAt(0).toUpperCase() + personajeJugador.slice(1);

        // Muestra la imagen del personaje seleccionado en la card de combate
        const imgJugador = selectedCard.querySelector('img').cloneNode();
        const cardJugador = document.getElementById('card-personaje-jugador');
        cardJugador.innerHTML = ''; // Limpiar contenido previo
        cardJugador.appendChild(imgJugador);
    } else {
        mostrarAlerta("Selecciona un personaje");
        return;
    }

    document.getElementById("seleccionar-personaje").style.display = "none";
    document.getElementById("seleccionar-ataque").style.display = "block";
    seleccionarPersonajeEnemigo();
}

function mostrarAlerta(mensaje) {
    const alerta = document.getElementById('alerta');
    const mensajeAlerta = document.getElementById('mensaje-alerta');
    mensajeAlerta.textContent = mensaje;
    alerta.classList.remove('oculto');
}

document.getElementById('cerrar-alerta').addEventListener('click', function () {
    document.getElementById('alerta').classList.add('oculto');
});



// Función para seleccionar el personaje enemigo al azar
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

    // Actualiza el nombre del personaje enemigo en el HTML
    document.getElementById('personaje-enemigo').textContent = personajeEnemigoId.charAt(0).toUpperCase() + personajeEnemigoId.slice(1);

    // Muestra la imagen del personaje enemigo en la card de combate
    const imgEnemigo = document.getElementById(personajeEnemigoId).querySelector('img').cloneNode();
    const cardEnemigo = document.getElementById('card-personaje-enemigo');
    cardEnemigo.innerHTML = ''; // Limpiar contenido previo
    cardEnemigo.appendChild(imgEnemigo);
}



// Función para generar un número aleatorio entre min y max (inclusive)
function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Función para manejar los ataques del jugador
function ataqueJugadorFunc(ataque) {
    ataqueJugador = ataque;
    ataqueAleatorioEnemigo();
}

// Función para determinar el ataque aleatorio del enemigo
function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(1, 3);

    if (ataqueAleatorio == 1) {
        ataqueEnemigo = 'Puño';
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

// Función combate modificada para manejar música al ganar o perder
function combate() {
    let spanVidasJugador = document.getElementById("vidas-jugador");
    let spanVidasEnemigo = document.getElementById("vidas-enemigo");

    if (!spanVidasJugador || !spanVidasEnemigo) {
        console.error("Elementos de vida no encontrados en el DOM.");
        return;
    }

    if (ataqueEnemigo == ataqueJugador) {
        crearMensaje("EMPATE");
    } else if (
        (ataqueJugador == "Puño" && ataqueEnemigo == "Barrida") ||
        (ataqueJugador == "Patada" && ataqueEnemigo == "Puño") ||
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

    revisarVidas();
}

// Modificación en la función revisarVidas para manejar la música
function revisarVidas() {
    if (vidasJugador <= 0) {
        crearMensajeFinal("HAS PERDIDO EL COMBATE");
        detenerMusicaYReproducir('derrota'); // Reproduce la canción de derrota
    } else if (vidasEnemigo <= 0) {
        crearMensajeFinal("HAS GANADO EL COMBATE");
        detenerMusicaYReproducir('victoria'); // Reproduce la canción de victoria
    }
}


// Función para crear el mensaje final del juego
function crearMensajeFinal(resultadoFinal) {
    let sectionMensaje = document.getElementById("mensajes");
    let mensajeDiv = document.createElement("div");
    mensajeDiv.classList.add("mensaje-burbuja", "mensaje-final");

    let parrafo = document.createElement("p");
    parrafo.innerHTML = resultadoFinal;
    mensajeDiv.appendChild(parrafo);

    sectionMensaje.appendChild(mensajeDiv);

    // Aplicar animación de entrada
    mensajeDiv.classList.add("animacion-entrada");

    // Deshabilitar los botones de ataque
    document.getElementById('boton-punio').disabled = true;
    document.getElementById('boton-patada').disabled = true;
    document.getElementById('boton-barrida').disabled = true;

    // Mostrar el botón de reinicio
    document.getElementById("reiniciar").style.display = "block";

    // Eliminar el mensaje después de un tiempo
    setTimeout(() => {
        mensajeDiv.classList.remove("animacion-entrada");
        mensajeDiv.classList.add("animacion-salida");

        // Eliminar el mensaje del DOM después de la animación de salida
        setTimeout(() => {
            if (sectionMensaje.contains(mensajeDiv)) {
                sectionMensaje.removeChild(mensajeDiv);
            }
        }, 500);
    }, 600000);
}

// Función para crear mensajes durante el combate
function crearMensaje(resultado) {
    let sectionMensaje = document.getElementById("mensajes");

    // Eliminar el mensaje anterior, si existe
    let mensajeAnterior = document.querySelector(".mensaje-burbuja");
    if (mensajeAnterior) {
        mensajeAnterior.classList.remove("animacion-entrada");
        mensajeAnterior.classList.add("animacion-salida");

        // Eliminar el mensaje del DOM después de la animación de salida
        setTimeout(() => {
            if (sectionMensaje.contains(mensajeAnterior)) {
                sectionMensaje.removeChild(mensajeAnterior);
            }
        }, 500);
    }

    // Crear el nuevo mensaje
    let mensajeDiv = document.createElement("div");
    mensajeDiv.classList.add("mensaje-burbuja");

    // Crear el contenido del mensaje
    let parrafo = document.createElement("p");
    parrafo.innerHTML = "Tu personaje atacó con " + ataqueJugador + ", el personaje del enemigo atacó con " + ataqueEnemigo + " - " + resultado;
    mensajeDiv.appendChild(parrafo);

    // Añadir el nuevo mensaje a la sección de mensajes
    sectionMensaje.appendChild(mensajeDiv);

    // Aplicar animación de entrada
    mensajeDiv.classList.add("animacion-entrada");

    // Eliminar el mensaje después de un tiempo
    setTimeout(() => {
        mensajeDiv.classList.remove("animacion-entrada");
        mensajeDiv.classList.add("animacion-salida");

        // Eliminar el mensaje del DOM después de la animación de salida
        setTimeout(() => {
            if (sectionMensaje.contains(mensajeDiv)) {
                sectionMensaje.removeChild(mensajeDiv);
            }
        }, 500);
    }, 2000);
}



// Función para reproducción música
document.addEventListener('DOMContentLoaded', function () {
    const audioAmbiental = document.getElementById('audio-ambiental');
    const audioJuego = document.getElementById('audio-juego');
    const audioEfectoBoton = document.getElementById('audio-efecto-boton');
    const botones = document.querySelectorAll('button');

    // Reproducir sonido al hacer clic en cualquier botón
    botones.forEach(boton => {
        boton.addEventListener('click', function () {

            if (audioEfectoBoton) {
                audioEfectoBoton.currentTime = 0;
                audioEfectoBoton.play();
            }
        });
    });

    const botonJugar = document.getElementById('boton-jugar');
    const botonReglas = document.getElementById('boton-reglas');

    // Cuando el usuario haga clic en "Reglas del Juego"
    if (botonReglas) {
        botonReglas.addEventListener('click', function () {
            if (audioAmbiental) {
                audioAmbiental.play();
            }
        });
    }

    // Cuando el usuario haga clic en "Jugar"
    if (botonJugar) {
        botonJugar.addEventListener('click', function () {
            if (audioAmbiental) {
                audioAmbiental.pause();
                audioAmbiental.currentTime = 0;
            }
            if (audioJuego) {
                audioJuego.play();
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const botonReglas = document.getElementById('boton-reglas');
    if (botonReglas) {
        botonReglas.addEventListener('click', function () {
            // Ocultar la imagen de Aang
            const fotoAvatar = document.querySelector('.foto-avatar-png');
            const bolaAvatar = document.querySelector('.BOLA-avatar-png');

            if (fotoAvatar) fotoAvatar.style.display = 'none';
            if (bolaAvatar) bolaAvatar.style.display = 'none';

            // Mostrar las reglas del juego
            document.getElementById('reglas-del-juego').style.display = 'block';

            // Opcional: Ocultar el botón de reglas si ya no lo necesitas
            this.style.display = 'none';
        });
    }

    // Seleccionar el botón y las imágenes
    const botonJugar = document.getElementById('boton-jugar');
    const imagenAvatar = document.querySelector('.foto-avatar-png');
    const imagenBola = document.querySelector('.BOLA-avatar-png');

    // Agregar el evento de clic al botón
    if (botonJugar) {
        botonJugar.addEventListener('click', () => {
            // Ocultar las imágenes al hacer clic en el botón
            if (imagenAvatar) imagenAvatar.style.display = 'none';
            if (imagenBola) imagenBola.style.display = 'none';
        });
    }
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
// Obtener los elementos de audio
const audioAmbiental = document.getElementById('audio-ambiental');
const audioJuego = document.getElementById('audio-juego');

// Ajustar el volumen (valor entre 0.0 y 1.0)
audioAmbiental.volume = 0.2;
audioJuego.volume = 0.3;

// Reproducir los audios
audioAmbiental.play();

// Añadir eventos 'click' a cada card
document.addEventListener('DOMContentLoaded', function () {
    const characters = ['zuko', 'katara', 'aang', 'toph'];
    characters.forEach(character => {
        const element = document.getElementById(character);
        if (element) {
            element.addEventListener('click', function () {
                playCharacterSoundOnClick(character);
            });
        }
    });
});

function detenerMusicaYReproducir(tipo) {
    const audioVictoria = document.getElementById('audio-victoria');
    const audioDerrota = document.getElementById('audio-derrota');

    // Pausar y reiniciar ambos audios
    audioVictoria.pause();
    audioVictoria.currentTime = 0;
    audioDerrota.pause();
    audioDerrota.currentTime = 0;

    // Reproducir el audio correspondiente
    if (tipo === 'victoria') {
        audioVictoria.play();
    } else if (tipo === 'derrota') {
        audioDerrota.play();
    }
}

// Función para reproducir un sonido
function reproducirSonido(src) {
    const audio = new Audio(src);
    audio.play();
}

// Asociamos cada botón con su sonido
document.getElementById('boton-punio').addEventListener('click', function () {
    reproducirSonido('assets/music/golpe.mp3');
});

document.getElementById('boton-patada').addEventListener('click', function () {
    reproducirSonido('assets/music/patada.mp3');
});

document.getElementById('boton-barrida').addEventListener('click', function () {
    reproducirSonido('assets/music/barrida.mp3');
});

// Iniciamos el juego cuando la página ha cargado completamente
window.addEventListener('load', iniciarJuego);