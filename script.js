// Crear el audio de forma global
const audio = new Audio('https://stream.zeno.fm/ajnldia1z5utv'); // URL de streaming
audio.volume = 0.5; // Establecer el volumen inicial

// Obtener elementos del DOM
const playButton = document.getElementById('play');
const progress = document.getElementById('progress'); // Cambié a 'progress' para que coincida con la clase CSS
const currentTimeLabel = document.getElementById('current-time');
const durationLabel = document.getElementById('duration');
const coverImage = document.querySelector('.cover'); // Seleccionar la imagen de la cubierta
const volumeSlider = document.getElementById('volume'); // Obtener la barra de volumen

// Inicializar la duración
audio.addEventListener('loadedmetadata', () => {
    durationLabel.textContent = audio.duration ? formatTime(audio.duration) : '0:00'; // Verificar si la duración está disponible
});

// Función para actualizar la barra de progreso y el tiempo actual
audio.addEventListener('timeupdate', () => {
    const { duration, currentTime } = audio;

    if (!isNaN(duration) && duration > 0) { // Verifica que duration no sea NaN y sea mayor que 0
        // Calcular el ancho de la barra de progreso
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;

        // Actualizar el tiempo actual
        currentTimeLabel.textContent = formatTime(currentTime);
    }
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
        audio.play().catch(error => {
            console.error("Error al reproducir el audio:", error);
        });
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
    audio.volume = Math.min(Math.max(volumeSlider.value, 0), 1); // Asegurar que el volumen esté entre 0 y 1
});

// Evento para manejar cuando el audio termina
audio.addEventListener('ended', () => {
    playButton.innerHTML = '<span id="icon" class="icons fas fa-play"></span>'; // Cambiar icono a play
    coverImage.classList.remove('rotate'); // Retirar clase de rotación
    progress.style.width = '0%'; // Restablecer la barra de progreso
    currentTimeLabel.textContent = '0:00'; // Restablecer el tiempo actual
});

// Al cargar la página, establece el tiempo inicial en 0:00
window.addEventListener('load', () => {
    currentTimeLabel.textContent = '0:00'; // Inicializar el tiempo actual
    durationLabel.textContent = audio.duration ? formatTime(audio.duration) : '0:00'; // Verificar si la duración está disponible
});
