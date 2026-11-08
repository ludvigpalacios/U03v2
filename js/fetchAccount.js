function fetchAccounts(){
    try{
        const getAccount = localStorage.getItem("account");
        console.log("Grabbed Account JSON: ", getAccount);

        if(getAccount != null){
            const Account = JSON.parse(getAccount);
            console.log("Accounts:", Account);
            return Account;
        }
    }catch(error){
        if(error.name === "SyntaxError"){
            console.log("Saved account data is not valid JSON format");
        }else{
            console.log("Some other unknown error has occured!", error.message);
        }
    }
    return [];   // fallback, so it's never undefined
}

function updateScore(score, id = fetchLoggedID()) {
    if (id === null) return;
    const accounts = fetchAccounts();
    if (!accounts[id]) return;

    accounts[id].score = Math.max(accounts[id].score ?? 0, score);
    accounts[id].quizzes = (accounts[id].quizzes ?? 0) + 1;
    saveAccounts(accounts);
}

function fetchLoggedID(){
    const saved = localStorage.getItem("loggedID");
    return saved !== null ? JSON.parse(saved) : null;
}
//import {fetchLoggedID, updateScore, fetchAccounts} from ""

/*function updateScore(score, Account, LoggedID){
    //Input the score, the account, and the LoggedID
    Account[LoggedID].score=score;
    const accountAsJSON=JSON.stringify(Account);
    localStorage.setItem("account", accountAsJSON);

    console.log(Account);
}*/

