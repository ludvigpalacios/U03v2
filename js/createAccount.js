//Grab create page window
const createPage = document.querySelector("#account-create-page");

//Grab elements
const grabUser=document.querySelector("#playerUser");
const grabEmail=document.querySelector("#createEmail");
const grabPassword=document.querySelector("#createPassword");

const createAccountBtn=document.querySelector("#createAccount-button");

const createFeedbackContainer = document.querySelector("#createAccountFeedbackHolder");
console.log("createFeedbackContainer",createFeedbackContainer);


//const Account= []; //Create multiple accounts
//Read the JSON if there's any and save it in an Array, Account.
let Account=[];
//Get the JSON
let getAccount=null;

try{
    getAccount= localStorage.getItem("account");
    console.log("Grabbed Account JSON: ", getAccount);
    console.log("getAccount length")
    //Check if the JSON is empty
    if(getAccount!=null){
        //Parse/Convert the JSON and assign it to Account
        console.log("Grabbed accounts");
        Account = JSON.parse(getAccount);
    }
    console.log("Accounts:", Account);
}catch(error){
    //If the JSON data is not valid json format
    if(error.name===SyntaxError){
        console.log("Saved account data is not valid JSON format");

    }else{
        //If any other unknown error has occured, throw the specific error so that the user can google it
        console.log("Some other unknown error has occured!", error.message);

    }
    
}

let i=0;
Account.forEach(index => {
    console.log(`Account ${i} username:  ${index.username}`);
    console.log(`Account ${i} email:  ${index.email}`);
    console.log(`Account ${i} password:  ${index.password}`);
    i++;
})

let AccountID = Account.length;
console.log("Accounts in store right now", AccountID);

//Add an statement if the length of Account is zero, set the Account to an array.
if(Account===!null || Account.length===0){
    AccountID = Account.length
    console.log("Read JSON, the Account: ", Account);
    console.log("AccountID:", AccountID);

}




//When we click on the button, we want to store these values somehow 
createPage.addEventListener("keydown", (e)=>{
    if(e.key==="Enter"){
        e.preventDefault();
        runAccountCreation();
    }
})

createAccountBtn.addEventListener("click", (e) => {
    e.preventDefault();
    runAccountCreation();

});
//Functions

function runAccountCreation(){
    //Debugging
    console.log(grabUser.value);
    console.log(grabEmail.value);
    console.log(grabPassword.value);

    //Everytime we press create account, save the account in the said Array
    //Create an condition where it checks if the input was empty 
    

    const Duplicates = checkDuplicateAccount(Account ,grabUser.value, grabEmail.value);
    console.log("Duplicates:", Duplicates);
    //Return userDuplicate, EmailDuplicate or PasswordDuplicate to either true of false

    //Check for admin account
    checkAdminAccount(Account, grabUser.value, grabEmail.value);

    if(grabUser.value=== "" || grabEmail.value== "" || grabPassword.value===""){
        console.log("Empty!");
        createFeedbackContainer.textContent="Empty!";
        createFeedbackContainer.classList.add("warning");
        return;
        
    }else if(grabPassword.value.length<6){
        console.log("Password is too small, it must be 6 characters minimum!");
        createFeedbackContainer.textContent="Password is too small, it must be 6 characters minimum!";
        createFeedbackContainer.classList.add("warning");
        return;
        //If the password isn't at least 6 length throw and error 
        //Use a try catch later here 

    //Check now for any duplicates
    }else if(Duplicates.emailDuplicate && Duplicates.userDuplicate){
        createFeedbackContainer.textContent="The email and username already exists!";
        createFeedbackContainer.classList.add("warning");


    }else if(!grabEmail.value.includes("@")){
        console.log("Your email is invalid! It must include a @ and a proper conocation*!");
        createFeedbackContainer.textContent="Your email must include @ or a proper conotation!";
        createFeedbackContainer.classList.add("warning");

        return;

    }else if(Duplicates.userDuplicate){
        console.log("That user already exists!");
        createFeedbackContainer.textContent="That user already exists!";
        createFeedbackContainer.classList.add("warning");

        return; 
    }
    else if (Duplicates.emailDuplicate){
        console.log("That email already exists");
        createFeedbackContainer.classList.add("warning");

        createFeedbackContainer.textContent="That email aready exists)"
        return;
    }
    else{
        //Copy the values and add it to last array in the account database 
        createFeedbackContainer.textContent="Account created!";
        createFeedbackContainer.classList.add("comfirm");

        const [username,email, password, score]= [grabUser.value, grabEmail.value, grabPassword.value];
        Account [AccountID] = {username, email, password, score};

    }
    
    //Log the results
    console.log(`User ${AccountID} created!`);
    //logAccount(Account);    

    //We want to turn this into JSON 
    const accountAsJSON=JSON.stringify(Account);
    //Save the JSON in local storage 127.0.0.1
    localStorage.setItem("account", accountAsJSON);
    AccountID++;
    console.log("Accounts stored now:", AccountID);

}


function checkDuplicateAccount(Account ,User, Email){
    //Compare if the input matches any previous objects, if it does then return and ask the user to type again 
    //A foreach function where it compares grabUser, grabEmail and GrabPassword to the first account then second and so on 
    /*let userDuplicate=false;
    let emailDuplicate=false;*/
    for(const user of Account) {
        if(user.username===User && user.email===Email){
            console.log("Email and username duplicate found ");
            /*userDuplicate=true;
            emailDuplicate=true;
            return;*/
            return {userDuplicate:true, emailDuplicate:true};
        }
        if(user.username===User){
            //Return UserDuplicate, EmailDuplicate or PasswordDuplicate
            console.log("Username duplicate found");
            return {userDuplicate:true, emailDuplicate:false};

        }if(user.email===Email){
            console.log("email duplicate found!");
            return {userDuplicate:false, emailDuplicate:true};

        }
    }
    return {userDuplicate:false, emailDuplicate:false};

}

function grabAccount(Account){


}



function logAccount(Users){
    Users.forEach(Account => {
        //Iterate through every account 
        //Now iterate through all the values of each account
        const AccountValues= Object.values(Account);

        AccountValues.forEach(data => {
            console.log("info:", data);
        })

    })

}

