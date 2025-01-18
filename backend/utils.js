module.exports = {
  sleep: (ms = 100) => new Promise((resolve) => setTimeout(resolve, ms)),
};
