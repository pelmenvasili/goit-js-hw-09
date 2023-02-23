function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let intervalId;
const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');

const setRandomBcgColor = () => {
  intervalId = setInterval(function () {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startButton.disabled = true;
  stopButton.disabled = false;
};
const removeRandomBcgColor = () => {
  clearInterval(intervalId);
  startButton.disabled = false;
  stopButton.disabled = true;
};

startButton.addEventListener('click', setRandomBcgColor);
stopButton.addEventListener('click', removeRandomBcgColor);
