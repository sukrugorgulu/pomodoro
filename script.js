/*
LIST OF BUTTONS:
select-session
select-break
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
session-type
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
let session = 1; // 1 is sessiontime, 0 is breaktime

const theSound = document.querySelector('#thesound'); 

const sessionMinutes = document.querySelector('#session-minutes');
const breakMinutes = document.querySelector('#break-minutes');
const remainingTime = document.querySelector('#remaining-time');

const selectSession = document.querySelector('#select-session');
const selectBreak = document.querySelector('#select-break');
const sessiontype = document.querySelector('#session-type');

selectSession.addEventListener('click', switch2session);
selectBreak.addEventListener('click', switch2break);

function switch2session()
{
    session = 1;
    gRemainingTime = gSessionMinutes * 60;
    sessiontype.textContent = "Session";
    time2string();
}

function switch2break()
{
    session = 0;
    gRemainingTime = gBreakMinutes * 60;
    sessiontype.textContent = "Break";
    time2string();
}

function playaudio(){
    theSound.play();
    alert("Time is over.");
}

function startTimer() {
timerRunning = setInterval(updateTimer,10)
}

function stopTimer() {
    clearInterval(timerRunning);
    session ? gRemainingTime = gSessionMinutes*60: gRemainingTime = gBreakMinutes*60;
    time2string();
}

function pauseTimer() {
    clearInterval(timerRunning); // gRemainingTime remains frozen
}

function resetTimer() { // gRemainingTime and gSessionMinutes are reset to defaults
    clearInterval(timerRunning);
    gSessionMinutes = gDefaultSessionMinutes;
    gbreakMinutes = gDefaultBreakMinutes;
    sessionMinutes.textContent = gDefaultSessionMinutes;
    breakMinutes.textContent = gDefaultBreakMinutes;
    switch2session();
    time2string();
}

function updateTimer() {
    gRemainingTime--;
    if (gRemainingTime == 0){
        clearInterval(timerRunning);
        time2string();
        playaudio();
        session == 1 ? switch2break() : switch2session();
        startTimer();
    }
    time2string()
}

function time2string(){
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

const sessionMinutesUp = document.querySelector('#session-minutes-up');
sessionMinutesUp.addEventListener('click', (e)=> {
        gSessionMinutes += 1; // global var for number
        gRemainingTime = gSessionMinutes * 60;
        sessionMinutes.textContent = gSessionMinutes; // handler object 
        if (session == 1) time2string();
    })

const sessionMinutesDown = document.querySelector('#session-minutes-down');
sessionMinutesDown.addEventListener('click', (e)=> {
    if(gSessionMinutes>1) gSessionMinutes -= 1;
    gRemainingTime = gSessionMinutes * 60;
    sessionMinutes.textContent = gSessionMinutes;
    if (session == 1) time2string();

})

const breakMinutesUp = document.querySelector('#break-minutes-up');
breakMinutesUp.addEventListener('click', (e)=> {
    gBreakMinutes += 1;
    gRemainingTime = gBreakMinutes * 60;
    breakMinutes.textContent = gBreakMinutes;
    if (session == 0) time2string();
})

const breakMinutesDown = document.querySelector('#break-minutes-down');
breakMinutesDown.addEventListener('click', (e)=> {
    if(gBreakMinutes>1) gBreakMinutes -= 1;
    gRemainingTime = gBreakMinutes * 60;
    breakMinutes.textContent = gBreakMinutes;
    if (session ==0) time2string();
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
