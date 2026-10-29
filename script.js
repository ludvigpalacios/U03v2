import { getLeaderboard } from "./storage.js";

function displayLeaderboard() {
  const leaderboardBody = document.querySelector("#leaderboard-body");

  if (!leaderboardBody) return;

  const topPlayers = getLeaderboard()
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  leaderboardBody.replaceChildren();

  topPlayers.forEach((player, index) => {
    const row = document.createElement("div");
    row.className = "leaderboard-row";
    row.setAttribute("role", "row");

    const rank = document.createElement("span");
    rank.setAttribute("role", "cell");
    rank.textContent = `#${index + 1}`;

    const playerCell = document.createElement("div");
    playerCell.className = "table-player";
    playerCell.setAttribute("role", "cell");

    const avatar = document.createElement("span");
    avatar.className = "table-avatar";
    avatar.setAttribute("aria-hidden", "true");
    const nameParts = player.name.trim().split(/\s+/);

    avatar.textContent = (
      nameParts.length > 1
        ? nameParts[0][0] + nameParts[nameParts.length - 1][0]
        : nameParts[0].slice(0, 2)
    ).toUpperCase();

    const details = document.createElement("div");
    details.className = "table-player-details";

    const name = document.createElement("span");
    name.className = "table-player-name";
    name.textContent = player.name;
    details.appendChild(name);

    if (player.handle) {
      const handle = document.createElement("span");
      handle.className = "table-player-handle";
      handle.textContent = player.handle;
      details.appendChild(handle);
    }

    playerCell.append(avatar, details);

    const quizzes = document.createElement("span");
    quizzes.setAttribute("role", "cell");
    quizzes.textContent = player.quizzes ?? "—";

    const score = document.createElement("span");
    score.setAttribute("role", "cell");

    score.textContent = `${player.score} pts`;

    row.append(rank, playerCell, quizzes, score);
    leaderboardBody.appendChild(row);
  });
}

const refreshButton = document.querySelector("#refresh-button");

if (refreshButton) {
  refreshButton.addEventListener("click", displayLeaderboard);
}

displayLeaderboard();
