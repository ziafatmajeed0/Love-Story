let current = 0;
const screens = document.querySelectorAll('.screen');

function nextScreen() {
    screens[current].classList.add('hidden');
    current++;
    screens[current].classList.remove('hidden');
}

function handleAnswer() {
    confetti({ particleCount: 60, spread: 70 });
    setTimeout(nextScreen, 1200);
}

function handleDate(correct) {
    confetti({ particleCount: correct ? 80 : 30 });
    if (correct) setTimeout(nextScreen, 1500);
}

function checkPhoto() {
    confetti({ particleCount: 80 });
    setTimeout(nextScreen, 1500);
}

function moveNoButton() {
    const btn = document.getElementById('no-btn');
    btn.style.position = 'fixed';
    btn.style.left = Math.random() * 80 + 'vw';
    btn.style.top = Math.random() * 80 + 'vh';
}

function acceptProposal() {
    confetti({ particleCount: 200, spread: 360 });
    setTimeout(nextScreen, 2000);
}
