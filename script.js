let timers = [];

function startTimer(ticketNumber) {
    // Obtener el número de ticket ingresado
    let ticketNumberInput = document.getElementById(`ticketNumber${ticketNumber}`);
    let ticketNumberValue = ticketNumberInput.value;

    // Validar el formato del número de ticket
    if (!(/^\d{7}$/.test(ticketNumberValue))) {
        alert('El número ingresado no se encuentra en el sistema');
        return;
    }

    // Obtener el tiempo límite en segundos (por ejemplo, 2 horas)
    let limitTimeInSeconds = 2 * 60 * 60;

    // Verificar si el temporizador ya está en funcionamiento y detenerlo
    stopTimer(ticketNumber);

    // Obtener el tiempo inicial almacenado en localStorage
    let startTime = localStorage.getItem(`startTime${ticketNumber}`);
    if (!startTime) {
        // Si no hay tiempo inicial, establecerlo ahora
        startTime = Date.now();
        localStorage.setItem(`startTime${ticketNumber}`, startTime);

        // Mostrar alerta de inicio de temporizador
        alert(`El temporizador del Ticket ${ticketNumber} ha sido iniciado.`);
    }

    // Calcular el tiempo transcurrido desde el inicio
    timers[ticketNumber] = setInterval(function () {
        let currentTime = Date.now();
        let elapsedTimeInSeconds = Math.floor((currentTime - startTime) / 1000);

        if (elapsedTimeInSeconds >= limitTimeInSeconds) {
            clearInterval(timers[ticketNumber]);
            alert(`El ticket número ${ticketNumberValue} ha alcanzado el tiempo límite.`);
            // Limpiar la información almacenada al alcanzar el límite de tiempo
            localStorage.removeItem(`startTime${ticketNumber}`);
        } else {
            let minutes = Math.floor(elapsedTimeInSeconds / 60);
            let seconds = elapsedTimeInSeconds % 60;
            let countdownElement = document.getElementById(`countdown${ticketNumber}`);
            countdownElement.innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        }
    }, 1000);
}

function stopTimer(ticketNumber) {
    // Detener el temporizador si está en funcionamiento
    if (timers[ticketNumber]) {
        clearInterval(timers[ticketNumber]);
        let countdownElement = document.getElementById(`countdown${ticketNumber}`);
        countdownElement.innerText = "--:--";
        alert(`El temporizador del Ticket ${ticketNumber} ha sido detenido.`);
        // Limpiar la información almacenada al detener el temporizador
        localStorage.removeItem(`startTime${ticketNumber}`);
    }
}
