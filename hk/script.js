function updateCountdown() {
    const targetDate = new Date('2025-08-27T16:20:00+08:00'); // Hong Kong Time (GMT+8)
    const now = new Date();
    const timeLeft = targetDate - now;

    if (timeLeft < 0) {
        document.getElementById('countdown').innerHTML = '<h2>The portal is open!</h2>';
        clearInterval(countdownInterval);
        return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}

updateCountdown();
const countdownInterval = setInterval(updateCountdown, 1000);


