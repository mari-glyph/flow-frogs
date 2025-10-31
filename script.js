// Timer state
let timerInterval = null;
let remainingTime = 0;
let totalTime = 0;
let isPaused = false;

// Frog animation state
let fliesCaught = 0;
let catchInterval = null;
let nextCatchTime = 0;

// DOM elements
const timeInput = document.getElementById('timeInput');
const timerDisplay = document.getElementById('timerDisplay');
const timeRemaining = document.getElementById('timeRemaining');
const progressCircle = document.getElementById('progressCircle');

const hoursInput = document.getElementById('hours');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');

const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resumeBtn = document.getElementById('resumeBtn');
const resetBtn = document.getElementById('resetBtn');

const presets = document.getElementById('presets');
const notification = document.getElementById('notification');
const dismissBtn = document.getElementById('dismissBtn');

// Frog elements
const fly = document.getElementById('fly');
const tongue = document.getElementById('tongue');
const frogMouthFly = document.getElementById('frogMouthFly');
const fliesCount = document.getElementById('fliesCount');

// Audio for notification
const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBzWM0+3RhzQHHGS57OihURELTKXh8bllHAY2kNXzzn0pBSh+zPLaizsIHGS56+mjURELTKXh8bllHAY3kNXzzn0pBSh+zPLaizsIHGS56+mjURELTKXh8bllHAY3kNXzzn0pBSh+zPLaizsIHGS56+mjURELTKXh8bllHAY3kNXzzn0pBSh+zPLaizsIHGS56+mjURELTKXh8bllHAY3kNXzzn0pBSh+zPLaizsIHGS56+mjURELTKXh8bllHAY3kNXzzn0pBSh+zPLaizsIHGS56+mjURELTKXh8bllHAY3kNXzzn0pBSh+zPLaizsIHGS56+mjURELTKXh8bllHAY3kNXzzn0pBSh+zPLaizsIHGS56+mjURELTKXh8bllHAY3kNXzzn0pBSh+zPLaizsIHGS56+mjURELTKXh8bllHAY3kNXzzn0pBSh+zPLaizsIHGS56+mjURELTKXh8bllHAY3kNXzzn0pBSh+zPLaizsIHGS56+mjURELTKXh8bllHAY3kNXzzn0pBSh+zPLaizsIHGS56+mjURELTKXh8bllHAY3kNXzzn0pBSh+zPLaizsIHGS56+mjURELTKXh8bllHAY3kNXzzn0pBSh+zPLaizsIHGS56+mjURELTKXh8bllHAY3kNXzzn0pBSh+zPLaizsIHGS56+mjURELTKXh8bllHAY3kNXzzn0pBSh+zPLaizsIHGS56+mjURELTKXh8bllHAY3kNXzzn0pBSh+zPLaizsIHGS56+mjURELTKXh8bllHAY3kNXzzn0pBSh+zPLaizsIHGS56+mjURELTKXh8bllHAY3kNXzzn0pBSh+zPLaizsIHGS56+mjURELTKXh8bllHAY3kNXzzn0pBSh+zPLaizsIHGS56+mjURELTKXh8bllHAY3kNXzzn0pBSh+zPLaizsIHGS56+mjURELTKXh8bllHAY3kNXzzn0pBSh+zPLaizsIHGS56+mjURELTKXh8bllHAY3kNXzzn0pBSh+zPLaizsIHGS56+mjURELTKXh8bllHAY3kNXzzn0pBSh+zPLaizsIHGS56+mjURELTKXh8bllHAY3kNXzzn0pBSh+zPLaizsIHGS56+mjURELTKXh8bllHAY3kNXzzn0pBSh+zPLaizsIHGS56+mjURELTKXh8bllHAY3kNXzzn0pBSh+zPLaizsIHGS56+mjURELTKXh8bllHAY3kNXzzn0pBSh+zPLaizsIHGS56+mjURELTKXh8bllHAY3kNXzzn0pBSh+zPLaizsIHGS56+mjURELTKXh8bllHAY3kNXzzn0pBSh+zPLaizsIHGS56+mjURELTKXh8bllHAY3kNXzzn0pBSh+zPLaizsIHGS56+mjURELTKXh8bllHAY3kNXzzn0pBSh+zPLaizsIHGS56+mjURELTKXh8bllHAY3kNXzzn0pBSh+zPLaizsIHGS56+mjURELTKXh8bllHAY3kNXzzn0pBSh+zPLaizsIHGS56+mjURELTKXh8bllHAY3kNXzzn0pBSh+zPLaizsIHGS56+mjURELTKXh8bllHAY3kNXzzn0pBSh+zPLaizsIHGS56+mjURELTKXh8bllHAY3kNXzzn0pBSh+zPLaizsIHGS56+mjURELTKXh8bllHAY3kNXzzn0pBSh+zPLaizsI=');

// Initialize progress circle
const radius = progressCircle.r.baseVal.value;
const circumference = radius * 2 * Math.PI;
progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
progressCircle.style.strokeDashoffset = circumference;

// Format time display
function formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hrs > 0) {
        return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Update progress circle
function setProgress(percent) {
    const offset = circumference - (percent / 100) * circumference;
    progressCircle.style.strokeDashoffset = offset;
}

// Get total seconds from inputs
function getTotalSeconds() {
    const hours = parseInt(hoursInput.value) || 0;
    const minutes = parseInt(minutesInput.value) || 0;
    const seconds = parseInt(secondsInput.value) || 0;
    return hours * 3600 + minutes * 60 + seconds;
}

// Set time inputs from seconds
function setTimeInputs(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    hoursInput.value = hours;
    minutesInput.value = minutes;
    secondsInput.value = secs;
}

// Update timer display
function updateDisplay() {
    timeRemaining.textContent = formatTime(remainingTime);
    const progress = ((totalTime - remainingTime) / totalTime) * 100;
    setProgress(progress);

    // Update document title
    document.title = `${formatTime(remainingTime)} - Timer`;
}

// Timer tick
function tick() {
    if (remainingTime > 0) {
        remainingTime--;
        updateDisplay();
    } else {
        finishTimer();
    }
}

// Start timer
function startTimer() {
    const seconds = getTotalSeconds();

    if (seconds === 0) {
        alert('Please set a time greater than 0');
        return;
    }

    totalTime = seconds;
    remainingTime = seconds;

    timeInput.style.display = 'none';
    timerDisplay.style.display = 'block';
    presets.style.display = 'none';

    startBtn.style.display = 'none';
    pauseBtn.style.display = 'inline-block';
    resetBtn.style.display = 'inline-block';

    updateDisplay();
    timerInterval = setInterval(tick, 1000);
}

// Pause timer
function pauseTimer() {
    clearInterval(timerInterval);
    isPaused = true;

    pauseBtn.style.display = 'none';
    resumeBtn.style.display = 'inline-block';
}

// Resume timer
function resumeTimer() {
    isPaused = false;

    resumeBtn.style.display = 'none';
    pauseBtn.style.display = 'inline-block';

    timerInterval = setInterval(tick, 1000);
}

// Reset timer
function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    remainingTime = 0;
    totalTime = 0;
    isPaused = false;

    timeInput.style.display = 'flex';
    timerDisplay.style.display = 'none';
    presets.style.display = 'flex';

    startBtn.style.display = 'inline-block';
    pauseBtn.style.display = 'none';
    resumeBtn.style.display = 'none';
    resetBtn.style.display = 'none';

    document.title = 'Timer';
    setProgress(0);
}

// Finish timer
function finishTimer() {
    clearInterval(timerInterval);

    // Play sound
    audio.play().catch(e => console.log('Audio play failed:', e));

    // Show notification
    notification.classList.add('show');

    // Flash the title
    let flashCount = 0;
    const flashInterval = setInterval(() => {
        document.title = flashCount % 2 === 0 ? '⏰ Timer finished!' : 'Timer';
        flashCount++;
        if (flashCount >= 10) {
            clearInterval(flashInterval);
            document.title = '⏰ Timer finished!';
        }
    }, 500);
}

// Event listeners
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resumeBtn.addEventListener('click', resumeTimer);
resetBtn.addEventListener('click', resetTimer);

dismissBtn.addEventListener('click', () => {
    notification.classList.remove('show');
    resetTimer();
});

// Preset buttons
presets.addEventListener('click', (e) => {
    if (e.target.classList.contains('preset-btn')) {
        const seconds = parseInt(e.target.dataset.time);
        setTimeInputs(seconds);
    }
});

// Input validation
[hoursInput, minutesInput, secondsInput].forEach(input => {
    input.addEventListener('input', function() {
        const max = parseInt(this.max);
        const value = parseInt(this.value);

        if (value > max) {
            this.value = max;
        } else if (value < 0) {
            this.value = 0;
        }
    });

    // Allow Enter key to start timer
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            startTimer();
        }
    });
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Space to pause/resume
    if (e.code === 'Space' && timerDisplay.style.display === 'block') {
        e.preventDefault();
        if (isPaused) {
            resumeTimer();
        } else if (timerInterval) {
            pauseTimer();
        }
    }

    // Escape to reset
    if (e.code === 'Escape' && timerInterval) {
        resetTimer();
    }
});

// Notification on page visibility change
document.addEventListener('visibilitychange', () => {
    if (!document.hidden && remainingTime === 0 && timerInterval === null) {
        notification.classList.add('show');
    }
});
