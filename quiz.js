
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

const questionBank = {
  general: [
    { question: "What is the capital of France?", answers: ["Paris", "London", "Rome", "Berlin"], correct: 0 },
    { question: "How many continents are there?", answers: ["5", "6", "7", "8"], correct: 2 },
    { question: "Which planet is known as the Red Planet?", answers: ["Venus", "Mars", "Jupiter", "Saturn"], correct: 1 },
    { question: "What is the largest ocean?", answers: ["Atlantic", "Indian", "Pacific", "Arctic"], correct: 2 },
    { question: "How many days are in a leap year?", answers: ["364", "365", "366", "367"], correct: 2 }
  ],
  science: [
    { question: "What is H2O?", answers: ["Oxygen", "Water", "Hydrogen", "Salt"], correct: 1 },
    { question: "Which planet is closest to the Sun?", answers: ["Earth", "Venus", "Mercury", "Mars"], correct: 2 },
    { question: "What gas do plants absorb?", answers: ["Oxygen", "Nitrogen", "Carbon dioxide", "Helium"], correct: 2 },
    { question: "How many bones are in an adult human body?", answers: ["206", "208", "210", "212"], correct: 0 },
    { question: "What force keeps us on Earth?", answers: ["Magnetism", "Gravity", "Friction", "Electricity"], correct: 1 }
  ],
  history: [
    { question: "In which year did World War II end?", answers: ["1942", "1945", "1948", "1950"], correct: 1 },
    { question: "Who was the first US president?", answers: ["Lincoln", "Washington", "Jefferson", "Adams"], correct: 1 },
    { question: "Where were the pyramids of Giza built?", answers: ["Greece", "Egypt", "Italy", "Mexico"], correct: 1 },
    { question: "In which year did the Berlin Wall fall?", answers: ["1987", "1988", "1989", "1991"], correct: 2 },
    { question: "Which civilization built the Colosseum?", answers: ["Greek", "Roman", "Mayan", "Egyptian"], correct: 1 }
  ],
  sports: [
    { question: "How many players are on a football team on the field?", answers: ["9", "10", "11", "12"], correct: 2 },
    { question: "How often are the Summer Olympics held?", answers: ["2 years", "3 years", "4 years", "5 years"], correct: 2 },
    { question: "Which sport uses a shuttlecock?", answers: ["Tennis", "Badminton", "Squash", "Golf"], correct: 1 },
    { question: "How many points is a basketball free throw worth?", answers: ["1", "2", "3", "4"], correct: 0 },
    { question: "Which country won the 2022 FIFA World Cup?", answers: ["France", "Brazil", "Argentina", "Spain"], correct: 2 }
  ],
  geography: [
    { question: "Which is the largest continent?", answers: ["Africa", "Europe", "Asia", "Australia"], correct: 2 },
    { question: "What is the capital of Sweden?", answers: ["Oslo", "Stockholm", "Copenhagen", "Helsinki"], correct: 1 },
    { question: "Which country has the city of Tokyo?", answers: ["China", "Japan", "Thailand", "South Korea"], correct: 1 },
    { question: "Which desert is in northern Africa?", answers: ["Gobi", "Sahara", "Mojave", "Atacama"], correct: 1 },
    { question: "Which country is shaped like a boot?", answers: ["Spain", "Italy", "Greece", "Portugal"], correct: 1 }
  ]
};

categoryButtons.forEach(button => {
  button.addEventListener("click", () => {
    startQuiz(button.dataset.category);
  });
});

function startQuiz(category) {
  clearInterval(timer);

  currentCategory = category;

  const key = Object.keys(questionBank).find(
    name => name.toLowerCase() === category.toLowerCase()
  );

  questions = [...(questionBank[key] || questionBank.general)]
    .sort(() => Math.random() - 0.5);

  currentIndex = 0;
  correctAnswers = 0;
  answeredQuestions = 0;
  totalPoints = 0;

  if (categoryName) {
    categoryName.textContent = category;
  }

  startView.hidden = true;
  quizView.hidden = false;
  resultView.hidden = true;

  showQuestion();
}

function showQuestion() {
  clearInterval(timer);

  answered = false;
  timeLeft = 10;

  const currentQuestion = questions[currentIndex];

  questionHeading.textContent = currentQuestion.question;
  answerContainer.innerHTML = "";

  if (feedback) {
    feedback.textContent = "";
  }

  if (nextButton) {
    nextButton.hidden = true;
  }

  if (progressText) {
    progressText.textContent =
      `Question ${currentIndex + 1} of ${questions.length}`;
  }

  if (progressFill) {
    progressFill.style.width =
      `${(currentIndex / questions.length) * 100}%`;
  }

  currentQuestion.answers.forEach((answer, index) => {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "answer-button";
    button.textContent = answer;

    button.addEventListener("click", () => {
      selectAnswer(index);
    });

    answerContainer.appendChild(button);
  });

  updateTimer();

  timer = setInterval(() => {
    timeLeft--;
    updateTimer();

    if (timeLeft <= 0) {
      clearInterval(timer);
      selectAnswer(-1);
    }
  }, 1000);
}

function updateTimer() {
  if (timerText) {
    timerText.textContent = timeLeft;
  }
}

function selectAnswer(selectedIndex) {
  if (answered) return;

  answered = true;
  clearInterval(timer);

  const currentQuestion = questions[currentIndex];
  const buttons = answerContainer.querySelectorAll("button");

  answeredQuestions++;

  buttons.forEach((button, index) => {
    button.disabled = true;

    if (index === currentQuestion.correct) {
      button.classList.add("correct");
      button.style.backgroundColor = "#16a34a";
      button.style.color = "white";
    }

    if (index === selectedIndex && selectedIndex !== currentQuestion.correct) {
      button.classList.add("incorrect");
      button.style.backgroundColor = "#dc2626";
      button.style.color = "white";
    }
  });

  if (selectedIndex === currentQuestion.correct) {
    correctAnswers++;
    totalPoints += 100 + timeLeft * 10;

    if (feedback) {
      feedback.textContent = "Correct answer! 🎉";
    }
  } else if (selectedIndex === -1) {
    if (feedback) {
      feedback.textContent = "Time is up!";
    }
  } else {
    if (feedback) {
      feedback.textContent = "Incorrect answer!";
    }
  }

  if (nextButton) {
    nextButton.hidden = false;
  }
}

if (nextButton) {
  nextButton.addEventListener("click", () => {
    currentIndex++;

    if (currentIndex < questions.length) {
      showQuestion();
    } else {
      showResults();
    }
  });
}

function showResults() {
  clearInterval(timer);

  quizView.hidden = true;
  resultView.hidden = false;

  if (progressFill) {
    progressFill.style.width = "100%";
  }

  const scoreElement =
    document.querySelector("#result-score") ||
    document.querySelector("#final-score");

  const correctElement =
    document.querySelector("#result-correct") ||
    document.querySelector("#correct-answers");

  if (scoreElement) {
    scoreElement.textContent = totalPoints;
  }

  if (correctElement) {
    correctElement.textContent =
      `${correctAnswers} / ${questions.length}`;
  }

  const result = {
    category: currentCategory,
    score: totalPoints,
    correctAnswers: correctAnswers,
    totalQuestions: questions.length,
    date: new Date().toISOString()
  };

  try {
    const previousResults =
      JSON.parse(localStorage.getItem("brainrush-results") || "[]");

    previousResults.push(result);

    localStorage.setItem(
      "brainrush-results",
      JSON.stringify(previousResults)
    );
  } catch (error) {
    console.error("Could not save quiz result:", error);
  }
}

document.querySelectorAll(
  "#restart-button, #play-again, #restart-quiz"
).forEach(button => {
  button.addEventListener("click", () => {
    resultView.hidden = true;
    startView.hidden = false;
    quizView.hidden = true;
    clearInterval(timer);
  });
});


