import Notiflix from 'notiflix';

const delayRef = document.querySelector('input[name = "delay"]');
const stepRef = document.querySelector('input[name = "step"]');
const amountRef = document.querySelector('input[name = "amount"]');
const formRef = document.querySelector('.form');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

formRef.addEventListener('submit', event => {
  event.preventDefault();

  const delay = parseInt(delayRef.value);
  const step = parseInt(stepRef.value);
  const amount = parseInt(amountRef.value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay + (i - 1) * step)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
  }
});
