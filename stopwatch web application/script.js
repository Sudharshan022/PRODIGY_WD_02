let startTime;
let updatedTime;
let difference;
let interval;
let running = false;
let lapCounter = 0;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

function startTimer() {
    startTime = new Date().getTime();
    interval = setInterval(updateTime, 10);
    running = true;
}

function stopTimer() {
    clearInterval(interval);
    running = false;
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000) / 10);

    display.textContent = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
}

function formatTime(unit) {
    return unit < 10 ? '0' + unit : unit;
}

startStopBtn.addEventListener('click', () => {
    if (!running) {
        startTimer();
        startStopBtn.textContent = 'Pause';
        startStopBtn.classList.add('pause');
    } else {
        stopTimer();
        startStopBtn.textContent = 'Start';
        startStopBtn.classList.remove('pause');
    }
});

resetBtn.addEventListener('click', () => {
    stopTimer();
    display.textContent = '00:00:00';
    laps.innerHTML = '';
    startStopBtn.textContent = 'Start';
    startStopBtn.classList.remove('pause');
    lapCounter = 0;
});

lapBtn.addEventListener('click', () => {
    if (running) {
        lapCounter++;
        const lapTime = display.textContent;
        const lapItem = document.createElement('div');
        lapItem.className = 'lap';
        lapItem.textContent = `Lap ${lapCounter}: ${lapTime}`;
        laps.appendChild(lapItem);
    }
});
