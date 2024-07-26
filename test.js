let timerMins = 0;
let timerSecondsOnes = 0;
let timerSecondsTens = 3;

const timer1 = document.querySelector(".timer");
function timerTick() {
    if (timerSecondsOnes == -1) {
        timerSecondsTens--;
        timerSecondsOnes = 9;
    }
    timer1.textContent = `${timerMins}:${timerSecondsTens}${timerSecondsOnes}`;
    if (timerSecondsOnes >= 0) {
        timerSecondsOnes--;

        if ((timerSecondsTens == 0) & (timerSecondsOnes == -1)) {
            timerSecondsTens = 0;
            timerSecondsOnes = 0;
            timer1.textContent = `${timerMins}:${timerSecondsTens}${timerSecondsOnes}`;
            return;
        }

        currentTimerId = setTimeout(timerTick, 1000);
    }
}
