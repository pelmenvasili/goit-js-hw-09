import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');
const startBtn = document.querySelector('button[data-start]');

let intervalId = null;
startBtn.disabled = true;
let targetDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      startBtn.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future!');
    } else {
      targetDate = selectedDates[0];
      startBtn.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const addLeadingZero = value => {
  return String(value).padStart(2, '0');
};

const updateCountdown = () => {
  intervalId = setInterval(() => {
    startBtn.disabled = true;
    const currentTime = Date.now();
    const deltaTime = targetDate - currentTime;
    if (deltaTime < 1000) {
      clearInterval(intervalId);
      startBtn.disabled = false;
    }
    const { days: d, hours: h, minutes: m, seconds: s } = convertMs(deltaTime);
    days.textContent = addLeadingZero(d);
    hours.textContent = addLeadingZero(h);
    minutes.textContent = addLeadingZero(m);
    seconds.textContent = addLeadingZero(s);
  }, 1000);
};

startBtn.addEventListener('click', updateCountdown);
