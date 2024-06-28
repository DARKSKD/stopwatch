let startTime,
updatedTime,
difference,
Interval,
running = false,
lapTimes = [];

const startButton = document.getElementById('Start');
const pauseButton = document.getElementById('Stop');
const resetButton = document.getElementById('Reset');
const lapButton = document.getElementById('Lap');
const display = document.getElementById('clock');
const lapsContainer = document.getElementById('lap_show');

startButton.addEventListener('click', start);
pauseButton.addEventListener('click', stop);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', recordlap);

function start() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        Interval = setInterval(updateTime, 1);
        running = true;
    }
}

function stop() {
    if (running) {
        clearInterval(Interval);
        difference = new Date().getTime() - startTime;
        running = false;
    }
}

function reset() {
    clearInterval(Interval);
    difference = 0;
    running = false;
    lapTimes = [];
    display.innerHTML = '00:00:00.000';
    lapsContainer.innerHTML = '';
}

function recordlap() {
    if (running) {
        const lapTime = formatTime(new Date().getTime() - startTime);
        lapTimes.push(lapTime);
        displayLaps();
    }
}

function updateTime() {
    updatedTime = new Date().getTime() - startTime;
    display.innerHTML = formatTime(updatedTime);
}

function formatTime(time) {
    const milliseconds = Math.floor(time % 1000);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 3)}`;
}

function pad(number, digits = 2) {
    return number.toString().padStart(digits, '0');
}

function displayLaps() {
    lapsContainer.innerHTML = lapTimes.map((lap, index) => `<li>Lap ${index + 1}: ${lap}</li>`).join('');
}