let currentScreen = 0;
const screens = ['screen-landing', 'screen-q1', 'screen-q2', 'screen-date', 'screen-q3', 'screen-proposal', 'screen-ending'];
const noTexts = ["Mery jesa pyaar kon kry ga tjy 🤨", "Nice try 😏", "Nope 😌", "Can't catch me! 🏃‍♂️", "Wrong button! 😂", "I'm fast as f*** boi ⚡", "Too slow 🐢", "Try again 🤪", "Not this one! ❌"];

// --- Navigation ---
function nextScreen() {
    const current = document.getElementById(screens[currentScreen]);
    current.classList.remove('active');
    current.classList.add('hidden');

    // Cleanup No Button if it was moved to body
    const noBtn = document.getElementById('no-btn');
    if (noBtn && noBtn.parentNode === document.body) {
        noBtn.style.display = 'none';
    }

    currentScreen++;
    if (currentScreen < screens.length) {
        const next = document.getElementById(screens[currentScreen]);
        next.classList.remove('hidden');
        next.classList.add('active');

        // Show No Button only if entering proposal (and reset it)
        if (screens[currentScreen] === 'screen-proposal') {
            if (noBtn) {
                noBtn.style.display = 'inline-block'; // Or whatever flex/block it needs
                // We don't move it back to container because styling might break, 
                // but we ensure it's visible. 
                // Ideally, reset position to "initial" relative to screen if we wanted, 
                // but since it runs away, starting random is fine or reset to center?
                // Let's just make sure it's visible.
            }
        }
    }
}

// --- Question Handling ---
function handleAnswer(question, answer) {
    const feedback = document.getElementById(`${question}-feedback`);
    feedback.classList.remove('hidden');

    // Custom Feedback Content based on Question
    let emoji = '💖';
    let text = 'Perfect!';

    if (question === 'q1') {
        emoji = '💗';
        text = 'You always had my heart';
    } else if (question === 'q2') {
        emoji = '✈️💕';
        text = 'Packing memories already 😍';
    }

    feedback.innerHTML = `
        <div class="big-emoji">${emoji}</div>
        <p>${text}</p>
    `;

    // Pop Effect Confetti
    confetti({
        shapes: ['heart'],
        colors: ['#ff4d6d', '#ff99ac'],
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
    });

    // Auto advance
    setTimeout(() => {
        nextScreen();
    }, 2000);
}

// --- Date Question Logic ---
function handleDateAnswer(type) {
    const feedback = document.getElementById('date-feedback');
    feedback.className = 'feedback'; // Reset classes

    if (type === 'correct') {
        feedback.innerHTML = `
            <div class="big-emoji">😘💖</div>
            <p>You remember everything! <br> I love you too! 💋</p>
        `;
        feedback.classList.remove('hidden');

        // Kisses Effect
        confetti({
            shapes: ['heart'],
            colors: ['#ff0000', '#ff4d6d'],
            particleCount: 50,
            spread: 100,
            origin: { y: 0.6 }
        });

        setTimeout(() => nextScreen(), 2500);
    } else {
        feedback.innerHTML = `
            <div class="big-emoji">💔⚡</div>
            <p>OUCH! <br> That hurts... 😭</p>
        `;
        feedback.classList.remove('hidden');
        feedback.classList.add('shake-anim'); // Shake it!

        // Hide it after a bit so they can try again? Or just move on?
        // User implied "heavy effect" but Flow usually moves on. 
        // Let's let them try again? Or move on with guilt? 
        // "Next screen" is standard, but maybe delay longer strictly.
        setTimeout(() => {
            feedback.classList.add('hidden');
            feedback.classList.remove('shake-anim');
        }, 2000);
    }
}

// --- Photo Question ---
function checkPhotoAnswer() {
    const input = document.getElementById('photo-guess').value.toLowerCase();
    const feedback = document.getElementById('q3-feedback');

    // Generous check - if they typed anything, it's correct!
    if (input.length > 0) {
        feedback.innerHTML = `
            <div class="big-emoji">📸✨</div>
            <p>You remember everything! <br> Best memory ever! 💖</p>
        `;
        feedback.classList.remove('hidden');

        // Confetti
        confetti({
            shapes: ['circle', 'square'],
            colors: ['#ff0055', '#ff99ac'],
            particleCount: 80,
            spread: 90,
            origin: { y: 0.6 }
        });

        setTimeout(() => nextScreen(), 2500);
    } else {
        // Only if empty
        feedback.innerHTML = `
            <div class="big-emoji">😌✨</div>
            <p>It's okay!<br>The moment was perfect anyway! 💕</p>
        `;
        feedback.classList.remove('hidden');
        setTimeout(() => nextScreen(), 2000);
    }
}

// --- No Button Logic ---
// --- No Button Logic ---
function moveNoButton() {
    const btn = document.getElementById('no-btn');

    // CRITICAL FIX: Move button to body so it escapes the parent's transform context
    // otherwise 'position: fixed' is relative to the transformed parent, not the viewport.
    if (btn.parentNode !== document.body) {
        document.body.appendChild(btn);
        btn.style.position = 'fixed';
        btn.style.zIndex = '9999'; // Stay on top of everything
    }

    // Get viewport dimensions (safe zone)
    // Reduce margin to keep it well within screen
    const maxX = window.innerWidth - btn.offsetWidth - 40;
    const maxY = window.innerHeight - btn.offsetHeight - 40;

    const randomX = Math.max(20, Math.random() * maxX); // At least 20px from edge
    const randomY = Math.max(20, Math.random() * maxY);

    // Random Rotate
    const randomRotate = (Math.random() - 0.5) * 45;

    // Apply new position
    btn.style.left = randomX + 'px';
    btn.style.top = randomY + 'px';
    btn.style.transform = `rotate(${randomRotate}deg)`;

    // Change Text (More variety)
    const funnyTexts = [
        "Mery jesa pyaar kon kry ga tjy 🤨",
        "Nice try 😏",
        "Nope 😌",
        "Can't catch me! 🏃‍♂️",
        "Wrong button! 😂",
        "I'm fast as f*** boi ⚡",
        "Too slow 🐢",
        "Try again 🤪",
        "Not this one! ❌"
    ];
    const randomText = funnyTexts[Math.floor(Math.random() * funnyTexts.length)];
    btn.innerText = randomText;
    btn.style.backgroundColor = '#ff0000';
}

// Add touch support for mobile
document.addEventListener('DOMContentLoaded', () => {
    const noBtn = document.getElementById('no-btn');
    if (noBtn) {
        noBtn.addEventListener('touchstart', (e) => {
            e.preventDefault(); // Prevent clicking
            moveNoButton();
        });
    }
});

// --- Yes Button Logic ---
function acceptProposal() {
    // 1. Initial Standard Burst
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff4d6d', '#ff8fa3', '#ffffff']
    });

    // 2. Realistic Fireworks Effect
    var duration = 5 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function () {
        var timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        var particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);

    // 3. Heart Rain
    (function frame() {
        confetti({
            particleCount: 5,
            angle: 270,
            spread: 180,
            gravity: 1.5,
            drift: 0,
            scalar: 2, // Bigger hearts
            shapes: ['heart'],
            colors: ['#ff0000', '#ff4d6d'],
            origin: { y: -0.1, x: Math.random() } // falls from top
        });

        if (Date.now() < animationEnd) {
            requestAnimationFrame(frame);
        }
    }());

    // Go to ending screen after short delay
    setTimeout(() => {
        nextScreen();
    }, 3000); // 3 seconds delay to enjoy the fireworks
}

// --- Floating Hearts Background ---
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart-float');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 7 + 's'; // 7-10s
    heart.style.fontSize = Math.random() * 20 + 10 + 'px';

    document.getElementById('hearts-bg').appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 10000);
}

// --- Gold Dust (Ultra Pro Max) ---
function createGoldDust() {
    const dust = document.createElement('div');
    dust.classList.add('gold-dust');
    dust.style.left = Math.random() * 100 + 'vw';
    dust.style.animationDuration = Math.random() * 5 + 5 + 's';
    dust.style.opacity = Math.random();
    document.body.appendChild(dust); // Append to body to flow behind

    setTimeout(() => {
        dust.remove();
    }, 10000);
}

setInterval(createHeart, 500);
setInterval(createGoldDust, 200); // More dust than hearts

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
    console.log("Love Story Loaded 💕");
});

// --- Poetry Section (Manual Trigger) ---
function showPoem() {
    const ending = document.getElementById('screen-ending');
    const poemScreen = document.getElementById('screen-poetry');

    ending.classList.remove('active');
    ending.classList.add('hidden');

    poemScreen.classList.remove('hidden');
    poemScreen.classList.add('active');

    // Trigger effects for poem
    confetti({
        particleCount: 100,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#ffd700', '#ffeb3b'], // Gold colors
        shapes: ['star']
    });
}