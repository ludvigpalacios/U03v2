
const startView = document.querySelector("#start-view");
const quizView = document.querySelector("#quiz-view");
const resultView = document.querySelector("#result-view");

const categoryButtons = document.querySelectorAll(".category-button");
const categoryName = document.querySelector("#category-name");
const progressText = document.querySelector("#quiz-progress");
const progressFill = document.querySelector("#progress-fill");
const questionHeading = document.querySelector("#quiz-question");
const answerContainer = document.querySelector("#quiz-answers");
const feedback = document.querySelector("#quiz-feedback");
const nextButton = document.querySelector("#next-button");
const timerText = document.querySelector("#quiz-timer");

let questions = [];
let currentIndex = 0;
let correctAnswers = 0;
let answeredQuestions = 0;
let totalPoints = 0;
let timeLeft = 10;
let timer = null;
let answered = false;
let currentCategory = "";

categoryButtons.forEach(button => {
  button.addEventListener("click", () => {
    startQuiz(button.dataset.category);
  });
});

async function startQuiz(category) {
  clearInterval(timer);
  currentCategory = category;

  try {
    const response = await fetch("json/quiz.json");

    if (!response.ok) {
      throw new Error("Could not load quiz questions");
    }

    const data = await response.json();

    questions = data.questions.filter(
      question => question.category === category
    );

    if (questions.length === 0) {
      throw new Error("No questions found");
    }

    currentIndex = 0;
    correctAnswers = 0;
    answeredQuestions = 0;
    totalPoints = 0;

    startView.hidden = true;
    resultView.hidden = true;
    quizView.hidden = false;

    categoryName.textContent =
      category === "logical"
        ? "Logical Challenge"
        : "Creative Challenge";

    showQuestion();

  } catch (error) {
    console.error(error);
    alert("Could not load questions. Check quiz.json.");
  }
}

function showQuestion() {
  clearInterval(timer);

  answered = false;
  timeLeft = 10;

  const currentQuestion = questions[currentIndex];

  progressText.textContent =
    `${currentIndex + 1}/${questions.length}`;

  progressFill.style.width =
    `${(currentIndex / questions.length) * 100}%`;

  questionHeading.textContent = currentQuestion.question;

  answerContainer.innerHTML = "";
  feedback.textContent = "";
  nextButton.hidden = true;

  updateStats();

  currentQuestion.answers.forEach((answer, index) => {
    const button = document.createElement("button");

    button.className = "answer-button";
    button.type = "button";

    button.textContent =
      `${String.fromCharCode(65 + index)}. ${answer}`;

    button.addEventListener("click", () => {
      selectAnswer(index);
    });

    answerContainer.appendChild(button);
  });

  timerText.textContent = "10s";

  timer = setInterval(() => {
    timeLeft--;

    timerText.textContent = `${timeLeft}s`;

    if (timeLeft <= 0) {
      selectAnswer(-1);
    }
  }, 1000);
}

function selectAnswer(selectedIndex) {
  if (answered) return;

  console.log("Klickat svar:", selectedIndex);

  answered = true;
  clearInterval(timer);

  const question = questions[currentIndex];

  const correctIndex = Number(question.correctIndex);
  const isCorrect = selectedIndex === correctIndex;

  answeredQuestions++;

  if (isCorrect) {
    correctAnswers++;
    totalPoints += 100;

    feedback.textContent = "Correct! +100 points 🎉";

  } else if (selectedIndex === -1) {
    feedback.textContent =
      `Time is up! ${question.explanation}`;

  } else {
    feedback.textContent =
      `Incorrect! ${question.explanation}`;
  }

  const buttons = answerContainer.querySelectorAll("button");

  buttons.forEach((button, index) => {
    button.classList.remove("correct", "incorrect");

    if (index === correctIndex) {
      button.classList.add("correct");
    }

    if (index === selectedIndex && !isCorrect) {
      button.classList.add("incorrect");
    }

    button.disabled = true;
  });

  progressFill.style.width =
    `${(answeredQuestions / questions.length) * 100}%`;

  updateStats();

  nextButton.textContent =
    currentIndex === questions.length - 1
      ? "See Results"
      : "Next Question";

  nextButton.hidden = false;
}

function updateStats() {
  document.querySelector("#answered-count").textContent =
    answeredQuestions;

  document.querySelector("#score-count").textContent =
    totalPoints;
}

nextButton.addEventListener("click", () => {
  if (!answered) return;

  currentIndex++;

  if (currentIndex >= questions.length) {
    showResults();
  } else {
    showQuestion();
  }
});

function showResults() {
  clearInterval(timer);

  quizView.hidden = true;
  resultView.hidden = false;

  const total = questions.length;
  const incorrect = answeredQuestions - correctAnswers;

  const percentage =
    Math.round((correctAnswers / total) * 100);

  document.querySelector("#result-category").textContent =
    categoryName.textContent;

  document.querySelector("#result-fraction").textContent =
    `${correctAnswers}/${total}`;

  document.querySelector("#result-percentage").textContent =
    `${percentage}% correct answers`;

  document.querySelector("#result-answered").textContent =
    answeredQuestions;

  document.querySelector("#result-correct").textContent =
    correctAnswers;

  document.querySelector("#result-wrong").textContent =
    incorrect;

  document.querySelector("#result-points").textContent =
    totalPoints;
}

document.querySelector("#play-again").addEventListener("click", () => {
  clearInterval(timer);

  resultView.hidden = true;
  quizView.hidden = true;
  startView.hidden = false;
});




