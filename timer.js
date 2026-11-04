let intervalId = null;

export function startTimer(seconds, onTick, onTimeUp) {
  stopTimer(); // make sure only one timer runs at a time
  let secondsLeft = seconds;
  onTick(secondsLeft);

  intervalId = setInterval(() => {
    secondsLeft--;
    onTick(secondsLeft);

    if (secondsLeft <= 0) {
      stopTimer();
      onTimeUp();
    }
  }, 1000);
}

export function stopTimer() {
  clearInterval(intervalId);
}
