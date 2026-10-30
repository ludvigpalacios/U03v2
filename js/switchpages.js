//Grab elements
const grabHeader = document.querySelector(".app-header");
const grabMain = document.querySelector(".main-app");
const grabiFrame = document.querySelector(".leaderboard-iframe");

//Event listener
grabHeader.addEventListener("keydown", (e)=>{
    if(e.key==="Enter"){
        e.preventDefault();
        runAccountCreation();
    }
})

grabHeader.addEventListener("click", (e) => {
    e.preventDefault();
    if(e.target.matches("button.leaderboard-button")){
        //Hide the main
        //Removing onclick="window.location.href='leaderboard.html'"

        grabMain.classList.add("hide");
        grabiFrame.classList.remove("hide");



    }
    if(e.target.matches("button.play-button")){
        //Make it so that when I click back on play, I remove the "hide" class
        grabMain.classList.remove("hide");
        console.log(grabiFrame);
        grabiFrame.classList.add("hide");
    }

});