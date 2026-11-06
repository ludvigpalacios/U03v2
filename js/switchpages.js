//import {startLogicalQuiz, startCreativeQuiz} from "./quizv2.js";

//Grab elements
const grabHeader = document.querySelector(".app-header");
const grabMain = document.querySelector(".main-app");
const grabLeaderboardPage = document.querySelector(".leaderboard-iframe");
const grabFriendsPage= document.querySelector(".friends-iframe");
const grabQuizFrame = document.querySelector(".quiz-iframe");




const grabLogo = document.querySelector(".logo");

//Quiz

//Event listener
grabHeader.addEventListener("keydown", (e)=>{
    if(e.key==="Enter"){
        e.preventDefault();

    }
})

window.addEventListener("click", (e) => {
    //e.preventDefault();
    console.log(e);
    if(e.target.matches("button.leaderboard-button")){
        //Hide the main
        //Removing onclick="window.location.href='leaderboard.html'"

        grabMain.classList.add("hide");
        grabLeaderboardPage.classList.remove("hide");

        hideQuizPage();
        hideFriendsPage();


    }
    if(e.target.matches("button.friends-button")){
        console.log(grabFriendsPage);
        grabMain.classList.add("hide");
        showFriendsPage();
        hideLeaderboardPage();

    }
    /*if(e.target.closest(".app-button")){
        //Hides the main app when any of the quiz buttons are pressed
        grabMain.classList.add("hide");
        //Show the quiz html instead when the button is clicked

        //Grab the quiz page html
        showQuizPage();
        startQuiz();

    }*/
    if(e.target.closest(".logicalQuiz-button")){
        grabMain.classList.add("hide");
        showQuizPage();
        hideFriendsPage();
        grabLeaderboardPage.classList.add("hide");
        grabQuizFrame.contentWindow.startLogicalQuiz();


    }
    if(e.target.closest(".creativeQuiz-button")){
        grabMain.classList.add("hide");
        showQuizPage();
        hideFriendsPage();
        grabLeaderboardPage.classList.add("hide");
        grabQuizFrame.contentWindow.startCreativeQuiz();


    }
    if(e.target.matches("button.play-button") || e.target.closest("svg.brand-mark") || e.target.closest("span.logotext")){
        //Make it so that when I click back on play, I remove the "hide" class
        //console.log("logo clicked");
        grabMain.classList.remove("hide");
        //console.log(grabLeaderboardPage);

        //Hide the leaderboardbutton too
        grabLeaderboardPage.classList.add("hide");


                //When clicking logo, show Play as selected and diselected all other buttons (A bit unortoxod but it works)
        const grabPlayButton = document.querySelector(".play-button");
        const grabLeaderBoardButton=document.querySelector(".leaderboard-button");
        const grabFriendsbutton=document.querySelector(".friends-button");

        grabPlayButton.classList.add("selectedButton");
        grabLeaderBoardButton.classList.remove("selectedButton");
        grabFriendsbutton.classList.remove("selectedButton");

        //hide quizpage
        hideQuizPage();
        hideFriendsPage();

        //refresh page
        window.location.reload();

    }

});

function showQuizPage (){

    document.querySelector(".quiz-iframe").classList.remove("hide");
}

function hideQuizPage (){
    document.querySelector(".quiz-iframe").classList.add("hide");


}

function showFriendsPage(){
    grabFriendsPage.classList.remove("hide");
}

function hideFriendsPage(){
    document.querySelector(".friends-iframe").classList.add("hide");
}

function showLeaderboardPage(){
    grabLeaderboardPage.classList.remove("hide")
}

function hideLeaderboardPage(){
    grabLeaderboardPage.classList.add("hide");
}