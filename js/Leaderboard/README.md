# Leaderboard data

- `json/leaderboard.json` contains editable example players for the presentation. They are labelled "Example player" in the interface.
- `js/Leaderboard/storage.js` saves real results as JSON in localStorage under `leaderboard`.
- `js/Leaderboard/script.js` fetches the examples, combines them with real saved results, sorts the top ten, and renders both the table and podium.

The JSON file is starting data. The browser does not write completed quiz scores back to that file. Real results stay in the same browser and site origin; this is not an online shared scoreboard. Example rows are not copied into localStorage. A real result with the same name replaces the example in the display.

## Connect a completed quiz

For the root-level `quiz.js`, import:

```js
import { saveHighScore } from "./js/Leaderboard/storage.js";
```

Call once when a quiz finishes, using the current player name and the final points total:

```js
try {
  saveHighScore(playerName, totalPoints);
} catch (error) {
  // Show this in the quiz's own feedback area.
  feedback.textContent = "Your score could not be saved. Please try again.";
}
```

The helper keeps the player's best score and increases their completed-quiz count once per call. It does not calculate points or determine which player is logged in. Do not call it while rendering or refreshing the leaderboard.

Stored records use this shape:

```json
{ "name": "Abiha", "score": 725, "quizzes": 1 }
```

For an explicit manual test on the running site, this example saves a test result:

```js
const { saveHighScore } = await import("./js/Leaderboard/storage.js");
saveHighScore("Test player", 725);
```

Open through Live Server or the published site so module imports and fetch work. Refreshing the page keeps saved results. The leaderboard also responds to changes from same-origin quiz iframes and other tabs.

At the time this integration was prepared, the root `quiz.js` ended midway through `showQuestion()`. Its completion handler still needs to be finished and connected to `saveHighScore`; this leaderboard change does not claim the full quiz is working.
