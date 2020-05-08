/*
LIST OF BUTTONS:
session-minutes-up
session-minutes-down
break-minutes-up
break-minutes-down
start
reset
pause
stop

LIST OF CHANGING-TEXT
session-minutes
break-minutes
remaining-time
*/
// LIST OF GLOBAL VARIABLES
const gDefaultSessionMinutes=25;
let gSessionMinutes= gDefaultSessionMinutes;
const gDefaultBreakMinutes=5;
let gBreakMinutes=gDefaultBreakMinutes;
// remainingTime will be kept in seconds
let gRemainingTime = gSessionMinutes*60;
let timerRunning;


const sessionMinutes = document.querySelector('#session-minutes');
const breakMinutes = document.querySelector('#break-minutes');
const remainingTime = document.querySelector('#remaining-time');

function startTimer() {
timerRunning = setInterval(updateTimer,1000)
}
function stopTimer() {
    clearInterval(timerRunning);
    gRemainingTime = gSessionMinutes*60;
    timeSessionString();
    //remainingTime.textContent = digit4 + digit3 + ':' + digit2 + digit1; // gRemainingTime reset to user defined value
} // right! let's try
// i modified timeSessionString function and added another function updateTimer
function pauseTimer() {
    clearInterval(timerRunning); // gRemainingTime remains frozen
}  

function resetTimer() { // gRemainingTime and gSessionMinutes are reset to defaults
    clearInterval(timerRunning);
    gRemainingTime = gDefaultSessionMinutes*60;
    remainingTime.textContent = "25:00"; 
    sessionMinutes.textContent = gDefaultSessionMinutes;
    breakMinutes.textContent = gDefaultBreakMinutes;
}

function updateTimer() {
    timeSessionString()
    gRemainingTime--;
    if (gRemainingTime == 0){
        clearInterval(timerRunning);
    }
}
function timeSessionString(){
    // on display: digit4 digit3 : digit2 digit1
    let minutes = Math.floor(gRemainingTime / 60); 
    let seconds = gRemainingTime - minutes*60;

    digit1 = seconds % 10;
    digit2 = Math.floor(seconds / 10);
    digit3 = minutes % 10;
    digit4 = Math.floor(minutes / 10);
    remainingTime.textContent = digit4 + "" + digit3 + ":" + digit2 + "" + digit1;
}

const container = document.querySelector('#container');
//ups and downs button
const sessionMinutesUp = document.querySelector('#session-minutes-up');
    sessionMinutesUp.addEventListener('click', (e)=> {
        gSessionMinutes += 1; // global var for number
        sessionMinutes.textContent = gSessionMinutes; // handler object 
    })
const sessionMinutesDown = document.querySelector('#session-minutes-down');
sessionMinutesDown.addEventListener('click', (e)=> {
    gSessionMinutes -= 1;
    gRemainingTime = gSessionMinutes * 60;
    sessionMinutes.textContent = gSessionMinutes;
})
const breakMinutesUp = document.querySelector('#break-minutes-up');
breakMinutesUp.addEventListener('click', (e)=> {
    gBreakMinutes += 1;
    breakMinutes.textContent = gBreakMinutes;
})
const breakMinutesDown = document.querySelector('#break-minutes-down');
breakMinutesDown.addEventListener('click', (e)=> {
    gBreakMinutes -= 1;
    breakMinutes.textContent = gBreakMinutes;
})
//Other buttons
const start = document.querySelector('#start');
    start.addEventListener('click', (e) => {
        startTimer();
    })
const reset = document.querySelector('#reset');
reset.addEventListener('click', (e) => {
    resetTimer();
})

const pause = document.querySelector('#pause');
pause.addEventListener('click', (e) => {
    pauseTimer();
})

const stop = document.querySelector('#stop');
stop.addEventListener('click', (e) => {
    stopTimer();
})
