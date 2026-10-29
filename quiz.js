let totalPoints = 0;
let questionStartedAt = 0;
let answerSubmitted = false;

function startQuestionTimer() {
  questionStartedAt = performance.now();
  answerSubmitted = false;
}

function scoreAnswer(isCorrect) {
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

import { saveHighScore } from "./storage.js";

saveHighScore(playerName, totalPoints);
