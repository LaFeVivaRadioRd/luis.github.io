// audio.js

// Crear el audio de forma global
const audio = new Audio('https://stream.zeno.fm/ajnldia1z5utv'); // URL de streaming
audio.volume = 0.5; // Establecer el volumen inicial

// Obtener elementos del DOM
const playButton = document.getElementById('play');
const progress = document.getElementById('progress');
const currentTimeLabel = document.getElementById('current-time');
const durationLabel = document.getElementById('duration');
const coverImage = document.querySelector('.cover'); // Seleccionar la imagen de la cubierta
const volumeSlider = document.getElementById('volume'); // Obtener la barra de volumen

// Función para actualizar la barra de progreso
audio.addEventListener('timeupdate', () => {
    const { duration, currentTime } = audio;

    // Calcular el ancho de la barra de progreso
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    // Actualizar el tiempo actual y la duración
    currentTimeLabel.textContent = formatTime(currentTime);
    durationLabel.textContent = formatTime(duration);
});

// Función para formatear el tiempo en minutos y segundos
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Reproducir audio al hacer clic en el botón
playButton.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playButton.innerHTML = '<span id="icon" class="icons fas fa-pause"></span>'; // Cambiar icono a pausa
        coverImage.classList.add('rotate'); // Añadir clase de rotación
    } else {
        audio.pause();
        playButton.innerHTML = '<span id="icon" class="icons fas fa-play"></span>'; // Cambiar icono a play
        coverImage.classList.remove('rotate'); // Retirar clase de rotación
    }
});

// Evento para controlar el volumen al mover la barra
volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value; // Ajusta el volumen del audio según el valor de la barra
});

// Al cargar la página, reproducir audio si ya está sonando
window.addEventListener('load', () => {
    if (!audio.paused) {
        audio.play();
    }
});
