// quiz.js – runs the quiz: loads questions, shows them, checks answers

import { startTimer, stopTimer } from "./timer.js";

// 1. Grab the elements we need from the HTML
const startView = document.querySelector("#start-view");
const quizView = document.querySelector("#quiz-view");
const resultView = document.querySelector("#result-view");
const progressText = document.querySelector("#quiz-progress");
const timerText = document.querySelector("#quiz-timer");
const questionHeading = document.querySelector("#quiz-question");
const wordText = document.querySelector("#quiz-word");
const answerList = document.querySelector("#quiz-answers");
const feedback = document.querySelector("#quiz-feedback");
const resultText = document.querySelector("#result-text");
const playAgainButton = document.querySelector("#play-again");
const categoryButtons = document.querySelectorAll(".category-button");

// 2. Variables that remember where we are in the quiz
let questions = [];
let currentIndex = 0;
let score = 0;
let attempts = 0;

// 3. Load the questions from the JSON file
async function loadQuestions(category) {
  const response = await fetch("questions.json");
  const allQuestions = await response.json();
  return allQuestions.filter((question) => question.category === category);
}

// 4. Start the quiz
async function startQuiz(category) {
  questions = await loadQuestions(category);
  currentIndex = 0;
  score = 0;
  startView.hidden = true;
  resultView.hidden = true;
  quizView.hidden = false;
  showQuestion();
}

// 5. Show one question with its answer buttons
function showQuestion() {
  const { question, answers, type, word, textColour } =