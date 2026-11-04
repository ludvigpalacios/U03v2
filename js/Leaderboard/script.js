import { getLeaderboard, LEADERBOARD_KEY } from "./storage.js";

const leaderboardBody = document.querySelector("#leaderboard-body");
const podium = document.querySelector("#leaderboard-podium");
const emptyMessage = document.querySelector("#leaderboard-empty");
const statusMessage = document.querySelector("#leaderboard-status");
const refreshButton = document.querySelector("#refresh-button");
let examplePlayers = [];

function textElement(tag, text, className) {
  const element = document.createElement(tag);
  element.textContent = text;
  if (className) element.className = className;
  return element;
}

function getInitials(name) {
  const parts = name.trim().split(/\s+/);
  return (
    parts.length > 1
      ? parts[0][0] + parts[parts.length - 1][0]
      : parts[0].slice(0, 2)
  ).toUpperCase();
}

function playerDescription(player) {
  return [player.handle, player.isExample ? "Example player" : ""]
    .filter(Boolean)
    .join(" · ");
}

function createRow(player, index) {
  const row = document.createElement("div");
  row.className = "leaderboard-row";
  row.setAttribute("role", "row");

  const rank = textElement("span", `#${index + 1}`);
  const playerCell = document.createElement("div");
  playerCell.className = "table-player";
  const avatar = textElement("span", getInitials(player.name), "table-avatar");
  avatar.setAttribute("aria-hidden", "true");
  const details = document.createElement("div");
  details.className = "table-player-details";
  details.append(textElement("span", player.name, "table-player-name"));
  const description = playerDescription(player);
  if (description)
    details.append(textElement("span", description, "table-player-handle"));
  playerCell.append(avatar, details);

  const quizzes = textElement("span", player.quizzes);
  const score = textElement("span", `${player.score} pts`);
  for (const cell of [rank, playerCell, quizzes, score])
    cell.setAttribute("role", "cell");
  row.append(rank, playerCell, quizzes, score);
  return row;
}

function renderPodium(players) {
  podium.replaceChildren();
  podium.hidden = players.length === 0;
  for (const index of [1, 0, 2]) {
    const player = players[index];
    if (!player) continue;
    const card = document.createElement("article");
    card.className = `podium-card ${["first", "second", "third"][index]}-place`;
    const badge = textElement("span", index + 1, "rank-badge");
    badge.setAttribute("aria-hidden", "true");
    const avatar = textElement(
      "div",
      getInitials(player.name),
      "player-avatar",
    );
    avatar.setAttribute("aria-hidden", "true");
    const heading = document.createElement("h2");
    heading.append(
      textElement("span", `Rank ${index + 1}: `, "visually-hidden"),
    );
    heading.append(textElement("span", player.name));
    card.append(
      badge,
      avatar,
      heading,
      textElement("p", playerDescription(player), "player-handle"),
      textElement("p", `${player.score} pts`, "player-points"),
    );
    podium.append(card);
  }
}

export function displayLeaderboard() {
  const players = getLeaderboard(examplePlayers)
    .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name))
    .slice(0, 10);
  leaderboardBody.replaceChildren(...players.map(createRow));
  emptyMessage.hidden = players.length > 0;
  renderPodium(players);
}

refreshButton.addEventListener("click", displayLeaderboard);
window.addEventListener("leaderboard-updated", displayLeaderboard);
// A quiz running in another same-origin iframe/tab updates this page too.
window.addEventListener("storage", (event) => {
  if (event.key === LEADERBOARD_KEY || event.key === null) displayLeaderboard();
});
window.addEventListener("pageshow", displayLeaderboard);

displayLeaderboard();

try {
  const response = await fetch(
    new URL("../../json/leaderboard.json", import.meta.url),
  );
  if (!response.ok) throw new Error("Could not load example players.");
  const data = await response.json();
  if (!Array.isArray(data))
    throw new Error("Example players must be an array.");
  examplePlayers = data;
} catch {
  statusMessage.textContent =
    "Example scores could not be loaded. Your saved results are still shown.";
}
displayLeaderboard();
