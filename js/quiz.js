
const startView = document.querySelector("#start-view");
const quizView = document.querySelector("#quiz-view");
const resultView = document.querySelector("#result-view");

//The one i wanna change
const categoryButtons = document.querySelector(".app-button");

console.log("Categorybuttons", categoryButtons);

const categoryName = document.querySelector("#category-name");
const progressText = document.querySelector("#quiz-progress");
const progressFill = document.querySelector("#progress-fill");
const questionHeading = document.querySelector("#quiz-question");
const answerContainer = document.querySelector("#quiz-answers");
const feedback = document.querySelector("#quiz-feedback");
const nextButton = document.querySelector("#next-button");
const timerText = document.querySelector("#quiz-timer");

const scoreCount = document.querySelector("#score-count");
const answeredCount = document.querySelector("#answered-count");

const resultCategory = document.querySelector("#result-category");
const resultFraction = document.querySelector("#result-fraction");
const resultPercentage = document.querySelector("#result-percentage");
const resultAnswered = document.querySelector("#result-answered");
const resultCorrect = document.querySelector("#result-correct");
const resultWrong = document.querySelector("#result-wrong");
const resultPoints = document.querySelector("#result-points");
const playAgain = document.querySelector("#play-again");

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
  logical: [
    {
      question: "What comes next? 2, 4, 8, 16, ...",
      answers: ["24", "30", "32", "36"],
      correct: 2
    },
    {
      question: "If all cats are animals, which statement is true?",
      answers: [
        "All animals are cats",
        "All cats are animals",
        "No cats are animals",
        "All cats are dogs"
      ],
      correct: 1
    },
    {
      question: "What is 15 + 27?",
      answers: ["40", "42", "44", "46"],
      correct: 1
    },
    {
      question: "Which number does not belong?",
      answers: ["2", "4", "7", "8"],
      correct: 2
    },
    {
      question: "What comes next? 1, 1, 2, 3, 5, ...",
      answers: ["6", "7", "8", "10"],
      correct: 2
    },
    {
      question: "If 5 pencils cost $10, how much do 3 cost?",
      answers: ["$4", "$5", "$6", "$8"],
      correct: 2
    },
    {
      question: "What is half of 90?",
      answers: ["35", "40", "45", "50"],
      correct: 2
    },
    {
      question: "Which shape has exactly three sides?",
      answers: ["Square", "Triangle", "Circle", "Pentagon"],
      correct: 1
    },
    {
      question: "What comes next? 3, 6, 9, 12, ...",
      answers: ["13", "14", "15", "18"],
      correct: 2
    },
    {
      question: "If today is Monday, what day is it in 3 days?",
      answers: ["Tuesday", "Wednesday", "Thursday", "Friday"],
      correct: 2
    }
  ],

  creative: [
    {
      question: "Which color do you get by mixing blue and yellow paint?",
      answers: ["Purple", "Green", "Orange", "Red"],
      correct: 1
    },
    {
      question: "Which instrument has black and white keys?",
      answers: ["Guitar", "Drums", "Piano", "Violin"],
      correct: 2
    },
    {
      question: "Which of these is a primary color in traditional painting?",
      answers: ["Green", "Purple", "Red", "Orange"],
      correct: 2
    },
    {
      question: "What is the art of folding paper called?",
      answers: ["Origami", "Pottery", "Sculpture", "Collage"],
      correct: 0
    },
    {
      question: "Which tool is commonly used for digital drawing?",
      answers: ["Hammer", "Stylus", "Wrench", "Screwdriver"],
      correct: 1
    },
    {
      question: "Which color is complementary to blue on a traditional color wheel?",
      answers: ["Green", "Orange", "Purple", "Yellow"],
      correct: 1
    },
    {
      question: "What do we call a quick preliminary drawing?",
      answers: ["Sketch", "Portrait", "Mural", "Sculpture"],
      correct: 0
    },
    {
      question: "Which art form uses movement and music?",
      answers: ["Painting", "Dance", "Photography", "Drawing"],
      correct: 1
    },
    {
      question: "Which technique combines different images into one artwork?",
      answers: ["Collage", "Carving", "Weaving", "Engraving"],
      correct: 0
    },
    {
      question: "Which of these is a type of visual art?",
      answers: ["Swimming", "Photography", "Running", "Cooking"],
      correct: 1
    }
  ]
};

// Start quiz when category is clicked
categoryButtons.forEach(button => {
  button.addEventListener("click", () => {
    startQuiz(button.dataset.category);
  });
});

function startQuiz(category) {
  clearInterval(timer);

  if (!questionBank[category]) {
    console.error("Unknown category:", category);
    return;
  }

  currentCategory = category;

  questions = [...questionBank[category]]
    .sort(() => Math.random() - 0.5);

  currentIndex = 0;
  correctAnswers = 0;
  answeredQuestions = 0;
  totalPoints = 0;

  scoreCount.textContent = "0";
  answeredCount.textContent = "0";

  categoryName.textContent =
    category === "logical"
      ? "Logical Challenge"
      : "Creative Challenge";

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
  feedback.textContent = "";
  nextButton.hidden = true;

  progressText.textContent =
    `Question ${currentIndex + 1} of ${questions.length}`;

  progressFill.style.width =
    `${(currentIndex / questions.length) * 100}%`;

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
      selectAnswer(-1);
    }
  }, 1000);
}

function updateTimer() {
  timerText.textContent = `${timeLeft}s`;
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

    if (
      index === selectedIndex &&
      selectedIndex !== currentQuestion.correct
    ) {
      button.classList.add("incorrect");
      button.style.backgroundColor = "#dc2626";
      button.style.color = "white";
    }
  });

  if (selectedIndex === currentQuestion.correct) {
    correctAnswers++;
    totalPoints += 100 + timeLeft * 10;
    feedback.textContent = "Correct answer! 🎉";
  } else if (selectedIndex === -1) {
    feedback.textContent = "Time is up!";
  } else {
    feedback.textContent = "Incorrect answer!";
  }

  // Update score after every question
  scoreCount.textContent = totalPoints;
  answeredCount.textContent = answeredQuestions;

  nextButton.hidden = false;
}

// Next question
nextButton.addEventListener("click", () => {
  if (!answered) return;

  currentIndex++;

  if (currentIndex < questions.length) {
    showQuestion();
  } else {
    showResults();
  }
});

// Final results
function showResults() {
  clearInterval(timer);

  quizView.hidden = true;
  resultView.hidden = false;

  const total = questions.length;
  const wrongAnswers = answeredQuestions - correctAnswers;
  const percentage = Math.round((correctAnswers / total) * 100);

  resultCategory.textContent =
    currentCategory === "logical"
      ? "Logical Challenge"
      : "Creative Challenge";

  resultFraction.textContent = `${correctAnswers}/${total}`;
  resultPercentage.textContent = `${percentage}% correct answers`;

  resultAnswered.textContent = answeredQuestions;
  resultCorrect.textContent = correctAnswers;
  resultWrong.textContent = wrongAnswers;
  resultPoints.textContent = totalPoints;

  progressFill.style.width = "100%";

  // Save results in browser
  const result = {
    category: currentCategory,
    score: totalPoints,
    correctAnswers: correctAnswers,
    totalQuestions: total,
    percentage: percentage,
    date: new Date().toISOString()
  };

  try {
    const previousResults = JSON.parse(
      localStorage.getItem("brainrush-results") || "[]"
    );

    previousResults.push(result);

    localStorage.setItem(
      "brainrush-results",
      JSON.stringify(previousResults)
    );
  } catch (error) {
    console.error("Could not save results:", error);
  }
}

// Play again
playAgain.addEventListener("click", () => {
  clearInterval(timer);

  resultView.hidden = true;
  quizView.hidden = true;
  startView.hidden = false;

  scoreCount.textContent = "0";
  answeredCount.textContent = "0";
});



