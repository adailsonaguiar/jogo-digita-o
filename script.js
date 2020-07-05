const textArea = document.querySelector('textarea');
const buttonRestart = document.querySelector('.restart');
const theTimer = document.querySelector('.timer');
const currentText = document.querySelector('#test-area p');
timer = [3, 0, 0, 0];
var suggestedText = '';
var interval;
var timeRunning = false;

function leadingZero(time) {
  if (time <= 9) {
    time = `0${time}`;
  }
  return time;
}

function runTimer() {
  let currentTime =
    leadingZero(timer[0]) +
    ':' +
    leadingZero(timer[1]) +
    ':' +
    leadingZero(timer[2]);
  theTimer.innerHTML = currentTime;
  timer[3]++;

  timer[0] = Math.floor(timer[3] / 100 / 60);
  timer[1] = Math.floor(timer[3] / 100 - timer[0] * 60);
  timer[2] = Math.floor(timer[3] - timer[1] * 100 - timer[0] * 6000);
}

function start() {
  let textEnteredLength = textArea.value.length;
  if (textEnteredLength === 0 && !timeRunning) {
    timeRunning = true;
    interval = setInterval(runTimer, 10);
  }
}

function spellCheck() {
  let textEntered = textArea.value.trim().toLocaleLowerCase();

  console.log(suggestedText);
  let origintextMatch = suggestedText
    .trim()
    .substring(0, textEntered.length)
    .toLocaleLowerCase();
  if (textEntered == suggestedText.trim().toLocaleLowerCase()) {
    textArea.style.borderColor = '#429890';
    clearInterval(interval);
  } else {
    if (textEntered == origintextMatch) {
      textArea.style.borderColor = '#65CCf3';
    } else textArea.style.borderColor = '#E95D0F';
  }
}

function restart() {
  clearInterval(interval);
  interval = null;
  timer = [0, 0, 0, 0];
  timeRunning = false;

  textArea.value = '';
  theTimer.innerHTML = '00:00:00';
  textArea.style.borderColor = 'grey';
}

textArea.addEventListener('keypress', start, false);
textArea.addEventListener('keyup', spellCheck, false);
buttonRestart.addEventListener('click', restart, false);

fetch('https://allugofrases.herokuapp.com/frases/random', {
  method: 'GET',
}).then((value) => {
  value.json().then((value) => {
    currentText.innerHTML = value.frase;
    suggestedText = value.frase;
  });
});
