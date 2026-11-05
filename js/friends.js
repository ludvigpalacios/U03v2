
document.addEventListener("DOMContentLoaded", () => {
  // Våra 10 testanvändare
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
  const leaderboard = document.querySelector("#connected-friends-list");

  const connected = new Set();

  // Uppdatera antal vänner och leaderboard
  function updateLeaderboard() {
    const connectedUsers = users.filter(user =>
      connected.has(user.username)
    );

    if (friendCount) {
      friendCount.textContent = connectedUsers.length;
    }

    // Stoppa bara leaderboarden om den saknas
    if (!leaderboard) return;

    leaderboard.innerHTML = "";

    if (connectedUsers.length === 0) {
      leaderboard.innerHTML = "<p>No friends connected yet.</p>";
      return;
    }

    connectedUsers.forEach((user, index) => {
      const row = document.createElement("div");
      row.className = "leaderboard-row";

      const rank = document.createElement("span");
      rank.textContent = `#${index + 1}`;

      const name = document.createElement("span");
      name.textContent = user.name;

      const username = document.createElement("span");
      username.textContent = `@${user.username}`;

      const score = document.createElement("span");
      score.textContent = `${user.score} points`;

      row.append(rank, name, username, score);
      leaderboard.appendChild(row);
    });
  }

  // Skapa användarkorten
  if (friendsList) {
    friendsList.innerHTML = "";

    users.forEach(user => {
      const card = document.createElement("div");
      card.className = "friend-card";

      const initials = user.name
        .split(" ")
        .map(word => word[0])
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

        updateLeaderboard();
      });

      friendsList.appendChild(card);
    });
  } else {
    console.error("Elementet #friends-list saknas i HTML.");
  }

  // Visa leaderboarden från början
  updateLeaderboard();

  // Login-knappen
  const loginButton = document.querySelector("#login-button");

  if (loginButton) {
    loginButton.addEventListener("click", (event) => {
      event.preventDefault();

      // Försök hitta Ludwigs login-knapp på samma sida
      let openLogin = document.querySelector("#openLogin");

      // Om sidan ligger i en iframe, kontrollera föräldersidan
      if (!openLogin && window.parent !== window) {
        try {
          openLogin = window.parent.document.querySelector("#openLogin");
        } catch (error) {
          console.warn("Kan inte komma åt föräldersidans login.");
        }
      }

      if (openLogin && openLogin !== loginButton) {
        openLogin.click();
        return;
      }

      // Login
      const loginDialog = document.querySelector("#login-page");

      if (loginDialog && typeof loginDialog.showModal === "function") {
        if (!loginDialog.open) {
          loginDialog.showModal();
        }
      } else {
        console.error("Kunde inte hitta Ludwigs inloggningsruta.");
      }
    });
  }
});
