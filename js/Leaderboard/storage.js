export function getLeaderboard() {
  try {
    const players = JSON.parse(localStorage.getItem("leaderboard") || "[]");

    return Array.isArray(players) ? players : [];
  } catch {
    return [];
  }
}

export function saveHighScore(playerName, score) {
  const players = getLeaderboard();

  const existingPlayer = players.find((player) => player.name === playerName);

  if (existingPlayer) {
    existingPlayer.score = Math.max(existingPlayer.score, score);
    existingPlayer.quizzes = (existingPlayer.quizzes ?? 0) + 1;
  } else {
    players.push({
      name: playerName,
      score,
      quizzes: 1,
    });
  }

  localStorage.setItem("leaderboard", JSON.stringify(players));
}
