//Grab login window
const loginPage = document.querySelector("#login-page");

//Grab the login email and password 
const grabLoginEmail = document.querySelector("#loginInputEmail");
const grabhLoginPassword = document.querySelector("#loginInputPassword");

const loginButton = document.querySelector("#login-button")

//Grab paragraph 
const feedbackContainer = document.querySelector("#loginFeedbackHolder");

//Extra - Confetti
const confetti = document.querySelectorAll(".gifConfetti");
//console.log("confetti",confetti);
//JSON is already read in createAccount.js, we use functions and variables from there

const adminContainer = document.querySelector(".adminContainer");


//Check for admin
let Admin = false; 
loginPage.addEventListener("keydown", (e)=>{
    if(e.key==="Enter"){
        console.log("enter key has been entered");
        //Check for admin credentials
        Admin = checkAdminAccount(grabLoginEmail.value, grabhLoginPassword.value, Admin);
        console.log("Admin: ", Admin);
        if(!Admin){
            //Run the function, and return if an user with matching email and password is found
            checkForAccount(Account, grabLoginEmail.value, grabhLoginPassword.value);
        }

    }
})
loginPage.addEventListener("click", (e)=> {
    if(e.target.matches("button#login-button")){
        console.log("button has been clicked");
        
        //Check for admin credentials
        Admin = checkAdminAccount(grabLoginEmail.value, grabhLoginPassword.value, Admin);
        console.log("Admin: ", Admin);
        if(!Admin){
            //Run the function, and return if an user with matching email and password is found
            checkForAccount(Account, grabLoginEmail.value, grabhLoginPassword.value);
        }
        

    }
})

function checkForAccount (Account, email, password){
    //Check inside Account for each array if any user has matching email and password with the input email and password
    let i=0;
    Account.forEach(user => {
        console.log("Iterations: ", i);
        if(user.email === email && user.password === password){

            console.log("This user has been found: ",user.email);
            feedbackContainer.textContent="Account found!";
            feedbackContainer.classList.add("comfirm");

            //Adding confetti gif
            addConfetti();

            //return user.length;
            return;

        }else{
            //Log out that account was not found!
            console.log("Account was not found!");
            feedbackContainer.textContent="Account not found!";
            feedbackContainer.classList.add("warning");
        }
        i++;
    })
}

function addConfetti(){
    confetti.forEach(confettiGif => {
        console.log("Confetti ran");
        confettiGif.classList.remove("hide");
    })
}
function removeConfetti(){
    confetti.forEach(confettiGif => {
        console.log("Confetti ran");
        confettiGif.classList.add("hide");
    })
}
function checkAdminAccount(Email, Password){
    const stringEmail=String(Email);
    const stringPassword=String(Password);
    //Check if the input user and email matches an admin account, if it does then show a hidden button below go back where it flushes the accounts 
    if(stringEmail.toLowerCase().includes("admin") && stringPassword.toLowerCase().includes("secretpassword")){
        console.log("Admin account found!");
        //adminContainer.newElement
        const newButton = document.createElement("button");
        newButton.id="close-login";
        newButton.textContent="Flush accounts";
        //Add a function here where if it its clicked, flush all accounts
        adminContainer.appendChild(newButton);
        runFlushAccounts(newButton);

        feedbackContainer.textContent="Admin mode initiated!";
        feedbackContainer.classList.add("comfirm");


        

        return true;
    }
    return false;

}
function runFlushAccounts(adminButton){
    localStorage.removeItem("account");
    adminButton.addEventListener("click", (e) => {
        localStorage.removeItem("account");
        feedbackContainer.textContent="Accounts flushed!";
        feedbackContainer.classList.add("warning");


    })

}



