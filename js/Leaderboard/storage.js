export const LEADERBOARD_KEY = "leaderboard";

function normalizePlayer(player, isExample) {
  if (
    !player || typeof player.name !== "string" || !player.name.trim() ||
    !Number.isFinite(player.score) || player.score < 0
  ) return null;

  return {
    name: player.name.trim(),
    score: player.score,
    quizzes: Number.isInteger(player.quizzes) && player.quizzes >= 0
      ? player.quizzes : 0,
    handle: typeof player.handle === "string" ? player.handle : "",
    isExample,
  };
}

export function getLeaderboard(examplePlayers = []) {
  let savedPlayers = [];
  try {
    const stored = JSON.parse(localStorage.getItem(LEADERBOARD_KEY) || "[]");
    if (Array.isArray(stored)) savedPlayers = stored;
  } catch {
  }

  const playersByName = new Map();
  for (const [source, isExample] of [[examplePlayers, true], [savedPlayers, false]]) {
    for (const record of Array.isArray(source) ? source : []) {
      const player = normalizePlayer(record, isExample);
      if (player) playersByName.set(player.name.toLowerCase(), player);
    }
  }
  return [...playersByName.values()];
}

export function saveHighScore(playerName, score) {
  if (typeof playerName !== "string" || !playerName.trim()) {
    throw new TypeError("A player name is required.");
  }
  if (!Number.isFinite(score) || score < 0) {
    throw new TypeError("The score must be a non-negative number.");
  }

  const name = playerName.trim();
  const players = getLeaderboard();
  const existingPlayer = players.find(
    (player) => player.name.toLowerCase() === name.toLowerCase(),
  );

  if (existingPlayer) {
    existingPlayer.score = Math.max(existingPlayer.score, score);
    existingPlayer.quizzes += 1;
  } else {
    players.push({ name, score, quizzes: 1 });
  }

  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(players));
  window.dispatchEvent(new Event("leaderboard-updated"));
}
