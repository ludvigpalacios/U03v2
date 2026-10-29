/* Grab element by Ids*/

//main page
const openCreate = document.querySelector("#createAccount");
const grabLogin = document.querySelector("#login-page");

//login page
const openLogin = document.querySelector("#openLogin");
const closeLogin = document.querySelector("#close-login");
//grab the anchor create account
const createAccount = document.querySelector("#accountCreate");
//grab the createaccount page
const openCreateAccount = document.querySelector("#account-create-page")
//grab the close page anchor 
const closeCreateAccount = document.querySelectorAll("#closeCreateAccount");


//Listen for a click for the login button 
openLogin.addEventListener("click", (e) => {
    /*show page*/
    console.log("openLogin opened");
    e.preventDefault(); /*Prevent the page from reloading */
    grabLogin.showModal();

})
//Listen for a click for the create account anchor
openCreate.addEventListener("click", (e) => {
    /*show page*/
    console.log("openCreate opened");
    e.preventDefault(); /*Prevent the page from reloading */
    grabLogin.showModal();

})  

//Close the login page
closeLogin.addEventListener("click", ()=> {
    console.log("login page closened");
    grabLogin.close();
    console.log("")

    //Using function from login.js
    removeConfetti();
})


//Inside the login page

   //Make it listen to the create account button
createAccount.addEventListener("click", (e) => {
    /*show page*/
    console.log("createAccount page opened");
    e.preventDefault(); /*Prevent the page from reloading */
    openCreateAccount.showModal();
}) 
    /*show page*/
closeCreateAccount.forEach(close => {
    //Grabs the array of close
    close.addEventListener("click", (e) => {
        console.log("createAccount page opened");
        e.preventDefault(); /*Prevent the page from reloading */
        openCreateAccount.close();
    }) 

})

//Debugging
/*window.addEventListener("click", (e)=>{
    console.log(e);
})*/

//grab the App Selection buttons
const grabSelectionButtons = document.querySelectorAll("button#appSelectionButton");

window.addEventListener("click", (e)=> {
    //console.log(e.target.matches("button#appSelectionButton"));
    
    if(e.target.matches("button#appSelectionButton")){
        //Reset all other buttons, delete their selectedButton class
        grabSelectionButtons.forEach(selectedButton => {
            selectedButton.classList.remove("selectedButton");
        })

        //console.log("Selected target found");
        const grabButton =  e.target.closest("button#appSelectionButton");
        //console.log(grabButton);
        grabButton.classList.add("selectedButton");

    }

    //Grab button the clicked selected button

    //When any of the top selection buttons are clicked, show the second page 
    

})

