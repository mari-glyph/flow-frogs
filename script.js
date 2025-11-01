// Timer state
let timerInterval = null;
let remainingTime = 0;
let totalTime = 0;
let isPaused = false;

// Frog animation state
let fliesCaught = 0;
let catchInterval = null;
let nextCatchTime = 0;
let flyAnimationFrame = null;
let animationStartTime = null;

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
const frog = document.getElementById('frog');
const bam = document.getElementById('bam');
const fliesCount = document.getElementById('fliesCount');

// Audio for notification
const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBzWM0+3RhzQHHGS57OihURELTKXh8bllHAY2kNXzzn0pBSh+zPLaizsIHGS56+mjURELTKXh8bllHAY3kNXzzn0pBSh+zPLaizsIHGS56+mjURELTKXh8bllHAY3kNXzzn0pBSh+zPLaizsIHGS56+mjURELTKXh8bllHAY3kNXzzn0pBSh+zPLaizsIHGS56+mjURELTKXh8bllHAY3kNXzzn0pBSh+zPLaizsIHGS56+mjURELTKXh8bllHAY3kNXzzn0pBSh+zPLaizsIHGS56+mjURELTKXh8bllHAY3kNXzzn0pBSh+zPLaizsIHGS56+mjURELTKXh8bllHAY3kNXzzn0pBSh+zPLaizsIHGS56+mjURELTKXh8bllHAY3kNXzzn0pBSh+zPLaizsIHGS56+mjURELTKXh8bllHAY3kNXzzn0pBSh+zPLaizsIHGS56+mjURELTKXh8bllHAY3kNXzzn0pBSh+zPLaizsIHGS56+mjURELTKXh8bllHAY3kNXzzn0pBSh+zPLaizsIHGS56+mjURELTKXh8bllHAY3kNXzzn0pBSh+zPLaizsIHGS56+mjURELTKXh8bllHAY3kNXzzn0pBSh+zPLaizsIHGS56+mjURELTKXh8bllHAY3kNXzzn0pBSh+zPLaizsIHGS56+mjURELTKXh8bllHAY3kNXzzn0pBSh+zPLaizsIHGS56+mjURELTKXh8bllHAY3kNXzzn0pBSh+zPLaizsIHGS56+mjURELTKXh8bllHAY3kNXzzn0pBSh+zPLaizsIHGS56+mjURELTKXh8bllHAY3kNXzzn0pBSh+zPLaizsIHGS56+mjURELTKXh8bllHAY3kNXzzn0pBSh+zPLaizsIHGS56+mjURELTKXh8bllHAY3kNXzzn0pBSh+zPLaizsIHGS56+mjURELTKXh8bllHAY3kNXzzn0pBSh+zPLaizsIHGS56+mjURELTKXh8bllHAY3kNXzzn0pBSh+zPLaizsIHGS56+mjURELTKXh8bllHAY3kNXzzn0pBSh+zPLaizsIHGS56+mjURELTKXh8bllHAY3kNXzzn0pBSh+zPLaizsIHGS56+mjURELTKXh8bllHAY3kNXzzn0pBSh+zPLaizsIHGS56+mjURELTKXh8bllHAY3kNXzzn0pBSh+zPLaizsIHGS56+mjURELTKXh8bllHAY3kNXzzn0pBSh+zPLaizsIHGS56+mjURELTKXh8bllHAY3kNXzzn0pBSh+zPLaizsIHGS56+mjURELTKXh8bllHAY3kNXzzn0pBSh+zPLaizsIHGS56+mjURELTKXh8bllHAY3kNXzzn0pBSh+zPLaizsIHGS56+mjURELTKXh8bllHAY3kNXzzn0pBSh+zPLaizsIHGS56+mjURELTKXh8bllHAY3kNXzzn0pBSh+zPLaizsIHGS56+mjURELTKXh8bllHAY3kNXzzn0pBSh+zPLaizsIHGS56+mjURELTKXh8bllHAY3kNXzzn0pBSh+zPLaizsIHGS56+mjURELTKXh8bllHAY3kNXzzn0pBSh+zPLaizsIHGS56+mjURELTKXh8bllHAY3kNXzzn0pBSh+zPLaizsIHGS56+mjURELTKXh8bllHAY3kNXzzn0pBSh+zPLaizsI=');

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

// Update frog grayscale based on progress
function updateFrogColor(percent) {
    // 0% = full grayscale (100%), 100% = no grayscale (0%)
    const grayscale = 100 - percent;
    frog.style.filter = `grayscale(${grayscale}%)`;
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
    updateFrogColor(progress);

    // Update document title
    document.title = `${formatTime(remainingTime)} - Timer`;
}

// Calculate fly position and update its transform smoothly
function updateFlyPosition() {
    if (!timerInterval && remainingTime > 0) return; // Only update when timer is running

    const elapsed = totalTime - remainingTime;

    // Add sub-second precision for smooth animation
    const now = Date.now();
    const msSinceSecond = animationStartTime ? ((now - animationStartTime) % 1000) / 1000 : 0;
    const preciseElapsed = elapsed + msSinceSecond;

    const angle = (preciseElapsed / 60) * 360; // 60 seconds for full orbit
    const angleRad = (angle * Math.PI) / 180;
    const orbitRadius = 250; // pixels from center

    const x = Math.cos(angleRad) * orbitRadius;
    const y = Math.sin(angleRad) * orbitRadius;

    fly.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
}

// Continuous fly animation loop
function animateFly() {
    if (timerInterval && remainingTime > 0) {
        updateFlyPosition();
        flyAnimationFrame = requestAnimationFrame(animateFly);
    }
}

// Get current fly angle
function getCurrentFlyAngle() {
    const elapsed = totalTime - remainingTime;
    return (elapsed / 60) * 360; // degrees
}

// Calculate frog rotation to face fly
function calculateFrogRotation() {
    const angle = getCurrentFlyAngle();
    return angle + 90; // Head is at top, so add 90 degrees to face fly
}

// Catch fly animation
function catchFly() {
    if (isPaused || remainingTime === 0) return;

    // 1. Rotate frog to face the fly
    const frogRotation = calculateFrogRotation();
    frog.classList.add('rotating');
    frog.style.transform = `translate(-50%, -50%) rotate(${frogRotation}deg)`;

    setTimeout(() => {
        // 2. Shoot tongue (aligned bottom with center)
        tongue.style.transform = `translate(-50%, -100%) rotate(${frogRotation}deg)`;
        tongue.classList.add('shoot');

        // 3. Get current fly position for bam placement
        const angle = getCurrentFlyAngle();
        const angleRad = (angle * Math.PI) / 180;
        const orbitRadius = 250;
        const flyX = Math.cos(angleRad) * orbitRadius;
        const flyY = Math.sin(angleRad) * orbitRadius;

        setTimeout(() => {
            // 4. Start moving fly toward center and show Bam!
            const randomRotation = Math.random() * 360;
            bam.style.transform = `translate(calc(-50% + ${flyX}px), calc(-50% + ${flyY}px)) rotate(${randomRotation}deg)`;
            bam.classList.add('show');

            // Start fly moving to center (over 300ms to match tongue retraction)
            const startTime = Date.now();
            const duration = 300;

            const animateFlyToCenter = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);

                const currentX = flyX * (1 - progress);
                const currentY = flyY * (1 - progress);

                fly.style.transform = `translate(calc(-50% + ${currentX}px), calc(-50% + ${currentY}px))`;

                if (progress < 1) {
                    requestAnimationFrame(animateFlyToCenter);
                } else {
                    // Fly reached center
                    setTimeout(() => {
                        // Reset everything
                        tongue.classList.remove('shoot');
                        bam.classList.remove('show');
                        frog.classList.remove('rotating');
                        frog.style.transform = 'translate(-50%, -50%)';
                        tongue.style.transform = 'translate(-50%, -100%)'; /* Keep bottom aligned */

                        // Increment counter
                        fliesCaught++;
                        fliesCount.textContent = fliesCaught;
                    }, 100);
                }
            };

            requestAnimationFrame(animateFlyToCenter);
        }, 300); // Wait for tongue to extend
    }, 300); // Wait for frog to rotate
}

// Schedule fly catches - 1.5 times every 2 minutes = once every 80 seconds
function scheduleFlycatches() {
    // Clear any existing schedule
    if (catchInterval) {
        clearInterval(catchInterval);
    }

    // Catch interval: 80 seconds (1.5 catches per 2 minutes)
    const catchFrequency = 80; // seconds

    // Schedule first catch
    nextCatchTime = catchFrequency;

    // Don't use setInterval, check every second in tick function
}

// Check if it's time to catch a fly
function checkFlyCatch() {
    const elapsed = totalTime - remainingTime;

    // Check if we've reached the next catch time
    if (elapsed >= nextCatchTime && elapsed < nextCatchTime + 1) {
        catchFly();
        nextCatchTime += 80; // Schedule next catch in 80 seconds
    }
}

// Timer tick
function tick() {
    if (remainingTime > 0) {
        remainingTime--;
        updateDisplay();
        checkFlyCatch();
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
    fliesCaught = 0;
    fliesCount.textContent = '0';

    timeInput.style.display = 'none';
    timerDisplay.style.display = 'block';
    presets.style.display = 'none';

    startBtn.style.display = 'none';
    pauseBtn.style.display = 'inline-block';
    resetBtn.style.display = 'inline-block';

    // Schedule fly catches
    scheduleFlycatches();

    updateDisplay();
    animationStartTime = Date.now();
    timerInterval = setInterval(tick, 1000);

    // Start smooth fly animation
    animateFly();
}

// Pause timer
function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    if (flyAnimationFrame) {
        cancelAnimationFrame(flyAnimationFrame);
        flyAnimationFrame = null;
    }
    isPaused = true;

    pauseBtn.style.display = 'none';
    resumeBtn.style.display = 'inline-block';
}

// Resume timer
function resumeTimer() {
    isPaused = false;

    resumeBtn.style.display = 'none';
    pauseBtn.style.display = 'inline-block';

    animationStartTime = Date.now();
    timerInterval = setInterval(tick, 1000);

    // Resume smooth fly animation
    animateFly();
}

// Reset timer
function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    if (flyAnimationFrame) {
        cancelAnimationFrame(flyAnimationFrame);
        flyAnimationFrame = null;
    }
    remainingTime = 0;
    totalTime = 0;
    isPaused = false;
    fliesCaught = 0;
    nextCatchTime = 0;
    animationStartTime = null;

    // Clear any ongoing animations
    tongue.classList.remove('shoot');
    bam.classList.remove('show');
    frog.classList.remove('rotating');
    frog.style.transform = 'translate(-50%, -50%)';
    frog.style.filter = 'grayscale(100%)';
    tongue.style.transform = 'translate(-50%, -100%)'; /* Keep bottom aligned */
    fly.style.transform = 'translate(-50%, -50%)';

    timeInput.style.display = 'flex';
    timerDisplay.style.display = 'none';
    presets.style.display = 'flex';

    startBtn.style.display = 'inline-block';
    pauseBtn.style.display = 'none';
    resumeBtn.style.display = 'none';
    resetBtn.style.display = 'none';

    document.title = 'Timer';
}

// Finish timer
function finishTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    if (flyAnimationFrame) {
        cancelAnimationFrame(flyAnimationFrame);
        flyAnimationFrame = null;
    }

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
