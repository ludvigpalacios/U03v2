
document.addEventListener("DOMContentLoaded", () => {
  // 10 testanvändare
  const users = [
    { name: "Maya Chen", username: "mayamakes", score: 558 },
    { name: "Theo Brooks", username: "theob", score: 542 },
    { name: "Nora Ali", username: "noraali", score: 527 },
    { name: "Sam Rivera", username: "samcreates", score: 510 },
    { name: "Jules Martin", username: "julesm", score: 496 },
    { name: "Leo Wright", username: "leow", score: 471 },
    { name: "Emma Wilson", username: "emmaw", score: 450 },
    { name: "Alex Brown", username: "alexb", score: 420 },
    { name: "Sara Ahmed", username: "saraa", score: 390 },
    { name: "Oliver Smith", username: "olivers", score: 365 }
  ];

  // Sortera efter högst poäng
  users.sort((a, b) => b.score - a.score);

  const friendsList = document.querySelector("#friends-list");
  const friendCount = document.querySelector("#friend-count");

  if (!friendsList || !friendCount) {
    console.error("Friends HTML elements not found");
    return;
  }

  const connected = new Set();

  // Skapa användarkorten
  users.forEach((user) => {
    const card = document.createElement("div");
    card.className = "friend-card";

    const initials = user.name
      .split(" ")
      .map((word) => word[0])
      .join("");

    card.innerHTML = `
      <div class="friend-avatar">${initials}</div>
      <h3>${user.name}</h3>
      <p>@${user.username}</p>
      <p>${user.score} points</p>
      <button class="connect-btn" type="button">
        Connect
      </button>
    `;

    const button = card.querySelector(".connect-btn");

    button.addEventListener("click", () => {
      if (connected.has(user.username)) {
        connected.delete(user.username);
        button.textContent = "Connect";
        button.classList.remove("connected");
      } else {
        connected.add(user.username);
        button.textContent = "Connected";
        button.classList.add("connected");
      }

      friendCount.textContent = connected.size;
    });

    friendsList.appendChild(card);
  });
});

