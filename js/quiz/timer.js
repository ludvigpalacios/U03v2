const grabTimerText = document.querySelector("#text-time-container");

grabTimerText.textContent = "5:00";
console.log("timer script loaded");

let timeLeft= 300; // 300 seconds = 5 minutes

startTimer();

function startTimer(){
    setInterval(() => {
        timeLeft--;

        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;

        grabTimerText.textContent = `${minutes}:${String(seconds).padStart(2, "0")}`;

        if (timeLeft === 0) {
            clearInterval(timer);
            grabTimerText.textContent = "0:00";
        }
    }, 1000);

}
