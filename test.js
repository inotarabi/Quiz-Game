// let timerMins = 0;
// let timerSecondsOnes = 0;
// let timerSecondsTens = 0;

// let seconds = 15;

// const timer1 = document.querySelector(".timer");

// function timerTick() {
//     timerSecondsTens = Math.floor(seconds / 10);
//     timerSecondsOnes = seconds % 10;
//     if (timerSecondsOnes == -1) {
//         timerSecondsTens--;
//         timerSecondsOnes = 9;
//     }
//     timer1.textContent = `${timerMins}:${timerSecondsTens}${timerSecondsOnes}`;
//     if (timerSecondsOnes >= 0) {
//         timerSecondsOnes--;

//         if ((timerSecondsTens == 0) & (timerSecondsOnes == -1)) {
//             timerSecondsTens = 0;
//             timerSecondsOnes = 0;
//             timer1.textContent = `${timerMins}:${timerSecondsTens}${timerSecondsOnes}`;
//             return;
//         }

//         currentTimerId = setTimeout(timerTick, 1000);
//     }
// }

// timerTick();

// let timerMins = 0;
// let timerSecondsOnes = 0;
// let timerSecondsTens = 0;

// let seconds = 15;

// const timer1 = document.querySelector(".timer");

// function timerTick() {

//     timerSecondsTens = Math.floor(seconds / 10);
//     timerSecondsOnes = seconds % 10;

//     timer1.textContent = `${timerMins}:${timerSecondsTens}${timerSecondsOnes}`;

//     seconds--;

//     if (seconds < 0) {
//         return;
//     }

//     setTimeout(timerTick, 1000);
// }

// timerTick();
