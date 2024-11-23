const audio = document.getElementById("audio");
const playStop = document.getElementById("play");
const volumeSlider = document.getElementById("range");
const songTitle = document.querySelector(".player__song");

// Configura el volumen inicial
audio.volume = volumeSlider.value / 100;

// Evento para el botón de play/stop
playStop.addEventListener("click", () => {
    if (audio.paused || audio.ended) {
        audio.play();
        playStop.querySelector(".play-btn").classList.add("hide");
        playStop.querySelector(".stop-btn").classList.remove("hide");
        songTitle.textContent = "Reproduciendo...";
    } else {
        audio.pause();
        playStop.querySelector(".stop-btn").classList.add("hide");
        playStop.querySelector(".play-btn").classList.remove("hide");
        songTitle.textContent = "Detenido";
    }
});

// Evento para el control de volumen
volumeSlider.addEventListener("input", () => {
    audio.volume = volumeSlider.value / 100; // Ajusta el volumen basado en el valor del slider
});

// Evento para manejar el final de la reproducción
audio.addEventListener("ended", () => {
    playStop.querySelector(".stop-btn").classList.add("hide");
    playStop.querySelector(".play-btn").classList.remove("hide");
    songTitle.textContent = "Detenido";
});
