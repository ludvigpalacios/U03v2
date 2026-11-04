const grabTimerText = document.querySelector("#text-time-container");


grabTimerText.textContent = "5:00";
console.log("timer script loaded");

let timeLeft= 300; // 300 seconds = 5 minutes
let timer;


resetTimer();

function resetTimer(){
    clearInterval(timer);

    timeLeft=300;
    
    timer = setInterval(() => {
        timeLeft--;

        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;

        grabTimerText.textContent = `${minutes}:${String(seconds).padStart(2, "0")}`;

        if (timeLeft === 0) {
            clearInterval(timer);
            grabTimerText.textContent = "0:00";

            //Disable all the buttons, show nextButton
            grabQuizbutton.forEach(button => {
                button.classList.add("disabled");
            })
            grabNextButton.classList.remove("hide");
            updateExplanation(jsonData.questions[atQuestion].explanation);
        }
    }, 10); //Update to 1000 when finished

}
