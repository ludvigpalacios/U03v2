//Grab elements
const grabHeader = document.querySelector(".app-header");
const grabMain = document.querySelector(".main-app");
const grabiFrame = document.querySelector(".leaderboard-iframe");

const grabLogo = document.querySelector(".logo");

//Event listener
grabHeader.addEventListener("keydown", (e)=>{
    if(e.key==="Enter"){
        e.preventDefault();

    }
})

grabHeader.addEventListener("click", (e) => {
    e.preventDefault();
    const svg = e.target.closest("svg.brand-mark");
    //console.log(e.target.closest());
    if(e.target.matches("button.leaderboard-button")){
        //Hide the main
        //Removing onclick="window.location.href='leaderboard.html'"

        grabMain.classList.add("hide");
        grabiFrame.classList.remove("hide");




    }
    if(e.target.matches("button.play-button") || e.target.closest("svg.brand-mark") || e.target.closest("span.logotext")){
        //Make it so that when I click back on play, I remove the "hide" class
        //console.log("logo clicked");
        grabMain.classList.remove("hide");
        //console.log(grabiFrame);
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