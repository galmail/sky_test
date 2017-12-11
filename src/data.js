// data.js

function randomDelayPromise(data) {
  const delay = Math.floor(Math.random() * 500) + 100;
  return new Promise(resolve => setTimeout(() => resolve(data), delay));
}

export default {
  getTemperatures: () => randomDelayPromise(require('./temperatures.json')),
};
