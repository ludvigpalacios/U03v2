function updateScore(username, newScore) {
    const account = Account.find(user => user.username === username);

    if (account) {
        account.score = newScore;

        localStorage.setItem("account", JSON.stringify(Account));
        console.log(`${username} har nu score: ${account.score}`);
    } else {
        console.log("Inget konto hittades med det användarnamnet.");
    }
}