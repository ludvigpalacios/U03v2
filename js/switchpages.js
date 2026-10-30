//Grab elements
const grabHeader = document.querySelector(".app-header");
const grabMain = document.querySelector(".main-app");
const grabiFrame = document.querySelector(".leaderboard-iframe");

const grabLogo = document.querySelector(".logo");

//Quiz
const grabQuiz = document.querySelector(".app-button");

//Event listener
grabHeader.addEventListener("keydown", (e)=>{
    if(e.key==="Enter"){
        e.preventDefault();

    }
})

window.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(e);
    if(e.target.matches("button.leaderboard-button")){
        //Hide the main
        //Removing onclick="window.location.href='leaderboard.html'"

        grabMain.classList.add("hide");
        grabiFrame.classList.remove("hide");


    }
    if(e.target.matches("button.app-button")){
        //Hides the main app when any of the quiz buttons are pressed
        grabMain.classList.add("hide");
        //Show the quiz html instead when the button is clicked

        //Grab the quiz page html
        const grabQuizPage = document.querySelector(".quiz-iframe");
        grabQuizPage.classList.remove("hide");

    }

    if(e.target.matches("button.play-button") || e.target.closest("svg.brand-mark") || e.target.closest("span.logotext")){
        //Make it so that when I click back on play, I remove the "hide" class
        //console.log("logo clicked");
        grabMain.classList.remove("hide");
        //console.log(grabiFrame);

        //Hide the leaderboardbutton too
        grabiFrame.classList.add("hide");


                //When clicking logo, show Play as selected and diselected all other buttons (A bit unortoxod but it works)
        const grabPlayButton = document.querySelector(".play-button");
        const grabLeaderBoardButton=document.querySelector(".leaderboard-button");
        const grabFriendsbutton=document.querySelector(".friends-button");

        grabPlayButton.classList.add("selectedButton");
        grabLeaderBoardButton.classList.remove("selectedButton");
        grabFriendsbutton.classList.remove("selectedButton");

    }

});