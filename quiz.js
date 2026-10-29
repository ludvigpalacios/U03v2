import { saveHighScore } from "./storage.js";

let totalPoints = 0;
let questionStartedAt = 0;
let answerSubmitted = false;

export function startQuestionTimer() {
  questionStartedAt = performance.now();
  answerSubmitted = false;
}

export function scoreAnswer(isCorrect) {
  if (answerSubmitted) return 0;
  answerSubmitted = true;

  const secondsTaken = (performance.now() - questionStartedAt) / 1000;

  const basePoints = 100;
  const maximumBonus = 100;
  const bonusTimeLimit = 20;

  const speedBonus = Math.round(
    maximumBonus * Math.max(0, 1 - secondsTaken / bonusTimeLimit),
  );

  const earnedPoints = isCorrect ? basePoints + speedBonus : 0;

  totalPoints += earnedPoints;

  return earnedPoints;
}

// Call when a new quiz starts.
export function resetQuizScore() {
  totalPoints = 0;
  questionStartedAt = 0;
  answerSubmitted = false;
}

// Call once when the quiz finishes, with the current player name.
export function saveQuizScore(playerName) {
  saveHighScore(playerName, totalPoints);
  return totalPoints;
}
