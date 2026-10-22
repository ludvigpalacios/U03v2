function getLeaderboard() {
  return JSON.parse(localStorage.getItem("leaderboard") || "[]");
}

function saveHighScore(playerName, score) {
  const players = getLeaderboard();

  const existingPlayer = players.find((player) => player.name === playerName);

  if (existingPlayer) {
    existingPlayer.score = Math.max(existingPlayer.score, score);
  } else {
    players.push({ name: playerName, score: score });
  }

  players.sort((a, b) => b.score - a.score);

  localStorage.setItem("leaderboard", JSON.stringify(players));
}

function displayLeaderboard() {
  const leaderboardBody = document.querySelector("#leaderboard-body");

  if (!leaderboardBody) return;

  const topPlayers = getLeaderboard()
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  leaderboardBody.replaceChildren();

  topPlayers.forEach((player, index) => {
    const row = document.createElement("div");
    row.classList.add("leaderboard-row");
    row.setAttribute("role", "row");

    const values = [index + 1, player.name, `${player.score}/5`];

    values.forEach((value) => {
      const cell = document.createElement("span");
      cell.setAttribute("role", "cell");
      cell.textContent = value;
      row.appendChild(cell);
    });

    leaderboardBody.appendChild(row);
  });
}
// Temporary example scores
saveHighScore("BrainyBella", 5);
saveHighScore("LogicLeo", 5);
saveHighScore("CreativeCat", 4);
saveHighScore("QuizMaster99", 4);
saveHighScore("You", 3);
saveHighScore("MindExplorer", 3);
saveHighScore("ThinkTank", 2);
saveHighScore("CuriousAlex", 2);
saveHighScore("BrainBoost", 1);
saveHighScore("QuizNewbie", 1);

displayLeaderboard();

const refreshButton = document.querySelector("#refresh-button");

if (refreshButton) {
  refreshButton.addEventListener("click", displayLeaderboard);
}

saveHighScore(playerName, score);
